
import React from 'react';
import { useBuilderStore } from './store';
import { Monitor, Tablet, Smartphone, RotateCw } from 'lucide-react';
import { clsx } from 'clsx';
import { Breakpoint } from '../../types';

export const ViewportControls: React.FC = () => {
  const activeBreakpoint = useBuilderStore(s => s.activeBreakpoint);
  const setBreakpoint = useBuilderStore(s => s.setBreakpoint);
  const orientation = useBuilderStore(s => s.orientation);
  const toggleOrientation = useBuilderStore(s => s.toggleOrientation);

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
            onClick={() => setBreakpoint(view.id)}
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
          onClick={toggleOrientation}
          title={`Toggle Orientation (${orientation})`}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
