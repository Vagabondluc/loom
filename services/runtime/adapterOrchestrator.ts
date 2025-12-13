import { BuilderNode } from '../../types';
import { runtimeAdapterRegistry } from '../registry/runtime/registry';

export type ElementLookup = (id: string) => HTMLElement | null;
export type RuntimeLogger = (event: string, payload?: any) => void;

export const mountAdaptersForNodes = (
  nodes: Record<string, BuilderNode>,
  getElement: ElementLookup,
  logger: RuntimeLogger = () => {}
): (() => void) => {
  const cleanupFns: Array<() => void> = [];

  Object.values(nodes).forEach((node) => {
    const adapter = runtimeAdapterRegistry.getAdapterForNode(node);
    if (!adapter) return;

    const el = getElement(node.id);
    if (!el) return;

    try {
      const cleanup = adapter.init({ node, element: el, log: (evt, payload) => logger(evt, payload) });
      if (typeof cleanup === 'function') cleanupFns.push(cleanup);
    } catch (e) {
      console.error('[runtime] adapter init failed', e);
    }
  });

  return () => {
    cleanupFns.forEach(fn => {
      try { fn(); } catch (e) { console.error('[runtime] adapter teardown error', e); }
    });
  };
};
