import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { requireAuth } from '../_lib/auth';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  return requireAuth(req, res, (session) => {
    return NextResponse.json({ data: session });
  });
};
