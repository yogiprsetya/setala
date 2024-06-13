import '~/config/env';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { areaType } from '~/schema/area-type';
import { area } from '~/schema/area';
import { contentType } from '~/schema/content-type';
import { project } from '~/schema/project';
import { resource } from '~/schema/resource';
import { task } from '~/schema/task';
import { topic } from '~/schema/topic';

export const db = drizzle(sql, {
  schema: { areaType, area, contentType, project, resource, task, topic },
});
