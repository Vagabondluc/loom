
import React from 'react';

export type PaletteTabType = 'components' | 'templates' | 'markdown';

interface PaletteTabsProps {
  activeTab: PaletteTabType;
  setActiveTab: (tab: PaletteTabType) => void;
}

export const PaletteTabs: React.FC<PaletteTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs tabs-boxed rounded-none p-2 bg-base-200 grid grid-cols-3">
      <a 
        className={`tab ${activeTab === 'components' ? 'tab-active' : ''}`} 
        onClick={() => setActiveTab('components')}
      >
        Base
      </a>
      <a 
        className={`tab ${activeTab === 'templates' ? 'tab-active' : ''}`} 
        onClick={() => setActiveTab('templates')}
      >
        Tpl
      </a>
      <a 
        className={`tab ${activeTab === 'markdown' ? 'tab-active' : ''}`} 
        onClick={() => setActiveTab('markdown')}
      >
        MD
      </a>
    </div>
  );
};
