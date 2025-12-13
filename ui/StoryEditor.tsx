import React from 'react';
import { Card, Input, TextArea, Button, FormField, Badge } from './index';
import { Plus } from 'lucide-react';
import { StoryNode } from '../types';

interface StoryEditorProps {
  activeNode: StoryNode;
  allNodes: StoryNode[];
  onUpdate: (field: keyof StoryNode, value: any) => void;
  onAddChoice: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({ 
  activeNode, 
  allNodes, 
  onUpdate, 
  onAddChoice 
}) => {
  return (
    <Card bordered className="bg-base-100 h-full overflow-y-auto">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold opacity-50 uppercase tracking-widest text-xs">Node Properties</h3>
          <Badge variant="ghost">{activeNode.id}</Badge>
        </div>
        
        <FormField label="Scene Title">
          <Input 
            value={activeNode.title} 
            onChange={(e) => onUpdate('title', e.target.value)}
          />
        </FormField>
        
        <FormField label="Narrative Content">
          <TextArea 
            className="h-32" 
            value={activeNode.content}
            onChange={(e) => onUpdate('content', e.target.value)}
          />
        </FormField>

        <div className="divider">Choices</div>
        
        <div className="space-y-2">
          {activeNode.choices.map((choice, idx) => (
            <div key={idx} className="join w-full">
              <input 
                className="input input-bordered input-sm join-item w-full" 
                value={choice.label}
                onChange={(e) => {
                  const newChoices = [...activeNode.choices];
                  newChoices[idx].label = e.target.value;
                  onUpdate('choices', newChoices);
                }}
              />
              <select 
                className="select select-bordered select-sm join-item w-32"
                value={choice.nextNodeId}
                onChange={(e) => {
                  const newChoices = [...activeNode.choices];
                  newChoices[idx].nextNodeId = e.target.value;
                  onUpdate('choices', newChoices);
                }}
              >
                <option disabled value="?">Link...</option>
                {allNodes.map(n => <option key={n.id} value={n.id}>{n.title}</option>)}
              </select>
            </div>
          ))}
          <Button size="sm" variant="ghost" className="w-full dashed border-base-300" onClick={onAddChoice}>
            <Plus className="w-4 h-4 mr-2" /> Add Choice
          </Button>
        </div>
      </div>
    </Card>
  );
};
