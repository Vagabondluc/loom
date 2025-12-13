
import React, { useRef, useEffect } from 'react';
import { useBuilderStore } from './store';
import { COMPONENT_REGISTRY } from './registries';
import { BuilderNode } from '../../types';
import { ListTree, Eye, EyeOff } from 'lucide-react';
import { PanelHeaderView } from '../../ui';
import { clsx } from 'clsx';

const NavigatorItem: React.FC<{ node: BuilderNode; level: number }> = ({ node, level }) => {
  const { selectNode, selectedNodeId, setHoveredNode, hoveredNodeId, nodes } = useBuilderStore();
  const def = COMPONENT_REGISTRY[node.type];
  const itemRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedNodeId === node.id;
  const isHovered = hoveredNodeId === node.id;

  // Scroll into view when selected
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isSelected]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode(node.id);
  };

  return (
    <div>
      <div
        ref={itemRef}
        className={clsx(
          "flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded transition-colors text-xs",
          isSelected ? "bg-primary text-primary-content" : "hover:bg-base-300",
          isHovered && !isSelected && "bg-base-300/50 ring-1 ring-primary"
        )}
        style={{ paddingLeft: `${0.5 + level * 0.75}rem` }}
        onClick={handleClick}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <span className={clsx(isSelected ? "opacity-100" : "opacity-60")}>
          {def.icon ? <def.icon className="w-3 h-3 flex-shrink-0" /> : <div className="w-3 h-3" />}
        </span>
        <span className="flex-1 truncate">{def.label}</span>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="border-l border-base-content/10" style={{ marginLeft: `${0.5 + level * 0.75 + 0.375}rem` }}>
          {node.children.map(childId => (
            <NavigatorItem key={childId} node={nodes[childId]} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};


export const BuilderNavigator: React.FC = () => {
  const rootNodeId = useBuilderStore(s => s.rootNodeId);
  const nodes = useBuilderStore(s => s.nodes);
  const rootNode = nodes[rootNodeId];

  if (!rootNode) return null;

  return (
    <div className="w-60 bg-base-200 h-full flex flex-col border-r border-base-300">
      <PanelHeaderView title={<span className="text-sm font-bold flex items-center gap-2"><ListTree className="w-4 h-4" /> Navigator</span>} className="p-4 border-b border-base-300 bg-base-300/50 flex-shrink-0" />
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <NavigatorItem node={rootNode} level={0} />
      </div>
    </div>
  );
};
