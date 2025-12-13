
import { ComponentDefinition } from '../../../types';
import { CreditCard, MousePointerClick, LayoutTemplate, List, AppWindow, FolderOpen } from 'lucide-react';

export const prelineComponents: Record<string, ComponentDefinition> = {
  'preline-card': {
    id: 'preline-card',
    label: 'Preline Card',
    category: 'preline',
    kind: 'container',
    defaultTag: 'div',
    defaultClass: 'flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: CreditCard
  },
  'preline-card-header': {
    id: 'preline-card-header',
    label: 'Card Header',
    category: 'preline',
    kind: 'container',
    defaultTag: 'div',
    defaultClass: 'bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-slate-900 dark:border-gray-700',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: LayoutTemplate
  },
  'preline-card-body': {
    id: 'preline-card-body',
    label: 'Card Body',
    category: 'preline',
    kind: 'container',
    defaultTag: 'div',
    defaultClass: 'p-4 md:p-5',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: LayoutTemplate
  },
  'preline-btn-primary': {
    id: 'preline-btn-primary',
    label: 'Solid Button',
    category: 'preline',
    kind: 'static',
    defaultTag: 'button',
    defaultClass: 'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
    defaultData: { label: 'Button' },
    allowChildren: false,
    icon: MousePointerClick
  },
  'preline-btn-outline': {
    id: 'preline-btn-outline',
    label: 'Outline Button',
    category: 'preline',
    kind: 'static',
    defaultTag: 'button',
    defaultClass: 'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
    defaultData: { label: 'Outline' },
    allowChildren: false,
    icon: MousePointerClick
  },
  'preline-accordion': {
    id: 'preline-accordion',
    label: 'Accordion',
    category: 'preline',
    kind: 'applet',
    defaultTag: 'div',
    defaultClass: 'hs-accordion-group',
    defaultData: { label: '' },
    allowChildren: true,
    icon: List,
    meta: { 
      runtimeOnly: true, 
      composed: true,
      runtimeAdapterId: 'preline'
    }
  },
  'preline-tabs': {
    id: 'preline-tabs',
    label: 'Tabs',
    category: 'preline',
    kind: 'applet',
    defaultTag: 'div',
    defaultClass: 'border-b border-gray-200 dark:border-gray-700',
    defaultData: { label: '' },
    allowChildren: true,
    icon: FolderOpen,
    meta: { 
      runtimeOnly: true, 
      composed: true,
      runtimeAdapterId: 'preline'
    }
  },
  'preline-modal': {
    id: 'preline-modal',
    label: 'Modal',
    category: 'preline',
    kind: 'applet',
    defaultTag: 'div',
    defaultClass: '',
    defaultData: { props: { 'data-hs-overlay': '#my-modal' } },
    allowChildren: true,
    icon: AppWindow,
    meta: { 
      runtimeOnly: true, 
      composed: true,
      runtimeAdapterId: 'preline' 
    }
  }
};
