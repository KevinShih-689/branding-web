import { index, pgTable, text, timestamp, uuid, date, pgPolicy } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { skillCategories } from './skillCategories';

export const certifications = pgTable(
  'certifications',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => skillCategories.id),
    name: text('name').notNull(),
    issuer: text('issuer'),
    issueDate: date('issue_date'),
    credentialUrl: text('credential_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('certifications_category_id_idx').on(table.categoryId),
    index('certifications_category_id_issue_date_deleted_at_idx')
      .on(table.categoryId, table.issueDate, table.deletedAt)
      .where(sql`${table.deletedAt} IS NULL`),
    pgPolicy('Public read access', { for: 'select', to: 'public', using: sql`true` }),
    pgPolicy('Enable insert for users based on category ownership', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`
        ${table.categoryId} IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      `,
    }),
    pgPolicy('Users can update their own certifications', {
      for: 'update',
      to: 'authenticated',
      using: sql`
        ${table.categoryId} IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      `,
      withCheck: sql`
        ${table.categoryId} IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      `,
    }),
  ],
);

export type Certification = InferSelectModel<typeof certifications>;
export type NewCertification = InferInsertModel<typeof certifications>;
