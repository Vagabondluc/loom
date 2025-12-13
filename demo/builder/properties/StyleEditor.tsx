
import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { TextArea, FormField } from '../../../ui';

interface StyleEditorProps {
  node: BuilderNode;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({ node }) => {
  const updateNodeData = useBuilderStore(s => s.updateNodeData);
  const snapshot = useBuilderStore(s => s.snapshot);

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50">Custom Styles</h3>
      
      <FormField label="Additional Classes">
        <TextArea 
          className="font-mono text-xs h-24"
          value={node.data.className || ''} 
          onFocus={() => snapshot()}
          onChange={(e) => updateNodeData(node.id, { className: e.target.value }, { skipHistory: true })}
        />
      </FormField>
      <div className="text-[10px] opacity-60">
        Supports all Tailwind and DaisyUI utility classes.
      </div>
    </div>
  );
};
