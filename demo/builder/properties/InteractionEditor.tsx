
import React from 'react';
import { useBuilderStore } from '../store';
import { useLogicStore } from '../../../stores/logicStore';
import { BuilderNode, ActionType } from '../../../types';
import { MousePointerClick, Plus } from 'lucide-react';
import { ActionCard } from './interaction/ActionCard';

interface InteractionEditorProps {
  node: BuilderNode;
}

export const InteractionEditor: React.FC<InteractionEditorProps> = ({ node }) => {
  const updateNodeEvents = useBuilderStore(s => s.updateNodeEvents);
  const snapshot = useBuilderStore(s => s.snapshot);
  const logicFlows = useLogicStore(s => s.flows);

  const addEventAction = (type: ActionType) => {
      const currentEvents = node.events?.['onClick'] || [];
      const newAction = { type, payload: {} as any };
      if (type === 'triggerFlow' && logicFlows.length > 0) {
          newAction.payload = { flowId: logicFlows[0].id };
      }
      if (type === 'toast') {
          newAction.payload = { message: 'Action executed', type: 'info' };
      }
      updateNodeEvents(node.id, {
          ...node.events,
          'onClick': [...currentEvents, newAction]
      });
  };

  const removeEventAction = (index: number) => {
      const currentEvents = node.events?.['onClick'] || [];
      const newEvents = currentEvents.filter((_, i) => i !== index);
      updateNodeEvents(node.id, {
          ...node.events,
          'onClick': newEvents
      });
  };

  const updateActionPayload = (index: number, key: string, value: any) => {
      const currentEvents = node.events?.['onClick'] || [];
      const newEvents = [...currentEvents];
      newEvents[index] = { 
          ...newEvents[index], 
          payload: { ...newEvents[index].payload, [key]: value } 
      };
      updateNodeEvents(node.id, {
          ...node.events,
          'onClick': newEvents
      }, { skipHistory: true });
  };

  const handleFocus = () => {
      snapshot();
  };

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
                       <li><a onClick={() => addEventAction('toast')}>Toast</a></li>
                       <li><a onClick={() => addEventAction('navigate')}>Navigate</a></li>
                       <li><a onClick={() => addEventAction('alert')}>Alert</a></li>
                       <li><a onClick={() => addEventAction('triggerFlow')}>Trigger Flow</a></li>
                    </ul>
                </div>
            </div>

            <div className="space-y-2">
                {node.events?.['onClick']?.map((action, i) => (
                    <ActionCard 
                        key={i}
                        action={action}
                        index={i}
                        onRemove={removeEventAction}
                        onUpdate={updateActionPayload}
                        onFocus={handleFocus}
                    />
                ))}
                {(!node.events?.['onClick'] || node.events['onClick'].length === 0) && (
                    <div className="text-[10px] opacity-40 text-center py-2 border border-dashed rounded">
                        No actions configured
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
