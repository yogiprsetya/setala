import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
// import { db } from '~/config/db';
// import { areaType } from '~/schema/area-type';
// import { eq } from 'drizzle-orm';
import { requireAuth } from '../_lib/auth';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  return requireAuth(req, res, (session) => {
    if (session) {
      // db.select()
      //   .from(areaType)
      //   .where(eq(areaType.id, session.user.id))
      //   .then((data) => {});
      return NextResponse.json({ data: session });
    }

    return NextResponse.json({ message: 'Authentication error occured' }, { status: 400 });
  });
};
