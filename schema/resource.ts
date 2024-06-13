import { serial, text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
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
