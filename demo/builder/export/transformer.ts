
import { BuilderNode } from '../../../types';
import { COMPONENT_REGISTRY } from '../registries';
import { generateResponsiveClasses } from '../layoutUtils';
import { ExportNode } from './types';
import { generateLorem } from '../utils/lorem';

// Helper to sanitize/prepare attributes
const prepareAttributes = (
  node: BuilderNode, 
  def: any, 
  layoutClasses: string
): Record<string, string> => {
  const attrs: Record<string, string> = {};
  
  // 1. Class Name Calculation
  const classParts = [
    def.defaultClass,
    node.data.className,
    layoutClasses
  ].filter(Boolean).join(' ').trim().replace(/\s+/g, ' ');

  if (classParts) {
    attrs.className = classParts; // React convention, will be mapped to 'class' in renderer
  }

  // 2. Props Transfer
  if (node.data.props) {
    Object.entries(node.data.props).forEach(([key, value]) => {
      // Skip internal/builder-specific props if any
      attrs[key] = String(value);
    });
  }

  // 3. Special Handling for Images
  if (node.type === 'image' || node.type === 'picsum') {
    if (!attrs.src) attrs.src = 'https://via.placeholder.com/150';
    if (!attrs.alt) attrs.alt = 'Image';
  }

  // 4. Fake Data Policy (UX-PRE-EXP-03)
  if (node.type === 'lorem' || node.type === 'picsum') {
      attrs['data-loom-mock'] = 'true';
  }

  return attrs;
};

// Recursive Transformer
export const transformNode = (
  nodeId: string, 
  nodes: Record<string, BuilderNode>
): ExportNode | null => {
  const node = nodes[nodeId];
  if (!node) return null;

  const def = COMPONENT_REGISTRY[node.type];
  if (!def) return null;

  // Resolve Content
  let textContent: string | null = null;
  
  // Handle Special Content Types
  if (node.type === 'lorem') {
    textContent = node.data.label || generateLorem('medium');
  } else if (node.data.label && node.type !== 'image' && node.type !== 'picsum' && node.type !== 'icon') {
    textContent = node.data.label;
  }

  // Generate Layout Classes
  const layoutClasses = generateResponsiveClasses(node);

  // Build the AST Node
  const exportNode: ExportNode = {
    type: 'element',
    tagName: def.defaultTag || 'div',
    attributes: prepareAttributes(node, def, layoutClasses),
    children: [],
    isSelfClosing: ['img', 'input', 'br', 'hr'].includes(def.defaultTag || '')
  };

  // Append Text Content if present
  if (textContent) {
    exportNode.children?.push({
      type: 'text',
      content: textContent
    });
  }

  // Recursively append children
  if (node.children && node.children.length > 0) {
    node.children.forEach(childId => {
      const childExport = transformNode(childId, nodes);
      if (childExport) {
        exportNode.children?.push(childExport);
      }
    });
  }

  return exportNode;
};

export const transformToExportAST = (
  nodes: Record<string, BuilderNode>, 
  rootId: string
): ExportNode => {
  const root = transformNode(rootId, nodes);
  if (!root) {
    throw new Error(`Root node ${rootId} not found or invalid.`);
  }
  return root;
};
