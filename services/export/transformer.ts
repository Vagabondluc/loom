import { BuilderNode } from '../../types';
import { ExportNode } from './types';
import { generateResponsiveClasses } from '../runtime/layoutUtils';
import { generateLorem } from '../utils/lorem';

const prepareAttributes = (
  node: BuilderNode,
  def: any,
  layoutClasses: string
): Record<string, string> => {
  const attrs: Record<string, string> = {};
  
  const classParts = [
    def?.defaultClass,
    node.data.className,
    layoutClasses
  ].filter(Boolean).join(' ').trim().replace(/\s+/g, ' ');

  if (classParts) {
    attrs.className = classParts;
  }

  if (node.data.props) {
    Object.entries(node.data.props).forEach(([key, value]) => {
      attrs[key] = String(value);
    });
  }

  if (node.type === 'image' || node.type === 'picsum') {
    if (!attrs.src) attrs.src = 'https://via.placeholder.com/150';
    if (!attrs.alt) attrs.alt = 'Image';
  }

  if (node.type === 'lorem' || node.type === 'picsum') {
      attrs['data-loom-mock'] = 'true';
  }

  return attrs;
};

export const transformNode = (
  nodeId: string,
  nodes: Record<string, BuilderNode>,
  componentRegistry: Record<string, any>
): ExportNode | null => {
  const node = nodes[nodeId];
  if (!node) return null;

  const def = componentRegistry[node.type];
  if (!def) return null;

  let textContent: string | null = null;
  if (node.type === 'lorem') {
    textContent = node.data.label || generateLorem('medium');
  } else if (node.data.label && node.type !== 'image' && node.type !== 'picsum' && node.type !== 'icon') {
    textContent = node.data.label;
  }

  const layoutClasses = generateResponsiveClasses(node);

  const exportNode: ExportNode = {
    type: 'element',
    tagName: def.defaultTag || 'div',
    attributes: prepareAttributes(node, def, layoutClasses),
    children: [],
    isSelfClosing: ['img', 'input', 'br', 'hr'].includes(def.defaultTag || '')
  };

  if (textContent) {
    exportNode.children?.push({ type: 'text', content: textContent });
  }

  if (node.children && node.children.length > 0) {
    node.children.forEach(childId => {
      const childExport = transformNode(childId, nodes, componentRegistry);
      if (childExport) exportNode.children?.push(childExport);
    });
  }

  return exportNode;
};

export const transformToExportAST = (
  nodes: Record<string, BuilderNode>,
  rootId: string,
  componentRegistry: Record<string, any>
): ExportNode => {
  const root = transformNode(rootId, nodes, componentRegistry);
  if (!root) throw new Error(`Root node ${rootId} not found or invalid.`);
  return root;
};
