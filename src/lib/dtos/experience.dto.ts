import { z } from 'zod';

export const ExperienceDetailSchema = z.object({
  id: z.uuid(),
  experienceId: z.uuid(),
  position: z.string(),
  content: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string().nullable(),
  displayOrder: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ExperienceDetailType = z.infer<typeof ExperienceDetailSchema>;

export const ExperienceSchema = z.object({
  id: z.uuid(),
  companyName: z.string(),
  companyLink: z.string().nullable(),
  displayOrder: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  details: z.array(ExperienceDetailSchema),
});

export type ExperienceType = z.infer<typeof ExperienceSchema>;
