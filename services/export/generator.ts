import { BuilderNode } from '../types';
import { generateResponsiveClasses } from '../runtime/layoutUtils';

export const generateJSX = (nodes: Record<string, BuilderNode>, nodeId: string, componentRegistry: Record<string, any>, indentLevel = 0): string => {
  const node = nodes[nodeId];
  if (!node) return '';

  const def = componentRegistry[node.type];
  const indent = '  '.repeat(indentLevel);
  
  const Tag = def?.defaultTag || 'div';
  const layoutClasses = generateResponsiveClasses(node);
  const className = `${def?.defaultClass || ''} ${node.data.className || ''} ${layoutClasses}`.trim().replace(/\s+/g, ' ');

  const propsParts: string[] = [];
  if (className) propsParts.push(`className="${className}"`);
  if (node.data.props) {
    Object.entries(node.data.props).forEach(([key, val]) => {
      propsParts.push(`${key}={${JSON.stringify(val)}}`);
    });
  }

  const propsString = propsParts.length > 0 ? ' ' + propsParts.join(' ') : '';

  let childrenString = '';
  if (node.data.label && node.type !== 'image') {
    childrenString += `\n${indent}  ${node.data.label}`;
  }

  if (node.children && node.children.length > 0) {
    node.children.forEach(childId => {
      childrenString += '\n' + generateJSX(nodes, childId, componentRegistry, indentLevel + 1);
    });
  }

  if (childrenString) {
    return `${indent}<${Tag}${propsString}>${childrenString}\n${indent}</${Tag}>`;
  } else if (node.type === 'image' || ['img', 'input', 'br', 'hr'].includes(Tag)) {
    return `${indent}<${Tag}${propsString} />`;
  } else {
    return `${indent}<${Tag}${propsString}></${Tag}>`;
  }
};

export const generateFullCode = (nodes: Record<string, BuilderNode>, rootId: string, componentRegistry: Record<string, any>) => {
  const jsx = generateJSX(nodes, rootId, componentRegistry);
  return `import React from 'react';\n\nexport const MyComponent = () => {\n  return (\n${jsx}\n  );\n};`.trim();
};
