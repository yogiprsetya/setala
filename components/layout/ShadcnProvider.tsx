'use client';

import { ReactNode } from 'react';
import { TooltipProvider } from '../ui/tooltip';

export const ShadcnProvider = ({ children }: { children: ReactNode }) => (
  <TooltipProvider>{children}</TooltipProvider>
);
