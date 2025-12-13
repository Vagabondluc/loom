import React from 'react';
import { Card } from './index';
import { StoryNode } from '../types';

interface StoryLogicViewProps {
  activeNode: StoryNode;
  nodes: StoryNode[];
}

export const StoryLogicView: React.FC<StoryLogicViewProps> = ({ activeNode, nodes }) => {
  return (
    <Card className="h-full bg-base-300 font-mono text-xs">
       <div className="p-4 h-full overflow-auto">
         <h3 className="font-bold mb-2 text-base-content/50">LOGIC GRAPH SOURCE</h3>
         <pre>{JSON.stringify(activeNode, null, 2)}</pre>
         <div className="divider"></div>
         <h3 className="font-bold mb-2 text-base-content/50">ALL CONNECTIONS</h3>
         <ul className="list-disc list-inside opacity-70">
           {nodes.map(n => (
             <li key={n.id}>
               <span className="text-primary">{n.id}</span>
               <ul className="pl-4 border-l-2 border-base-content/10 ml-1">
                 {n.choices.map((c, i) => (
                   <li key={i}>-&gt; {c.nextNodeId} ({c.label})</li>
                 ))}
               </ul>
             </li>
           ))}
         </ul>
       </div>
    </Card>
  );
};
