import { db } from '~/config/db';
import { requireAuth } from 'api-lib/auth';
import { resource } from '~/schema/resource';
import { eq } from 'drizzle-orm';
import { handleSuccessResponse } from 'api-lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-response';
import { tags } from '~/schema/tags';

const GET = async () => {
  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .select()
        .from(resource)
        // .innerJoin(tags, eq(resource.tags, tags.id))
        .where(eq(resource.userId, session.user.id))
        .then((data) => data);

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

export { GET };
