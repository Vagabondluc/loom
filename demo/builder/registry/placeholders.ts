
import { ComponentDefinition } from '../../../types';
import { Type, Image as ImageIcon } from 'lucide-react';
import { generateLorem } from '../utils/lorem';

export const placeholderComponents: Record<string, ComponentDefinition> = {
  'lorem': {
    id: 'lorem',
    label: 'Lorem Ipsum',
    category: 'data', // Using 'data' as a proxy for Content/Placeholders or could add new category
    defaultTag: 'p',
    defaultClass: 'text-base-content/80',
    defaultData: { 
      label: generateLorem('medium'),
      loremConfig: { mode: 'medium' }
    },
    allowChildren: false,
    icon: Type,
    meta: {
      minDimensions: { width: 100, height: 24 }
    }
  },
  'picsum': {
    id: 'picsum',
    label: 'Picsum Image',
    category: 'media',
    defaultTag: 'img',
    defaultClass: 'rounded-box object-cover bg-base-300',
    defaultData: { 
      props: { 
        src: 'https://picsum.photos/seed/loom/400/300',
        alt: 'Random placeholder image'
      },
      picsumConfig: {
        width: 400,
        height: 300,
        seed: 'loom',
        grayscale: false,
        blur: 0
      }
    },
    allowChildren: false,
    icon: ImageIcon,
    meta: {
      minDimensions: { width: 50, height: 50 }
    }
  }
};
