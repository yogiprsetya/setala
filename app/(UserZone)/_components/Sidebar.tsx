'use client';

import {
  Archive,
  BookMarked,
  ClipboardCheck,
  FolderKanban,
  LandPlot,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { Text } from '~/components/ui/text';

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    separator: true,
  },
  {
    icon: LandPlot,
    label: 'Area',
    href: '/area',
  },
  {
    icon: FolderKanban,
    label: 'Project',
    href: '/project',
  },
  {
    icon: ClipboardCheck,
    label: 'Task',
    href: '/task',
    separator: true,
  },
  {
    icon: BookMarked,
    label: 'Resource',
    href: '/resource',
  },
  {
    icon: Archive,
    label: 'Archive',
    href: '/archive',
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-72 max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <Text tag="h3" variant="heading-3" className="mx-3 text-foreground">
          Setala
        </Text>

        <div className="flex flex-col gap-1 w-full mt-6">
          {sidebarItems.map((link, index) => {
            const Icon = link.icon;
            return (
              <Fragment key={index}>
                <Button
                  asChild
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  className="w-full gap-2 justify-start"
                >
                  <Link href={link.href}>
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                </Button>

                {link.separator ? <div className="my-1" /> : null}
              </Fragment>
            );
          })}
          {/* {props.sidebarItems.extras} */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
