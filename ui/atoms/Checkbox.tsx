import React from 'react';
import { cn } from '../utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          'checkbox',
          variant && `checkbox-${variant}`,
          size && `checkbox-${size}`,
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = 'Checkbox';