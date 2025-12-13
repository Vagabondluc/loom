
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

// --- PANEL ---
// A contained surface with standard padding, rounding, and structure
export interface PanelProps extends SurfaceProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
  shadow?: boolean;
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, padding = 'md', rounded = true, shadow = false, elevation = 1, children, ...props }, ref) => {
    return (
      <Surface
        ref={ref}
        elevation={elevation}
        className={cn(
          padding === 'sm' && 'p-2',
          padding === 'md' && 'p-4',
          padding === 'lg' && 'p-6',
          rounded && 'rounded-box',
          shadow && 'shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </Surface>
    );
  }
);
Panel.displayName = 'Panel';

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
