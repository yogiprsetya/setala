/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'drizzle-kit';
import '~/config/env';

export default defineConfig({
  dialect: 'postgresql', // "mysql" | "sqlite" | "postgresql"
  schema: './schema/*',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL || '',
  },
  strict: true,
});
