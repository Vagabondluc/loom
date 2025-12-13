
import React from 'react';
import { useBuilderStore } from '../store';
import { Template } from '../../../types';
import { COMPONENT_REGISTRY } from '../registries';

export const usePaletteInteractions = () => {
  const startDrag = useBuilderStore(s => s.startDrag);
  const insertNodeTree = useBuilderStore(s => s.insertNodeTree);
  const selectedNodeId = useBuilderStore(s => s.selectedNodeId);
  const nodes = useBuilderStore(s => s.nodes);

  // Controlled Drag Initiation using Pointer Events
  const handlePointerDown = (e: React.PointerEvent, template: Template, type: 'new' | 'move' = 'new', existingNodeId?: string) => {
    // Only left click or touch
    if (e.button !== 0) return;
    
    e.stopPropagation();
    // Prevent default to stop scrolling/text selection.
    // We do NOT capture pointer here. The DragLayer will attach global listeners 
    // to 'window' immediately upon 'isDragging' state change.
    // Holding capture on the palette item (which stays in the sidebar) can 
    // interfere with the global drag logic.
    e.preventDefault(); 
    
    const payload = type === 'new' ? template : existingNodeId;
    startDrag(type, payload);
  };

  // Legacy fallback or future use
  const handleKeyDown = (e: React.KeyboardEvent, template: Template) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetId = selectedNodeId || 'root';
        const targetNode = nodes[targetId];
        
        const targetDef = COMPONENT_REGISTRY[targetNode.type];
        
        if (targetDef?.allowChildren) {
             insertNodeTree(targetId, template);
        } else if (targetNode.parentId) {
             insertNodeTree(targetNode.parentId, template);
        } else {
             insertNodeTree('root', template);
        }
    }
  };

  return { handleMouseDown: handlePointerDown, handleKeyDown };
};
