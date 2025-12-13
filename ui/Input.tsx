import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  bordered?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, bordered = true, variant, size, ...props }, ref) => {
    return (
      <div className="form-control w-full">
        {label && (
          <div className="label">
            <span className={cn("label-text", error && "text-error")}>{label}</span>
          </div>
        )}
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
        {error && (
          <div className="label">
            <span className="label-text-alt text-error">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';