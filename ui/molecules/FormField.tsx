import React from 'react';
import { cn } from '../utils';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
    ({ label, error, children, className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("form-control w-full", className)} {...props}>
            {label && (
            <div className="label">
                <span className={cn("label-text", error && "text-error")}>{label}</span>
            </div>
            )}
            {children}
            {error && (
            <div className="label">
                <span className="label-text-alt text-error">{error}</span>
            </div>
            )}
        </div>
    );
});
FormField.displayName = 'FormField';