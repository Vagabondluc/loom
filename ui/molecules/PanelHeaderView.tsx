import React from 'react';
import { cn } from '../utils';

type Props = {
  title: React.ReactNode;
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export const PanelHeaderView: React.FC<Props> = ({ title, icon, subtitle, actions, className }) => {
  return (
    <div className={cn('p-4 border-b border-base-300 bg-base-300/50 flex justify-between items-center', className)}>
      <div className="overflow-hidden">
        <h2 className="font-bold text-sm truncate flex items-center gap-2">{icon}{title}</h2>
        {subtitle && <div className="text-[10px] font-mono opacity-50 truncate">{subtitle}</div>}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
};

export default PanelHeaderView;
