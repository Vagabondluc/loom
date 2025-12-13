import React from 'react';
import { BuilderNode } from '../../../../types';
import { ShieldCheck, Link2 } from 'lucide-react';
import { Alert, Badge } from '../../index';

interface Props {
  node: BuilderNode;
  parentSchemaId?: string;
  availableSchemas: { id: string; label: string }[];
  availableFields: string[];
  onUpdateSchema: (schemaId: string | '') => void;
  onUpdateField: (field: string | '') => void;
}

export const SchemaEditorView: React.FC<Props> = ({ node, parentSchemaId, availableSchemas, availableFields, onUpdateSchema, onUpdateField }) => {
  const isForm = node.type === 'form';
  const isInput = ['input', 'select', 'textarea', 'checkbox'].includes(node.type);

  if (!isForm && !isInput) return null;

  return (
    <div className="space-y-4 border-b border-base-content/10 pb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
        <ShieldCheck className="w-3 h-3" /> Zod Schema Binding
      </h3>

      {isForm && (
        <div className="form-control">
          <label className="label text-xs font-bold">Attach Schema</label>
          <select className="select select-bordered select-sm w-full" value={node.data.schemaId || ''} onChange={(e) => onUpdateSchema(e.target.value)}>
            <option value="">-- No Schema --</option>
            {availableSchemas.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <div className="text-[10px] opacity-60 mt-1">Defines the data structure for child inputs.</div>
        </div>
      )}

      {isInput && (
        <div className="form-control">
          <label className="label text-xs font-bold flex justify-between">
            <span>Bind to Field</span>
            {parentSchemaId && <Badge size="xs" variant="ghost" className="font-mono">{parentSchemaId}</Badge>}
          </label>

          {parentSchemaId ? (
            <select className="select select-bordered select-sm w-full" value={node.data.field || ''} onChange={(e) => onUpdateField(e.target.value)}>
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
            <div className="text-[10px] opacity-60 mt-1">Validates using Zod rules from parent form.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SchemaEditorView;
