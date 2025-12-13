import React, { useState, useEffect } from 'react';
import { StoryNode } from '../types';
import { StorySidebar } from './story/StorySidebar';
import { StoryToolbar } from './story/StoryToolbar';
import { StoryEditor } from './story/StoryEditor';
import { StoryPreview } from './story/StoryPreview';
import { StoryLogicView } from './story/StoryLogicView';

const INITIAL_NODES: StoryNode[] = [
  {
    id: 'start',
    title: 'The Awakening',
    content: 'You wake up in a cold, metallic room. A red light pulses rhythmically on the wall.',
    image: 'https://picsum.photos/seed/scifi1/400/200',
    choices: [
      { label: 'Investigate the light', nextNodeId: 'light' },
      { label: 'Check the door', nextNodeId: 'door' }
    ]
  },
  {
    id: 'light',
    title: 'The Red Light',
    content: 'It appears to be a warning beacon. The console underneath is displaying "CRITICAL FAILURE".',
    choices: [
      { label: 'Go back', nextNodeId: 'start' }
    ]
  }
];

export const StoryCreator: React.FC = () => {
  const [mode, setMode] = useState<'ui' | 'logic'>('ui');
  const [nodes, setNodes] = useState<StoryNode[]>(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState<string>('start');
  const [aiLoading, setAiLoading] = useState(false);

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        setMode(prev => prev === 'ui' ? 'logic' : 'ui');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateNode = (field: keyof StoryNode, value: any) => {
    setNodes(prev => prev.map(n => n.id === activeNodeId ? { ...n, [field]: value } : n));
  };

  const addNode = () => {
    const newId = `node-${Date.now()}`;
    setNodes([...nodes, { id: newId, title: 'New Scene', content: '', choices: [] }]);
    setActiveNodeId(newId);
  };

  const addChoice = () => {
    const newNode = { ...activeNode, choices: [...activeNode.choices, { label: 'New Choice', nextNodeId: '?' }] };
    setNodes(prev => prev.map(n => n.id === activeNodeId ? newNode : n));
  };

  const handleAiGenerate = () => {
    setAiLoading(true);
    // Simulation of GenAI API call
    setTimeout(() => {
      updateNode('content', activeNode.content + ' Suddenly, the airlock hisses open, revealing a vast starscape.');
      setAiLoading(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      
      <StorySidebar 
        nodes={nodes} 
        activeNodeId={activeNodeId} 
        onSelectNode={setActiveNodeId}
        onAddNode={addNode}
      />

      <div className="flex-1 flex flex-col gap-4">
        
        <StoryToolbar 
          mode={mode} 
          setMode={setMode} 
          onAiGenerate={handleAiGenerate} 
          loading={aiLoading} 
        />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
          
          <StoryEditor 
            activeNode={activeNode} 
            allNodes={nodes} 
            onUpdate={updateNode} 
            onAddChoice={addChoice} 
          />

          <div className="h-full overflow-y-auto">
            {mode === 'ui' ? (
              <StoryPreview activeNode={activeNode} />
            ) : (
              <StoryLogicView activeNode={activeNode} nodes={nodes} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};