import React from 'react';
import { cn } from '../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
  image?: string;
  imageAlt?: string;
  bordered?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, compact, image, imageAlt, bordered, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'card bg-base-100 shadow-xl',
          compact && 'card-compact',
          bordered && 'card-bordered',
          className
        )}
        {...props}
      >
        {image && (
          <figure>
            <img src={image} alt={imageAlt || 'Card image'} />
          </figure>
        )}
        <div className="card-body">
          {children}
        </div>
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardTitle = ({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('card-title', className)}>{children}</h2>
);

export const CardActions = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('card-actions justify-end', className)}>{children}</div>
);