import { NextResponse, NextRequest } from 'next/server';
import { parseJson } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const { slug, password } = await parseJson<{ slug: string; password: string }>(req);
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
