<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\Response;

class RequestId
{
    public function handle(Request $request, Closure $next): Response
    {
        // Generate or retrieve request ID
        $requestId = $request->header('X-Request-ID') ?? (string) Uuid::uuid4();

        // Store request ID in request for later use
        $request->attributes->set('request_id', $requestId);

        // Add request ID to request context for logging
        $request->headers->set('X-Request-ID', $requestId);

        $response = $next($request);

        // Add request ID to response headers
        $response->headers->set('X-Request-ID', $requestId);

        return $response;
    }
}
