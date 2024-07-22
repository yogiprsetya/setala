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
import { NextRequest } from 'next/server';
import { contentType, contentTypeSelectSchema } from '~/schema/content-type';

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
        .delete(contentType)
        .where(and(eq(contentType.userId, session.user.id), eq(contentType.id, Number(id))))
        .returning(contentTypeSelectSchema);

      if (!result.length) {
        return handleDataNotFound();
      }

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

export { DELETE };
