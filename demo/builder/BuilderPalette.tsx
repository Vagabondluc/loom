

import React, { useState } from 'react';
import { Box, ListTree } from 'lucide-react';
import { ComponentsTab } from './palette/ComponentsTab';
import { TemplatesTab } from './palette/TemplatesTab';
import { NavigatorTab } from './palette/NavigatorTab';
import { AiAssistantPanel } from './palette/AiAssistantPanel';

type MainTabType = 'library' | 'navigator';

interface BuilderPaletteProps {
  onOpenWizard: () => void;
}

export const BuilderPalette: React.FC<BuilderPaletteProps> = ({ onOpenWizard }) => {
  const [mainTab, setMainTab] = useState<MainTabType>('library');

  return (
    <div className="w-full bg-base-200 h-full flex flex-col border-r border-base-300">
      {/* Top Level Tabs */}
      <div className="tabs tabs-bordered flex-shrink-0">
        <a 
          className={`tab tab-bordered w-1/2 gap-2 ${mainTab === 'library' ? 'tab-active font-bold' : ''}`}
          onClick={() => setMainTab('library')}
        >
          <Box className="w-4 h-4" /> Library
        </a>
        <a 
          className={`tab tab-bordered w-1/2 gap-2 ${mainTab === 'navigator' ? 'tab-active font-bold' : ''}`}
          onClick={() => setMainTab('navigator')}
        >
          <ListTree className="w-4 h-4" /> Navigator
        </a>
      </div>
      
      {/* Conditional Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {mainTab === 'library' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
              <TemplatesTab onOpenWizard={onOpenWizard} />
              <ComponentsTab />
            </div>
            <AiAssistantPanel />
          </div>
        ) : (
          <NavigatorTab />
        )}
      </div>
    </div>
  );
};