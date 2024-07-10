import { db } from '~/config/db';
import { areaType, areaTypeReqSchema, areaTypeSelectSchema } from '~/schema/area-type';
import { eq } from 'drizzle-orm';
import { bodyParse } from 'api-lib/body-parse';
import { requireAuth } from 'api-lib/auth';
import { handleSuccessResponse } from 'api-lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-response';
import { NextRequest } from 'next/server';

const GET = async () => {
  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .select(areaTypeSelectSchema)
        .from(areaType)
        .where(eq(areaType.userId, session.user.id))
        .then((data) => data);

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const schema = areaTypeReqSchema.safeParse(body);

  if (!schema.success) {
    return handleInvalidRequest(schema.error);
  }

  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .insert(areaType)
        .values({
          name: body.name,
          color: body.color,
          userId: session.user.id,
        })
        .returning(areaTypeSelectSchema);

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export { GET, POST };
