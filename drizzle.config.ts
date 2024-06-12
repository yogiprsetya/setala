/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', // "mysql" | "sqlite" | "postgresql"
  schema: './schema/*',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DB_URL! || '',
  },
  strict: true,
});
