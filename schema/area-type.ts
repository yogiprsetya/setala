import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const areaType = pgTable('area_type', {
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),

  id: serial('id').primaryKey(),
  userId: text('user_id'),

  name: text('name'),
  color: text('color'),
});
