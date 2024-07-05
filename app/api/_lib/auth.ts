import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { nextAuthConfig } from '~/app/api/auth/[...nextauth]/route';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserSession } from '~/@types/auth';

export const requireAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  controller: (s: UserSession | null) => Promise<NextResponse>,
) => {
  const session = (await getServerSession(nextAuthConfig)) as UserSession;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  return controller(session);
};
