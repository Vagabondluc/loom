
import React from 'react';
import { useNodeLogic } from './hooks/useNodeLogic';
import { IconNode } from './parts/IconNode';
import { ElementNode } from './parts/ElementNode';

interface NodeRendererProps {
  nodeId: string;
  depth?: number;
}

export const NodeRenderer = React.memo<NodeRendererProps>(({ nodeId, depth = 0 }) => {
  const logic = useNodeLogic(nodeId);

  // If node not found or hidden in preview, return null
  if (!logic || (!logic.isVisible && logic.isPreviewMode)) {
    return null;
  }

  const { node } = logic;

  // Dispatch to specific renderer based on type
  if (node.type === 'icon') {
    return <IconNode {...logic} depth={depth} />;
  }

  return <ElementNode {...logic} depth={depth} />;
});

NodeRenderer.displayName = 'NodeRenderer';
