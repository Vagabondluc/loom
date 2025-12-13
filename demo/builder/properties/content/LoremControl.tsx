
import React from 'react';
import { BuilderNode } from '../../../../types';
import { Button } from '../../../../ui';
import { Wand2, RefreshCw } from 'lucide-react';
import { generateLorem } from '../../utils/lorem';

interface LoremControlProps {
  node: BuilderNode;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>) => void;
}

export const LoremControl: React.FC<LoremControlProps> = ({ node, updateNodeData }) => {
  return (
    <div className="space-y-3 bg-base-100 p-3 rounded-lg border border-base-300">
       <div className="flex items-center gap-2 mb-2 text-xs font-bold opacity-70">
          <Wand2 className="w-3 h-3" /> Lorem Generator
       </div>
       
       <div className="join w-full">
          {(['short', 'medium', 'long'] as const).map(mode => (
            <button 
              key={mode}
              className={`join-item btn btn-xs flex-1 ${node.data.loremConfig?.mode === mode ? 'btn-active' : ''}`}
              onClick={() => {
                updateNodeData(node.id, { 
                  label: generateLorem(mode),
                  loremConfig: { mode }
                });
              }}
            >
              {mode}
            </button>
          ))}
       </div>
       <Button 
         size="xs" 
         variant="ghost" 
         className="w-full gap-2 border border-base-200"
         onClick={() => updateNodeData(node.id, { label: generateLorem(node.data.loremConfig?.mode || 'medium') })}
       >
         <RefreshCw className="w-3 h-3" /> Regenerate Text
       </Button>
    </div>
  );
};
