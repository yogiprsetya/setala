import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/config/db';
import { areaType, areaTypeReqSchema, areaTypeSelectSchema } from '~/schema/area-type';
import { eq } from 'drizzle-orm';
import { handleExpiredSession } from '~/app/api/_lib/handle-expired-session';
import { bodyParse } from '~/app/api/_lib/body-parse';
import { requireAuth } from '~/app/api/_lib/auth';
import { handleInvalidRequest } from '~/app/api/_lib/handle-invalid-request';
import { handleSuccessResponse } from '~/app/api/_lib/handle-success-response';

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  return requireAuth(req, res, async (session) => {
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

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await bodyParse(req);
  const schema = areaTypeReqSchema.safeParse(body);

  if (!schema.success) {
    return handleInvalidRequest(schema.error);
  }

  return requireAuth(req, res, async (session) => {
    if (session) {
      const result = await db
        .insert(areaType)
        .values({
          name: body.name,
          color: body.color,
          userId: session.user.id,
        })
        .returning(areaTypeSelectSchema);

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

export { GET, POST };
