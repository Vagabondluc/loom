import React from 'react';
import { cn } from '../utils';

// --- SURFACE ---
// A semantic container for background layers (elevation)
export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3;
  border?: boolean;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, elevation = 1, border, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          elevation === 0 && 'bg-base-100',
          elevation === 1 && 'bg-base-200',
          elevation === 2 && 'bg-base-300',
          elevation === 3 && 'bg-neutral text-neutral-content',
          border && 'border border-base-content/10',
          'transition-colors duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Surface.displayName = 'Surface';