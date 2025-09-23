import * as React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const logoVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 w-auto',
      md: 'h-12 w-auto',
      lg: 'h-16 w-auto',
      xl: 'h-20 w-auto'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type LogoProps = VariantProps<typeof logoVariants> & {
  className?: string;
};

export function Logo({ size, className }: LogoProps): React.JSX.Element {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <img
        src="/logo.webp"
        alt="Flight Access Logo"
        fetchPriority="high"
        className={cn('object-contain')}
      />
    </div>
  );
}
