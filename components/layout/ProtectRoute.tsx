'use client';

import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AUTH_PAGE = '/signin';

// const PUBLIC_ROUTES = ['/signin'];

export const Protected = (props: Props) => {
  const pathname = usePathname();

  const { status } = useSession();

  const unAuthorized = status === 'unauthenticated';
  const loading = status === 'loading';

  useEffect(() => {
    if (loading) return;

    if (unAuthorized) {
      redirect(`${AUTH_PAGE}?returnUrl=${pathname}`);
    }
  }, [loading, unAuthorized, pathname]);

  if (loading || unAuthorized) {
    return <p>Loading...</p>;
  }

  return props.children;
};
