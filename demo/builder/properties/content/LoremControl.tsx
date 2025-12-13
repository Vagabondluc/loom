
import React from 'react';
import { BuilderNode } from '../../../../types';
import { Button } from '../../../../ui';
import { LoremControlView } from '../../../../ui/molecules/properties/content/LoremControlView';
import { Wand2, RefreshCw } from 'lucide-react';
import { generateLorem } from '../../utils/lorem';

interface LoremControlProps {
  node: BuilderNode;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>) => void;
}

export const LoremControl: React.FC<LoremControlProps> = ({ node, updateNodeData }) => {
  const mode = node.data.loremConfig?.mode || 'medium';
  return (
    <LoremControlView
      mode={mode}
      onSetMode={(m) => updateNodeData(node.id, { label: generateLorem(m), loremConfig: { mode: m } })}
      onRegenerate={() => updateNodeData(node.id, { label: generateLorem(node.data.loremConfig?.mode || 'medium') })}
    />
  );
};
