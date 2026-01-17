import { NextRequest } from 'next/server';
import { z } from 'zod';
import { BadRequestError } from './error';

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
