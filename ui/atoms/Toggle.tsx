import React from 'react';
import { cn } from '../utils';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          'toggle',
          variant && `toggle-${variant}`,
          size && `toggle-${size}`,
          className
        )}
        {...props}
      />
    );
  }
);
Toggle.displayName = 'Toggle';