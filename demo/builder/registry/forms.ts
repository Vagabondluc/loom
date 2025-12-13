
import { ComponentDefinition } from '../../../types';
import { FormInput, CheckSquare, List, Type, MousePointerClick } from 'lucide-react';

export const formComponents: Record<string, ComponentDefinition> = {
  'form': {
    id: 'form',
    label: 'Form Container',
    category: 'forms',
    kind: 'container',
    defaultTag: 'form',
    defaultClass: 'space-y-4 p-4 border border-base-200 rounded-box',
    defaultLayout: { mode: 'flex', direction: 'col', gap: 4 },
    defaultData: { schemaId: 'login' }, // Default schema for demo
    allowChildren: true,
    icon: List
  },
  'input': {
    id: 'input',
    label: 'Input Field',
    category: 'forms',
    kind: 'interactive',
    defaultTag: 'input',
    defaultClass: 'input input-bordered w-full',
    defaultData: { props: { placeholder: 'Type here...' } },
    allowChildren: false,
    icon: FormInput
  },
  'textarea': {
    id: 'textarea',
    label: 'Text Area',
    category: 'forms',
    kind: 'interactive',
    defaultTag: 'textarea',
    defaultClass: 'textarea textarea-bordered w-full',
    defaultData: { props: { placeholder: 'Long text...' } },
    allowChildren: false,
    icon: Type
  },
  'select': {
    id: 'select',
    label: 'Select Menu',
    category: 'forms',
    kind: 'interactive',
    defaultTag: 'select',
    defaultClass: 'select select-bordered w-full',
    defaultData: { props: {} },
    allowChildren: true, // To add options
    icon: List
  },
  'option': {
    id: 'option',
    label: 'Option',
    category: 'forms',
    kind: 'static',
    defaultTag: 'option',
    defaultClass: '',
    defaultData: { label: 'Option 1', props: { value: '1' } },
    allowChildren: false,
    icon: MousePointerClick
  },
  'checkbox': {
    id: 'checkbox',
    label: 'Checkbox',
    category: 'forms',
    kind: 'interactive',
    defaultTag: 'input',
    defaultClass: 'checkbox checkbox-primary',
    defaultData: { props: { type: 'checkbox' } },
    allowChildren: false,
    icon: CheckSquare
  },
  'label': {
    id: 'label',
    label: 'Label',
    category: 'forms',
    kind: 'static',
    defaultTag: 'label',
    defaultClass: 'label',
    defaultLayout: { mode: 'flex', gap: 2, align: 'center' },
    allowChildren: true,
    icon: Type
  }
};
