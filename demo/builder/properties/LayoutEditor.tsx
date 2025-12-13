
import React from 'react';
import { useBuilderStore } from '../store';
import { LayoutConfig, Breakpoint, BuilderNode } from '../../../types';
import { LayoutEditorView } from '../../../ui/molecules/properties/LayoutEditorView';
import { LayoutModeSelector } from './layout/LayoutModeSelector';
import { resolveEffectiveLayout } from '../../../services/runtime/layoutUtils';
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
    <LayoutEditorView
      layout={layout}
      activeBreakpoint={activeBreakpoint}
      onSetBreakpoint={setBreakpoint}
      onResetLayoutOverrides={() => resetLayoutOverrides(node.id)}
      onUpdate={(u, s) => updateNodeLayout(node.id, u, { skipHistory: !!s })}
      onSnapshot={snapshot}
      isOverridden={(k) => {
        if (activeBreakpoint === 'mobile') return false;
        const overrides = node.responsive?.[activeBreakpoint];
        return overrides && overrides[k] !== undefined;
      }}
      OverrideDot={({ prop }) => ( ( (activeBreakpoint !== 'mobile' && node.responsive?.[activeBreakpoint]?.[prop]) ) ? <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1.5 inline-block" title="Overridden in current view"></span> : null)}
    >
      {layout.mode === 'flex' && (
        <FlexControls layout={layout} onUpdate={(u) => updateNodeLayout(node.id, u, { skipHistory:false })} OverrideDot={({ prop }) => ( ( (activeBreakpoint !== 'mobile' && node.responsive?.[activeBreakpoint]?.[prop]) ) ? <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1.5 inline-block" title="Overridden in current view"></span> : null)} />
      )}

      {layout.mode === 'grid' && (
        <GridControls layout={layout} onUpdate={(u) => updateNodeLayout(node.id, u, { skipHistory:true })} onSnapshot={snapshot} OverrideDot={({ prop }) => ( ( (activeBreakpoint !== 'mobile' && node.responsive?.[activeBreakpoint]?.[prop]) ) ? <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1.5 inline-block" title="Overridden in current view"></span> : null)} />
      )}

      {(layout.mode === 'flex' || layout.mode === 'grid') && (
        <div className="form-control">
          <label className="label text-xs py-1">
            <span>Gap: {layout.gap || 0} <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1.5 inline-block" title="Overridden in current view"></span></span>
          </label>
          <input
            type="range" min="0" max="12" step="1"
            value={layout.gap || 0}
            className="range range-xs"
            onPointerDown={() => snapshot()}
            onChange={(e) => updateNodeLayout(node.id, { gap: parseInt(e.target.value) }, { skipHistory: true })}
          />
        </div>
      )}
    </LayoutEditorView>
  );
};
