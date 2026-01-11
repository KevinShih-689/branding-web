import { index, pgTable, pgPolicy, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, type InferInsertModel, relations } from 'drizzle-orm';
import { profiles } from './profiles';
import { experienceDetails } from './experienceDetails';

export const experiences = pgTable(
  'experiences',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    companyName: text('company_name').notNull(),
    companyLink: text('company_link'),
    displayOrder: integer('display_order').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('experiences_profile_id_idx').on(table.profileId),
    index('experiences_profile_id_display_order_deleted_at_idx')
      .on(table.profileId, table.displayOrder, table.deletedAt)
      .where(sql`${table.deletedAt} IS NULL`),
    pgPolicy('Users can only read their own experiences', {
      for: 'select',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only insert experiences for themselves', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only update their own experiences', {
      for: 'update',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
  ],
);

export const experienceRelations = relations(experiences, ({ many }) => ({
  details: many(experienceDetails),
}));

export type Experience = InferSelectModel<typeof experiences>;
export type NewExperience = InferInsertModel<typeof experiences>;
