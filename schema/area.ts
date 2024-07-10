import { serial, text, timestamp, pgTable, integer, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { AttributeColor } from '~/constant/attribute-color';
import { AttributeIcon } from '~/constant/attribute-icon';
import { areaType } from './area-type';

export const area = pgTable('area', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),

  name: text('name').notNull(),
  typeId: integer('type_id')
    .notNull()
    .references(() => areaType.id),
  isArchive: boolean('is_archive'),
  icon: text('icon').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
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
  createdAt: area.createdAt,
  updatedAt: area.updatedAt,
  type: {
    id: area.typeId,
    name: areaType.name,
    color: areaType.color,
  },
};

export type Area = typeof area.$inferSelect;

export interface IAreaData extends Omit<Area, 'typeId'> {
  type: {
    id: number;
    name: string;
    color: (typeof AttributeColor)[number];
  };
  icon: keyof typeof AttributeIcon;
}
