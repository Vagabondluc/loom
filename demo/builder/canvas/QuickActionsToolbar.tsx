
import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { CornerUpLeft, Trash2, PlusCircle } from 'lucide-react';
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
        <button 
          className="btn btn-xs btn-ghost btn-square" 
          title="Select Parent"
          onClick={(e) => { e.stopPropagation(); selectNode(node.parentId); }}
        >
          <CornerUpLeft className="w-3 h-3" />
        </button>
      )}

      {def.allowChildren && (
         <button 
           className="btn btn-xs btn-ghost btn-square" 
           title="Add Child (opens library)"
           onClick={(e) => { e.stopPropagation(); /* TODO: Implement add child flow */ }}
         >
           <PlusCircle className="w-3 h-3" />
         </button>
      )}

      <button 
        className="btn btn-xs btn-ghost btn-square text-error" 
        title="Delete Node"
        onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
};
