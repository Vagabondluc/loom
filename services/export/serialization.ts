import { BuilderNode } from '../../types';

export const exportToJSON = (nodes: Record<string, BuilderNode>) => {
  return JSON.stringify(nodes, null, 2);
};

export const validateImport = (json: string): Record<string, BuilderNode> | null => {
  try {
    const nodes = JSON.parse(json);
    // Basic schema check
    if (!nodes || typeof nodes !== 'object') return null;
    if (!nodes['root']) return null;
    
    // Check root structure
    const root = nodes['root'];
    if (root.id !== 'root' || !Array.isArray(root.children)) return null;

    return nodes;
  } catch (e) {
    console.error("Invalid JSON", e);
    return null;
  }
};
