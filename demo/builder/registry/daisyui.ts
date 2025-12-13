
import { ComponentDefinition } from '../../../types';
import { MousePointer2, Square } from 'lucide-react';

export const daisyUiComponents: Record<string, ComponentDefinition> = {
  'btn': {
    id: 'btn',
    label: 'Button',
    category: 'daisyui',
    kind: 'static',
    defaultTag: 'button',
    defaultClass: 'btn btn-primary',
    defaultData: { label: 'Button' },
    allowChildren: false,
    icon: MousePointer2
  },
  'card': {
    id: 'card',
    label: 'Card',
    category: 'daisyui',
    kind: 'container',
    defaultTag: 'div',
    defaultClass: 'card bg-base-100 shadow-xl bordered',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: Square,
    meta: {
      composed: true // Treat as a unit; children are unselectable unless they are containers
    }
  },
  'card-body': {
    id: 'card-body',
    label: 'Card Body',
    category: 'daisyui',
    kind: 'container',
    defaultTag: 'div',
    defaultClass: 'card-body',
    defaultLayout: { mode: 'static' },
    allowChildren: true,
    icon: Square
  },
  'alert': {
    id: 'alert',
    label: 'Alert',
    category: 'daisyui',
    kind: 'static',
    defaultTag: 'div',
    defaultClass: 'alert alert-info',
    defaultData: { label: 'Info: Something happened.' },
    allowChildren: false,
    icon: Square
  },
  'badge': {
    id: 'badge',
    label: 'Badge',
    category: 'daisyui',
    kind: 'static',
    defaultTag: 'span',
    defaultClass: 'badge badge-secondary',
    defaultData: { label: 'New' },
    allowChildren: false,
    icon: Square
  }
};
