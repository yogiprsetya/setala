import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { db } from '~/config/db';
import { areaType } from '~/schema/area-type';
import { eq } from 'drizzle-orm';
import { handleExpiredSession } from '~/app/api/_lib/handle-expired-session';
import { requireAuth } from '../_lib/auth';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  return requireAuth(req, res, async (session) => {
    if (session) {
      const types = await db
        .select()
        .from(areaType)
        .where(eq(areaType.userId, session.user.id))
        .then((data) => data);

      return NextResponse.json({ data: types });
    }

    return handleExpiredSession();
  });
};
