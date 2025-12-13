
import React, { useState, useEffect } from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { DocumentEditorView } from '../../../ui/molecules/properties/DocumentEditorView';

interface DocumentEditorProps {
  node: BuilderNode;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ node }) => {
  const updateNodeData = useBuilderStore(s => s.updateNodeData);
  const snapshot = useBuilderStore(s => s.snapshot);
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [localContent, setLocalContent] = useState(node.data.label || '');

  // Sync local state when selection changes
  useEffect(() => {
    setLocalContent(node.data.label || '');
  }, [node.id, node.data.label]);

  const handleChange = (val: string) => {
    setLocalContent(val);
    updateNodeData(node.id, { label: val }, { skipHistory: true });
  };

  const handleBlur = () => {
    // Commit logic if needed, but updateNodeData handles transient updates well
    snapshot(); 
  };

  return (
    <DocumentEditorView
      mode={mode}
      localContent={localContent}
      onSetMode={(m) => setMode(m)}
      onChange={(v) => handleChange(v)}
      onBlur={handleBlur}
      onSnapshot={() => snapshot()}
    />
  );
};
