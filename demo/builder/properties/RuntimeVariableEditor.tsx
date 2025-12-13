
import React from 'react';
import { useRuntimeStore } from '../../../stores/runtimeStore';
import { Database, RotateCcw } from 'lucide-react';

export const RuntimeVariableEditor: React.FC = () => {
  const { variables, setVariable, resetVariables } = useRuntimeStore();

  const handleToggle = (path: string, current: boolean) => {
    setVariable(path, !current);
  };

  const renderValue = (key: string, value: any, path: string) => {
      if (typeof value === 'boolean') {
          return (
             <div key={path} className="flex justify-between items-center py-1">
                 <span className="text-xs font-mono">{key}</span>
                 <input 
                    type="checkbox" 
                    className="toggle toggle-xs toggle-success" 
                    checked={value}
                    onChange={() => handleToggle(path, value)}
                 />
             </div>
          );
      }
      if (typeof value === 'object' && value !== null) {
          return (
              <div key={path} className="pl-2 border-l border-base-content/10 my-1">
                  <div className="text-[10px] opacity-50 uppercase font-bold mb-1">{key}</div>
                  {Object.entries(value).map(([k, v]) => renderValue(k, v, `${path}.${k}`))}
              </div>
          );
      }
      return (
          <div key={path} className="flex justify-between items-center py-1 gap-2">
               <span className="text-xs font-mono truncate" title={path}>{key}</span>
               <span className="text-xs font-bold opacity-70 truncate max-w-[80px]">{String(value)}</span>
          </div>
      );
  };

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
             <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
                <Database className="w-3 h-3" /> Runtime State
             </h3>
             <button onClick={resetVariables} className="btn btn-xs btn-ghost btn-square" title="Reset Runtime">
                <RotateCcw className="w-3 h-3" />
             </button>
        </div>
        
        <div className="bg-base-100 rounded border border-base-300 p-2 max-h-[300px] overflow-y-auto">
            {Object.entries(variables).map(([k, v]) => renderValue(k, v, k))}
        </div>
        
        <div className="text-[10px] opacity-60">
            Use these variables in "Visible When" logic conditions.
        </div>
    </div>
  );
};
