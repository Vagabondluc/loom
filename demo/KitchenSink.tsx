
import React, { useState } from 'react';
import { Button, Modal, Tabs, Tab } from '../ui';
import { DemoView } from '../types';

// Import Sections
import { ActionsSection } from './sections/ActionsSection';
import { InputsSection } from './sections/InputsSection';
import { NavigationSection } from './sections/NavigationSection';
import { DataDisplaySection } from './sections/DataDisplaySection';
import { FeedbackSection } from './sections/FeedbackSection';
import { LayoutSection } from './sections/LayoutSection';
import { MockupSection } from './sections/MockupSection';
import { TablesSection } from './sections/TablesSection';
import { MarketingSection } from './sections/MarketingSection';
import { CarouselSection } from './sections/CarouselSection';
import { StatusSection } from './sections/StatusSection';
import { StorageSection } from './sections/StorageSection';
import { HeadlessPatternsSection } from './sections/HeadlessPatternsSection';
import { PrelineSection } from './sections/PrelineSection';
import { HtmxSection } from './sections/HtmxSection';
import { ZodSection } from './sections/ZodSection';
import { CompositeSection } from './sections/CompositeSection';
import { IconLibrarySection } from './sections/IconLibrarySection';

type TabType = 'daisyui' | 'runtime' | 'patterns' | 'logic' | 'icons';

interface KitchenSinkProps {
  setView: (view: DemoView) => void;
}

export const KitchenSink: React.FC<KitchenSinkProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<TabType>('daisyui');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-300 w-full">
      <div className="prose max-w-none mb-8">
        <h1>Material Library</h1>
        <p>A static catalog of the available "threads" (components, patterns, and logic) for weaving experiences in the Loom suite.</p>
      </div>

      {/* Tabs Navigation */}
      <Tabs variant="lifted">
        <Tab active={activeTab === 'daisyui'} onClick={() => setActiveTab('daisyui')}>DaisyUI</Tab>
        <Tab active={activeTab === 'runtime'} onClick={() => setActiveTab('runtime')}>Runtime Patterns</Tab>
        <Tab active={activeTab === 'patterns'} onClick={() => setActiveTab('patterns')}>Patterns</Tab>
        <Tab active={activeTab === 'logic'} onClick={() => setActiveTab('logic')}>Logic & Data</Tab>
        <Tab active={activeTab === 'icons'} onClick={() => setActiveTab('icons')}>Icons</Tab>
      </Tabs>

      {/* Tab Content Panels */}
      <div className="bg-base-100 border-base-300 rounded-b-box border-t-0 border p-4 sm:p-6 lg:p-8">
        <div className="space-y-16">
          {activeTab === 'daisyui' && (
            <>
              <p className="text-sm text-base-content/70 -mt-4 italic">Styling-only components. Safe in editor and preview-identical.</p>
              <ActionsSection onOpenModal={() => setModalOpen(true)} />
              <InputsSection />
              <NavigationSection />
              <DataDisplaySection />
              <TablesSection />
              <FeedbackSection />
              <StatusSection />
              <LayoutSection />
              <MarketingSection />
              <CarouselSection />
              <MockupSection />
            </>
          )}
          {activeTab === 'runtime' && (
             <>
              <p className="text-sm text-base-content/70 -mt-4 italic">Static templates. Behavior activates only in Preview Mode or the Runtime Workbench.</p>
              <PrelineSection setView={setView} />
             </>
          )}
          {activeTab === 'patterns' && (
            <>
              <p className="text-sm text-base-content/70 -mt-4 italic">Composed layouts built from primitives, owned by this project.</p>
              <HeadlessPatternsSection />
              <CompositeSection />
            </>
          )}
          {activeTab === 'logic' && (
            <>
              <p className="text-sm text-base-content/70 -mt-4 italic">Declarative wiring for data and state. No execution happens here.</p>
              <ZodSection />
              <HtmxSection />
              <StorageSection />
            </>
          )}
          {activeTab === 'icons' && (
            <>
              <p className="text-sm text-base-content/70 -mt-4 italic">Reference catalog for the Lucide Icon set.</p>
              <IconLibrarySection />
            </>
          )}
        </div>
      </div>

      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Interactive Modal"
        actions={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p className="py-4">This modal is controlled by React state and uses the native &lt;dialog&gt; element styled by DaisyUI.</p>
        <p>It supports backdrops, keyboard escape, and custom actions.</p>
      </Modal>

    </div>
  );
};
