
import React from 'react';
import { useBuilderStore } from './store';
import { clsx } from 'clsx';
import { Plus } from 'lucide-react';

interface DropZoneProps {
  parentId: string;
  index: number;
  isEmpty?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ parentId, index, isEmpty }) => {
  const isDragging = useBuilderStore(s => s.dragState.isDragging);
  const activeDropZone = useBuilderStore(s => s.dragState.activeDropZone);
  const isStructureMode = useBuilderStore(s => s.isStructureMode);
  
  // Is this specific zone currently the active target?
  const isActive = activeDropZone?.parentId === parentId && activeDropZone?.index === index;
  
  // Visibility: In Structure Mode OR when dragging
  const isVisible = isDragging || isStructureMode;

  if (isEmpty) {
    return (
        <div 
            data-loom-dropzone="true"
            data-drop-type="container"
            data-parent-id={parentId}
            data-index={index}
            className={clsx(
                "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 w-full select-none relative z-10 pointer-events-auto",
                "min-h-[120px]",
                isActive 
                    ? "border-primary bg-primary/10 scale-[1.02]" 
                    : isVisible
                        ? "border-base-content/10 border-dashed bg-base-100/5" 
                        : "border-transparent"
            )}
        >
            {isVisible && (
                <>
                    <Plus className={clsx("w-6 h-6 mb-2", isActive ? "text-primary" : "text-base-content/40")} />
                    <span className={clsx("text-xs font-bold uppercase tracking-wider", isActive ? "text-primary" : "text-base-content/40")}>
                        {isDragging ? "Drop Content Here" : "Empty Container"}
                    </span>
                </>
            )}
        </div>
    );
  }

  // Interstitial Drop Zone (Bar)
  return (
    <div 
        data-loom-dropzone="true"
        data-drop-type="insertion"
        data-parent-id={parentId}
        data-index={index}
        className={clsx(
            "transition-all duration-150 relative w-full z-20 pointer-events-auto",
            isDragging ? "h-8" : "h-0",
        )}
    >
        {/* Visual Indicator Line - Always Absolute to prevent reflow in Structure Mode */}
        <div className={clsx(
            "absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 pointer-events-none",
            // Active State (Hover/Drop)
            isActive 
                ? "h-1.5 bg-primary shadow-[0_0_10px_rgba(87,13,248,0.7)] scale-x-100 z-50" 
                // Idle State (Structure Mode or Dragging nearby)
                : isVisible
                    ? "h-0.5 bg-primary/30 scale-x-95" 
                    : "h-0 bg-transparent"
        )} />
    </div>
  );
};
