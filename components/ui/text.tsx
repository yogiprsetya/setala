'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, ReactNode } from 'react';
import { cn } from '~/utils/css';

export const textCompose = cva('', {
  variants: {
    variant: {
      'heading-1': 'text-4xl font-extrabold tracking-tight lg:text-5xl',
      'heading-2': 'text-3xl font-semibold tracking-tight',
      'heading-3': 'text-2xl font-semibold tracking-tight',
      'heading-4': 'text-xl font-semibold tracking-tight',
      body: 'leading-7',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
});

type Tag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h5'
  | 'h6'
  | 'small'
  | 'p'
  | 'article'
  | 'span'
  | 'label'
  | 'legend'
  | 'ul'
  | 'ol'
  | 'address'
  | 'strong';

interface Props extends VariantProps<typeof textCompose> {
  tag?: Tag;
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Text = forwardRef<any, Props>(
  ({ className, variant, children, tag = 'p', ...props }, ref) => {
    const Comp = tag;

    return (
      <Comp className={cn(textCompose({ variant }), className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

Text.displayName = 'Text';
