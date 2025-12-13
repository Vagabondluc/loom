import React from 'react';

interface Props {
  icon?: React.ReactNode;
  typeLabel?: string;
  tagName?: string;
  label: string;
  className?: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const DraggableBlockView: React.FC<Props> = ({ icon, typeLabel, tagName, label, className, onPointerDown, onKeyDown }) => {
  return (
    <div
      tabIndex={0}
      role="button"
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={`p-3 bg-base-100 border border-base-300 rounded text-xs cursor-grab active:cursor-grabbing hover:border-primary flex items-center gap-3 transition-colors hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${className || ''}`}
    >
      <span className="opacity-50">{icon}</span>
      <div className="truncate flex-1">
        {typeLabel && <span className="font-bold mr-2 text-[10px] opacity-40 uppercase">{typeLabel}</span>}
        {tagName && <span className="mr-2"><span className="badge badge-ghost badge-sm">{tagName}</span></span>}
        <span className="truncate">{label}</span>
      </div>
    </div>
  );
};

export default DraggableBlockView;
