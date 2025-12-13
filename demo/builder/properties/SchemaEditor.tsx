import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { SCHEMAS, getSchemaFields } from '../../../utils/schemaRegistry';
import { Alert, Badge } from '../../../ui';
import { ShieldCheck, Link2 } from 'lucide-react';

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
    <div className="space-y-4 border-b border-base-content/10 pb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
        <ShieldCheck className="w-3 h-3" /> Zod Schema Binding
      </h3>

      {isForm && (
        <div className="form-control">
          <label className="label text-xs font-bold">Attach Schema</label>
          <select 
            className="select select-bordered select-sm w-full"
            value={node.data.schemaId || ''}
            onChange={(e) => updateNodeData(node.id, { schemaId: e.target.value })}
          >
            <option value="">-- No Schema --</option>
            {Object.values(SCHEMAS).map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <div className="text-[10px] opacity-60 mt-1">
             Defines the data structure for child inputs.
          </div>
        </div>
      )}

      {isInput && (
        <div className="form-control">
          <label className="label text-xs font-bold flex justify-between">
             <span>Bind to Field</span>
             {parentSchemaId && <Badge size="xs" variant="ghost" className="font-mono">{parentSchemaId}</Badge>}
          </label>
          
          {parentSchemaId ? (
            <select 
              className="select select-bordered select-sm w-full"
              value={node.data.field || ''}
              onChange={(e) => updateNodeData(node.id, { field: e.target.value })}
            >
              <option value="">-- Unbound --</option>
              {availableFields.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          ) : (
            <Alert variant="warning" className="text-[10px] p-2 items-start" icon={<Link2 className="w-4 h-4 mr-1 flex-shrink-0" />}>
               <span>Place this input inside a Form with a Schema to bind fields.</span>
            </Alert>
          )}
          
          {parentSchemaId && (
            <div className="text-[10px] opacity-60 mt-1">
               Validates using Zod rules from parent form.
            </div>
          )}
        </div>
      )}
    </div>
  );
};