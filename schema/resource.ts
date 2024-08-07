import { serial, text, timestamp, pgTable, integer, boolean, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { AttributeColor } from '~/constant/attribute-color';
import { AttributeIcon } from '~/constant/attribute-icon';
import { area } from './area';
import { contentType } from './content-type';
import { tags } from './tags';

export const resource = pgTable('resource', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),

  title: text('title'),
  url: text('url'),
  publishDate: date('publish_date'),
  areaId: integer('area_id').references(() => area.id, { onDelete: 'set null' }),
  isArchive: boolean('is_archive'),
  tags: integer('tags')
    .references(() => tags.id, { onDelete: 'set null' })
    .array(),
  contentTypeId: integer('content_type_id').references(() => contentType.id, {
    onDelete: 'set null',
  }),
  rating: integer('rating'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type Resource = typeof resource.$inferSelect;

export interface IResource
  extends Omit<Resource, 'tags' | 'userId' | 'isArchive' | 'contentTypeId' | 'areaId'> {
  tags: Array<{
    id: number;
    tag: string;
  }>;
  areas: {
    id: number;
    name: string;
    icon: keyof typeof AttributeIcon;
  } | null;
  contentType: {
    id: number;
    name: string;
    color: (typeof AttributeColor)[number];
  };
}

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
  url: resource.url,
  publishDate: resource.publishDate,
  areas:
    {
      id: area.id,
      name: area.name,
      icon: area.icon,
    } || null,
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
