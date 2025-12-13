
import { ComponentDefinition } from '../../../types';
import { FolderOpen, MousePointer2, Square, List } from 'lucide-react';

export const patternComponents: Record<string, ComponentDefinition> = {
  'tabs': {
    id: 'tabs',
    label: 'Tabs Container',
    category: 'patterns',
    defaultTag: 'div',
    defaultClass: 'tabs tabs-lifted w-full',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: FolderOpen,
    meta: {
      composed: true
    }
  },
  'tab': {
    id: 'tab',
    label: 'Tab Trigger',
    category: 'patterns',
    defaultTag: 'input',
    defaultClass: 'tab',
    defaultData: { props: { type: 'radio', name: 'my_tabs', ariaLabel: 'Tab' } },
    allowChildren: false,
    icon: MousePointer2
  },
  'tab-content': {
    id: 'tab-content',
    label: 'Tab Content',
    category: 'patterns',
    defaultTag: 'div',
    defaultClass: 'tab-content bg-base-100 border-base-300 rounded-box p-6',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: Square
  },
  'accordion': {
    id: 'accordion',
    label: 'Accordion',
    category: 'patterns',
    defaultTag: 'div',
    defaultClass: 'join join-vertical w-full',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: List,
    meta: {
      composed: true
    }
  },
  'accordion-item': {
    id: 'accordion-item',
    label: 'Accordion Item',
    category: 'patterns',
    defaultTag: 'div',
    defaultClass: 'collapse collapse-arrow join-item border border-base-300',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: Square,
    meta: {
      composed: true
    }
  }
};
