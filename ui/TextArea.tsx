import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  bordered?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, bordered = true, variant, size, ...props }, ref) => {
    return (
      <div className="form-control w-full">
        {label && (
          <div className="label">
            <span className={cn("label-text", error && "text-error")}>{label}</span>
          </div>
        )}
        <textarea
          ref={ref}
          className={cn(
            'textarea',
            bordered && 'textarea-bordered',
            variant && `textarea-${variant}`,
            size && `textarea-${size}`,
            error && 'textarea-error',
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
TextArea.displayName = 'TextArea';
