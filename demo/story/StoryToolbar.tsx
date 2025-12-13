import React from 'react';
import { Button } from '../../ui';
import { Sparkles, Layout, Network } from 'lucide-react';

interface StoryToolbarProps {
  mode: 'ui' | 'logic';
  setMode: (mode: 'ui' | 'logic') => void;
  onAiGenerate: () => void;
  loading: boolean;
}

export const StoryToolbar: React.FC<StoryToolbarProps> = ({ 
  mode, 
  setMode, 
  onAiGenerate, 
  loading 
}) => {
  return (
    <div className="flex justify-between items-center bg-base-200 p-2 rounded-lg">
      <div className="tabs tabs-boxed bg-transparent">
        <a className={`tab ${mode === 'ui' ? 'tab-active' : ''}`} onClick={() => setMode('ui')}>
          <Layout className="w-4 h-4 mr-2" /> UI Mode
        </a>
        <a className={`tab ${mode === 'logic' ? 'tab-active' : ''}`} onClick={() => setMode('logic')}>
          <Network className="w-4 h-4 mr-2" /> Logic Mode
        </a>
      </div>
      
      <Button 
        variant="accent" 
        size="sm" 
        onClick={onAiGenerate}
        loading={loading}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        AI Expand
      </Button>
    </div>
  );
};