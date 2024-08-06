import '~/config/env';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { areaType } from '~/schema/area-type';
import { area } from '~/schema/area';
import { contentType } from '~/schema/content-type';
import { project } from '~/schema/project';
import { resource } from '~/schema/resource';
import { task } from '~/schema/task';
import { tags } from '~/schema/tags';
import { sql } from '@vercel/postgres';
import { users, accounts, sessions, verificationTokens } from '~/schema/users';

export const db = drizzle(sql, {
  schema: {
    areaType,
    area,
    contentType,
    project,
    resource,
    task,
    tags,
    users,
    accounts,
    sessions,
    verificationTokens,
  },
});
