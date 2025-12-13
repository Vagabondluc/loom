import React from 'react';
import { LayoutConfig } from '../../../../types';

interface GridControlsViewProps {
  layout: LayoutConfig;
  onUpdate: (updates: Partial<LayoutConfig>) => void;
  onSnapshot: () => void;
  OverrideDot: React.FC<{ prop: keyof LayoutConfig }>;
}

export const GridControlsView: React.FC<GridControlsViewProps> = ({ layout, onUpdate, onSnapshot, OverrideDot }) => {
  return (
    <div className="space-y-3 bg-base-100 p-3 rounded-lg border border-base-300 animate-in fade-in">
      <div className="form-control">
        <label className="label text-xs py-1">
          <span>Columns: {layout.cols || 1} <OverrideDot prop="cols" /></span>
        </label>
        <input
          type="range" min="1" max="12" step="1"
          value={layout.cols || 1}
          className="range range-xs range-primary"
          onPointerDown={onSnapshot}
          onChange={(e) => onUpdate({ cols: parseInt(e.target.value) })}
        />
      </div>

      <div className="form-control">
        <label className="label text-xs py-1">
          <span>Rows: {layout.rows || 1} <OverrideDot prop="rows" /></span>
        </label>
        <input
          type="range" min="1" max="6" step="1"
          value={layout.rows || 1}
          className="range range-xs range-secondary"
          onPointerDown={onSnapshot}
          onChange={(e) => onUpdate({ rows: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );
};
