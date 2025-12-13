
import React from 'react';
import { LayoutConfig } from '../../../../types';
import { GridControlsView } from '../../../../ui/molecules/properties/GridControlsView';

interface GridControlsProps {
  layout: LayoutConfig;
  onUpdate: (updates: Partial<LayoutConfig>) => void;
  onSnapshot: () => void;
  OverrideDot: React.FC<{ prop: keyof LayoutConfig }>;
}

export const GridControls: React.FC<GridControlsProps> = ({ layout, onUpdate, onSnapshot, OverrideDot }) => {
  return (
    <GridControlsView layout={layout} onUpdate={onUpdate} onSnapshot={onSnapshot} OverrideDot={OverrideDot} />
  );
};
