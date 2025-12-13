
import React from 'react';
import { LayoutConfig } from '../../../../types';
import { Checkbox } from '../../../../ui';
import { clsx } from 'clsx';
import { ArrowRight, ArrowDown, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

interface FlexControlsProps {
  layout: LayoutConfig;
  onUpdate: (updates: Partial<LayoutConfig>) => void;
  OverrideDot: React.FC<{ prop: keyof LayoutConfig }>;
}

export const FlexControls: React.FC<FlexControlsProps> = ({ layout, onUpdate, OverrideDot }) => {
  return (
    <div className="space-y-3 bg-base-100 p-3 rounded-lg border border-base-300 animate-in fade-in relative">
      
      {/* Direction */}
      <div className="form-control">
        <label className="label text-xs py-1">
           <span>Direction <OverrideDot prop="direction" /></span>
        </label>
        <div className="join">
          <button 
            className={clsx("join-item btn btn-xs flex-1", layout.direction === 'row' && "btn-active")}
            onClick={() => onUpdate({ direction: 'row' })}
            title="Row"
          ><ArrowRight className="w-3 h-3" /></button>
          <button 
            className={clsx("join-item btn btn-xs flex-1", layout.direction === 'col' && "btn-active")}
            onClick={() => onUpdate({ direction: 'col' })}
            title="Column"
          ><ArrowDown className="w-3 h-3" /></button>
        </div>
      </div>

      {/* Justify */}
      <div className="form-control">
        <label className="label text-xs py-1">
          <span>Justify <OverrideDot prop="justify" /></span>
        </label>
        <div className="join">
          {['start', 'center', 'end', 'between'].map((j) => (
            <button 
              key={j}
              className={clsx("join-item btn btn-xs flex-1", layout.justify === j && "btn-active")}
              onClick={() => onUpdate({ justify: j as any })}
              title={j}
            >
               {j === 'start' && <AlignLeft className="w-3 h-3" />}
               {j === 'center' && <AlignCenter className="w-3 h-3" />}
               {j === 'end' && <AlignRight className="w-3 h-3" />}
               {j === 'between' && <AlignJustify className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Align Items */}
      <div className="form-control">
        <label className="label text-xs py-1">
          <span>Align <OverrideDot prop="align" /></span>
        </label>
        <div className="join">
          {['start', 'center', 'end', 'stretch'].map((a) => (
            <button 
              key={a}
              className={clsx("join-item btn btn-xs flex-1", layout.align === a && "btn-active")}
              onClick={() => onUpdate({ align: a as any })}
              title={a}
            >
               {a === 'start' && <AlignLeft className="w-3 h-3 -rotate-90" />}
               {a === 'center' && <AlignCenter className="w-3 h-3 -rotate-90" />}
               {a === 'end' && <AlignRight className="w-3 h-3 -rotate-90" />}
               {a === 'stretch' && <AlignJustify className="w-3 h-3 -rotate-90" />}
            </button>
          ))}
        </div>
      </div>

      {/* Wrap */}
      <div className="form-control">
        <label className="cursor-pointer label justify-start gap-2 py-0">
          <Checkbox
            size="xs"
            checked={layout.wrap === 'wrap'}
            onChange={(e) => onUpdate({ wrap: e.target.checked ? 'wrap' : 'nowrap' })}
          />
          <span className="label-text text-xs">Wrap items <OverrideDot prop="wrap" /></span>
        </label>
      </div>
    </div>
  );
};
