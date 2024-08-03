import { db } from '~/config/db';
import { requireAuth } from 'api-lib/auth';
import { resource, resourceReqSchema, resourceSelectSchema } from '~/schema/resource';
import { eq, inArray } from 'drizzle-orm';
import { handleSuccessResponse } from 'api-lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-response';
import { NextRequest } from 'next/server';
import { bodyParse } from 'api-lib/body-parse';
import { contentType } from '~/schema/content-type';
import { area } from '~/schema/area';
import { Tags, tags, tagsSelectSchema } from '~/schema/tags';

const GET = async () => {
  return requireAuth(async (session) => {
    if (session) {
      const resources = await db
        .select(resourceSelectSchema)
        .from(resource)
        .innerJoin(area, eq(resource.areaId, area.id))
        .innerJoin(contentType, eq(resource.contentTypeId, contentType.id))
        .where(eq(resource.userId, session.user.id));

      const tagsData = await Promise.all(
        resources.map((resourceData) => {
          if (resourceData.tags) {
            return db
              .select(tagsSelectSchema)
              .from(tags)
              .where(inArray(tags.id, resourceData.tags));
          }

          return [];
        }),
      );

      return handleSuccessResponse(
        resources.map((v) => ({
          ...v,
          tags: tagsData
            .flatMap((t) => t)
            .filter((tag) => v.tags?.includes(tag.id))
            .filter((value, index, self) => self.findIndex((s) => s.id === value.id) === index),
        })),
      );
    }

    return handleExpiredSession();
  });
};

const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { success, data, error } = resourceReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireAuth(async (session) => {
    let dataTags: Pick<Tags, 'id' | 'tag'>[] = [];

    if (session) {
      if (data.tags?.length) {
        dataTags = await db.select(tagsSelectSchema).from(tags).where(inArray(tags.id, data.tags));
      }

      const result = await db
        .insert(resource)
        .values({
          ...body,
          userId: session.user.id,
        })
        .returning();

      return handleSuccessResponse({
        ...result[0],
        tags: dataTags,
      });
    }

    return handleExpiredSession();
  });
};

export { GET, POST };
