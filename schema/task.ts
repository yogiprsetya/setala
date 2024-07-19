import { serial, text, timestamp, pgTable, integer, pgEnum } from 'drizzle-orm/pg-core';
import { project } from './project';

export const taskStatusEnum = pgEnum('status', ['TODO', 'IN_PROGRESS', 'DONE']);

export const task = pgTable('task', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),

  name: text('name'),
  isArchive: text('is_archive'),
  projectId: integer('project_id').references(() => project.id),
  status: taskStatusEnum('status'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
