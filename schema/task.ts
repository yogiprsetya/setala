import { serial, text, timestamp, pgTable, integer, pgEnum } from 'drizzle-orm/pg-core';
import { project } from './project';

export const taskStatusEnum = pgEnum('status', ['TODO', 'IN_PROGRESS', 'DONE']);

export const task = pgTable('task', {
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),

  id: serial('id').primaryKey(),
  userId: integer('user_id'),

  name: text('name'),
  isArchive: text('is_archive'),
  projectId: integer('project_id').references(() => project.id),
  status: taskStatusEnum('status'),
});
