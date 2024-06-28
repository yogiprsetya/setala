import '~/config/env';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { areaType } from '~/schema/area-type';
import { area } from '~/schema/area';
import { contentType } from '~/schema/content-type';
import { project } from '~/schema/project';
import { resource } from '~/schema/resource';
import { task } from '~/schema/task';
import { topic } from '~/schema/topic';
import { createClient } from '@vercel/postgres';

const pool = createClient({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: { areaType, area, contentType, project, resource, task, topic },
});
