'use client';

import { Menu } from 'lucide-react';
import { ThemeToggle } from '~/components/common/ThemeToggle';
import { Button } from '~/components/ui/button';
import { SheetTrigger } from '~/components/ui/sheet';
import { ProfileMenu } from './ProfileMenu';

export const Header = () => (
  <header className="bg-background/95 px-6 text-foreground justify-between sticky top-0 z-30 flex h-16 w-full backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] border-b border-border/40 items-center">
    <div>
      <SheetTrigger asChild className="md:hidden">
        <Button size="icon" variant="ghost">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
    </div>

    <div className="flex gap-2 items-center">
      <ThemeToggle />
      <ProfileMenu />
    </div>
  </header>
);
