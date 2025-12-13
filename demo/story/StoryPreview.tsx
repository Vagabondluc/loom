import React from 'react';
import { Card } from '../../ui';
import { MessageSquare } from 'lucide-react';
import { StoryNode } from '../../types';

interface StoryPreviewProps {
  activeNode: StoryNode;
}

export const StoryPreview: React.FC<StoryPreviewProps> = ({ activeNode }) => {
  return (
    <div className="mockup-phone border-primary">
      <div className="camera"></div> 
      <div className="display">
        <div className="artboard artboard-demo phone-1 bg-base-200 justify-start overflow-y-auto p-4">
          <div className="w-full space-y-4 mt-8">
             <Card className="bg-base-100 shadow-lg">
               {activeNode.image && (
                 <figure>
                   <img src={activeNode.image} alt="Scene" className="h-32 w-full object-cover" />
                 </figure>
               )}
               <div className="card-body p-4">
                 <h2 className="card-title text-lg">{activeNode.title}</h2>
                 <p className="text-sm opacity-80">{activeNode.content}</p>
                 <div className="card-actions flex-col mt-4 gap-2">
                   {activeNode.choices.map((c, i) => (
                     <button key={i} className="btn btn-primary btn-sm btn-outline w-full justify-start">
                       <MessageSquare className="w-3 h-3 mr-2" />
                       {c.label}
                     </button>
                   ))}
                 </div>
               </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};