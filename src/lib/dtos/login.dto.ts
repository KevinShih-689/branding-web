import { z } from 'zod';

export const LoginPayloadSchema = z.object({
  slug: z.string({ message: 'Slug is required' }).min(1, 'Slug can not be empty'),
  password: z.string({ message: 'Password is required' }).min(1, 'Password can not be empty'),
});

export type LoginPayloadType = z.infer<typeof LoginPayloadSchema>;
