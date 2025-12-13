import React from 'react';
import { cn } from '../utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  bordered?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, bordered = true, variant, size, ...props }, ref) => {
    return (
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
    );
  }
);
TextArea.displayName = 'TextArea';