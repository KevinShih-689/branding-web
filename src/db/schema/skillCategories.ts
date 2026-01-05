import { index, pgTable, pgPolicy, text, timestamp, uuid, integer, boolean, smallint } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { profiles } from './profiles';

export const skillCategories = pgTable(
  'skill_categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    name: text('name').notNull(),
    proficiency: smallint('proficiency'),
    displayOrder: integer('display_order').default(0).notNull(),
    isEnable: boolean('is_enable').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('skill_categories_profile_id_idx').on(table.profileId),
    index('skill_categories_profile_id_is_enable_deleted_at_idx')
      .on(table.profileId, table.isEnable, table.deletedAt)
      .where(sql`${table.deletedAt} IS NULL AND ${table.isEnable} = true`),
    index('skill_categories_profile_id_display_order_deleted_at_idx')
      .on(table.profileId, table.displayOrder, table.deletedAt)
      .where(sql`${table.deletedAt} IS NULL`),
    pgPolicy('Users can only read their own skill categories', {
      for: 'select',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only insert skill categories for themselves', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only update their own skill categories', {
      for: 'update',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
  ],
);

export type SkillCategory = InferSelectModel<typeof skillCategories>;
export type NewSkillCategory = InferInsertModel<typeof skillCategories>;
