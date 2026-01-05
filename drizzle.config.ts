import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

const projectDir = process.cwd();

const isDev: boolean = process.env.NODE_ENV === 'development';
loadEnvConfig(projectDir, isDev);

const connectionString = process.env.SUPABASE_PROJECT_URL;

if (!connectionString) {
  throw new Error('SUPABASE_PROJECT_URL environment variable is required');
}

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
  verbose: true,
  strict: true,
});
