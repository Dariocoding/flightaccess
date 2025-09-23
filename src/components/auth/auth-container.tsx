import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full min-w-[360px] space-y-6', {
  variants: {
    maxWidth: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg'
    }
  },
  defaultVariants: {
    maxWidth: 'sm'
  }
});

export type AuthContainerProps = React.PropsWithChildren &
  VariantProps<typeof containerVariants> & {
    backgroundImage?: string;
    className?: string;
  };

export function AuthContainer({
  maxWidth,
  backgroundImage = '/background.jpeg',
  className,
  children
}: AuthContainerProps): React.JSX.Element {
  const containerStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <div
      className={cn(
        'flex min-h-screen w-full items-center justify-center p-4',
        backgroundImage && 'relative',
        className
      )}
      style={containerStyle}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      )}
      <div className={cn(containerVariants({ maxWidth }), 'relative z-10')}>
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>
        {children}
      </div>
    </div>
  );
}
