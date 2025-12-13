import React from 'react';
import { cn } from '../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
  wide?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, outline, wide, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'btn',
          variant && `btn-${variant}`,
          size && `btn-${size}`,
          outline && 'btn-outline',
          wide && 'btn-wide',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="loading loading-spinner"></span>}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';