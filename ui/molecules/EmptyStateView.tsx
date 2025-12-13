import React from 'react';
import { Sparkles } from 'lucide-react';

type Props = {
  message: string;
  subMessage?: string;
  icon?: React.ReactNode;
  className?: string;
};

export const EmptyStateView: React.FC<Props> = ({ message, subMessage, icon, className }) => {
  return (
    <div className={`p-8 text-center opacity-50 bg-base-200 rounded-lg border border-dashed border-base-content/20 ${className || ''}`}>
      {icon ?? <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-50" />}
      <div>{message}</div>
      {subMessage && <div className="text-xs mt-2">{subMessage}</div>}
    </div>
  );
};

export default EmptyStateView;
