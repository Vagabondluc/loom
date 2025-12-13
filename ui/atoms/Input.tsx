import React from 'react';
import { cn } from '../utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  bordered?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, bordered = true, variant, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'input',
          bordered && 'input-bordered',
          variant && `input-${variant}`,
          size && `input-${size}`,
          error && 'input-error',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';