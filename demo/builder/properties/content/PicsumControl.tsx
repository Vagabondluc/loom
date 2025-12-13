
import React from 'react';
import { BuilderNode } from '../../../../types';
import { Input, FormField, Button, Checkbox } from '../../../../ui';
import { Image as ImageIcon, RefreshCw } from 'lucide-react';

interface PicsumControlProps {
  node: BuilderNode;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>) => void;
  snapshot: () => void;
}

export const PicsumControl: React.FC<PicsumControlProps> = ({ node, updateNodeData, snapshot }) => {
  const updatePicsum = (updates: Partial<typeof node.data.picsumConfig>) => {
    const newConfig = { ...node.data.picsumConfig, ...updates };
    const { width, height, seed, grayscale, blur } = newConfig;
    
    let url = `https://picsum.photos/seed/${seed}/${width}/${height}`;
    const params = [];
    if (grayscale) params.push('grayscale');
    if (blur > 0) params.push(`blur=${blur}`);
    
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    updateNodeData(node.id, {
      picsumConfig: newConfig,
      props: { ...node.data.props, src: url }
    });
  };

  return (
    <div className="space-y-3 bg-base-100 p-3 rounded-lg border border-base-300">
       <div className="flex items-center gap-2 mb-2 text-xs font-bold opacity-70">
          <ImageIcon className="w-3 h-3" /> Picsum Config
       </div>
       
       <div className="grid grid-cols-2 gap-2">
          <FormField label="Width">
            <Input 
              type="number" size="xs" 
              value={node.data.picsumConfig?.width || 400}
              onFocus={() => snapshot()}
              onChange={(e) => updatePicsum({ width: parseInt(e.target.value) })}
            />
          </FormField>
          <FormField label="Height">
            <Input 
              type="number" size="xs" 
              value={node.data.picsumConfig?.height || 300}
              onFocus={() => snapshot()}
              onChange={(e) => updatePicsum({ height: parseInt(e.target.value) })}
            />
          </FormField>
       </div>

       <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2 py-0">
            <Checkbox 
              size="xs"
              checked={node.data.picsumConfig?.grayscale || false}
              onChange={(e) => updatePicsum({ grayscale: e.target.checked })}
            />
            <span className="label-text text-xs">Grayscale</span>
          </label>
       </div>

       <div className="form-control">
          <label className="label py-0">
            <span className="label-text text-xs">Blur Level ({node.data.picsumConfig?.blur || 0})</span>
          </label>
          <input 
            type="range" min="0" max="10" step="1" 
            className="range range-xs"
            value={node.data.picsumConfig?.blur || 0}
            onPointerDown={() => snapshot()}
            onChange={(e) => updatePicsum({ blur: parseInt(e.target.value) })}
          />
       </div>

       <Button 
         size="xs" 
         variant="neutral" 
         className="w-full gap-2"
         onClick={() => updatePicsum({ seed: Math.random().toString(36).substring(7) })}
       >
         <RefreshCw className="w-3 h-3" /> Randomize Image
       </Button>
    </div>
  );
};
