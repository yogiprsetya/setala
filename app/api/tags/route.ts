import { db } from '~/config/db';
import { requireAuth } from 'api-lib/auth';
import { eq } from 'drizzle-orm';
import { handleSuccessResponse } from 'api-lib/handle-success-response';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-response';
import { tags, tagsReqSchema, tagsSelectSchema } from '~/schema/tags';
import { bodyParse } from 'api-lib/body-parse';
import type { NextRequest } from 'next/server';

const GET = async () => {
  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .select(tagsSelectSchema)
        .from(tags)
        .where(eq(tags.userId, session.user.id))
        .then((data) => data);

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const schema = tagsReqSchema.safeParse(body);

  if (!schema.success) {
    return handleInvalidRequest(schema.error);
  }

  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .insert(tags)
        .values({
          tag: body.tag,
          userId: session.user.id,
        })
        .returning(tagsSelectSchema);

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export { GET, POST };
