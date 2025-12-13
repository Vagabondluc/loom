
import React from 'react';
import { BuilderNode } from '../../../../types';
import { Input, FormField } from '../../../../ui';
import { IconControlView } from '../../../../ui/molecules/properties/content/IconControlView';

const COMMON_ICONS = ['Star', 'Smile', 'Bell', 'User', 'Settings', 'Heart', 'AlertCircle', 'Check', 'X', 'Menu', 'Search', 'ArrowRight', 'ChevronDown'];

interface IconControlProps {
  node: BuilderNode;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>, options?: { skipHistory?: boolean }) => void;
  snapshot: () => void;
}

export const IconControl: React.FC<IconControlProps> = ({ node, updateNodeData, snapshot }) => {
  return (
    <IconControlView
      iconName={node.data.iconName || ''}
      size={node.data.size || 24}
      strokeWidth={node.data.strokeWidth || 2}
      onSetIconName={(name) => updateNodeData(node.id, { iconName: name })}
      onUpdateSize={(s) => updateNodeData(node.id, { size: s }, { skipHistory: true })}
      onUpdateStroke={(s) => updateNodeData(node.id, { strokeWidth: s }, { skipHistory: true })}
    />
  );
};
