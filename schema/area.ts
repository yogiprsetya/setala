import { serial, text, timestamp, pgTable, integer, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { areaType } from './area-type';

export const area = pgTable('area', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),

  name: text('name').notNull(),
  typeId: integer('type_id').references(() => areaType.id),
  isArchive: boolean('is_archive'),
  icon: text('icon').notNull(),

  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const areaReqSchema = createInsertSchema(area).pick({
  name: true,
  icon: true,
  typeId: true,
});

export const areaSelectSchema = {
  id: area.id,
  name: area.name,
  icon: area.icon,
  typeId: area.typeId,
  createdAt: area.createdAt,
  updatedAt: area.updatedAt,
};
