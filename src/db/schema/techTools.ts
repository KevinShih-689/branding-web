import { index, pgTable, pgPolicy, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { skillCategories } from './skillCategories';

export const techTools = pgTable(
  'tech_tools',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => skillCategories.id),
    name: text('name').notNull(),
    iconKey: text('icon_key'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('tech_tools_category_id_idx').on(table.categoryId),
    index('tech_tools_category_id_deleted_at_idx')
      .on(table.categoryId, table.deletedAt)
      .where(sql`${table.deletedAt} IS NULL`),
    pgPolicy('All authenticated users can read tech tools', {
      for: 'select',
      to: 'authenticated',
      using: sql`true`,
    }),
    pgPolicy('Users can only insert tech tools for their own categories', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`
        ${table.categoryId} IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      `,
    }),
    pgPolicy('Users can only update tech tools for their own categories', {
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

export type TechTool = InferSelectModel<typeof techTools>;
export type NewTechTool = InferInsertModel<typeof techTools>;
