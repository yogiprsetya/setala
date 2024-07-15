import { serial, text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { area } from './area';
import { contentType } from './content-type';

export const resource = pgTable('resource', {
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),

  id: serial('id').primaryKey(),
  userId: integer('user_id'),

  title: text('title'),
  url: text('url'),
  publishDate: date('publish_date'),
  areaId: integer('area_id').references(() => area.id),
  projectIds: integer('project_ids').array().notNull(),
  topicIds: integer('project_ids').array().notNull(),
  contentTypeId: integer('content_type_id').references(() => contentType.id),
  isArchive: boolean('is_archive'),
});

export const formResourceInputValidate = z.object({
  title: z.string().min(1),
  url: z.string(),
  publish_date: z.date(),
  area_id: z.number(),
  project_ids: z.number(),
  topic_ids: z.number(),
  content_type_id: z.number(),
});
