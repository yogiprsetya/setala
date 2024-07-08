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
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Drawer, DrawerTrigger } from '~/components/ui/drawer';
import { Separator } from '~/components/ui/separator';
import { SheetContent, SheetHeader } from '~/components/ui/sheet';
import { Text } from '~/components/ui/text';
import { MOBILE_MEDIA_QUERY } from '~/config/ui';
import { useMediaQuery } from '~/hooks/useMediaQuery';

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    separator: true,
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
    icon: LandPlot,
    label: 'Area',
    href: '/area',
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
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  const MenuItem = () => (
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
    </div>
  );

  if (isMobile) {
    return (
      <SheetContent side="left" className="px-3 py-4 sm:hidden">
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
          <span className="text-lg font-semibold text-foreground mx-3">Setala</span>
        </SheetHeader>

        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            <MenuItem />
          </div>

          <div className="absolute w-full bottom-4 px-1 left-0">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/max-programming.png" />
                        <AvatarFallback>Avatar</AvatarFallback>
                      </Avatar>
                      <span>Max Programming</span>
                    </div>
                  </div>
                </Button>
              </DrawerTrigger>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    );
  }

  return (
    <aside className="min-h-screen w-72 max-w-xs border-r max-sm:hidden">
      <div className="h-full p-4">
        <Text tag="h3" variant="heading-3" className="mx-3 text-foreground">
          Setala
        </Text>

        <MenuItem />
      </div>
    </aside>
  );
};

export default Sidebar;
