
import React, { useState } from 'react';
import { TEMPLATE_REGISTRY } from '../templates';
import { usePaletteInteractions } from './usePaletteInteractions';
import { LayoutTemplate, Sparkles, Server } from 'lucide-react';
import { Badge, Button } from '../../../ui';
import { ProceduralWizardPanel } from './ProceduralWizardPanel';

interface TemplatesTabProps {
  onOpenWizard: () => void;
}

export const TemplatesTab: React.FC<TemplatesTabProps> = ({ onOpenWizard }) => {
  const { handleMouseDown, handleKeyDown } = usePaletteInteractions();
  const [isWizardMode, setIsWizardMode] = useState(false);

  return (
    <div className="flex flex-col h-full border-b border-base-300">
      <div className="flex items-center justify-between bg-base-300/50 py-3 px-4 z-10 border-b border-base-300 shadow-sm flex-shrink-0">
        <h3 className="text-xs font-bold uppercase tracking-wider opacity-60">
          Templates
        </h3>
        
        {/* Toggle Switch */}
        <label className="label cursor-pointer gap-2 py-0">
            <span className="label-text text-[10px] uppercase font-bold opacity-60">Wizard</span> 
            <input 
                type="checkbox" 
                className="toggle toggle-xs toggle-accent" 
                checked={isWizardMode}
                onChange={(e) => setIsWizardMode(e.target.checked)}
            />
        </label>
      </div>

      <div className="flex-1 overflow-hidden">
        {isWizardMode ? (
            <ProceduralWizardPanel />
        ) : (
            <div className="p-4 space-y-2 overflow-y-auto h-full">
                <Button variant="neutral" size="sm" className="w-full gap-2 mb-4" onClick={onOpenWizard}>
                    <Sparkles className="w-4 h-4" /> AI Wizard (Modal)
                </Button>
                
                {TEMPLATE_REGISTRY.map(tpl => (
                    <div 
                        key={tpl.id}
                        tabIndex={0}
                        role="button"
                        style={{ touchAction: 'none' }}
                        onPointerDown={(e) => handleMouseDown(e, tpl)}
                        onKeyDown={(e) => handleKeyDown(e, tpl)}
                        className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:border-primary cursor-grab active:cursor-grabbing active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    >
                        <div className="card-body p-3 flex-row items-center gap-3">
                            <div className="p-2 bg-base-200 rounded-lg">
                                <LayoutTemplate className="w-5 h-5 opacity-70" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">{tpl.label}</h3>
                                <Badge size="xs" variant="ghost">{tpl.category}</Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
