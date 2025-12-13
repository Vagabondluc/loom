import React from 'react';
import { cn } from '../utils';

// --- TOOLBAR ---
// A layout optimized for control bars (headers, footers, action rows)
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  sticky?: boolean;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, glass, sticky, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'navbar min-h-12 gap-2 px-4',
          glass && 'glass',
          sticky && 'sticky top-0 z-30',
          !glass && 'bg-base-100 border-b border-base-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Toolbar.displayName = 'Toolbar';