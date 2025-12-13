
import React from 'react';
import { useBuilderStore } from './store';
import { clsx } from 'clsx';
import { CanvasOverlay } from './CanvasOverlay';
import { NodeRenderer } from './canvas/NodeRenderer';
import { viewportMap } from '../../config/viewports';

const maxWidthMap = {
  full: 'none',
  '7xl': '1280px',
  '5xl': '1024px',
  '3xl': '768px'
};

export const BuilderCanvas: React.FC = () => {
  const { 
    rootNodeId,
    selectNode,
    activeBreakpoint,
    orientation,
    isPreviewMode,
    pageSettings
  } = useBuilderStore(s => ({
    rootNodeId: s.rootNodeId,
    selectNode: s.selectNode,
    activeBreakpoint: s.activeBreakpoint,
    orientation: s.orientation,
    isPreviewMode: s.isPreviewMode,
    pageSettings: s.pageSettings
  }));

  const currentView = viewportMap[activeBreakpoint]?.[orientation] || viewportMap.desktop.landscape;
  const isGrowMode = pageSettings.heightMode === 'grow';

  return (
    <div 
      className={clsx(
        "flex-1 bg-base-100 p-4 flex flex-col items-center transition-colors relative",
        isGrowMode ? 'justify-start' : 'justify-start overflow-hidden'
      )}
      onClick={() => !isPreviewMode && selectNode(null)}
      style={{
        backgroundImage: isPreviewMode ? 'none' : 'radial-gradient(circle, #00000008 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Dimension Label */}
      {!isPreviewMode && (
        <div className="text-[10px] font-mono opacity-30 text-center uppercase tracking-widest flex-shrink-0 mb-4">
          {activeBreakpoint} • {orientation} • {currentView.width}
          {currentView.height ? ` x ${currentView.height}` : (currentView.aspectRatio ? ` (aspect ${currentView.aspectRatio})` : '')}
        </div>
      )}
      
      {/* This container will dictate the stage's max size */}
      <div 
        className={clsx(
          "w-full flex justify-center items-start pt-4",
          isGrowMode ? 'flex-grow' : 'flex-1'
        )}
        style={{ maxWidth: maxWidthMap[pageSettings.maxWidth] }}
      >
        <div 
          id="builder-canvas-stage"
          className={clsx(
              "bg-white shadow-xl rounded-none ring-1 relative transition-all duration-300 ease-in-out origin-top",
              isPreviewMode ? "ring-transparent shadow-2xl" : "ring-base-300",
              !isGrowMode && "overflow-y-auto"
          )}
          style={{ 
              width: currentView.width,
              height: isGrowMode ? undefined : (currentView.height || '100%'),
              minHeight: isGrowMode ? 'calc(100vh - 10rem)' : undefined,
              aspectRatio: isGrowMode ? undefined : currentView.aspectRatio,
              // The stage will now respect its container's size and scale down
              maxWidth: '100%',
              maxHeight: isGrowMode ? undefined : '100%',
          }}
        >
          {!isPreviewMode && <CanvasOverlay />}
          <NodeRenderer nodeId={rootNodeId} />
        </div>
      </div>
    </div>
  );
};