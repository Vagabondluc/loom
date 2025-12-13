
import React from 'react';
import { 
  Monitor, Smartphone, Tablet, 
  Layers, Play, Share, 
  RotateCw, Undo2, Redo2, Layout, Square, Save
} from 'lucide-react';
import { CommandAction } from './types';
import { BuilderState } from '../slices/types';

// We pass the store instance or actions to the generator
export const getDefaultCommands = (
    actions: {
        setBreakpoint: BuilderState['setBreakpoint'];
        toggleOrientation: BuilderState['toggleOrientation'];
        toggleStructureMode: BuilderState['toggleStructureMode'];
        togglePreviewMode: BuilderState['togglePreviewMode'];
        selectNode: BuilderState['selectNode'];
        undo: BuilderState['undo'];
        redo: BuilderState['redo'];
        saveProject: BuilderState['saveCurrentProject'];
        onExport: () => void;
    }
): CommandAction[] => [
    {
      id: 'undo',
      label: 'Undo Change',
      icon: <Undo2 className="w-4 h-4" />,
      shortcut: 'Ctrl+Z',
      perform: () => actions.undo(),
      keywords: ['revert', 'back', 'history'],
      section: 'Edit'
    },
    {
      id: 'redo',
      label: 'Redo Change',
      icon: <Redo2 className="w-4 h-4" />,
      shortcut: 'Ctrl+Y',
      perform: () => actions.redo(),
      keywords: ['forward', 'history'],
      section: 'Edit'
    },
    {
      id: 'save',
      label: 'Save Project',
      icon: <Save className="w-4 h-4" />,
      shortcut: 'Ctrl+Alt+S',
      perform: () => {
        const name = prompt('Project Name:', `Project ${new Date().toLocaleTimeString()}`);
        if (name) actions.saveProject(name);
      },
      keywords: ['save', 'store', 'db'],
      section: 'File'
    },
    {
      id: 'export',
      label: 'Export Code',
      icon: <Share className="w-4 h-4" />,
      shortcut: 'Ctrl+S',
      perform: () => actions.onExport(),
      keywords: ['json', 'code', 'download'],
      section: 'File'
    },
    {
      id: 'view-desktop',
      label: 'Switch to Desktop View',
      icon: <Monitor className="w-4 h-4" />,
      perform: () => actions.setBreakpoint('desktop'),
      keywords: ['monitor', 'screen', 'pc'],
      section: 'View'
    },
    {
      id: 'view-tablet',
      label: 'Switch to Tablet View',
      icon: <Tablet className="w-4 h-4" />,
      perform: () => actions.setBreakpoint('tablet'),
      keywords: ['ipad'],
      section: 'View'
    },
    {
      id: 'view-mobile',
      label: 'Switch to Mobile View',
      icon: <Smartphone className="w-4 h-4" />,
      perform: () => actions.setBreakpoint('mobile'),
      keywords: ['phone', 'iphone'],
      section: 'View'
    },
    {
      id: 'toggle-orientation',
      label: 'Toggle Orientation',
      icon: <RotateCw className="w-4 h-4" />,
      perform: () => actions.toggleOrientation(),
      keywords: ['landscape', 'portrait', 'rotate'],
      section: 'View'
    },
    {
      id: 'toggle-structure',
      label: 'Toggle Structure Mode',
      icon: <Layers className="w-4 h-4" />,
      shortcut: 'Ctrl+B',
      perform: () => actions.toggleStructureMode(),
      keywords: ['wireframe', 'outline'],
      section: 'View'
    },
    {
      id: 'toggle-preview',
      label: 'Toggle Preview Mode',
      icon: <Play className="w-4 h-4" />,
      shortcut: 'Ctrl+P',
      perform: () => actions.togglePreviewMode(),
      keywords: ['run', 'play', 'test'],
      section: 'View'
    },
    {
      id: 'select-root',
      label: 'Select Root',
      icon: <Layout className="w-4 h-4" />,
      perform: () => actions.selectNode('root'),
      keywords: ['container', 'base'],
      section: 'Selection'
    },
    {
      id: 'deselect',
      label: 'Deselect All',
      icon: <Square className="w-4 h-4" />,
      shortcut: 'Esc',
      perform: () => actions.selectNode(null),
      section: 'Selection'
    }
];
