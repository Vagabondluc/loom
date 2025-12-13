
import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { Input, TextArea, FormField } from '../../../ui';
import { LoremControl } from './content/LoremControl';
import { PicsumControl } from './content/PicsumControl';
import { IconControl } from './content/IconControl';
import { ImageControl } from './content/ImageControl';

interface ContentEditorProps {
  node: BuilderNode;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ node }) => {
  const updateNodeData = useBuilderStore(s => s.updateNodeData);
  const snapshot = useBuilderStore(s => s.snapshot);

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50">Content</h3>
      
      {/* Lorem Generator */}
      {node.type === 'lorem' && (
        <LoremControl node={node} updateNodeData={updateNodeData} />
      )}

      {/* Picsum Image */}
      {node.type === 'picsum' && (
        <PicsumControl node={node} updateNodeData={updateNodeData} snapshot={snapshot} />
      )}

      {/* Generic Label */}
      {node.type !== 'image' && node.type !== 'icon' && node.type !== 'markdown' && node.type !== 'lorem' && node.type !== 'picsum' && (
          <FormField label="Label / Text">
            <TextArea 
              className="min-h-[4rem]"
              value={node.data.label || ''} 
              onFocus={() => snapshot()}
              onChange={(e) => updateNodeData(node.id, { label: e.target.value }, { skipHistory: true })}
            />
          </FormField>
      )}

      {/* Generic Image */}
      {(node.type === 'image' || node.type === 'picsum') && (
         <ImageControl node={node} updateNodeData={updateNodeData} snapshot={snapshot} />
      )}

      {/* Icon Config */}
      {node.type === 'icon' && (
         <IconControl node={node} updateNodeData={updateNodeData} snapshot={snapshot} />
      )}

      {/* Tab Config */}
      {node.type === 'tab' && (
          <FormField label="Aria Label">
            <Input 
              size="sm"
              value={node.data.props?.ariaLabel || ''} 
              onFocus={() => snapshot()}
              onChange={(e) => updateNodeData(node.id, { props: { ...node.data.props, ariaLabel: e.target.value } }, { skipHistory: true })}
            />
          </FormField>
      )}
    </div>
  );
};
