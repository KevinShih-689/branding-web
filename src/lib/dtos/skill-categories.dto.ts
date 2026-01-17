import { z } from 'zod';

export const SkillCategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  proficiency: z.number().nullable(),
  displayOrder: z.number(),
  isEnable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type SkillCategoryType = z.infer<typeof SkillCategorySchema>;
