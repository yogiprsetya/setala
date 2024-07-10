import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { UserSession } from '~/@types/Auth';
import { nextAuthConfig } from '~/config/next-auth';

type AuthController = (s: UserSession | null) => Promise<NextResponse>;

export const requireAuth = async (controller: AuthController) => {
  const session = (await getServerSession(nextAuthConfig)) as UserSession;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  return controller(session);
};
