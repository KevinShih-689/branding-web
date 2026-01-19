import { NextRequest } from 'next/server';
import { validateRequest, createSuccessResponse, createErrorResponse, ApiError } from '@/lib/api';
import { LoginPayloadSchema, type LoginPayloadType } from '@/lib/dtos';
import { container } from '@/lib/api/container';

export async function POST(req: NextRequest) {
  try {
    const { slug, password } = await validateRequest<LoginPayloadType>(req, LoginPayloadSchema);

    const {
      user,
      session: { access_token, expires_in },
    } = await container.loginService.login(slug, password);

    const response = createSuccessResponse({
      data: {
        slug: user.slug,
        full_name: user.fullName,
        avatar_url: user.avatarUrl,
      },
      message: 'Login successful',
    });

    response.cookies.set('auth_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expires_in,
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      return createErrorResponse({
        message: error.message,
        status: error.status,
        httpStatus: error.statusCode,
      });
    }

    console.error('Login API Error:', error);
    return createErrorResponse({
      message: 'Internal Server Error',
      status: 'Error',
      httpStatus: 500,
    });
  }
}
