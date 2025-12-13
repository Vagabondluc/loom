
import { BuilderNode } from '../../../../types';
import { useToastStore } from '../../../../stores/toastStore';
import { useLogicStore } from '../../../../stores/logicStore';

export const executeNodeActions = (node: BuilderNode) => {
  const actions = node.events?.['onClick'];
  if (!actions) return;

  actions.forEach(action => {
    switch (action.type) {
      case 'navigate':
        if (action.payload.url) {
          window.open(action.payload.url, '_blank');
        }
        break;
      case 'alert':
        if (action.payload.message) {
          alert(action.payload.message);
        }
        break;
      case 'toast':
        if (action.payload.message) {
          useToastStore.getState().addToast({
            message: action.payload.message,
            type: action.payload.type || 'info'
          });
        }
        break;
      case 'triggerFlow':
        if (action.payload.flowId) {
          useLogicStore.getState().runFlow(action.payload.flowId);
          useToastStore.getState().addToast({
            message: `Started Flow: ${action.payload.flowId}`,
            type: 'info'
          });
        }
        break;
    }
  });
};
