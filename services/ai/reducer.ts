import { BuilderNode, Template } from '../../types';
import { AiAction } from './aiActionSchema';
import { performInsert, performMove, performDelete } from '../../stores/treeUtils';

export const reduceAiAction = (nodes: Record<string, BuilderNode>, action: AiAction): Record<string, BuilderNode> => {
    let newNodes = { ...nodes };

    switch (action.action) {
        case 'UPDATE_NODE':
            if (newNodes[action.nodeId]) {
                newNodes = {
                    ...newNodes,
                    [action.nodeId]: {
                        ...newNodes[action.nodeId],
                        data: { ...newNodes[action.nodeId].data, ...action.updates }
                    }
                };
            }
            break;
        case 'ADD_NODE':
            const template: Template = {
                id: `ai-gen-${action.component.type}`,
                label: action.component.type,
                category: 'ai',
                rootId: 'root',
                nodes: {
                    'root': {
                        id: 'root',
                        type: action.component.type,
                        data: action.component.data,
                        children: [],
                        parentId: null,
                    }
                }
            };
            newNodes = performInsert(newNodes, action.parentId, template, action.index);
            break;
        case 'MOVE_NODE':
            newNodes = performMove(newNodes, action.nodeId, action.newParentId, action.index);
            break;
        case 'DELETE_NODE':
            newNodes = performDelete(newNodes, action.nodeId);
            break;
    }

    return newNodes;
};

export default reduceAiAction;
