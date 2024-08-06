import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),

  tag: text('tag').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const tagsReqSchema = createInsertSchema(tags).pick({ tag: true });

export const tagsSelectSchema = {
  id: tags.id,
  tag: tags.tag,
};

export type Tags = typeof tags.$inferSelect;
