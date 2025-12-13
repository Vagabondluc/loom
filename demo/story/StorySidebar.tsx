import React from 'react';
import { Card, Button, Alert } from '../../ui';
import { Plus } from 'lucide-react';
import { StoryNode } from '../../types';

interface StorySidebarProps {
  nodes: StoryNode[];
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  onAddNode: () => void;
}

export const StorySidebar: React.FC<StorySidebarProps> = ({ 
  nodes, 
  activeNodeId, 
  onSelectNode, 
  onAddNode 
}) => {
  return (
    <div className="lg:w-1/4 flex flex-col gap-4">
      <Card bordered className="flex-1 bg-base-200 overflow-hidden">
        <div className="p-4 bg-base-300 font-bold flex justify-between items-center">
          <span>Scenes</span>
          <Button size="xs" variant="ghost" onClick={onAddNode}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <ul className="menu w-full p-2 overflow-y-auto">
          {nodes.map(node => (
            <li key={node.id}>
              <a 
                className={node.id === activeNodeId ? 'active' : ''}
                onClick={() => onSelectNode(node.id)}
              >
                <span className="truncate">{node.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </Card>
      
      <Alert className="bg-base-200 text-xs shadow-sm" icon={null}>
        <span className="font-mono bg-base-300 px-1 rounded">TAB</span> to toggle UI/Logic
      </Alert>
    </div>
  );
};