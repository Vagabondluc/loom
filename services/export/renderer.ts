import { ExportNode } from './types';

const SELF_CLOSING_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

const escapeHtml = (str: string) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const renderAttributes = (attrs?: Record<string, string>): string => {
  if (!attrs) return '';
  
  return Object.entries(attrs)
    .map(([key, value]) => {
      const attrName = key === 'className' ? 'class' : key;
      if (value === undefined || value === null) return '';
      return `${attrName}="${escapeHtml(value)}"`;
    })
    .filter(Boolean)
    .join(' ');
};

export const renderHTML = (node: ExportNode, indentLevel = 0): string => {
  const indent = '  '.repeat(indentLevel);

  if (node.type === 'text') {
    return node.content ? `${indent}${escapeHtml(node.content)}` : '';
  }

  if (node.type === 'comment') {
    return `${indent}<!-- ${node.content} -->`;
  }

  if (node.type === 'raw') {
    return `${indent}${node.content}`;
  }

  if (node.type === 'element' && node.tagName) {
    const attrsStr = renderAttributes(node.attributes);
    const openTag = `${indent}<${node.tagName}${attrsStr ? ' ' + attrsStr : ''}`;

    if (node.isSelfClosing || SELF_CLOSING_TAGS.has(node.tagName)) {
      return `${openTag} />`;
    }

    const hasChildren = node.children && node.children.length > 0;
    if (!hasChildren) {
      return `${openTag}></${node.tagName}>`;
    }

    if (node.children?.length === 1 && node.children[0].type === 'text') {
      const textContent = escapeHtml(node.children[0].content || '');
      return `${openTag}>${textContent}</${node.tagName}>`;
    }

    const childrenStr = node.children
      ?.map(child => renderHTML(child, indentLevel + 1))
      .join('\n');

    return `${openTag}>\n${childrenStr}\n${indent}</${node.tagName}>`;
  }

  return '';
};

export const generateGoTemplate = (node: ExportNode): string => {
  const html = renderHTML(node);
  return `{{ define "content" }}\n${html}\n{{ end }}`;
};
