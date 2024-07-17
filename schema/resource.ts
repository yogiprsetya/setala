import { serial, text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { area } from './area';
import { contentType } from './content-type';
import { areaTypeSelectSchema } from './area-type';
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

  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
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

// export const resourceSelectSchema = {
//   id: resource.id,
//   title: resource.title,
//   publishDate: resource.publishDate,
//   areas: [areaTypeSelectSchema],
//   topics: [
//     {
//       id: topic.id,
//       name: topic.name,
//       color: topic.color,
//     },
//   ],
//   createdAt: resource.createdAt,
//   updatedAt: resource.updatedAt,
// };
