
import React from 'react';
import { useBuilderStore } from '../store';
import { useLogicStore } from '../../../stores/logicStore';
import { BuilderNode, ActionType } from '../../../types';
import { InteractionEditorView } from '../../../ui/molecules/properties/InteractionEditorView';
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
    <InteractionEditorView onAddAction={(t) => addEventAction(t as ActionType)}>
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
    </InteractionEditorView>
  );
};
