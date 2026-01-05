import { index, pgTable, pgPolicy, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').primaryKey(),
    slug: text('slug').unique().notNull(),
    fullName: text('full_name'),
    headline: text('headline'),
    avatarUrl: text('avatar_url'),
    email: text('email'),
    phone: text('phone'),
    location: text('location'),
    bio: text('bio'),
    githubUrl: text('github_url'),
    linkedinUrl: text('linkedin_url'),
    cakeResumeUrl: text('cake_resume_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('profiles_slug_idx').on(table.slug),
    pgPolicy('Users can only read their own profile', {
      for: 'select',
      to: 'authenticated',
      using: sql`${table.id} = auth.uid()`,
    }),
    pgPolicy('Users can only insert profile with their own id', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`${table.id} = auth.uid()`,
    }),
    pgPolicy('Users can only update their own profile', {
      for: 'update',
      to: 'authenticated',
      using: sql`${table.id} = auth.uid()`,
      withCheck: sql`${table.id} = auth.uid()`,
    }),
  ],
);

export type Profile = InferSelectModel<typeof profiles>;
export type NewProfile = InferInsertModel<typeof profiles>;
