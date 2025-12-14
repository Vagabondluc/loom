import React from 'react';
import { Panel, Surface, Toolbar, Button, CodeLabel, SectionHeaderView } from '../index';
import { Layers, Search, Bell } from 'lucide-react';

export const CompositeSection: React.FC = () => {
  return (
    <section id="composites" className="space-y-6 scroll-mt-24">
      <SectionHeaderView title={"Composite Primitives"} subtitle={<p className="text-base-content/70">Superpower #8: High-level layout building blocks that abstract common Tailwind/DaisyUI patterns. Use <strong>Surface</strong> for depth, <strong>Panel</strong> for content grouping, and <strong>Toolbar</strong> for action bars.</p>} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Surface Depth Demo */}
        <Panel elevation={1} shadow border>
          <div className="flex items-center gap-2 mb-4 font-bold">
            <Layers className="w-5 h-5 text-primary" /> Surface Elevations
          </div>
          <div className="grid grid-cols-2 gap-4">
             <Surface elevation={0} className="p-4 rounded border text-center text-xs">
                Elevation 0<br/>(base-100)
             </Surface>
             <Surface elevation={1} className="p-4 rounded border text-center text-xs">
                Elevation 1<br/>(base-200)
             </Surface>
             <Surface elevation={2} className="p-4 rounded border text-center text-xs">
                Elevation 2<br/>(base-300)
             </Surface>
             <Surface elevation={3} className="p-4 rounded border text-center text-xs">
                Elevation 3<br/>(neutral)
             </Surface>
          </div>
          <CodeLabel label="<Surface elevation={1} />" className="mt-4" />
        </Panel>

        {/* Panel & Toolbar Demo */}
        <div className="space-y-6">
           <Panel padding="none" elevation={0} border shadow className="overflow-hidden">
              <Toolbar className="bg-base-200/50">
                 <div className="flex-1 font-bold text-sm">Application Header</div>
                 <div className="flex gap-2">
                    <Button size="xs" variant="ghost" className="btn-square"><Search className="w-4 h-4" /></Button>
                    <Button size="xs" variant="ghost" className="btn-square"><Bell className="w-4 h-4" /></Button>
                 </div>
              </Toolbar>
              <div className="p-6">
                 <h3 className="font-bold mb-2">Panel Content</h3>
                 <p className="text-sm opacity-70">
                   This entire card is a <code>Panel</code> with <code>padding="none"</code> to allow the 
                   toolbar to sit flush against the edges.
                 </p>
              </div>
           </Panel>

           <div className="space-y-2">
              <CodeLabel label="<Panel shadow padding='none'>" />
              <CodeLabel label="<Toolbar>" />
           </div>
        </div>

      </div>
    </section>
  );
};
