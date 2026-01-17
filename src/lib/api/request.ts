import { NextRequest } from 'next/server';
import { BadRequestError } from './error';

export async function parseJson<T = unknown>(req: NextRequest): Promise<T> {
  try {
    return await req.json();
  } catch {
    throw new BadRequestError('Invalid JSON body');
  }
}
