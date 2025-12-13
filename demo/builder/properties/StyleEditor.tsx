
import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { StyleEditorView } from '../../../ui/molecules/properties/StyleEditorView';

interface StyleEditorProps {
  node: BuilderNode;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({ node }) => {
  const updateNodeData = useBuilderStore(s => s.updateNodeData);
  const snapshot = useBuilderStore(s => s.snapshot);

  return (
    <StyleEditorView
      classNameValue={node.data.className || ''}
      onChange={(v) => updateNodeData(node.id, { className: v }, { skipHistory: true })}
      onSnapshot={() => snapshot()}
    />
  );
};
