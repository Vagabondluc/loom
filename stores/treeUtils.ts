import { BuilderNode, Template, LayoutConfig, BuilderAction } from '../types';

export const performInsert = (
  nodes: Record<string, BuilderNode>,
  parentId: string,
  template: Template,
  index?: number
): Record<string, BuilderNode> => {
  const parent = nodes[parentId];
  if (!parent) return nodes;

  // Generate new IDs
  const idMap: Record<string, string> = {};
  Object.keys(template.nodes).forEach(oldId => {
    idMap[oldId] = `node-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  });

  const newNodes: Record<string, BuilderNode> = {};
  Object.values(template.nodes).forEach(node => {
    const newId = idMap[node.id];
    const newChildren = node.children.map(cId => idMap[cId]);
    
    let newParentId = node.id === template.rootId ? parentId : (node.parentId ? idMap[node.parentId] : null);

    newNodes[newId] = {
      ...node,
      id: newId,
      children: newChildren,
      parentId: newParentId,
      events: node.events ? JSON.parse(JSON.stringify(node.events)) : undefined
    };
  });

  const newTemplateRootId = idMap[template.rootId];
  const newChildren = [...parent.children];
  
  if (typeof index === 'number' && index >= 0 && index <= newChildren.length) {
    newChildren.splice(index, 0, newTemplateRootId);
  } else {
    newChildren.push(newTemplateRootId);
  }

  return {
    ...nodes,
    ...newNodes,
    [parentId]: {
      ...parent,
      children: newChildren
    }
  };
};

export const performMove = (
  nodes: Record<string, BuilderNode>,
  nodeId: string,
  newParentId: string,
  index?: number
): Record<string, BuilderNode> => {
  const node = nodes[nodeId];
  const oldParent = node?.parentId ? nodes[node.parentId] : null;
  const newParent = nodes[newParentId];

  // Validation
  if (!node || !oldParent || !newParent) return nodes;
  if (nodeId === newParentId) return nodes;

  // Prevent circular reference (cannot move parent into child)
  let current = newParent;
  while (current.parentId) {
    if (current.parentId === nodeId) return nodes;
    current = nodes[current.parentId];
  }

  // Calculate new children arrays
  let oldChildren = oldParent.children.filter(id => id !== nodeId);
  let newChildren = (oldParent.id === newParent.id) ? oldChildren : [...newParent.children];
  
  if (typeof index === 'number') {
      const insertIndex = Math.min(index, newChildren.length);
      newChildren.splice(insertIndex, 0, nodeId);
  } else {
      newChildren.push(nodeId);
  }

  const updates: Record<string, BuilderNode> = { ...nodes };
  updates[nodeId] = { ...node, parentId: newParentId };
  
  if (oldParent.id !== newParent.id) {
      updates[oldParent.id] = { ...oldParent, children: oldChildren };
      updates[newParent.id] = { ...newParent, children: newChildren };
  } else {
      updates[newParent.id] = { ...newParent, children: newChildren };
  }

  return updates;
};

export const performDelete = (
  nodes: Record<string, BuilderNode>,
  nodeId: string
): Record<string, BuilderNode> => {
  const node = nodes[nodeId];
  if (!node || !node.parentId) return nodes;

  const parent = nodes[node.parentId];
  const newNodes = { ...nodes };
  
  const deleteRecursive = (nId: string) => {
    const n = newNodes[nId];
    if (n && n.children) {
      n.children.forEach(deleteRecursive);
    }
    delete newNodes[nId];
  };

  deleteRecursive(nodeId);

  const newParent = {
    ...parent,
    children: parent.children.filter(childId => childId !== nodeId)
  };
  newNodes[node.parentId] = newParent;

  return newNodes;
};

export default performInsert;
