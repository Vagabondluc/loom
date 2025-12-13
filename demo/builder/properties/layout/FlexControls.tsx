
import React from 'react';
import React from 'react';
import { LayoutConfig } from '../../../../types';
import { FlexControlsView } from '../../../../ui/molecules/properties/FlexControlsView';

interface FlexControlsProps {
  layout: LayoutConfig;
  onUpdate: (updates: Partial<LayoutConfig>) => void;
  OverrideDot: React.FC<{ prop: keyof LayoutConfig }>;
}

export const FlexControls: React.FC<FlexControlsProps> = ({ layout, onUpdate, OverrideDot }) => {
  return (
    <FlexControlsView layout={layout} onUpdate={onUpdate} OverrideDot={OverrideDot} />
  );
};
