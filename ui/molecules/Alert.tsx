import React from 'react';
import { cn } from '../utils';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

const Icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, icon, onClose, ...props }, ref) => {
    const IconComponent = variant ? Icons[variant] : null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'alert',
          variant && `alert-${variant}`,
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon !== undefined ? icon : (IconComponent && <IconComponent className="w-5 h-5" />)}
          <span>{children}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost btn-xs btn-circle hover:bg-black/10"
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';