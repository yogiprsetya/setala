import { db } from '~/config/db';
import { contentType, contentTypeReqSchema, contentTypeSelectSchema } from '~/schema/content-type';
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
        .select(contentTypeSelectSchema)
        .from(contentType)
        .where(eq(contentType.userId, session.user.id))
        .then((data) => data);

      return handleSuccessResponse(result);
    }

    return handleExpiredSession();
  });
};

const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const schema = contentTypeReqSchema.safeParse(body);

  if (!schema.success) {
    return handleInvalidRequest(schema.error);
  }

  return requireAuth(async (session) => {
    if (session) {
      const result = await db
        .insert(contentType)
        .values({
          name: body.name,
          color: body.color,
          userId: session.user.id,
        })
        .returning(contentTypeSelectSchema);

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export { GET, POST };
