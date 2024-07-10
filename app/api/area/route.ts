import { requireAuth } from 'api-lib/auth';
import { db } from '~/config/db';
import { area, areaReqSchema, areaSelectSchema } from '~/schema/area';
import { handleSuccessResponse } from 'api-lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-response';
import { and, eq } from 'drizzle-orm';
import { bodyParse } from 'api-lib/body-parse';
import { NextRequest } from 'next/server';

const GET = async () => {
  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .select(areaSelectSchema)
        .from(area)
        .where(and(eq(area.userId, session.user.id), eq(area.isArchive, false)))
        .then((data) => data);

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const schema = areaReqSchema.safeParse(body);

  if (!schema.success) {
    return handleInvalidRequest(schema.error);
  }

  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .insert(area)
        .values({
          name: body.name,
          icon: body.icon,
          typeId: body.typeId,
          isArchive: false,
          userId: session.user.id,
        })
        .returning(areaSelectSchema);

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export { GET, POST };
