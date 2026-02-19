<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\VerificationCode;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:customers,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $customer = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // API token oluştur
        $apiToken = $customer->createApiToken();

        // Doğrulama kodu oluştur
        $code = str_pad((string) random_int(0, 999999), 6, '0');

        VerificationCode::create([
            'customer_id' => $customer->id,
            'code' => $code,
            'expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($customer->email)->send(new \App\Mail\VerificationCodeMail($code, $customer->name));

        return response()->json([
            'success' => true,
            'message' => 'Kayıt başarılı. Lütfen e-posta adresinize gönderilen doğrulama kodunu girin.',
            'data' => [
                'customer_id' => $customer->id,
                'api_token' => $apiToken, // Token sadece burada gösterilir
            ],
        ], 201);
    }

    public function verify(Request $request): JsonResponse
    {
        $request->validate([
            'customer_id' => 'required|integer|exists:customers,id',
            'code' => 'required|string|size:6',
        ]);

        $verification = VerificationCode::where('customer_id', $request->customer_id)
            ->where('code', $request->code)
            ->whereNull('verified_at')
            ->where('expires_at', '>', now())
            ->first();

        if (!$verification) {
            throw ValidationException::withMessages([
                'code' => ['Geçersiz veya süresi dolmuş doğrulama kodu.'],
            ]);
        }

        $verification->verified_at = now();
        $verification->save();

        $customer = Customer::find($request->customer_id);

        return response()->json([
            'success' => true,
            'message' => 'E-posta başarıyla doğrulandı.',
            'data' => [
                'customer' => [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'email' => $customer->email,
                ],
            ],
        ]);
    }

    public function resendCode(Request $request): JsonResponse
    {
        $request->validate([
            'customer_id' => 'required|integer|exists:customers,id',
        ]);

        $customer = Customer::find($request->customer_id);

        VerificationCode::where('customer_id', $customer->id)
            ->whereNull('verified_at')
            ->delete();

        $code = str_pad((string) random_int(0, 999999), 6, '0');

        VerificationCode::create([
            'customer_id' => $customer->id,
            'code' => $code,
            'expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($customer->email)->send(new \App\Mail\VerificationCodeMail($code, $customer->name));

        return response()->json([
            'success' => true,
            'message' => 'Yeni doğrulama kodu e-posta adresinize gönderildi.',
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            throw ValidationException::withMessages([
                'email' => ['Girdiğiniz bilgiler hatalı.'],
            ]);
        }

        // Token yoksa oluştur
        if (!$customer->api_token) {
            $customer->createApiToken();
            $customer->refresh();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'api_token' => $customer->api_token,
                'customer' => [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'email' => $customer->email,
                ],
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        // Token'ı iptal et
        $request->user()->revokeApiToken();

        return response()->json([
            'success' => true,
            'message' => 'Çıkış başarılı, token iptal edildi.',
        ]);
    }

    public function user(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data' => [
                'customer' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
        ]);
    }
}
