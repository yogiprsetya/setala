import { serial, text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
import { area } from './area';
import { project } from './project';
import { topic } from './topic';
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
  projectIds: integer('project_ids')
    .array()
    .references(() => project.id),
  topicIds: integer('project_ids')
    .array()
    .references(() => topic.id),
  contentTypeId: integer('content_type_id')
    .array()
    .references(() => contentType.id),
  isArchive: boolean('is_archive'),
});
