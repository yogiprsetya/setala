import { requireAuth } from 'api-lib/auth';
import type { NextApiRequest } from 'next';
import { db } from '~/config/db';
import { area, areaReqSchema, areaSelectSchema } from '~/schema/area';
import { handleSuccessResponse } from '~/app/api/_lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from '~/app/api/_lib/handle-error-response';
import { and, eq } from 'drizzle-orm';
import { bodyParse } from '~/app/api/_lib/body-parse';

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

const POST = async (req: NextApiRequest) => {
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
