
import React, { useEffect, useState, useRef } from 'react';
import { useBuilderStore } from '../store';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { LayoutTemplate, Move } from 'lucide-react';

const SCROLL_ZONE_SIZE = 100;
const MAX_SCROLL_SPEED = 15;

export const DragLayer: React.FC = () => {
  const { dragState, endDrag, insertNodeTree, moveNode, setActiveDropZone, pageSettings } = useBuilderStore();
  const [position, setPosition] = useState<{ x: number, y: number } | null>(null);
  const scrollFrameRef = useRef<number>(0);
  
  // Track if we are active to attach global listeners
  const isActive = dragState.isDragging;

  // Auto-Scroll Logic
  useEffect(() => {
    if (!isActive) {
        cancelAnimationFrame(scrollFrameRef.current);
        return;
    }

    const scrollLoop = () => {
        if (!position) {
            scrollFrameRef.current = requestAnimationFrame(scrollLoop);
            return;
        }

        const { x, y } = position;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        let scrollX = 0;
        let scrollY = 0;

        // Vertical Scroll Calculations
        if (y < SCROLL_ZONE_SIZE) {
            scrollY = -MAX_SCROLL_SPEED * (1 - y / SCROLL_ZONE_SIZE);
        } else if (y > viewportHeight - SCROLL_ZONE_SIZE) {
            scrollY = MAX_SCROLL_SPEED * (1 - (viewportHeight - y) / SCROLL_ZONE_SIZE);
        }

        // Horizontal Scroll Calculations
        if (x < SCROLL_ZONE_SIZE) {
            scrollX = -MAX_SCROLL_SPEED * (1 - x / SCROLL_ZONE_SIZE);
        } else if (x > viewportWidth - SCROLL_ZONE_SIZE) {
            scrollX = MAX_SCROLL_SPEED * (1 - (viewportWidth - x) / SCROLL_ZONE_SIZE);
        }

        if (scrollX !== 0 || scrollY !== 0) {
            if (pageSettings.heightMode === 'fit') {
                // Scroll internal stage if fitting to viewport
                const stage = document.getElementById('builder-canvas-stage')?.parentElement; // The scroll container
                if (stage) {
                    stage.scrollBy(scrollX, scrollY);
                }
            } else {
                // Scroll window if growing
                window.scrollBy(scrollX, scrollY);
            }
        }

        scrollFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    scrollFrameRef.current = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(scrollFrameRef.current);
  }, [isActive, position, pageSettings.heightMode]);

  useEffect(() => {
    if (!isActive) {
        setPosition(null); // Reset on deactivate
        return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      e.preventDefault(); // Prevent scrolling on touch
      setPosition({ x: e.clientX, y: e.clientY });

      // 1. Capture all potential drop zones under the cursor
      // elementsFromPoint returns elements in visual z-order (top-most first)
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const dropZoneCandidates = elements.filter(el => el.hasAttribute('data-loom-dropzone'));

      if (dropZoneCandidates.length > 0) {
          // 2. Conflict Resolution Hierarchy
          // We sort candidates to find the "best" match based on intent.
          
          const winner = dropZoneCandidates.sort((a, b) => {
              const typeA = a.getAttribute('data-drop-type');
              const typeB = b.getAttribute('data-drop-type');

              // Rule A: Insertion Bars beats Container Boxes
              // Why: Hitting a small bar is a specific intent; hitting a large box is general.
              if (typeA === 'insertion' && typeB !== 'insertion') return -1; // A wins
              if (typeB === 'insertion' && typeA !== 'insertion') return 1;  // B wins

              // Rule B: Deepest DOM Node beats Shallower Node
              // Why: If nested, we usually mean the inner-most element we are hovering.
              // Note: elementsFromPoint usually already orders by Z-index/Paint order, 
              // which typically corresponds to depth for nested elements. 
              return 0; 
          })[0];

          const parentId = winner.getAttribute('data-parent-id');
          const indexStr = winner.getAttribute('data-index');
          
          if (parentId && indexStr !== null) {
              setActiveDropZone({ parentId, index: parseInt(indexStr, 10) });
          }
      } else {
          setActiveDropZone(null);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      // Commit Drop
      if (dragState.activeDropZone) {
          const { parentId, index } = dragState.activeDropZone;
          
          if (dragState.type === 'new') {
              insertNodeTree(parentId, dragState.payload, index);
          } else if (dragState.type === 'move') {
              moveNode(dragState.payload, parentId, index);
          }
      }
      // Always cleanup
      endDrag();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            endDrag(); // Abort
        }
    };

    // Use Pointer Events for unified Mouse/Touch handling
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);

    // Apply global cursor and disable touch actions
    document.body.style.cursor = 'grabbing';
    document.body.style.touchAction = 'none';

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.cursor = '';
      document.body.style.touchAction = '';
    };
  }, [isActive, dragState, endDrag, insertNodeTree, moveNode, setActiveDropZone]);

  if (!isActive || !position) return null;

  // Render Ghost
  // Uses a portal to ensure it's always on top and unaffected by z-index contexts
  return createPortal(
    <div 
        className="fixed pointer-events-none z-[9999]"
        style={{
            left: position.x + 10, // Slight offset so cursor isn't covered
            top: position.y + 10,
        }}
    >
        <div className={clsx(
            "p-3 rounded-lg shadow-2xl border-2 backdrop-blur-sm flex items-center gap-3 animate-in fade-in duration-75 zoom-in-95",
            dragState.type === 'new' ? "bg-base-100/90 border-primary" : "bg-neutral/90 text-neutral-content border-neutral-content/20"
        )}>
            {dragState.type === 'new' ? (
                <>
                    <LayoutTemplate className="w-5 h-5 text-primary" />
                    <span className="font-bold text-sm">{dragState.payload?.label || 'New Component'}</span>
                </>
            ) : (
                <>
                    <Move className="w-5 h-5" />
                    <span className="font-bold text-sm">Moving Node</span>
                </>
            )}
        </div>
        
        {/* Visual Cue for Drop State */}
        {dragState.activeDropZone ? (
            <div className="mt-1 ml-1 text-xs font-bold text-white bg-success px-1.5 py-0.5 rounded shadow-sm inline-block">
                Ready to Drop
            </div>
        ) : (
            <div className="mt-1 ml-1 text-xs font-bold text-white bg-error px-1.5 py-0.5 rounded shadow-sm inline-block">
                No Target
            </div>
        )}
    </div>,
    document.body
  );
};
