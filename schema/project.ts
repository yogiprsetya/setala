import { serial, text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
import { area } from './area';

export const project = pgTable('project', {
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),

  id: serial('id').primaryKey(),
  userId: integer('user_id'),

  name: text('name'),
  description: text('description'),
  areaId: integer('area_id').references(() => area.id),
  isArchive: boolean('is_archive'),
  startSprint: date('start_sprint'),
  deadlineSrprint: date('deadline_sprint'),
});
