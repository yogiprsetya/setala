import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { nextAuthConfig } from '~/app/api/auth/[...nextauth]/route';
import { UserSession } from '~/@types/Auth';

type AuthController = (s: UserSession | null) => Promise<NextResponse>;

export const requireAuth = async (controller: AuthController) => {
  const session = (await getServerSession(nextAuthConfig)) as UserSession;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  return controller(session);
};
