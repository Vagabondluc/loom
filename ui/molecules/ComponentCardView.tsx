import React from 'react';
import { PlayCircle } from 'lucide-react';
import { cn } from '../utils';

type Props = {
  id?: string;
  label: string;
  icon?: React.ComponentType<any> | React.ReactNode;
  runtimeOnly?: boolean;
  className?: string;
  title?: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

export const ComponentCardView: React.FC<Props> = ({ id, label, icon, runtimeOnly, className, title, onPointerDown, onKeyDown }) => {
  const IconNode = icon as any;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={label}
      title={title || label}
      data-tip={title}
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={cn(
        "p-3 bg-base-100 rounded border border-base-300 hover:border-primary cursor-grab active:cursor-grabbing flex flex-col items-center gap-2 transition-all hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 relative",
        className
      )}
      data-component-id={id}
    >
      {runtimeOnly && (
        <PlayCircle className="w-4 h-4 absolute top-1 right-1 text-secondary opacity-80" />
      )}

      {IconNode && (typeof IconNode === 'function' ? <IconNode className="w-5 h-5 opacity-70" /> : <span className="w-5 h-5 opacity-70">{IconNode}</span>)}
      <span className="text-xs text-center leading-tight">{label}</span>
    </div>
  );
};

export default ComponentCardView;
