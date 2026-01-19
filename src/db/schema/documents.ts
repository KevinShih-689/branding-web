import { index, pgTable, pgPolicy, text, timestamp, uuid, jsonb, vector } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { profiles } from './profiles';

export const documents = pgTable(
  'documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 768 }).notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('documents_profile_id_idx').on(table.profileId),
    index('documents_embedding_idx').using('hnsw', table.embedding.op('vector_cosine_ops')),
    index('documents_profile_id_created_at_idx').on(table.profileId, table.createdAt),
    pgPolicy('Users can only read their own documents', {
      for: 'select',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only insert documents for themselves', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
    pgPolicy('Users can only update their own documents', {
      for: 'update',
      to: 'authenticated',
      using: sql`${table.profileId} = auth.uid()`,
      withCheck: sql`${table.profileId} = auth.uid()`,
    }),
  ],
);

export type Document = InferSelectModel<typeof documents>;
export type NewDocument = InferInsertModel<typeof documents>;
