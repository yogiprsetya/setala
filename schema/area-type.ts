import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const areaType = pgTable('area_type', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),

  name: text('name').notNull(),
  color: text('color').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const areaTypeReqSchema = createInsertSchema(areaType).pick({ name: true, color: true });
