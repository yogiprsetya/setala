import { Session, getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { nextAuthConfig } from '~/app/api/auth/[...nextauth]/route';
import { NextApiRequest, NextApiResponse } from 'next';

export const requireAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  controller: (s: Session | null) => NextResponse,
) => {
  const session = await getServerSession(nextAuthConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  return controller(session);
};
