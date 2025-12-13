
import { BuilderNode } from '../../types';
import { COMPONENT_REGISTRY } from './registries';
import { generateResponsiveClasses } from './layoutUtils';

export const generateJSX = (nodes: Record<string, BuilderNode>, nodeId: string, indentLevel = 0): string => {
  const node = nodes[nodeId];
  if (!node) return '';

  const def = COMPONENT_REGISTRY[node.type];
  const indent = '  '.repeat(indentLevel);
  
  // Tag resolution
  const Tag = def.defaultTag || 'div';
  
  // Class generation
  const layoutClasses = generateResponsiveClasses(node);
  const className = `${def.defaultClass} ${node.data.className || ''} ${layoutClasses}`.trim().replace(/\s+/g, ' ');
  
  // Props generation
  const propsParts = [];
  if (className) propsParts.push(`className="${className}"`);
  
  if (node.data.props) {
    Object.entries(node.data.props).forEach(([key, value]) => {
      propsParts.push(`${key}="${value}"`);
    });
  }

  // Fake Data Policy
  if (node.type === 'lorem' || node.type === 'picsum') {
      propsParts.push('data-loom-mock="true"');
  }

  const propsString = propsParts.length > 0 ? ' ' + propsParts.join(' ') : '';

  // Children generation
  let childrenString = '';
  
  // 1. Text Content
  if (node.data.label && node.type !== 'image') {
    childrenString += `\n${indent}  ${node.data.label}`;
  }

  // 2. Child Nodes
  if (node.children && node.children.length > 0) {
    node.children.forEach(childId => {
      childrenString += '\n' + generateJSX(nodes, childId, indentLevel + 1);
    });
  }

  // Formatting
  if (childrenString) {
    return `${indent}<${Tag}${propsString}>${childrenString}\n${indent}</${Tag}>`;
  } else if (node.type === 'image' || ['img', 'input', 'br', 'hr'].includes(Tag)) {
    return `${indent}<${Tag}${propsString} />`;
  } else {
    return `${indent}<${Tag}${propsString}></${Tag}>`;
  }
};

export const generateFullCode = (nodes: Record<string, BuilderNode>, rootId: string) => {
  const jsx = generateJSX(nodes, rootId);
  return `
import React from 'react';

export const MyComponent = () => {
  return (
${jsx}
  );
};
`.trim();
};
