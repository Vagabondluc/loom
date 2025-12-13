import React from 'react';
import { LayoutConfig, Breakpoint } from '../../../../types';
import { Badge } from '../../atoms/Badge';
import { Layout, Smartphone, Tablet, Monitor, Undo2 } from 'lucide-react';
import { clsx } from 'clsx';

interface LayoutEditorViewProps {
  layout?: LayoutConfig | null;
  activeBreakpoint: Breakpoint;
  onSetBreakpoint: (bp: Breakpoint) => void;
  onResetLayoutOverrides: () => void;
  onUpdate: (updates: Partial<LayoutConfig>, skipHistory?: boolean) => void;
  onSnapshot?: () => void;
  isOverridden?: (key: keyof LayoutConfig) => boolean;
  OverrideDot?: React.FC<{ prop: keyof LayoutConfig }>;
  children?: React.ReactNode;
}

export const LayoutEditorView: React.FC<LayoutEditorViewProps> = ({
  layout,
  activeBreakpoint,
  onSetBreakpoint,
  onResetLayoutOverrides,
  onUpdate,
  onSnapshot,
  isOverridden,
  OverrideDot,
}) => {
  if (!layout) return null;

  return (
    <div className="space-y-4 border-b border-base-content/10 pb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
          <Layout className="w-3 h-3" /> Layout
        </h3>
        <Badge size="xs" variant="neutral" className="bg-black/20 border-none text-white">{layout.mode}</Badge>
      </div>

      {/* Breakpoint Switcher */}
      <div className="flex items-center justify-between bg-base-100 p-1 rounded-lg border border-base-300">
        <div className="join">
          <button
            className={clsx('join-item btn btn-xs', activeBreakpoint === 'mobile' && 'btn-active')}
            onClick={() => onSetBreakpoint('mobile')}
            title="Edit Mobile Styles"
          >
            <Smartphone className="w-3 h-3" />
          </button>
          <button
            className={clsx('join-item btn btn-xs', activeBreakpoint === 'tablet' && 'btn-active')}
            onClick={() => onSetBreakpoint('tablet')}
            title="Edit Tablet Overrides"
          >
            <Tablet className="w-3 h-3" />
          </button>
          <button
            className={clsx('join-item btn btn-xs', activeBreakpoint === 'desktop' && 'btn-active')}
            onClick={() => onSetBreakpoint('desktop')}
            title="Edit Desktop Overrides"
          >
            <Monitor className="w-3 h-3" />
          </button>
        </div>

        {activeBreakpoint !== 'mobile' && (
          <button
            className="btn btn-xs btn-ghost text-[10px] gap-1 px-2"
            onClick={() => onResetLayoutOverrides()}
            title={`Clear all ${activeBreakpoint} overrides`}
            // Note: disabled prop should be handled by adapter wrapper
          >
            <Undo2 className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Mode Label + Controls placeholder - specific controls will be added by callers */}
      <div className="text-[10px] text-center opacity-40">
        {isOverridden && isOverridden('mode') ? `Mode overridden in ${activeBreakpoint}` : 'Inherited Mode'}
      </div>

          {/* Parent renders FlexControls or GridControls as children and provides callbacks */}
          {children}
    </div>
  );
};
