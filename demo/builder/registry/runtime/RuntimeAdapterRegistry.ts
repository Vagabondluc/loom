
import { RuntimeAdapter } from './types';
import { BuilderNode } from '../../../types';
import { prelineAdapter } from './adapters/preline';

class AdapterRegistry {
  private adapters: Map<string, RuntimeAdapter> = new Map();

  constructor() {
    this.register(prelineAdapter);
  }

  register(adapter: RuntimeAdapter) {
    if (this.adapters.has(adapter.id)) {
        console.warn(`[RuntimeAdapterRegistry] Duplicate adapter ID registered: ${adapter.id}. Ignoring.`);
        return;
    }
    this.adapters.set(adapter.id, adapter);
  }

  getAdapterForNode(node: BuilderNode): RuntimeAdapter | undefined {
    // First, check if the node explicitly declares an adapter (future-proofing)
    // Then check supports() for auto-discovery
    for (const adapter of this.adapters.values()) {
        if (adapter.supports(node)) {
            return adapter;
        }
    }
    return undefined;
  }

  getAdapter(id: string): RuntimeAdapter | undefined {
      return this.adapters.get(id);
  }

  getAllAdapters(): RuntimeAdapter[] {
    return Array.from(this.adapters.values());
  }
}

export const runtimeAdapterRegistry = new AdapterRegistry();
