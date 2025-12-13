
import React from 'react';
import { cn } from '../utils';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'lifted' | 'boxed' | 'bordered';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        role="tablist"
        ref={ref}
        className={cn(
          'tabs',
          variant && `tabs-${variant}`,
          size && `tabs-${size}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Tabs.displayName = 'Tabs';

interface TabProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export const Tab = React.forwardRef<HTMLAnchorElement, TabProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <a
        role="tab"
        ref={ref}
        className={cn(
          'tab',
          active && 'tab-active',
          className
        )}
        aria-selected={active}
        {...props}
      >
        {children}
      </a>
    );
  }
);
Tab.displayName = 'Tab';
