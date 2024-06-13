'use client';

import { Sheet } from '~/components/ui/sheet';
import { useState } from 'react';
import { If } from '~/components/ui/if';
import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect';
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

  return (
    <If condition={isClient}>
      <Sheet>
        <div className="flex bg-background container shadow">
          <Sidebar />

          <main className="grow">
            <Header />
            <div className="p-6">{children}</div>
          </main>
        </div>
      </Sheet>
    </If>
  );
}
