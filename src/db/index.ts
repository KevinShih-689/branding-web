import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

const connectionString = process.env.SUPABASE_PROJECT_URL;

if (!connectionString) {
  throw new Error('SUPABASE_PROJECT_URL environment variable is required');
}

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
