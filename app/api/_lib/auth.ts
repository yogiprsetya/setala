import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { nextAuthConfig } from '~/app/api/auth/[...nextauth]/route';
import { NextApiRequest, NextApiResponse } from 'next';

export async function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  controller: () => NextResponse,
) {
  const session = await getServerSession(nextAuthConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' });
  }

  return controller();
}
