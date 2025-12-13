import React from 'react';
import { ViewportControls } from './ViewportControls';
import { useBuilderStore } from './store';
import { Button } from '../../ui';
import { Layout, Share, Layers, Play, Square, Undo2, Redo2, Bug } from 'lucide-react';

interface BuilderToolbarProps {
  onExport: () => void;
}

export const BuilderToolbar: React.FC<BuilderToolbarProps> = ({ onExport }) => {
  const isStructureMode = useBuilderStore(s => s.isStructureMode);
  const toggleStructureMode = useBuilderStore(s => s.toggleStructureMode);
  
  const isPreviewMode = useBuilderStore(s => s.isPreviewMode);
  const togglePreviewMode = useBuilderStore(s => s.togglePreviewMode);
  
  const isDebugMode = useBuilderStore(s => s.isDebugMode);
  const toggleDebugMode = useBuilderStore(s => s.toggleDebugMode);

  const undo = useBuilderStore(s => s.undo);
  const redo = useBuilderStore(s => s.redo);
  const canUndo = useBuilderStore(s => s.history.past.length > 0);
  const canRedo = useBuilderStore(s => s.history.future.length > 0);

  return (
    <div className="h-14 border-b border-base-300 bg-base-100 flex items-center justify-between px-4 shadow-sm z-20">
       <div className="flex items-center gap-4">
          <div className="text-sm font-bold opacity-50 hidden sm:block">Editor</div>
          
          <div className="h-6 w-px bg-base-300 mx-2 hidden sm:block"></div>
          
          {/* History Controls */}
          <div className="join">
              <button 
                className="join-item btn btn-sm btn-ghost" 
                onClick={undo} 
                disabled={!canUndo || isPreviewMode}
                title="Undo (Ctrl+Z)"
              >
                  <Undo2 className="w-4 h-4" />
              </button>
              <button 
                className="join-item btn btn-sm btn-ghost" 
                onClick={redo} 
                disabled={!canRedo || isPreviewMode}
                title="Redo (Ctrl+Y)"
              >
                  <Redo2 className="w-4 h-4" />
              </button>
          </div>

          <div className="h-6 w-px bg-base-300 mx-2 hidden sm:block"></div>

          <ViewportControls />
       </div>

       <div className="flex items-center gap-2">
         {/* Preview Toggle */}
         <Button 
           size="sm" 
           variant={isPreviewMode ? 'accent' : 'ghost'} 
           onClick={togglePreviewMode}
           className="gap-2 font-bold"
           title={isPreviewMode ? "Exit Preview" : "Preview Interactions"}
         >
            {isPreviewMode ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
            {isPreviewMode ? 'Stop' : 'Play'}
         </Button>

         <div className="w-px h-6 bg-base-300 mx-2"></div>

         <button 
           className={`btn btn-sm ${isStructureMode ? 'btn-primary' : 'btn-ghost'}`}
           onClick={toggleStructureMode}
           disabled={isPreviewMode}
           title="Toggle Structure Mode (Ctrl+B)"
         >
           <Layers className="w-4 h-4 mr-2" />
           Structure
         </button>
         
         <button 
           className={`btn btn-sm btn-square ${isDebugMode ? 'text-error bg-error/10' : 'btn-ghost text-base-content/30'}`}
           onClick={toggleDebugMode}
           disabled={isPreviewMode}
           title="Toggle Envelope Debugger"
         >
           <Bug className="w-4 h-4" />
         </button>
         
         <div className="w-px h-6 bg-base-300 mx-2"></div>
         
         <Button size="sm" variant="ghost" onClick={onExport}>
           <Share className="w-4 h-4 mr-2" /> Export
         </Button>
       </div>
    </div>
  );
};