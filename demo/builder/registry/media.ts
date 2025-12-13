
import { ComponentDefinition } from '../../../types';
import { Star, Image } from 'lucide-react';

export const mediaComponents: Record<string, ComponentDefinition> = {
  'icon': {
    id: 'icon',
    label: 'Lucide Icon',
    category: 'media',
    defaultTag: 'div', // Rendered specially
    defaultClass: '',
    defaultData: { iconName: 'Star', size: 24, strokeWidth: 2 },
    allowChildren: false,
    icon: Star,
    meta: {
      minDimensions: { width: 24, height: 24 }
    }
  },
  'image': {
    id: 'image',
    label: 'Image',
    category: 'media',
    defaultTag: 'img',
    defaultClass: 'rounded-box',
    defaultData: { src: 'https://picsum.photos/300/200', alt: 'Placeholder' },
    allowChildren: false,
    icon: Image
  }
};
