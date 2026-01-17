import { z } from 'zod';

export const TechToolSchema = z.object({
  id: z.uuid(),
  categoryId: z.uuid(),
  name: z.string(),
  iconKey: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TechToolType = z.infer<typeof TechToolSchema>;
