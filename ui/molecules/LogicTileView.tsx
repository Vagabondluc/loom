import React from 'react';
import { clsx } from 'clsx';

type Props = {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const LogicTileView: React.FC<Props> = ({ active = false, className, children }) => {
  return (
    <div className={clsx('flex flex-col items-center gap-2 mt-2 p-2 rounded-lg', active && 'bg-primary/10 ring-2 ring-primary', className)}>
      {children}
    </div>
  );
};

export default LogicTileView;
