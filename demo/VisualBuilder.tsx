
import React, { useState, useEffect, useCallback } from 'react';
import { BuilderPalette } from './builder/BuilderPalette';
import { BuilderCanvas } from './builder/BuilderCanvas';
import { BuilderProperties } from './builder/BuilderProperties';
import { BuilderToolbar } from './builder/BuilderToolbar';
import { ExportModal } from './builder/ExportModal';
import { CommandPalette } from './builder/CommandPalette';
import { TemplateWizard } from './builder/TemplateWizard';
import { useBuilderStore } from './builder/store';
import { useRuntimeEnforcer } from './builder/hooks/useRuntimeEnforcer';
import { clsx } from 'clsx';

export const VisualBuilder: React.FC = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [isWizardOpen, setWizardOpen] = useState(false);
  
  // Store actions for Hotkeys & Resizing
  const { 
    setCommandPaletteOpen: toggleCommandPalette, 
    toggleStructureMode, 
    togglePreviewMode, 
    isPreviewMode, 
    deleteNode, 
    selectedNodeId, 
    selectNode, 
    undo, 
    redo,
    leftPanelWidth,
    setLeftPanelWidth,
  } = useBuilderStore();
  
  const [isResizing, setIsResizing] = useState(false);

  // Enforce Runtime Contracts (e.g., Preline Activation)
  useRuntimeEnforcer();

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const isCmdOrCtrl = e.metaKey || e.ctrlKey;
        const activeTag = document.activeElement?.tagName.toLowerCase();
        const isTyping = activeTag === 'input' || activeTag === 'textarea';

        if (isCmdOrCtrl && e.key === 'k') {
            e.preventDefault();
            toggleCommandPalette(true);
        }
        if (isCmdOrCtrl && e.key === 's') {
            e.preventDefault();
            setExportModalOpen(true);
        }
        if (isCmdOrCtrl && e.key === 'b') {
            e.preventDefault();
            toggleStructureMode();
        }
        if (isCmdOrCtrl && e.key === 'p') {
            e.preventDefault();
            togglePreviewMode();
        }
        if (isCmdOrCtrl && e.key === 'z' && !e.shiftKey && !isTyping) {
            e.preventDefault();
            undo();
        }
        if (((isCmdOrCtrl && e.key === 'y') || (isCmdOrCtrl && e.shiftKey && e.key === 'z')) && !isTyping) {
            e.preventDefault();
            redo();
        }
        if ((e.key === 'Backspace' || e.key === 'Delete') && !isTyping && selectedNodeId && selectedNodeId !== 'root' && !isPreviewMode) {
            e.preventDefault();
            deleteNode(selectedNodeId);
        }
        if (e.key === 'Escape' && !isTyping) {
            if (!document.querySelector('dialog[open]')) {
                selectNode(null);
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, isPreviewMode]);


  // Resizing Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseUp = useCallback(() => setIsResizing(false), []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setLeftPanelWidth(e.clientX);
  }, [setLeftPanelWidth]);
  
  useEffect(() => {
    const body = document.body;
    if (isResizing) {
        body.style.cursor = 'col-resize';
        body.style.userSelect = 'none';
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    } else {
        body.style.cursor = '';
        body.style.userSelect = '';
    }
    
    return () => {
        body.style.cursor = '';
        body.style.userSelect = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex-1 flex flex-col bg-base-100 animate-in fade-in duration-300 relative">
      
      <BuilderToolbar onExport={() => setExportModalOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
        
        <div style={{ width: `${leftPanelWidth}px` }} className="flex-shrink-0 h-full">
            <BuilderPalette onOpenWizard={() => setWizardOpen(true)} />
        </div>
        
        <div 
            className={clsx(
                "w-1.5 cursor-col-resize bg-base-300 hover:bg-primary transition-colors duration-200 flex-shrink-0",
                isResizing && "!bg-primary"
            )}
            onMouseDown={handleMouseDown}
        />
        
        <BuilderCanvas />
        
        <BuilderProperties />
      </div>

      <ExportModal open={exportModalOpen} onClose={() => setExportModalOpen(false)} />
      
      <TemplateWizard open={isWizardOpen} onClose={() => setWizardOpen(false)} />

      <CommandPalette onExport={() => setExportModalOpen(true)} />
    </div>
  );
};
