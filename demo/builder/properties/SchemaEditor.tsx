import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { SCHEMAS, getSchemaFields } from '../../../utils/schemaRegistry';
import { SchemaEditorView } from '../../../ui/molecules/properties/SchemaEditorView';

interface SchemaEditorProps {
  node: BuilderNode;
}

export const SchemaEditor: React.FC<SchemaEditorProps> = ({ node }) => {
  const updateNodeData = useBuilderStore(s => s.updateNodeData);
  const nodes = useBuilderStore(s => s.nodes);

  // Helper to find parent schema
  const findParentSchema = (startNodeId: string): string | undefined => {
    let currentId: string | null = startNodeId;
    while (currentId) {
      const currentNode = nodes[currentId];
      if (currentNode?.data.schemaId) return currentNode.data.schemaId;
      currentId = currentNode?.parentId || null;
    }
    return undefined;
  };

  const isForm = node.type === 'form';
  const isInput = ['input', 'select', 'textarea', 'checkbox'].includes(node.type);
  
  // If not a form or input, don't show
  if (!isForm && !isInput) return null;

  const parentSchemaId = isInput ? findParentSchema(node.parentId || '') : undefined;
  const availableFields = parentSchemaId ? getSchemaFields(parentSchemaId) : [];

  return (
    <SchemaEditorView
      node={node}
      parentSchemaId={parentSchemaId}
      availableSchemas={Object.values(SCHEMAS).map(s => ({ id: s.id, label: s.label }))}
      availableFields={availableFields}
      onUpdateSchema={(schemaId) => updateNodeData(node.id, { schemaId })}
      onUpdateField={(field) => updateNodeData(node.id, { field })}
    />
  );
};