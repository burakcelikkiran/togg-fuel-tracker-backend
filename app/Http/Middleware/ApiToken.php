<?php

namespace App\Http\Middleware;

use App\Models\Customer;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-API-Token');

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'API token required.',
                'error_code' => 'UNAUTHENTICATED',
            ], 401);
        }

        $customer = Customer::where('api_token', $token)->first();

        if (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid API token.',
                'error_code' => 'UNAUTHENTICATED',
            ], 401);
        }

        // Kullanıcıyı auth olarak set et
        auth('customer')->setUser($customer);
        $request->setUserResolver(fn () => $customer);

        return $next($request);
    }
}
