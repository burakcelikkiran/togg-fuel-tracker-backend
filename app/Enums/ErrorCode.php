<?php

namespace App\Enums;

enum ErrorCode: string
{
    // Generic Errors
    case INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
    case BAD_REQUEST = 'BAD_REQUEST';
    case NOT_FOUND = 'NOT_FOUND';
    case METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED';
    case CONFLICT = 'CONFLICT';
    case UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY';
    case TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS';
    case SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE';

    // Authentication & Authorization
    case UNAUTHENTICATED = 'UNAUTHENTICATED';
    case UNAUTHORIZED = 'UNAUTHORIZED';
    case INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
    case TOKEN_EXPIRED = 'TOKEN_EXPIRED';
    case TOKEN_INVALID = 'TOKEN_INVALID';

    // Validation Errors
    case VALIDATION_FAILED = 'VALIDATION_FAILED';
    case INVALID_INPUT = 'INVALID_INPUT';

    // Resource Errors
    case RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND';
    case RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS';
    case RESOURCE_DELETED = 'RESOURCE_DELETED';

    // Model Specific
    case VEHICLE_NOT_FOUND = 'VEHICLE_NOT_FOUND';
    case VEHICLE_INACTIVE = 'VEHICLE_INACTIVE';
    case CHARGE_NOT_FOUND = 'CHARGE_NOT_FOUND';
    case COMPANY_NOT_FOUND = 'COMPANY_NOT_FOUND';
    case USER_NOT_FOUND = 'USER_NOT_FOUND';

    public function message(): string
    {
        return match ($this) {
            self::INTERNAL_SERVER_ERROR => 'An unexpected error occurred. Please try again later.',
            self::BAD_REQUEST => 'The request could not be understood or was missing required parameters.',
            self::NOT_FOUND => 'The requested resource was not found.',
            self::METHOD_NOT_ALLOWED => 'The request method is not allowed for this resource.',
            self::CONFLICT => 'The request conflicts with the current state of the resource.',
            self::UNPROCESSABLE_ENTITY => 'The request could not be processed.',
            self::TOO_MANY_REQUESTS => 'Too many requests. Please slow down.',
            self::SERVICE_UNAVAILABLE => 'The service is temporarily unavailable. Please try again later.',

            self::UNAUTHENTICATED => 'Authentication is required to access this resource.',
            self::UNAUTHORIZED => 'You do not have permission to access this resource.',
            self::INVALID_CREDENTIALS => 'Invalid credentials provided.',
            self::TOKEN_EXPIRED => 'Your session has expired. Please login again.',
            self::TOKEN_INVALID => 'Invalid authentication token.',

            self::VALIDATION_FAILED => 'The given data was invalid.',
            self::INVALID_INPUT => 'The provided input is invalid.',

            self::RESOURCE_NOT_FOUND => 'The requested resource was not found.',
            self::RESOURCE_ALREADY_EXISTS => 'A resource with these attributes already exists.',
            self::RESOURCE_DELETED => 'The resource has been deleted.',

            self::VEHICLE_NOT_FOUND => 'Vehicle not found.',
            self::VEHICLE_INACTIVE => 'Vehicle is not active.',
            self::CHARGE_NOT_FOUND => 'Charge record not found.',
            self::COMPANY_NOT_FOUND => 'Company not found.',
            self::USER_NOT_FOUND => 'User not found.',
        };
    }

    public function httpStatus(): int
    {
        return match ($this) {
            self::INTERNAL_SERVER_ERROR => 500,
            self::BAD_REQUEST, self::INVALID_INPUT => 400,
            self::NOT_FOUND,
            self::RESOURCE_NOT_FOUND,
            self::VEHICLE_NOT_FOUND,
            self::CHARGE_NOT_FOUND,
            self::COMPANY_NOT_FOUND,
            self::USER_NOT_FOUND => 404,
            self::METHOD_NOT_ALLOWED => 405,
            self::CONFLICT,
            self::RESOURCE_ALREADY_EXISTS => 409,
            self::UNPROCESSABLE_ENTITY,
            self::VALIDATION_FAILED => 422,
            self::TOO_MANY_REQUESTS => 429,
            self::SERVICE_UNAVAILABLE => 503,

            self::UNAUTHENTICATED,
            self::INVALID_CREDENTIALS,
            self::TOKEN_EXPIRED,
            self::TOKEN_INVALID => 401,
            self::UNAUTHORIZED => 403,
        };
    }
}
