import { z } from 'zod';

export const ContactSubmissionPayloadSchema = z.object({
  sender_name: z.string({ message: 'Sender name is required' }).min(1, 'Sender name can not be empty'),
  sender_email: z.email({ message: 'Sender email is required' }),
  message: z.string({ message: 'Message is required' }).min(1, 'Message can not be empty'),
});

export type ContactSubmissionPayload = z.infer<typeof ContactSubmissionPayloadSchema>;

export const ContactSubmissionResponseSchema = z.object({
  id: z.uuid(),
  created_at: z.string(),
});

export type ContactSubmissionResponse = z.infer<typeof ContactSubmissionResponseSchema>;
