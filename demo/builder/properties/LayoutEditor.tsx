
import React from 'react';
import { useBuilderStore } from '../store';
import { LayoutConfig, Breakpoint, BuilderNode } from '../../../types';
import { clsx } from 'clsx';
import { Badge } from '../../../ui';
import { Layout, Smartphone, Tablet, Monitor, Undo2 } from 'lucide-react';
import { LayoutModeSelector } from './layout/LayoutModeSelector';
import { FlexControls } from './layout/FlexControls';
import { GridControls } from './layout/GridControls';

interface LayoutEditorProps {
  node: BuilderNode;
}

export const LayoutEditor: React.FC<LayoutEditorProps> = ({ node }) => {
  const activeBreakpoint = useBuilderStore(s => s.activeBreakpoint);
  const setBreakpoint = useBuilderStore(s => s.setBreakpoint);
  const resetLayoutOverrides = useBuilderStore(s => s.resetLayoutOverrides);
  const updateNodeLayout = useBuilderStore(s => s.updateNodeLayout);
  const snapshot = useBuilderStore(s => s.snapshot);

  const resolveEffectiveLayout = (n: BuilderNode, bp: Breakpoint): LayoutConfig => {
    let effective = { ...n.layout } as LayoutConfig;
    if (bp === 'tablet' || bp === 'desktop') {
        if (n.responsive?.tablet) effective = { ...effective, ...n.responsive.tablet };
    }
    if (bp === 'desktop') {
        if (n.responsive?.desktop) effective = { ...effective, ...n.responsive.desktop };
    }
    return effective;
  };

  const layout = resolveEffectiveLayout(node, activeBreakpoint);

  const isOverridden = (key: keyof LayoutConfig) => {
    if (activeBreakpoint === 'mobile') return false; 
    const overrides = node.responsive?.[activeBreakpoint];
    return overrides && overrides[key] !== undefined;
  };

  const OverrideDot = ({ prop }: { prop: keyof LayoutConfig }) => (
    isOverridden(prop) ? <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1.5 inline-block" title="Overridden in current view"></span> : null
  );

  const handleUpdate = (updates: Partial<LayoutConfig>, skipHistory = true) => {
      updateNodeLayout(node.id, updates, { skipHistory });
  };

  return (
    <div className="space-y-4 border-b border-base-content/10 pb-6">
      <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
            <Layout className="w-3 h-3" /> Layout
          </h3>
          <Badge size="xs" variant="neutral" className="bg-black/20 border-none text-white">{layout?.mode}</Badge>
      </div>
      
      {/* Breakpoint Switcher */}
      <div className="flex items-center justify-between bg-base-100 p-1 rounded-lg border border-base-300">
         <div className="join">
           <button 
             className={clsx("join-item btn btn-xs", activeBreakpoint === 'mobile' && "btn-active")} 
             onClick={() => setBreakpoint('mobile')}
             title="Edit Mobile Styles"
           ><Smartphone className="w-3 h-3"/></button>
           <button 
             className={clsx("join-item btn btn-xs", activeBreakpoint === 'tablet' && "btn-active")} 
             onClick={() => setBreakpoint('tablet')}
             title="Edit Tablet Overrides"
           ><Tablet className="w-3 h-3"/></button>
           <button 
             className={clsx("join-item btn btn-xs", activeBreakpoint === 'desktop' && "btn-active")} 
             onClick={() => setBreakpoint('desktop')}
             title="Edit Desktop Overrides"
           ><Monitor className="w-3 h-3"/></button>
         </div>
         
         {activeBreakpoint !== 'mobile' && (
           <button 
             className="btn btn-xs btn-ghost text-[10px] gap-1 px-2" 
             onClick={() => resetLayoutOverrides(node.id)}
             title={`Clear all ${activeBreakpoint} overrides`}
             disabled={!node.responsive?.[activeBreakpoint]}
           >
             <Undo2 className="w-3 h-3" /> Reset
           </button>
         )}
      </div>

      <LayoutModeSelector 
        currentMode={layout.mode} 
        onUpdate={(u) => handleUpdate(u, false)} 
      />
      
      <div className="text-[10px] text-center opacity-40">
          {isOverridden('mode') ? `Mode overridden in ${activeBreakpoint}` : 'Inherited Mode'}
      </div>

      {layout.mode === 'flex' && (
        <FlexControls 
            layout={layout} 
            onUpdate={(u) => handleUpdate(u, false)} 
            OverrideDot={OverrideDot}
        />
      )}

      {layout.mode === 'grid' && (
        <GridControls 
            layout={layout} 
            onUpdate={(u) => handleUpdate(u, true)} 
            onSnapshot={snapshot}
            OverrideDot={OverrideDot}
        />
      )}

      {/* Gap Control (Shared) */}
      {(layout.mode === 'flex' || layout.mode === 'grid') && (
         <div className="form-control">
            <label className="label text-xs py-1">
                <span>Gap: {layout.gap || 0} <OverrideDot prop="gap" /></span>
            </label>
            <input 
              type="range" min="0" max="12" step="1" 
              value={layout.gap || 0} 
              className="range range-xs" 
              onPointerDown={() => snapshot()}
              onChange={(e) => handleUpdate({ gap: parseInt(e.target.value) })}
            />
         </div>
      )}
    </div>
  );
};
