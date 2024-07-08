import type { NextApiRequest } from 'next';
import { db } from '~/config/db';
import { areaType, areaTypeReqSchema, areaTypeSelectSchema } from '~/schema/area-type';
import { eq } from 'drizzle-orm';
import { bodyParse } from '~/app/api/_lib/body-parse';
import { requireAuth } from '~/app/api/_lib/auth';
import { handleSuccessResponse } from '~/app/api/_lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from '~/app/api/_lib/handle-error-response';

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

const POST = async (req: NextApiRequest) => {
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
