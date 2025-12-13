import React from 'react';
import { Monitor, Tablet, Smartphone, RotateCw } from 'lucide-react';
import { clsx } from 'clsx';
import { Breakpoint } from '../../../types';

type Props = {
  activeBreakpoint: Breakpoint;
  onSetBreakpoint: (bp: Breakpoint) => void;
  orientation: 'portrait' | 'landscape';
  onToggleOrientation: () => void;
};

export const ViewportControlsView: React.FC<Props> = ({ activeBreakpoint, onSetBreakpoint, orientation, onToggleOrientation }) => {
  const views: { id: Breakpoint; icon: React.FC<any>; label: string }[] = [
    { id: 'mobile', icon: Smartphone, label: 'Mobile' },
    { id: 'tablet', icon: Tablet, label: 'Tablet' },
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="join bg-base-200 p-1 rounded-lg">
        {views.map(view => (
          <button
            key={view.id}
            className={clsx(
              "btn btn-sm join-item border-none",
              activeBreakpoint === view.id ? "btn-active btn-neutral" : "btn-ghost"
            )}
            onClick={() => onSetBreakpoint(view.id)}
            title={view.label}
          >
            <view.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {activeBreakpoint !== 'desktop' && (
        <button
          className={clsx(
            "btn btn-sm btn-ghost btn-square transition-all",
            orientation === 'landscape' && "bg-primary/10 text-primary rotate-90"
          )}
          onClick={onToggleOrientation}
          title={`Toggle Orientation (${orientation})`}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ViewportControlsView;
