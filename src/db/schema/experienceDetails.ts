import { index, pgTable, pgPolicy, text, timestamp, uuid, integer, date } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { experiences } from './experiences';

export const experienceDetails = pgTable(
  'experience_details',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    experienceId: uuid('experience_id')
      .notNull()
      .references(() => experiences.id),
    position: text('position').notNull(),
    content: text('content').array().notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    displayOrder: integer('display_order').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('experience_details_experience_id_idx').on(table.experienceId),
    index('experience_details_experience_id_display_order_deleted_at_idx')
      .on(table.experienceId, table.displayOrder, table.deletedAt)
      .where(sql`${table.deletedAt} IS NULL`),
    pgPolicy('Users can only read experience details for their own experiences', {
      for: 'select',
      to: 'authenticated',
      using: sql`
        ${table.experienceId} IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      `,
    }),
    pgPolicy('Users can only insert experience details for their own experiences', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`
        ${table.experienceId} IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      `,
    }),
    pgPolicy('Users can only update experience details for their own experiences', {
      for: 'update',
      to: 'authenticated',
      using: sql`
        ${table.experienceId} IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      `,
      withCheck: sql`
        ${table.experienceId} IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      `,
    }),
  ],
);

export type ExperienceDetail = InferSelectModel<typeof experienceDetails>;
export type NewExperienceDetail = InferInsertModel<typeof experienceDetails>;
