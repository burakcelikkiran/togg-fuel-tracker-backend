<?php

namespace App\Exceptions;

use App\Enums\ErrorCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as LaravelValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class ApiException extends BaseException
{
    public static function fromErrorCode(ErrorCode $errorCode, ?string $message = null): self
    {
        return new static($errorCode, $message);
    }

    // Static helpers for common errors
    public static function notFound(?string $message = null): self
    {
        return new static(ErrorCode::NOT_FOUND, $message);
    }

    public static function resourceNotFound(string $resource, ?string $message = null): self
    {
        return new static(ErrorCode::RESOURCE_NOT_FOUND, $message ?? "{$resource} not found.");
    }

    public static function vehicleNotFound(?string $message = null): self
    {
        return new static(ErrorCode::VEHICLE_NOT_FOUND, $message);
    }

    public static function vehicleInactive(?string $message = null): self
    {
        return new static(ErrorCode::VEHICLE_INACTIVE, $message);
    }

    public static function chargeNotFound(?string $message = null): self
    {
        return new static(ErrorCode::CHARGE_NOT_FOUND, $message);
    }

    public static function companyNotFound(?string $message = null): self
    {
        return new static(ErrorCode::COMPANY_NOT_FOUND, $message);
    }

    public static function userNotFound(?string $message = null): self
    {
        return new static(ErrorCode::USER_NOT_FOUND, $message);
    }

    public static function unauthorized(?string $message = null): self
    {
        return new static(ErrorCode::UNAUTHORIZED, $message);
    }

    public static function unauthenticated(?string $message = null): self
    {
        return new static(ErrorCode::UNAUTHENTICATED, $message);
    }

    public static function badRequest(?string $message = null): self
    {
        return new static(ErrorCode::BAD_REQUEST, $message);
    }

    public static function conflict(?string $message = null): self
    {
        return new static(ErrorCode::CONFLICT, $message);
    }

    public static function validationFailed(?string $message = null): self
    {
        return new static(ErrorCode::VALIDATION_FAILED, $message);
    }

    public static function tooManyRequests(?string $message = null): self
    {
        return new static(ErrorCode::TOO_MANY_REQUESTS, $message);
    }

    public static function internalError(?string $message = null): self
    {
        return new static(ErrorCode::INTERNAL_SERVER_ERROR, $message);
    }
}

/**
 * Global exception handler for rendering all exceptions in API format
 */
class ApiExceptionHandler
{
    public static function handle(Throwable $e, Request $request): ?JsonResponse
    {
        // Only handle API requests
        if (!$request->expectsJson() && !$request->is('api/*')) {
            return null;
        }

        // Handle our custom exceptions
        if ($e instanceof BaseException) {
            return $e->render($request);
        }

        // Handle Laravel validation exceptions
        if ($e instanceof LaravelValidationException) {
            $response = [
                'success' => false,
                'message' => 'The given data was invalid.',
                'error_code' => ErrorCode::VALIDATION_FAILED->value,
                'errors' => $e->errors(),
            ];

            if ($request->hasHeader('X-Request-ID')) {
                $response['request_id'] = $request->header('X-Request-ID');
            }

            if (config('app.debug')) {
                $response['debug'] = [
                    'exception' => get_class($e),
                ];
            }

            return response()->json($response, 422);
        }

        // Handle HTTP exceptions (404, 403, etc.)
        if ($e instanceof HttpException) {
            $statusCode = $e->getStatusCode();

            $errorCode = match ($statusCode) {
                401 => ErrorCode::UNAUTHENTICATED,
                403 => ErrorCode::UNAUTHORIZED,
                404 => ErrorCode::NOT_FOUND,
                405 => ErrorCode::METHOD_NOT_ALLOWED,
                409 => ErrorCode::CONFLICT,
                422 => ErrorCode::VALIDATION_FAILED,
                429 => ErrorCode::TOO_MANY_REQUESTS,
                500 => ErrorCode::INTERNAL_SERVER_ERROR,
                503 => ErrorCode::SERVICE_UNAVAILABLE,
                default => ErrorCode::BAD_REQUEST,
            };

            $response = [
                'success' => false,
                'message' => $e->getMessage() ?: $errorCode->message(),
                'error_code' => $errorCode->value,
            ];

            if ($request->hasHeader('X-Request-ID')) {
                $response['request_id'] = $request->header('X-Request-ID');
            }

            if (config('app.debug')) {
                $response['debug'] = [
                    'exception' => get_class($e),
                    'status_code' => $statusCode,
                    'headers' => $e->getHeaders(),
                ];
            }

            return response()->json($response, $statusCode);
        }

        // Handle generic exceptions
        $response = [
            'success' => false,
            'message' => config('app.debug')
                ? $e->getMessage()
                : ErrorCode::INTERNAL_SERVER_ERROR->message(),
            'error_code' => ErrorCode::INTERNAL_SERVER_ERROR->value,
        ];

        if ($request->hasHeader('X-Request-ID')) {
            $response['request_id'] = $request->header('X-Request-ID');
        }

        if (config('app.debug')) {
            $response['debug'] = [
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => collect($e->getTrace())->map(fn ($trace) => array_filter([
                    'file' => $trace['file'] ?? null,
                    'line' => $trace['line'] ?? null,
                    'function' => $trace['function'] ?? null,
                    'class' => $trace['class'] ?? null,
                ]))->all(),
            ];
        }

        return response()->json($response, 500);
    }
}
