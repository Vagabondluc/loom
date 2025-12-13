
import React, { useEffect, useState } from 'react';
import { useBuilderStore } from './store';
import { getEnvelopeRect, Envelope } from './utils/envelope';
import { getBoxModel, BoxModel } from './utils/boxModel';
import { clsx } from 'clsx';
import { QuickActionsToolbar } from './canvas/QuickActionsToolbar';
import { COMPONENT_REGISTRY } from './registries';
import { PlayCircle } from 'lucide-react';

export const CanvasOverlay: React.FC = () => {
  const selectedNodeId = useBuilderStore(s => s.selectedNodeId);
  const hoveredNodeId = useBuilderStore(s => s.hoveredNodeId);
  const node = useBuilderStore(s => s.selectedNodeId ? s.nodes[s.selectedNodeId] : null);
  const activeBreakpoint = useBuilderStore(s => s.activeBreakpoint);
  const showDebugOutlines = useBuilderStore(s => s.isDebugMode);
  const isStructureMode = useBuilderStore(s => s.isStructureMode);
  
  const [rect, setRect] = useState<Envelope | null>(null);
  const [hoverRect, setHoverRect] = useState<Omit<Envelope, 'type'> | null>(null);
  const [boxModel, setBoxModel] = useState<BoxModel | null>(null);

  const def = node ? COMPONENT_REGISTRY[node.type] : null;

  // Optimized Rect Calculation using ResizeObserver
  useEffect(() => {
    const updateRects = () => {
      // 1. Selection Envelope
      if (selectedNodeId && node) {
        const envelope = getEnvelopeRect(selectedNodeId, node.type);
        if (envelope) setRect(envelope);
      } else {
        setRect(null);
      }

      // 2. Hover Envelope OR Box Model
      if (hoveredNodeId && hoveredNodeId !== selectedNodeId) {
         if (isStructureMode) {
             const bm = getBoxModel(hoveredNodeId);
             setBoxModel(bm);
             setHoverRect(null);
         } else {
             const hoveredNode = useBuilderStore.getState().nodes[hoveredNodeId];
             if (hoveredNode) {
                const envelope = getEnvelopeRect(hoveredNodeId, hoveredNode.type);
                setHoverRect(envelope ? { top: envelope.top, left: envelope.left, width: envelope.width, height: envelope.height } : null);
                setBoxModel(null);
             }
         }
      } else {
         setHoverRect(null);
         setBoxModel(null);
      }
    };

    // Initial calculation
    updateRects();
    
    // Use ResizeObserver to track layout changes efficiently without polling
    const observer = new ResizeObserver(() => {
        requestAnimationFrame(updateRects);
    });

    const stage = document.getElementById('builder-canvas-stage');
    const el = selectedNodeId ? document.getElementById(selectedNodeId) : null;
    const hoverEl = hoveredNodeId ? document.getElementById(hoveredNodeId) : null;

    if (stage) observer.observe(stage);
    if (el) observer.observe(el);
    if (hoverEl) observer.observe(hoverEl);

    // Listen for scroll and resize events which ResizeObserver might miss (e.g. parent scroll)
    window.addEventListener('resize', updateRects);
    window.addEventListener('scroll', updateRects, true);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', updateRects, true);
    };
  }, [selectedNodeId, hoveredNodeId, activeBreakpoint, node, showDebugOutlines, isStructureMode]);

  return (
    <>
      {/* Structure Mode: Box Model Visualization */}
      {isStructureMode && boxModel && (
        <div className="absolute pointer-events-none z-[90]">
            {/* Margin (Orange) */}
            <div 
                className="absolute border-orange-500/30 border-solid"
                style={{
                    top: boxModel.rect.top - boxModel.margin.top,
                    left: boxModel.rect.left - boxModel.margin.left,
                    width: boxModel.rect.width,
                    height: boxModel.rect.height,
                    borderTopWidth: boxModel.margin.top,
                    borderRightWidth: boxModel.margin.right,
                    borderBottomWidth: boxModel.margin.bottom,
                    borderLeftWidth: boxModel.margin.left,
                    boxSizing: 'content-box'
                }}
            />
            {/* Padding (Green) */}
            <div 
                className="absolute border-green-500/30 border-solid"
                style={{
                    top: boxModel.rect.top,
                    left: boxModel.rect.left,
                    width: boxModel.rect.width,
                    height: boxModel.rect.height,
                    borderTopWidth: boxModel.padding.top,
                    borderRightWidth: boxModel.padding.right,
                    borderBottomWidth: boxModel.padding.bottom,
                    borderLeftWidth: boxModel.padding.left,
                    boxSizing: 'border-box'
                }}
            />
            {/* Content Label (Dimensions) */}
            <div 
                className="absolute bg-neutral text-neutral-content text-[9px] font-mono px-1 rounded shadow-sm z-[100]"
                style={{
                    top: boxModel.rect.top + boxModel.rect.height + 4,
                    left: boxModel.rect.left + (boxModel.rect.width/2) - 20
                }}
            >
                {Math.round(boxModel.rect.width)} × {Math.round(boxModel.rect.height)}
            </div>
        </div>
      )}

      {/* Standard Mode: Hover Outline */}
      {hoverRect && !isStructureMode && (
        <div
          className="absolute pointer-events-none z-[99] border-2 border-dashed border-secondary"
          style={{ ...hoverRect }}
        />
      )}

      {/* Selection Envelope */}
      {rect && selectedNodeId && node && (
        <div 
          className={clsx(
              "absolute pointer-events-none z-[100] transition-all duration-75 ease-out",
              rect.type === 'interaction' && showDebugOutlines ? "border border-error bg-error/10" : "border-2 border-primary"
          )}
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            boxShadow: rect.type === 'layout' ? '0 0 0 1px rgba(255, 255, 255, 0.4)' : 'none'
          }}
        >
          {/* Label Badge */}
          <div className="absolute -top-6 left-[-2px] bg-primary text-primary-content text-[10px] font-bold px-2 py-0.5 rounded-t font-mono flex items-center gap-2 whitespace-nowrap shadow-sm">
            {def?.meta?.runtimeOnly && (
              <span title="Interactive in Preview Mode">
                <PlayCircle className="w-3 h-3 text-white/70" />
              </span>
            )}
            <span>{node.type}</span>
            <span className="opacity-70">#{node.id.substr(-4)}</span>
            {node.layout?.mode !== 'static' && (
               <span className="badge badge-xs badge-neutral bg-black/20 border-none text-white">
                 {node.layout?.mode}
               </span>
            )}
            {showDebugOutlines && rect.type === 'interaction' && (
               <span className="badge badge-xs badge-error text-white">Expanded</span>
            )}
          </div>
          
          {/* Corner Handles */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary border border-white rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary border border-white rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary border border-white rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary border border-white rounded-full"></div>

          {/* Quick Actions Toolbar */}
          <QuickActionsToolbar node={node} rect={rect} />
        </div>
      )}
    </>
  );
};
