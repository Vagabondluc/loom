
import { ComponentDefinition } from '../../../types';
import { Layout, Box, Layers, Command, AppWindow } from 'lucide-react';

export const layoutComponents: Record<string, ComponentDefinition> = {
  'container': {
    id: 'container',
    label: 'Container',
    category: 'layout',
    defaultTag: 'div',
    defaultClass: 'p-4 border border-dashed border-base-content/20 min-h-[100px] rounded',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: Layout,
    meta: {
      minDimensions: { width: 24, height: 24 }
    }
  },
  'flex-row': {
    id: 'flex-row',
    label: 'Flex Row',
    category: 'layout',
    defaultTag: 'div',
    defaultClass: 'p-2 border border-dashed border-primary/30 min-h-[50px]',
    defaultLayout: { mode: 'flex', direction: 'row', gap: 4, wrap: 'wrap' },
    allowChildren: true,
    icon: Box,
    meta: {
      minDimensions: { width: 24, height: 24 }
    }
  },
  'grid-2': {
    id: 'grid-2',
    label: 'Grid (2 Col)',
    category: 'layout',
    defaultTag: 'div',
    defaultClass: 'p-2 border border-dashed border-secondary/30 min-h-[50px]',
    defaultLayout: { mode: 'flex', direction: 'row', gap: 4 },
    allowChildren: true,
    icon: Box,
    meta: {
      minDimensions: { width: 24, height: 24 }
    }
  },
  'panel': {
    id: 'panel',
    label: 'Panel',
    category: 'layout',
    defaultTag: 'div',
    defaultClass: 'bg-base-200 p-6 rounded-box shadow-sm',
    defaultLayout: { mode: 'flex', direction: 'col', gap: 4 },
    allowChildren: true,
    icon: AppWindow,
    meta: { composed: true }
  },
  'surface': {
    id: 'surface',
    label: 'Surface',
    category: 'layout',
    defaultTag: 'div',
    defaultClass: 'bg-base-100 border border-base-200 rounded',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: Layers
  },
  'toolbar': {
    id: 'toolbar',
    label: 'Toolbar',
    category: 'layout',
    defaultTag: 'div',
    defaultClass: 'navbar bg-base-100 border-b border-base-200 min-h-[3rem] px-4 gap-2',
    defaultLayout: { mode: 'flex', direction: 'row', align: 'center', gap: 2 },
    allowChildren: true,
    icon: Command
  }
};
