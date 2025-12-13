
import React from 'react';
import { useRuntimeStore } from '../../../stores/runtimeStore';
import { RuntimeVariableEditorView } from '../../../ui/molecules/properties/RuntimeVariableEditorView';

export const RuntimeVariableEditor: React.FC = () => {
    const { variables, setVariable, resetVariables } = useRuntimeStore();

    const handleToggle = (path: string, current: boolean) => {
        setVariable(path, !current);
    };

    return (
        <RuntimeVariableEditorView variables={variables} onToggle={handleToggle} onReset={() => resetVariables()} />
    );
};
