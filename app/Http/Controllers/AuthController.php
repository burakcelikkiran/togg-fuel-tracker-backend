<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\VerificationCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
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

        // 6 haneli doğrulama kodu oluştur
        $code = str_pad((string) random_int(0, 999999), 6, '0');

        VerificationCode::create([
            'customer_id' => $customer->id,
            'code' => $code,
            'expires_at' => now()->addMinutes(15), // 15 dakika geçerli
        ]);

        // E-posta gönder
        Mail::to($customer->email)->send(new \App\Mail\VerificationCodeMail($code, $customer->name));

        return response()->json([
            'message' => 'Kayıt başarılı. Lütfen e-posta adresinize gönderilen doğrulama kodunu girin.',
            'customer_id' => $customer->id,
        ], 201);
    }

    public function verify(Request $request)
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
        $token = $customer->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'E-posta başarıyla doğrulandı.',
            'token' => $token,
            'customer' => $customer,
        ]);
    }

    public function resendCode(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|integer|exists:customers,id',
        ]);

        $customer = Customer::find($request->customer_id);

        // Eski doğrulama kodunu iptal et
        VerificationCode::where('customer_id', $customer->id)
            ->whereNull('verified_at')
            ->delete();

        // Yeni kod oluştur
        $code = str_pad((string) random_int(0, 999999), 6, '0');

        VerificationCode::create([
            'customer_id' => $customer->id,
            'code' => $code,
            'expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($customer->email)->send(new \App\Mail\VerificationCodeMail($code, $customer->name));

        return response()->json([
            'message' => 'Yeni doğrulama kodu e-posta adresinize gönderildi.',
        ]);
    }

    public function login(Request $request)
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

        // Eski token'ları temizle
        $customer->tokens()->delete();

        $token = $customer->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'customer' => $customer,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Çıkış başarılı']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
