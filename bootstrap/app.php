<?php

use App\Enums\ErrorCode;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as LaravelValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
            \App\Http\Middleware\RequestId::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Throwable $e, Request $request): ?JsonResponse {
            // Only handle API requests
            if (!$request->expectsJson() && !$request->is('api/*')) {
                return null;
            }

            $response = [
                'success' => false,
                'message' => 'An error occurred.',
                'error_code' => ErrorCode::INTERNAL_SERVER_ERROR->value,
            ];

            // Add request ID if available
            if ($request->hasHeader('X-Request-ID')) {
                $response['request_id'] = $request->header('X-Request-ID');
            }

            $statusCode = 500;

            // Handle authentication exceptions
            if ($e instanceof AuthenticationException) {
                $response['error_code'] = ErrorCode::UNAUTHENTICATED->value;
                $response['message'] = 'Authentication is required to access this resource.';
                $statusCode = 401;
            }

            // Handle HTTP exceptions (404, 403, etc.)
            if ($e instanceof HttpException) {
                $statusCode = $e->getStatusCode();
                $response['error_code'] = match ($statusCode) {
                    401 => ErrorCode::UNAUTHENTICATED->value,
                    403 => ErrorCode::UNAUTHORIZED->value,
                    404 => ErrorCode::NOT_FOUND->value,
                    405 => ErrorCode::METHOD_NOT_ALLOWED->value,
                    409 => ErrorCode::CONFLICT->value,
                    422 => ErrorCode::VALIDATION_FAILED->value,
                    429 => ErrorCode::TOO_MANY_REQUESTS->value,
                    503 => ErrorCode::SERVICE_UNAVAILABLE->value,
                    default => ErrorCode::BAD_REQUEST->value,
                };
                $response['message'] = $e->getMessage() ?: match($response['error_code']) {
                    ErrorCode::NOT_FOUND->value => 'The requested resource was not found.',
                    ErrorCode::UNAUTHENTICATED->value => 'Authentication is required.',
                    ErrorCode::UNAUTHORIZED->value => 'You do not have permission.',
                    default => 'An error occurred.',
                };
            }

            // Handle validation exceptions
            if ($e instanceof LaravelValidationException) {
                $response['error_code'] = ErrorCode::VALIDATION_FAILED->value;
                $response['message'] = 'The given data was invalid.';
                $response['errors'] = $e->errors();
                $statusCode = 422;
            }

            // In debug mode, include more details
            if (config('app.debug')) {
                $response['debug'] = [
                    'exception' => get_class($e),
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ];
            }

            return response()->json($response, $statusCode);
        });
    })->create();
