
import React from 'react';
import { BuilderNode } from '../../../../types';
import { Input, FormField } from '../../../../ui';

interface ImageControlProps {
  node: BuilderNode;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>, options?: { skipHistory?: boolean }) => void;
  snapshot: () => void;
}

export const ImageControl: React.FC<ImageControlProps> = ({ node, updateNodeData, snapshot }) => {
  return (
     <div className="space-y-2">
        <FormField label="Image URL">
          <Input 
            size="sm"
            value={node.data.props?.src || ''} 
            onFocus={() => snapshot()}
            onChange={(e) => updateNodeData(node.id, { props: { ...node.data.props, src: e.target.value } }, { skipHistory: true })}
          />
        </FormField>
        <FormField label="Alt Text">
          <Input 
            size="sm"
            value={node.data.props?.alt || ''} 
            onFocus={() => snapshot()}
            onChange={(e) => updateNodeData(node.id, { props: { ...node.data.props, alt: e.target.value } }, { skipHistory: true })}
          />
        </FormField>
     </div>
  );
};
