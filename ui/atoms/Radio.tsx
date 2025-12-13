import React from 'react';
import { cn } from '../utils';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        type="radio"
        ref={ref}
        className={cn(
          'radio',
          variant && `radio-${variant}`,
          size && `radio-${size}`,
          className
        )}
        {...props}
      />
    );
  }
);
Radio.displayName = 'Radio';