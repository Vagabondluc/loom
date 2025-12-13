
import React from 'react';
import { BuilderAction } from '../../../../types';
import { useLogicStore } from '../../../../stores/logicStore';
import { ActionCardView } from '../../../../ui/molecules/properties/interaction/ActionCardView';

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
    <ActionCardView
      action={action}
      index={index}
      flows={logicFlows}
      onRemove={onRemove}
      onUpdate={onUpdate}
      onFocus={onFocus}
    />
  );
};
