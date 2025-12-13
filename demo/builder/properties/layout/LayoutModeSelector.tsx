
import React from 'react';
import { LayoutConfig, LayoutMode } from '../../../../types';

interface LayoutModeSelectorProps {
  currentMode: LayoutMode;
  onUpdate: (updates: Partial<LayoutConfig>) => void;
}

export const LayoutModeSelector: React.FC<LayoutModeSelectorProps> = ({ currentMode, onUpdate }) => {
  return (
    <div className="join w-full grid grid-cols-3">
        <input 
          className="join-item btn btn-xs" 
          type="radio" 
          name="layoutMode" 
          aria-label="Block"
          checked={currentMode === 'static'}
          onChange={() => onUpdate({ mode: 'static' })}
        />
        <input 
          className="join-item btn btn-xs" 
          type="radio" 
          name="layoutMode" 
          aria-label="Flex"
          checked={currentMode === 'flex'}
          onChange={() => onUpdate({ mode: 'flex', direction: 'row', gap: 4 })}
        />
        <input 
          className="join-item btn btn-xs" 
          type="radio" 
          name="layoutMode" 
          aria-label="Grid"
          checked={currentMode === 'grid'}
          onChange={() => onUpdate({ mode: 'grid', cols: 2, gap: 4 })}
        />
    </div>
  );
};
