import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';
import { createUnauthorizedResponse, createErrorResponse } from '@/lib/api/response';

export const config = {
  matcher: ['/api/v1/me/:path*', '/api/v1/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
      return createUnauthorizedResponse('Unauthorized: No token provided', 'TOKEN_MISSING');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    if (payload.aud !== 'authenticated') {
      return createUnauthorizedResponse('Unauthorized: Invalid token type', 'TOKEN_INVALID');
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', payload.sub as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      return createUnauthorizedResponse('Unauthorized: Token expired', 'TOKEN_EXPIRED');
    }

    if (error instanceof jose.errors.JWSInvalid || error instanceof jose.errors.JWTInvalid) {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      console.warn('Security Warning: Invalid Token received from IP:', ip);
      return createUnauthorizedResponse('Unauthorized: Invalid token', 'TOKEN_INVALID');
    }

    console.error('Middleware Internal Error:', error);
    return createErrorResponse({
      message: 'Internal Server Error',
      status: 'Error',
      httpStatus: 500,
    });
  }
}
