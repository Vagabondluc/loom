
import React from 'react';
import { LayoutConfig, LayoutMode } from '../../../../types';
import { LayoutModeSelectorView } from '../../../../ui/molecules/properties/LayoutModeSelectorView';

interface LayoutModeSelectorProps {
  currentMode: LayoutMode;
  onUpdate: (updates: Partial<LayoutConfig>) => void;
}

export const LayoutModeSelector: React.FC<LayoutModeSelectorProps> = ({ currentMode, onUpdate }) => {
  return <LayoutModeSelectorView currentMode={currentMode} onUpdate={onUpdate} />;
};
