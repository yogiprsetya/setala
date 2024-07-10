import type { NextApiRequest } from 'next';
import { db } from '~/config/db';
import { and, eq } from 'drizzle-orm';
import { requireAuth } from '~/app/api/_lib/auth';
import { handleSuccessResponse } from '~/app/api/_lib/handle-success-response';
import { isNumeric } from '~/utils/is-numeric';
import {
  handleDataNotFound,
  handleExpiredSession,
  handleInvalidRequest,
} from 'api-lib/handle-error-response';
import { area, areaSelectSchema } from '~/schema/area';

type Params = {
  params: { id: string };
};

const DELETE = async (req: NextApiRequest, { params }: Params) => {
  const { id } = params;

  if (!isNumeric(id)) {
    return handleInvalidRequest('Invalid id, send a numeric path :id.');
  }

  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .delete(area)
        .where(and(eq(area.userId, session.user.id), eq(area.id, Number(id))))
        .returning(areaSelectSchema);

      if (!result.length) {
        return handleDataNotFound();
      }

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

export { DELETE };
