import { index, pgTable, pgPolicy, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { profiles } from './profiles';

export const contactSubmissions = pgTable(
  'contact_submissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    senderName: text('sender_name').notNull(),
    senderEmail: text('sender_email').notNull(),
    message: text('message').notNull(),
    isSent: boolean('is_sent').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('contact_submissions_profile_id_idx').on(table.profileId),
    index('contact_submissions_profile_id_is_sent_idx')
      .on(table.profileId, table.isSent)
      .where(sql`${table.isSent} = false`),
    index('contact_submissions_profile_id_created_at_idx').on(table.profileId, table.createdAt),
    pgPolicy('Users can only read their own contact submissions', {
      for: 'select',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only insert contact submissions for themselves', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only update their own contact submissions', {
      for: 'update',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
  ],
);

export type ContactSubmission = InferSelectModel<typeof contactSubmissions>;
export type NewContactSubmission = InferInsertModel<typeof contactSubmissions>;
