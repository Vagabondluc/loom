
import React from 'react';
import { Alert, Button } from '../../ui';
import { DemoView } from '../../types';
import { ExternalLink } from 'lucide-react';
import { PrelineStaticCard } from './preline/PrelineStaticCard';
import { PrelineStyleComparison } from './preline/PrelineStyleComparison';
import { PrelineComponentPreviews } from './preline/PrelineComponentPreviews';

interface PrelineSectionProps {
  setView: (view: DemoView) => void;
}

export const PrelineSection: React.FC<PrelineSectionProps> = ({ setView }) => {
  return (
    <section id="preline" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Preline UI (Runtime Adapters)</h2>
        <p className="text-base-content/70">
          A utility-first component library used for <strong>Applets</strong>. 
          In the Builder and Library, these components are rendered as <strong>Static Shells</strong> to prevent DOM conflicts.
          Their behavior (JavaScript) is injected only in Preview Mode or the Runtime Workbench.
        </p>
      </div>
      
      <Alert variant="info">
        <div className="flex items-center justify-between w-full">
            <span>These are static templates. To test interaction and logic binding, use the Workbench.</span>
            <Button size="sm" variant="ghost" className="gap-2 flex-shrink-0" onClick={() => setView('runtime-workbench')}>
                Open Runtime Workbench <ExternalLink className="w-3 h-3" />
            </Button>
        </div>
      </Alert>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <PrelineStaticCard />
        <PrelineStyleComparison />
      </div>
      
      <PrelineComponentPreviews />
    </section>
  );
};
