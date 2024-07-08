'use client';

import { Sheet } from '~/components/ui/sheet';
import { useState } from 'react';
import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect';
import { Protected } from '~/components/layout/ProtectRoute';
import { Header } from './_components/Header';
import Sidebar from './_components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Protected>
      <Sheet>
        <div className="flex bg-background container shadow mx-auto">
          <Sidebar />

          <main className="grow">
            <Header />
            <div className="p-6">{children}</div>
          </main>
        </div>
      </Sheet>
    </Protected>
  );
}
