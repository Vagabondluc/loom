
import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { CornerUpLeft, Trash2, PlusCircle } from 'lucide-react';
import QuickActionButtonView from '../../../ui/molecules/QuickActionButtonView';
import { COMPONENT_REGISTRY } from '../registries';

interface QuickActionsToolbarProps {
  node: BuilderNode;
  rect: { top: number; left: number; width: number; height: number };
}

export const QuickActionsToolbar: React.FC<QuickActionsToolbarProps> = ({ node, rect }) => {
  const { selectNode, deleteNode } = useBuilderStore();
  const def = COMPONENT_REGISTRY[node.type];

  if (node.id === 'root') return null;

  return (
    <div 
      className="absolute flex items-center gap-0.5 p-0.5 bg-base-100 rounded-full shadow-lg border border-base-300"
      style={{
        bottom: -32,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {node.parentId && (
        <QuickActionButtonView title="Select Parent" icon={<CornerUpLeft className="w-3 h-3" />} onClick={(e) => { e.stopPropagation(); selectNode(node.parentId); }} />
      )}

      {def.allowChildren && (
        <QuickActionButtonView title="Add Child (opens library)" icon={<PlusCircle className="w-3 h-3" />} onClick={(e) => { e.stopPropagation(); /* TODO: add child flow */ }} />
      )}

      <QuickActionButtonView title="Delete Node" icon={<Trash2 className="w-3 h-3" />} className="text-error" onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }} />
    </div>
  );
};
