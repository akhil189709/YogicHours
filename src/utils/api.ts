import { ApiResponse } from '@/types';

// API Error Handler
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public code?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Create standardized API response
export const createApiResponse = <T = any>(
    success: boolean,
    data?: T,
    error?: string,
    statusCode?: number
): ApiResponse<T> => {
    return {
        success,
        data,
        error,
        statusCode: statusCode || (success ? 200 : 500),
        message: success ? 'Success' : error,
    };
};

// Format error response
export const formatErrorResponse = (error: any): ApiResponse => {
    if (error instanceof ApiError) {
        return createApiResponse(false, undefined, error.message, error.statusCode);
    }

    if (error.response?.data) {
        return createApiResponse(
            false,
            undefined,
            error.response.data.message || error.message,
            error.response.status
        );
    }

    return createApiResponse(false, undefined, error.message || 'An error occurred', 500);
};

// Handle async errors in API routes
export const asyncHandler = (fn: Function) => async (...args: any[]) => {
    try {
        return await fn(...args);
    } catch (error) {
        throw error;
    }
};
