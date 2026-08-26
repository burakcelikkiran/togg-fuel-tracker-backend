<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\VerificationCode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function showLogin(): Response|RedirectResponse
    {
        if (Auth::guard('customer')->check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/Login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::guard('customer')->attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Girdiğiniz bilgiler hatalı.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    public function showRegister(): Response|RedirectResponse
    {
        if (Auth::guard('customer')->check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/Register');
    }

    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:customers,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $customer->createApiToken();

        $code = str_pad((string) random_int(0, 999999), 6, '0');

        VerificationCode::create([
            'customer_id' => $customer->id,
            'code' => $code,
            'expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($customer->email)->send(new \App\Mail\VerificationCodeMail($code, $customer->name));

        return redirect()->route('verify.show', ['customer_id' => $customer->id]);
    }

    public function showVerify(Request $request): Response|RedirectResponse
    {
        $customerId = $request->integer('customer_id');

        if (! $customerId || ! Customer::whereKey($customerId)->exists()) {
            return redirect()->route('register');
        }

        return Inertia::render('Auth/VerifyEmail', [
            'customerId' => $customerId,
        ]);
    }

    public function verify(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_id' => 'required|integer|exists:customers,id',
            'code' => 'required|string|size:6',
        ]);

        $verification = VerificationCode::where('customer_id', $validated['customer_id'])
            ->where('code', $validated['code'])
            ->whereNull('verified_at')
            ->where('expires_at', '>', now())
            ->first();

        if (! $verification) {
            throw ValidationException::withMessages([
                'code' => 'Geçersiz veya süresi dolmuş doğrulama kodu.',
            ]);
        }

        $verification->verified_at = now();
        $verification->save();

        $customer = Customer::findOrFail($validated['customer_id']);

        Auth::guard('customer')->login($customer);
        $request->session()->regenerate();

        return redirect()->route('dashboard');
    }

    public function resendCode(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_id' => 'required|integer|exists:customers,id',
        ]);

        $customer = Customer::findOrFail($validated['customer_id']);

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

        return back()->with('success', 'Yeni doğrulama kodu e-posta adresinize gönderildi.');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('customer')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('landing');
    }
}
