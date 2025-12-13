import React from 'react';
import { BuilderNode } from '../../../../types';
import { Input, TextArea, FormField } from '../../index';

interface Props {
  node: BuilderNode;
  onChangeLabel: (value: string) => void;
  onSnapshot: () => void;
  children?: React.ReactNode;
}

export const ContentEditorView: React.FC<Props> = ({ node, onChangeLabel, onSnapshot, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50">Content</h3>
      {children}

      {node.type !== 'image' && node.type !== 'icon' && node.type !== 'markdown' && node.type !== 'lorem' && node.type !== 'picsum' && (
        <FormField label="Label / Text">
          <TextArea
            className="min-h-[4rem]"
            value={node.data.label || ''}
            onFocus={onSnapshot}
            onChange={(e) => onChangeLabel(e.target.value)}
          />
        </FormField>
      )}
    </div>
  );
};

export default ContentEditorView;
