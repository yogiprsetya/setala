import { serial, text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const tags = pgTable('topic', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),

  tag: text('name').notNull(),

  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const topicReqSchema = createInsertSchema(tags).pick({ tag: true });

export const topicSelectSchema = {
  id: tags.id,
  tag: tags.tag,
};

export type Tags = typeof tags.$inferSelect;
