import React from 'react';
import { Database, RotateCcw } from 'lucide-react';

type Props = {
  variables: Record<string, any>;
  onToggle: (path: string, current: boolean) => void;
  onReset: () => void;
};

const renderValue = (objKey: string, value: any, path: string, toggleFn: (path: string, current: boolean) => void): JSX.Element => {
  if (typeof value === 'boolean') {
    return (
      <div key={path} className="flex justify-between items-center py-1">
        <span className="text-xs font-mono">{objKey}</span>
        <input
          type="checkbox"
          className="toggle toggle-xs toggle-success"
          checked={value}
          onChange={() => toggleFn(path, value)}
        />
      </div>
    );
  }
  if (typeof value === 'object' && value !== null) {
    return (
      <div key={path} className="pl-2 border-l border-base-content/10 my-1">
        <div className="text-[10px] opacity-50 uppercase font-bold mb-1">{objKey}</div>
        {Object.entries(value).map(([k, v]) => renderValue(k, v, `${path}.${k}`, toggleFn))}
      </div>
    );
  }
  return (
    <div key={path} className="flex justify-between items-center py-1 gap-2">
      <span className="text-xs font-mono truncate" title={path}>{objKey}</span>
      <span className="text-xs font-bold opacity-70 truncate max-w-[80px]">{String(value)}</span>
    </div>
  );
};

export const RuntimeVariableEditorView: React.FC<Props> = ({ variables, onToggle, onReset }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
          <Database className="w-3 h-3" /> Runtime State
        </h3>
        <button onClick={onReset} className="btn btn-xs btn-ghost btn-square" title="Reset Runtime">
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <div className="bg-base-100 rounded border border-base-300 p-2 max-h-[300px] overflow-y-auto">
        {Object.entries(variables).map(([k, v]) => renderValue(k, v, k, onToggle))}
      </div>

      <div className="text-[10px] opacity-60">Use these variables in "Visible When" logic conditions.</div>
    </div>
  );
};

export default RuntimeVariableEditorView;
