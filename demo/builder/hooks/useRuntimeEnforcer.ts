
import { useEffect } from 'react';
import { useBuilderStore } from '../store';
import { runtimeAdapterRegistry } from '../registry/runtime/RuntimeAdapterRegistry';
import { BuilderNode } from '../../../types';

export const useRuntimeEnforcer = () => {
  const isPreviewMode = useBuilderStore(s => s.isPreviewMode);
  const nodes = useBuilderStore(s => s.nodes);

  useEffect(() => {
    if (!isPreviewMode) return;

    // 1. Identify required adapters based on current nodes
    const activeAdapters = new Set<string>();
    const cleanupFns: Array<() => void> = [];

    // 2. Activate adapters for each relevant node
    // In a real optimized system, we might group this by adapter type to avoid redundant init calls
    // But for now, we follow the registry's capability to resolve per node.
    // However, Preline often uses global init.
    
    // We will iterate and init.
    // Optimization: Just get unique adapters first?
    // The new adapter interface supports `init(context)`.
    
    Object.values(nodes).forEach((node: BuilderNode) => {
        const adapter = runtimeAdapterRegistry.getAdapterForNode(node);
        if (adapter) {
            const element = document.getElementById(node.id);
            if (element) {
                const cleanup = adapter.init({ 
                    node, 
                    element, 
                    log: (evt, payload) => console.debug(`[Runtime] ${evt}`, payload) 
                });
                if (cleanup) cleanupFns.push(cleanup);
            }
        }
    });

    // 3. Cleanup when leaving preview mode
    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, [isPreviewMode]); // Only run when preview mode toggles.
};
