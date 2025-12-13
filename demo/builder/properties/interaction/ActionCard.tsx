
import React from 'react';
import { BuilderAction } from '../../../../types';
import { useLogicStore } from '../../../../stores/logicStore';
import { X } from 'lucide-react';

interface ActionCardProps {
  action: BuilderAction;
  index: number;
  onRemove: (index: number) => void;
  onUpdate: (index: number, key: string, value: any) => void;
  onFocus: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({ action, index, onRemove, onUpdate, onFocus }) => {
  const logicFlows = useLogicStore(s => s.flows);

  return (
    <div className="bg-base-100 p-2 rounded border border-base-300 text-xs relative group">
        <button 
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 btn btn-xs btn-ghost btn-square text-error"
            onClick={() => onRemove(index)}
        >
            <X className="w-3 h-3"/>
        </button>
        <div className="font-bold mb-1 uppercase text-[10px] opacity-50">{action.type}</div>
        
        {action.type === 'navigate' && (
            <input 
                className="input input-xs input-bordered w-full" 
                placeholder="URL"
                value={action.payload.url || ''}
                onFocus={onFocus}
                onChange={(e) => onUpdate(index, 'url', e.target.value)}
            />
        )}
        
        {action.type === 'alert' && (
            <input 
                className="input input-xs input-bordered w-full" 
                placeholder="Message"
                value={action.payload.message || ''}
                onFocus={onFocus}
                onChange={(e) => onUpdate(index, 'message', e.target.value)}
            />
        )}
        
        {action.type === 'toast' && (
            <div className="space-y-1">
                <input 
                    className="input input-xs input-bordered w-full" 
                    placeholder="Message"
                    value={action.payload.message || ''}
                    onFocus={onFocus}
                    onChange={(e) => onUpdate(index, 'message', e.target.value)}
                />
                <select 
                    className="select select-xs select-bordered w-full"
                    value={action.payload.type || 'info'}
                    onChange={(e) => onUpdate(index, 'type', e.target.value)}
                >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                </select>
            </div>
        )}

        {action.type === 'triggerFlow' && (
            <select 
                className="select select-xs select-bordered w-full"
                value={action.payload.flowId || ''}
                onChange={(e) => onUpdate(index, 'flowId', e.target.value)}
            >
                {logicFlows.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                ))}
            </select>
        )}
    </div>
  );
};
