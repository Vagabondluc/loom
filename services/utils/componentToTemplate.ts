import { ComponentDefinition, Template, BuilderNode } from '../../types';

export const componentToTemplate = (def: ComponentDefinition): Template => {
  const rootId = 'root';
  const node: BuilderNode = {
      id: rootId,
      type: def.id,
      data: { 
          className: def.defaultClass, 
          ...def.defaultData 
      },
      layout: def.defaultLayout || { mode: 'static' },
      children: [],
      parentId: null
  };

  const nodes: Record<string, BuilderNode> = { [rootId]: node };

  // Special handling for grid examples
  if (def.id === 'grid-2') {
    const col1Id = 'col1';
    const col2Id = 'col2';
    node.children = [col1Id, col2Id];
    nodes[col1Id] = {
      id: col1Id,
      type: 'container',
      data: {},
      children: [],
      parentId: rootId
    };
    nodes[col2Id] = {
      id: col2Id,
      type: 'container',
      data: {},
      children: [],
      parentId: rootId
    };
  }

  if (def.id === 'image' && !node.data.props?.src) {
    node.data.props = { 
      ...node.data.props, 
      src: 'https://picsum.photos/300/200',
      alt: 'Placeholder'
    };
  }

  return {
      id: `tpl-base-${def.id}`,
      label: def.label,
      category: def.category,
      rootId: rootId,
      nodes: nodes
  };
};

export default componentToTemplate;
