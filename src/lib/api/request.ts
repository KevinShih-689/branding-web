import { NextRequest } from 'next/server';
import { z } from 'zod';
import { BadRequestError, AuthenticationError } from './error';

export async function validateRequest<T>(req: NextRequest, schema: z.ZodSchema<T>): Promise<T> {
  let reqData;
  try {
    reqData = await req.json();
  } catch {
    throw new BadRequestError('Invalid JSON body');
  }

  const result = schema.safeParse(reqData);

  if (!result.success) {
    const errorMessage = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
    throw new BadRequestError(errorMessage);
  }

  return result.data;
}

export function getAuthenticatedUserId(req: NextRequest): string {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    throw new AuthenticationError('Unauthorized: User ID missing');
  }
  return userId;
}
