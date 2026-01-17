import { z } from 'zod';

export const CertificationSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  issuer: z.string().nullable(),
  issueDate: z.string().nullable(),
  credentialUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CertificationType = z.infer<typeof CertificationSchema>;
