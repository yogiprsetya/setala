import { serial, text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { area } from './area';
import { contentType } from './content-type';
import { tags } from './tags';

export const resource = pgTable('resource', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),

  title: text('title'),
  url: text('url'),
  publishDate: date('publish_date'),
  areaId: integer('area_id').references(() => area.id),
  isArchive: boolean('is_archive'),
  tags: integer('tags')
    .references(() => tags.id)
    .array(),
  contentTypeId: integer('content_type_id').references(() => contentType.id),
  rating: integer('rating'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const resourceReqSchema = createInsertSchema(resource).pick({
  title: true,
  url: true,
  publishDate: true,
  areaId: true,
  tags: true,
  contentTypeId: true,
  rating: true,
});

export const formResourceInputValidate = z.object({
  title: z.string().min(1),
  url: z.string(),
  publish_date: z.date(),
  area_id: z.number(),
  tags: z.number().array().optional(),
  content_type_id: z.number().min(1),
  rating: z.number().min(1).max(5),
});

export const resourceSelectSchema = {
  id: resource.id,
  title: resource.title,
  publishDate: resource.publishDate,
  areas: {
    id: area.id,
    name: area.name,
    icon: area.icon,
  },
  contentType: {
    id: contentType.id,
    name: contentType.name,
    color: contentType.color,
  },
  tags: resource.tags,
  rating: resource.rating,
  createdAt: resource.createdAt,
  updatedAt: resource.updatedAt,
};
