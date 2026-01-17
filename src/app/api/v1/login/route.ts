import { NextResponse, NextRequest } from 'next/server';
import { validateRequest } from '@/lib/api';
import { LoginPayloadSchema, type LoginPayloadType } from '@/lib/dtos';

export async function POST(req: NextRequest) {
  try {
    const { slug, password } = await validateRequest<LoginPayloadType>(req, LoginPayloadSchema);
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
