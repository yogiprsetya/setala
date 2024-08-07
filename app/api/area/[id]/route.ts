import { db } from '~/config/db';
import { and, eq } from 'drizzle-orm';
import { requireAuth } from 'api-lib/auth';
import { handleSuccessResponse } from 'api-lib/handle-success-response';
import { isNumeric } from '~/utils/is-numeric';
import {
  handleDataNotFound,
  handleExpiredSession,
  handleInvalidRequest,
} from 'api-lib/handle-error-response';
import { area } from '~/schema/area';
import { NextRequest } from 'next/server';

type Params = {
  params: { id: string };
};

const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params;

  if (!isNumeric(id)) {
    return handleInvalidRequest('Invalid id, send a numeric path :id.');
  }

  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .delete(area)
        .where(and(eq(area.userId, session.user.id), eq(area.id, Number(id))))
        .returning({ id: area.id });

      if (!result.length) {
        return handleDataNotFound();
      }

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

export { DELETE };
