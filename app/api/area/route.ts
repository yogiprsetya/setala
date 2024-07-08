import { requireAuth } from '~/app/api/_lib/auth';
import type { NextApiRequest } from 'next';
import { db } from '~/config/db';
import { area, areaSelectSchema } from '~/schema/area';
import { handleSuccessResponse } from '~/app/api/_lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from '~/app/api/_lib/handle-error-response';
import { and, eq } from 'drizzle-orm';

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

export { GET };
