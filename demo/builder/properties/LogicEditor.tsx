
import React from 'react';
import { useBuilderStore } from '../store';
import { useRuntimeStore } from '../../../stores/runtimeStore';
import { BuilderNode } from '../../../types';
import { LogicEditorView } from '../../../ui/molecules/properties/LogicEditorView';
import { evaluateExpression } from '../../../utils/expressionEngine';

interface LogicEditorProps {
  node: BuilderNode;
}

export const LogicEditor: React.FC<LogicEditorProps> = ({ node }) => {
  const updateNodeLogic = useBuilderStore(s => s.updateNodeLogic);
  const snapshot = useBuilderStore(s => s.snapshot);
  const runtimeVariables = useRuntimeStore(s => s.variables);
  
  const updateLogic = (visibleWhen: string) => {
      updateNodeLogic(node.id, { visibleWhen }, { skipHistory: true });
  };

  const expression = node.logic?.visibleWhen || '';
  const isCurrentlyVisible = evaluateExpression(expression, runtimeVariables);

  return (
    <LogicEditorView
      expression={expression}
      isCurrentlyVisible={isCurrentlyVisible}
      onChange={(v: string) => updateLogic(v)}
      onFocus={() => snapshot()}
    />
  );
};
