import React from 'react';
import { clsx } from 'clsx';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const CalloutView: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx('p-4 border border-dashed border-primary/30 rounded-lg bg-base-100', className)}>
      {children}
    </div>
  );
};

export default CalloutView;
