
import React, { useRef } from 'react';
import { useBuilderStore } from '../../store';
import { useRuntimeStore } from '../../../../stores/runtimeStore';
import { evaluateExpression } from '../../../../utils/expressionEngine';
import { COMPONENT_REGISTRY } from '../../registries';
import { clsx } from 'clsx';
import { getLayoutClasses, resolveEffectiveLayout } from '../../layoutUtils';
import { executeNodeActions } from '../runtime/actionExecutor';

const DRAG_THRESHOLD = 3; // pixels

export const useNodeLogic = (nodeId: string) => {
  const node = useBuilderStore(s => s.nodes[nodeId]);
  const parentId = node?.parentId;
  const parent = useBuilderStore(s => parentId ? s.nodes[parentId] : undefined);
  
  const selectNode = useBuilderStore(s => s.selectNode);
  const startDrag = useBuilderStore(s => s.startDrag);
  const isStructureMode = useBuilderStore(s => s.isStructureMode);
  const isPreviewMode = useBuilderStore(s => s.isPreviewMode);
  const isDragging = useBuilderStore(s => s.dragState.isDragging);
  const activeBreakpoint = useBuilderStore(s => s.activeBreakpoint);
  const runtimeVariables = useRuntimeStore(s => s.variables);

  // Refs for tracking pointer movement
  const pointerStartRef = useRef<{ x: number, y: number } | null>(null);

  if (!node) return null;

  const def = COMPONENT_REGISTRY[node.type];
  const parentDef = parent ? COMPONENT_REGISTRY[parent.type] : null;

  const isContainer = def?.allowChildren;
  const isRoot = node.id === 'root';

  // Composed Logic
  const isParentComposed = parentDef?.meta?.composed;
  const isUnselectable = isParentComposed && !isContainer && !isRoot && !isPreviewMode;

  const isVisible = node.logic?.visibleWhen 
    ? evaluateExpression(node.logic.visibleWhen, runtimeVariables) 
    : true;

  // New Pointer Handler: Handles Click vs Drag
  const handlePointerDown = (e: React.PointerEvent) => {
      if (isRoot || isPreviewMode || isUnselectable) return;
      if (e.button !== 0) return; // Only primary button

      e.stopPropagation();
      // e.preventDefault() is often needed on touch to prevent scrolling *before* we capture,
      // but 'touch-action: none' CSS should handle it more gracefully.
      // However, preventing default here ensures no other gestures fire.
      e.preventDefault(); 

      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);
      
      pointerStartRef.current = { x: e.clientX, y: e.clientY };

      const onPointerMove = (moveEvent: PointerEvent) => {
          if (!pointerStartRef.current) return;
          
          const dx = Math.abs(moveEvent.clientX - pointerStartRef.current.x);
          const dy = Math.abs(moveEvent.clientY - pointerStartRef.current.y);

          // If threshold exceeded, start drag
          if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
              startDrag('move', nodeId);
              selectNode(nodeId); // Auto-select on drag start
              
              // Cleanup local listeners as DragLayer takes over global events
              target.removeEventListener('pointermove', onPointerMove as any);
              target.removeEventListener('pointerup', onPointerUp as any);
              target.releasePointerCapture(e.pointerId);
              pointerStartRef.current = null;
          }
      };

      const onPointerUp = (upEvent: PointerEvent) => {
          // If we reach here, it was a click (threshold not exceeded)
          if (pointerStartRef.current) {
              selectNode(nodeId);
          }
          
          target.removeEventListener('pointermove', onPointerMove as any);
          target.removeEventListener('pointerup', onPointerUp as any);
          target.releasePointerCapture(e.pointerId);
          pointerStartRef.current = null;
      };

      target.addEventListener('pointermove', onPointerMove as any);
      target.addEventListener('pointerup', onPointerUp as any);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Normal clicks are handled via pointer events logic for editing
    // Only Preview Mode interactions use standard onClick
    if (isPreviewMode) {
        e.stopPropagation();
        executeNodeActions(node);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isPreviewMode || isUnselectable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      selectNode(nodeId);
    }
  };

  const effectiveLayout = resolveEffectiveLayout(node, activeBreakpoint);
  const layoutClasses = getLayoutClasses(effectiveLayout);

  const showStructure = (isStructureMode || isDragging) && !isPreviewMode;
  const structureClasses = showStructure ? clsx(
    'outline outline-1 outline-dashed outline-base-content/20 p-1 min-h-[2rem] relative', 
    isContainer && 'bg-base-content/5', 
    effectiveLayout?.mode === 'flex' && 'gap-2',
    effectiveLayout?.mode === 'grid' && 'gap-2'
  ) : '';

  const classes = clsx(
    node.data.className,
    layoutClasses,
    structureClasses,
    !isRoot && !isPreviewMode && !isUnselectable && 'cursor-grab active:cursor-grabbing',
    !isRoot && isPreviewMode && node.events?.['onClick'] && 'cursor-pointer hover:opacity-80 active:scale-95 transition-transform', 
    'relative group',
    isContainer && node.children.length === 0 && !isStructureMode && !isRoot && !isPreviewMode && 'min-h-[100px] outline-dashed outline-2 outline-base-content/10',
    !isVisible && !isPreviewMode && 'opacity-50 grayscale border border-warning border-dashed',
    isUnselectable && 'pointer-events-none'
  );

  // Dynamic Tag Resolution: Allow node data to override registry default
  const Tag = (node.data.tagName || def?.defaultTag || 'div') as React.ElementType;
  const isVoid = ['img', 'input', 'hr', 'br'].includes(Tag.toString());
  
  const safeProps = { ...node.data.props };
  if (Tag === 'img' || node.type === 'image') {
      if (!safeProps.src || typeof safeProps.src !== 'string') {
          safeProps.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; 
      }
  }
  if (node.type === 'tab' && node.parentId) {
      safeProps.name = `tab-group-${node.parentId}`;
  }

  // Ensure touch action is none for draggable items to prevent scrolling while dragging
  const style = {
      ...node.data.style,
      touchAction: (!isRoot && !isPreviewMode && !isUnselectable) ? 'none' : undefined
  };

  return {
    node,
    isVisible,
    isPreviewMode,
    isStructureMode,
    isContainer,
    isVoid,
    Tag,
    classes,
    safeProps: { ...safeProps, style }, // Merge touch-action into styles
    handlers: {
        onClick: handleClick,
        onPointerDown: handlePointerDown,
        onKeyDown: handleKeyDown,
        tabIndex: (!isRoot && !isPreviewMode && !isUnselectable) ? 0 : undefined,
        role: (!isRoot && !isPreviewMode && !isUnselectable) ? 'button' : undefined,
        ariaLabel: node.data.label || node.type,
        // Remove draggable attribute as we use custom pointer events
        draggable: false 
    }
  };
};
