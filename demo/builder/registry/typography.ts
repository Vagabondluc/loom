
import { ComponentDefinition } from '../../../types';
import { Type, FileText } from 'lucide-react';

export const typographyComponents: Record<string, ComponentDefinition> = {
  'heading': {
    id: 'heading',
    label: 'Heading',
    category: 'typography',
    defaultTag: 'h2',
    defaultClass: 'text-2xl font-bold',
    defaultData: { label: 'Heading Text' },
    allowChildren: false,
    icon: Type
  },
  'paragraph': {
    id: 'paragraph',
    label: 'Paragraph',
    category: 'typography',
    defaultTag: 'p',
    defaultClass: 'text-base-content/80',
    defaultData: { label: 'Lorem ipsum dolor sit amet.' },
    allowChildren: false,
    icon: Type
  },
  'markdown': {
    id: 'markdown',
    label: 'Markdown',
    category: 'typography',
    defaultTag: 'div',
    defaultClass: 'prose',
    defaultData: { label: '# Markdown Here\n\nYour text...' },
    allowChildren: false,
    icon: FileText
  }
};