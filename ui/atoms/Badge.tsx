import React from 'react';
import { cn } from '../utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, outline, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'badge',
          variant && `badge-${variant}`,
          size && `badge-${size}`,
          outline && 'badge-outline',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';