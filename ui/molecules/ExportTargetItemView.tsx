import React from 'react';
import { clsx } from 'clsx';

type TargetDef = {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<any>;
  disabled?: boolean;
};

type Props = {
  target: TargetDef;
  selected: boolean;
  onSelect: (id: string) => void;
};

export const ExportTargetItemView: React.FC<Props> = ({ target, selected, onSelect }) => {
  const Icon = target.icon;
  return (
    <button
      disabled={target.disabled}
      onClick={() => onSelect(target.id)}
      className={clsx(
        "w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all",
        selected ? "bg-base-100 shadow-sm border border-base-content/10 ring-1 ring-primary/20" : "hover:bg-base-300/50 opacity-70 hover:opacity-100",
        target.disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <Icon className={clsx("w-5 h-5", selected ? "text-primary" : "opacity-50")} />
      <div className="flex-1">
        <div className="text-xs font-bold">{target.label}</div>
        <div className="text-[10px] opacity-60 truncate">{target.description}</div>
      </div>
    </button>
  );
};

export default ExportTargetItemView;
