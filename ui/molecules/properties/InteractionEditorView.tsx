import React from 'react';
import { MousePointerClick, Plus } from 'lucide-react';
import { Badge } from '../../atoms/Badge';

interface Props {
  children?: React.ReactNode;
  onAddAction: (type: string) => void;
}

export const InteractionEditorView: React.FC<Props> = ({ children, onAddAction }) => {
  return (
    <div className="space-y-4 border-b border-base-content/10 pb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
        <MousePointerClick className="w-3 h-3" /> Interactions
      </h3>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold opacity-70">On Click</span>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-xs btn-ghost btn-square"><Plus className="w-3 h-3"/></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 text-xs">
              <li><a onClick={() => onAddAction('toast')}>Toast</a></li>
              <li><a onClick={() => onAddAction('navigate')}>Navigate</a></li>
              <li><a onClick={() => onAddAction('alert')}>Alert</a></li>
              <li><a onClick={() => onAddAction('triggerFlow')}>Trigger Flow</a></li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          {children}
          {!children && (
            <div className="text-[10px] opacity-40 text-center py-2 border border-dashed rounded">No actions configured</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractionEditorView;
