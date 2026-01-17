import { z } from 'zod';

export const ProfileSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  fullName: z.string().nullable(),
  headline: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  location: z.string().nullable(),
  bio: z.string().nullable(),
  githubUrl: z.string().nullable(),
  linkedinUrl: z.string().nullable(),
  cakeResumeUrl: z.string().nullable(),
});

export type ProfileType = z.infer<typeof ProfileSchema>;
