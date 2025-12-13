
import { useMemo } from 'react';
import { useBuilderStore } from '../store';
import { getDefaultCommands } from './defaultCommands';
import { Trash2, MessageSquare } from 'lucide-react';
import { CommandAction } from './types';
import React from 'react';

export const useCommands = (onExport: () => void) => {
  const store = useBuilderStore();
  
  // Extract actions from store to prevent unnecessary re-renders when other state changes
  const actions = {
      setBreakpoint: store.setBreakpoint,
      toggleOrientation: store.toggleOrientation,
      toggleStructureMode: store.toggleStructureMode,
      togglePreviewMode: store.togglePreviewMode,
      selectNode: store.selectNode,
      undo: store.undo,
      redo: store.redo,
      saveProject: store.saveCurrentProject,
      onExport
  };

  const selectedNodeId = useBuilderStore(s => s.selectedNodeId);
  const deleteNode = useBuilderStore(s => s.deleteNode);
  const updateNodeEvents = useBuilderStore(s => s.updateNodeEvents);
  const nodes = useBuilderStore(s => s.nodes);

  const commands = useMemo(() => {
    const defaults = getDefaultCommands(actions);
    
    // Context-aware commands
    if (selectedNodeId && selectedNodeId !== 'root') {
        const contextCommands: CommandAction[] = [
            {
                id: 'delete-node',
                label: 'Delete Selected Node',
                icon: React.createElement(Trash2, { className: "w-4 h-4 text-error" }),
                shortcut: 'Del',
                perform: () => deleteNode(selectedNodeId),
                keywords: ['remove', 'destroy'],
                section: 'Context'
            },
            {
                id: 'add-toast-interaction',
                label: 'Add Toast on Click',
                icon: React.createElement(MessageSquare, { className: "w-4 h-4 text-info" }),
                perform: () => {
                    const node = nodes[selectedNodeId];
                    if (!node) return;
                    
                    const currentEvents = node.events?.['onClick'] || [];
                    updateNodeEvents(selectedNodeId, {
                        ...node.events,
                        'onClick': [
                            ...currentEvents,
                            { 
                                type: 'toast', 
                                payload: { message: 'Hello from Command Palette!', type: 'success' } 
                            }
                        ]
                    });
                },
                keywords: ['event', 'interaction', 'alert', 'message'],
                section: 'Context'
            }
        ];
        return [...contextCommands, ...defaults];
    }
    
    return defaults;
  }, [selectedNodeId, deleteNode, updateNodeEvents, nodes, actions]);

  return commands;
};
