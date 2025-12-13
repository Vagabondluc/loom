
import { create } from 'zustand';
import { LogicFlow, LogicNode } from '../types';
import { useRuntimeStore } from './runtimeStore';

const INITIAL_FLOWS: LogicFlow[] = [
  {
    id: 'flow-1',
    name: 'User Onboarding Flow',
    nodes: [
      { id: '1', type: 'trigger', label: 'User Signs Up', status: 'idle', description: "This is the entry point of the flow." },
      { 
        id: '2', 
        type: 'action', 
        label: 'Set Login State', 
        status: 'idle', 
        description: 'Updates the runtime store to reflect the user is logged in.',
        config: { actionType: 'setVariable', targetVar: 'user.isLoggedIn', value: true }
      },
      { 
        id: '3', 
        type: 'action', 
        label: 'Simulate Delay', 
        status: 'idle', 
        description: 'Waits for 1 second to simulate API latency.',
        config: { actionType: 'wait', duration: 1000 }
      },
      { 
        id: '4', 
        type: 'action', 
        label: 'Update Credits', 
        status: 'idle', 
        description: 'Grants 100 credits to the user.',
        config: { actionType: 'setVariable', targetVar: 'user.credits', value: 100 }
      }
    ]
  },
  {
    id: 'flow-2',
    name: 'Payment Processing',
    nodes: [
        { id: '1', type: 'trigger', label: 'Checkout Clicked', status: 'idle', description: 'Flow starts on checkout.' },
        { id: '2', type: 'action', label: 'Verify Stock', status: 'idle', description: 'Checks inventory.', config: { actionType: 'wait', duration: 500 } },
        { id: '3', type: 'action', label: 'Charge Card', status: 'idle', description: 'Processes payment.', config: { actionType: 'wait', duration: 500 } },
        { id: '4', type: 'action', label: 'Reset Cart', status: 'idle', description: 'Clears the shopping cart.', config: { actionType: 'setVariable', targetVar: 'cart.items', value: 0 } }
    ]
  }
];

interface LogicState {
  flows: LogicFlow[];
  isRunning: boolean;
  activeFlowId: string | null;
  runFlow: (id: string) => Promise<void>;
  resetFlows: () => void;
  updateNodeConfig: (flowId: string, nodeId: string, config: LogicNode['config']) => void;
}

export const useLogicStore = create<LogicState>((set, get) => ({
  flows: INITIAL_FLOWS,
  isRunning: false,
  activeFlowId: null,

  updateNodeConfig: (flowId, nodeId, config) => set(state => ({
    flows: state.flows.map(f => {
      if (f.id !== flowId) return f;
      return {
        ...f,
        nodes: f.nodes.map(n => 
          n.id === nodeId ? { ...n, config: { ...n.config, ...config } } : n
        )
      };
    })
  })),

  runFlow: async (id: string) => {
    if (get().isRunning) return;

    // Reset target flow first
    set(state => ({
        activeFlowId: id,
        isRunning: true,
        flows: state.flows.map(f => 
            f.id === id 
            ? { ...f, nodes: f.nodes.map(n => ({ ...n, status: 'idle' })) } 
            : f
        )
    }));

    const flow = get().flows.find(f => f.id === id);
    if (!flow) {
        set({ isRunning: false });
        return;
    }

    // Execution Loop
    for (let i = 0; i < flow.nodes.length; i++) {
        const node = flow.nodes[i];

        // 1. Mark Running
        set(state => ({
            flows: state.flows.map(f => {
                if (f.id !== id) return f;
                const newNodes = [...f.nodes];
                newNodes[i] = { ...newNodes[i], status: 'running' };
                return { ...f, nodes: newNodes };
            })
        }));

        // 2. Execute Logic
        try {
            if (node.type === 'action' && node.config) {
                if (node.config.actionType === 'setVariable' && node.config.targetVar) {
                    useRuntimeStore.getState().setVariable(node.config.targetVar, node.config.value);
                    // Minimal delay for visual feedback even for sync actions
                    await new Promise(r => setTimeout(r, 400));
                } else if (node.config.actionType === 'wait') {
                    await new Promise(r => setTimeout(r, node.config.duration || 800));
                } else {
                    // Fallback delay
                    await new Promise(resolve => setTimeout(resolve, 800));
                }
            } else {
                // Default simulation delay
                await new Promise(resolve => setTimeout(resolve, 800));
            }
        } catch (e) {
            console.error("Logic execution failed", e);
            // In a real system, we would mark status='error' here and break
        }

        // 3. Mark Success
        set(state => ({
            flows: state.flows.map(f => {
                if (f.id !== id) return f;
                const newNodes = [...f.nodes];
                newNodes[i] = { ...newNodes[i], status: 'success' };
                return { ...f, nodes: newNodes };
            })
        }));
    }

    set({ isRunning: false });
  },

  resetFlows: () => set(state => ({
      isRunning: false,
      activeFlowId: null,
      flows: state.flows.map(f => ({
          ...f,
          nodes: f.nodes.map(n => ({ ...n, status: 'idle' }))
      }))
  }))
}));
