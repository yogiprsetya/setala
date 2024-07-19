import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const contentType = pgTable('content_type', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),

  name: text('name'),
  color: text('color'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
