import { serial, text, timestamp, pgTable, integer, boolean } from 'drizzle-orm/pg-core';
import { areaType } from './area-type';

export const area = pgTable('area', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  name: text('name'),
  typeId: integer('type_id').references(() => areaType.id),
  isArchive: boolean('is_archive'),
  icon: text('icon'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
