
import React from 'react';
import { useBuilderStore } from './store';
import { Monitor, Tablet, Smartphone, RotateCw } from 'lucide-react';
import { clsx } from 'clsx';
import { Breakpoint } from '../../types';
import { ViewportControlsView } from '../../ui/molecules/ViewportControlsView';

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
    <ViewportControlsView
      activeBreakpoint={activeBreakpoint}
      onSetBreakpoint={setBreakpoint}
      orientation={orientation}
      onToggleOrientation={toggleOrientation}
    />
  );
};
