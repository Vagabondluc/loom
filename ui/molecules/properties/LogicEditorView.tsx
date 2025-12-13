import React from 'react';
import { Code2, Eye } from 'lucide-react';
import { Badge } from '../../atoms/Badge';

interface Props {
  expression: string;
  isCurrentlyVisible: boolean;
  onChange: (val: string) => void;
  onFocus: () => void;
}

export const LogicEditorView: React.FC<Props> = ({ expression, isCurrentlyVisible, onChange, onFocus }) => {
  return (
    <div className="space-y-4 border-b border-base-content/10 pb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
        <Code2 className="w-3 h-3" /> Logic & Visibility
      </h3>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text text-xs font-bold">Visible When</span>
          <Badge size="xs" variant={isCurrentlyVisible ? 'success' : 'error'}>
            {isCurrentlyVisible ? 'TRUE' : 'FALSE'}
          </Badge>
        </label>
        <div className="relative">
          <input
            type="text"
            className="input input-sm input-bordered w-full font-mono text-xs pr-8"
            placeholder="e.g. user.isLoggedIn"
            value={expression}
            onFocus={() => onFocus()}
            onChange={(e) => onChange(e.target.value)}
          />
          <Eye className={`w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 ${isCurrentlyVisible ? 'opacity-50' : 'opacity-20'}`} />
        </div>
        <label className="label py-1">
          <span className="label-text-alt text-[10px] opacity-60">Supports JS expressions using runtime variables.</span>
        </label>
      </div>

      {!isCurrentlyVisible && expression && (
        <div className="alert alert-warning text-xs py-2">Element will be hidden in preview based on current state.</div>
      )}
    </div>
  );
};

export default LogicEditorView;
