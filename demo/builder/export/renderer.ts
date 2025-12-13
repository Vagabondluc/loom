
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
      // Map React-style 'className' to 'class'
      const attrName = key === 'className' ? 'class' : key;
      // Convert camelCase to kebab-case for data attributes if needed, 
      // but usually we want to preserve exact keys for things like 'viewBox' 
      // unless it's a specific data attribute.
      // For simplicity in this engine, we assume the input keys are correct.
      
      if (value === undefined || value === null) return '';
      return `${attrName}="${escapeHtml(value)}"`;
    })
    .filter(Boolean)
    .join(' ');
};

export const renderHTML = (node: ExportNode, indentLevel = 0): string => {
  const indent = '  '.repeat(indentLevel);

  if (node.type === 'text') {
    // Text nodes shouldn't necessarily be indented if they are inline, 
    // but for pretty-printing structures, we usually indent.
    // However, leading whitespace in text content can be significant.
    // We'll trust the content.
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

    // Optimization: If single child is text, render inline to save vertical space
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
    
    // Add Go Template wrapper if needed (future expansion)
    // For now, it's essentially semantic HTML.
    return `{{ define "content" }}
${html}
{{ end }}`;
};
