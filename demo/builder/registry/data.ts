
import { ComponentDefinition } from '../../../types';
import { Database, Activity } from 'lucide-react';

export const dataComponents: Record<string, ComponentDefinition> = {
  'data-panel': {
    id: 'data-panel',
    label: 'Data Panel',
    category: 'data',
    defaultTag: 'div',
    defaultClass: 'card bg-base-100 shadow p-4 border border-info/20',
    defaultData: {
      props: {
        'data-url': 'https://jsonplaceholder.typicode.com/users/1',
        'data-trigger': 'load', // 'load' | 'click'
        'data-method': 'GET',
        'data-key': 'api.user'
      },
      label: 'Data Panel (Fetches on load)'
    },
    defaultLayout: { mode: 'flex', direction: 'col', gap: 2 },
    allowChildren: true,
    icon: Database
  },
  'htmx-trigger': {
    id: 'htmx-trigger',
    label: 'Action Trigger',
    category: 'data',
    defaultTag: 'button',
    defaultClass: 'btn btn-sm btn-outline',
    defaultData: {
      props: {
        'data-url': 'https://jsonplaceholder.typicode.com/posts/1',
        'data-trigger': 'click',
        'data-method': 'GET',
        'data-key': 'api.post'
      },
      label: 'Fetch Data'
    },
    allowChildren: false,
    icon: Activity
  }
};
