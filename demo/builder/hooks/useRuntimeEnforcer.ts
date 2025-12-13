
import { useEffect } from 'react';
import { useBuilderStore } from '../store';
import { mountAdaptersForNodes } from '../registry/runtime/enforcer';
import { BuilderNode } from '../../../types';

export const useRuntimeEnforcer = () => {
  const isPreviewMode = useBuilderStore(s => s.isPreviewMode);
  const nodes = useBuilderStore(s => s.nodes);

  useEffect(() => {
    if (!isPreviewMode) return;

    const cleanup = mountAdaptersForNodes(nodes as Record<string, BuilderNode>, id => document.getElementById(id), (evt, payload) => console.debug(`[Runtime] ${evt}`, payload));
    return cleanup;
  }, [isPreviewMode]); // Only run when preview mode toggles.
};
