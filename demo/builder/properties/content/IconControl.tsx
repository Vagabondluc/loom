
import React from 'react';
import { BuilderNode } from '../../../../types';
import { Input, FormField } from '../../../../ui';

const COMMON_ICONS = ['Star', 'Smile', 'Bell', 'User', 'Settings', 'Heart', 'AlertCircle', 'Check', 'X', 'Menu', 'Search', 'ArrowRight', 'ChevronDown'];

interface IconControlProps {
  node: BuilderNode;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>, options?: { skipHistory?: boolean }) => void;
  snapshot: () => void;
}

export const IconControl: React.FC<IconControlProps> = ({ node, updateNodeData, snapshot }) => {
  return (
     <div className="space-y-3">
         <FormField label="Icon Name">
             <input 
                className="input input-sm input-bordered"
                value={node.data.iconName || ''}
                onFocus={() => snapshot()}
                onChange={(e) => updateNodeData(node.id, { iconName: e.target.value }, { skipHistory: true })}
                placeholder="e.g. Star"
             />
         </FormField>
         <div className="flex flex-wrap gap-1">
            {COMMON_ICONS.map(icon => (
                <button 
                    key={icon} 
                    className="btn btn-xs btn-ghost border border-base-200"
                    onClick={() => updateNodeData(node.id, { iconName: icon })}
                    title={icon}
                >
                    {icon}
                </button>
            ))}
         </div>
         
         <div className="grid grid-cols-2 gap-2">
            <FormField label="Size (px)">
              <Input 
                  size="sm"
                  type="number"
                  value={node.data.size || 24}
                  onFocus={() => snapshot()}
                  onChange={(e) => updateNodeData(node.id, { size: parseInt(e.target.value) }, { skipHistory: true })}
              />
            </FormField>
            <FormField label="Stroke">
              <Input 
                  size="sm"
                  type="number"
                  value={node.data.strokeWidth || 2}
                  onFocus={() => snapshot()}
                  onChange={(e) => updateNodeData(node.id, { strokeWidth: parseFloat(e.target.value) }, { skipHistory: true })}
              />
            </FormField>
         </div>
     </div>
  );
};
