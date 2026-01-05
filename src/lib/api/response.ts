import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';

/**
 * Creates a standardized API response with metadata and data
 * @param data - The response data (can be any type or null)
 * @param metadata - Response metadata containing status and message
 * @param httpStatus - HTTP status code (default: 200)
 * @returns NextResponse with standardized format
 */
export function createApiResponse<T = unknown>(
  data: T | null,
  metadata: { status: string; message: string },
  httpStatus: number = 200,
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    metadata,
    data,
  };

  return NextResponse.json(response, { status: httpStatus });
}

/**
 * Creates a success API response
 * @param params - Response parameters
 * @param params.data - The response data (default: null)
 * @param params.message - Success message (default: "Success")
 * @param params.httpStatus - HTTP status code (default: 200)
 * @returns NextResponse with success format
 */
export function createSuccessResponse<T = unknown>(
  params: {
    data?: T | null;
    message?: string;
    httpStatus?: number;
  } = {},
): NextResponse<ApiResponse<T>> {
  const { data = null, message = 'Success', httpStatus = 200 } = params;
  return createApiResponse(data, { status: 'success', message }, httpStatus);
}

/**
 * Creates an error API response
 * @param params - Response parameters
 * @param params.message - Error message
 * @param params.status - Error status (default: "Error")
 * @param params.httpStatus - HTTP status code (default: 500)
 * @returns NextResponse with error format
 */
export function createErrorResponse(params: {
  message: string;
  status?: string;
  httpStatus?: number;
}): NextResponse<ApiResponse<null>> {
  const { message, status = 'Error', httpStatus = 500 } = params;
  return createApiResponse(null, { status, message }, httpStatus);
}

/**
 * Creates a not found API response
 * @param params - Response parameters
 * @param params.message - Not found message (default: "Resource not found")
 * @returns NextResponse with 404 status
 */
export function createNotFoundResponse(params: { message?: string } = {}): NextResponse<ApiResponse<null>> {
  const { message = 'Resource not found' } = params;
  return createApiResponse(null, { status: 'Not Found', message }, 404);
}

/**
 * Creates a bad request API response
 * @param params - Response parameters
 * @param params.message - Bad request message (default: "Bad Request")
 * @returns NextResponse with 400 status
 */
export function createBadRequestResponse(params: { message?: string } = {}): NextResponse<ApiResponse<null>> {
  const { message = 'Bad Request' } = params;
  return createApiResponse(null, { status: 'Bad Request', message }, 400);
}

/**
 * Creates an unauthorized API response
 * @param params - Response parameters
 * @param params.message - Unauthorized message (default: "Unauthorized")
 * @returns NextResponse with 401 status
 */
export function createUnauthorizedResponse(params: { message?: string } = {}): NextResponse<ApiResponse<null>> {
  const { message = 'Unauthorized' } = params;
  return createApiResponse(null, { status: 'Unauthorized', message }, 401);
}
