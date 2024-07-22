import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const contentType = pgTable('content_type', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),

  name: text('name').notNull(),
  color: text('color').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const contentTypeReqSchema = createInsertSchema(contentType).pick({
  name: true,
  color: true,
});

export const contentTypeSelectSchema = {
  id: contentType.id,
  name: contentType.name,
  color: contentType.color,
  updatedAt: contentType.updatedAt,
};
