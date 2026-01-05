import { NextResponse, NextRequest } from 'next/server';
import { ApiError } from './error';
import { createErrorResponse } from './response';

type DefaultParams = Record<string, string | string[] | undefined>;

type RouteHandlerContext<T = DefaultParams> = {
  params: Promise<T>;
};

type ApiFunction<T = DefaultParams> = (req: NextRequest, context: RouteHandlerContext<T>) => Promise<NextResponse>;

export function apiHandler<T = DefaultParams>(fn: ApiFunction<T>) {
  return async (req: NextRequest, context: RouteHandlerContext<T>) => {
    try {
      return await fn(req, context);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ApiError) {
        const { message, status, statusCode } = error;
        return createErrorResponse({
          message,
          status,
          httpStatus: statusCode as number,
        });
      }

      return createErrorResponse({ message: 'Internal Server Error', status: 'error', httpStatus: 500 });
    }
  };
}
