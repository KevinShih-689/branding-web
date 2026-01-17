import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/dtos';

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
  return createApiResponse<T>(data, { status: 'success', message }, httpStatus);
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
