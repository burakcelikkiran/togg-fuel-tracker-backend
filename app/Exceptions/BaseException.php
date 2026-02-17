<?php

namespace App\Exceptions;

use App\Enums\ErrorCode;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

abstract class BaseException extends Exception
{
    protected ErrorCode $errorCode;

    protected ?string $userMessage;

    protected array $context = [];

    public function __construct(
        ErrorCode $errorCode,
        ?string $message = null,
        ?\Throwable $previous = null
    ) {
        $this->errorCode = $errorCode;
        $this->userMessage = $message ?? $errorCode->message();

        parent::__construct($this->userMessage, $errorCode->httpStatus(), $previous);
    }

    public function getErrorCode(): ErrorCode
    {
        return $this->errorCode;
    }

    public function getUserMessage(): string
    {
        return $this->userMessage;
    }

    public function getContext(): array
    {
        return $this->context;
    }

    public function setContext(array $context): self
    {
        $this->context = $context;

        return $this;
    }

    public function render(Request $request): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $this->getUserMessage(),
            'error_code' => $this->getErrorCode()->value,
        ];

        // Add request ID if available
        if ($request->hasHeader('X-Request-ID')) {
            $response['request_id'] = $request->header('X-Request-ID');
        }

        // In debug mode, include more details
        if (config('app.debug')) {
            $response['debug'] = [
                'exception' => get_class($this),
                'file' => $this->getFile(),
                'line' => $this->getLine(),
                'trace' => collect($this->getTrace())->map(fn ($trace) => array_filter([
                    'file' => $trace['file'] ?? null,
                    'line' => $trace['line'] ?? null,
                    'function' => $trace['function'] ?? null,
                    'class' => $trace['class'] ?? null,
                ]))->all(),
            ];
        }

        return response()->json($response, $this->getErrorCode()->httpStatus());
    }

    public function report(): bool
    {
        $context = array_merge($this->context, [
            'error_code' => $this->errorCode->value,
            'user_message' => $this->userMessage,
            'file' => $this->getFile(),
            'line' => $this->getLine(),
        ]);

        \Log::error($this->getMessage(), $context);

        return false;
    }
}
