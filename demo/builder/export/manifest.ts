
import { BuilderNode } from '../../../types';
import { generateFullCode } from '../generator';
import { transformToExportAST } from './transformer';
import { renderHTML } from './renderer';
import { exportToJSON } from '../serialization';
import { generateIntentJson } from './intentTransformer';
import { FileCode, Code2, Braces, BrainCircuit, Palette } from 'lucide-react';

export type ExportFidelity = 'lossless' | 'structural' | 'source' | 'semantic' | 'design-tokens';

export interface ExportTarget {
  id: string;
  label: string;
  description: string;
  fidelity: ExportFidelity;
  extension: string;
  icon: any;
  generator?: (nodes: Record<string, BuilderNode>, rootId: string) => string;
  disabled?: boolean;
}

export const EXPORT_TARGETS: ExportTarget[] = [
  {
    id: 'jsx',
    label: 'React Source',
    description: 'Component-based React code using Tailwind CSS.',
    fidelity: 'source',
    extension: 'tsx',
    icon: Code2,
    generator: generateFullCode
  },
  {
    id: 'html',
    label: 'Static HTML',
    description: 'Pure HTML5 markup with CDN links.',
    fidelity: 'structural',
    extension: 'html',
    icon: FileCode,
    generator: (nodes, rootId) => {
        try {
            const ast = transformToExportAST(nodes, rootId);
            return `<!DOCTYPE html>\n${renderHTML(ast)}`;
        } catch (e: any) {
            return `Error: ${e.message}`;
        }
    }
  },
  {
    id: 'json',
    label: 'JSON Blueprint',
    description: 'Full state dump of the project tree.',
    fidelity: 'lossless',
    extension: 'json',
    icon: Braces,
    generator: exportToJSON
  },
  {
    id: 'intent',
    label: 'App Intent',
    description: 'Abstract semantic description of user goals.',
    fidelity: 'semantic',
    extension: 'json',
    icon: BrainCircuit,
    generator: generateIntentJson
  },
  {
    id: 'tokens',
    label: 'Design Tokens',
    description: 'Theme variables (Colors, Typography, Shape).',
    fidelity: 'design-tokens',
    extension: 'css',
    icon: Palette,
    disabled: true
  }
];
