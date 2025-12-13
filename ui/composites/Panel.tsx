import React from 'react';
import { cn } from '../utils';
import { Surface, SurfaceProps } from './Surface';

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