
import React, { useState } from 'react';
import { TEMPLATE_REGISTRY } from '../templates';
import { usePaletteInteractions } from './usePaletteInteractions';
import { LayoutTemplate, Sparkles, Server } from 'lucide-react';
import { Button, TemplateCardView, PanelHeaderView } from '../../../ui';
import { ProceduralWizardPanel } from './ProceduralWizardPanel';

interface TemplatesTabProps {
  onOpenWizard: () => void;
}

export const TemplatesTab: React.FC<TemplatesTabProps> = ({ onOpenWizard }) => {
  const { handleMouseDown, handleKeyDown } = usePaletteInteractions();
  const [isWizardMode, setIsWizardMode] = useState(false);

  return (
    <div className="flex flex-col h-full border-b border-base-300">
      <PanelHeaderView
        title={<span className="text-xs font-bold uppercase tracking-wider opacity-60">Templates</span>}
        actions={(
          <label className="label cursor-pointer gap-2 py-0">
            <span className="label-text text-[10px] uppercase font-bold opacity-60">Wizard</span>
            <input
              type="checkbox"
              className="toggle toggle-xs toggle-accent"
              checked={isWizardMode}
              onChange={(e) => setIsWizardMode(e.target.checked)}
            />
          </label>
        )}
        className="p-0 bg-base-300/50 py-3 px-4 z-10 border-b border-base-300 shadow-sm flex-shrink-0"
      />

      <div className="flex-1 overflow-hidden">
        {isWizardMode ? (
            <ProceduralWizardPanel />
        ) : (
            <div className="p-4 space-y-2 overflow-y-auto h-full">
                <Button variant="neutral" size="sm" className="w-full gap-2 mb-4" onClick={onOpenWizard}>
                    <Sparkles className="w-4 h-4" /> AI Wizard (Modal)
                </Button>
                
                {TEMPLATE_REGISTRY.map(tpl => (
                  <TemplateCardView key={tpl.id} id={tpl.id} label={tpl.label} category={tpl.category} onPointerDown={(e) => handleMouseDown(e, tpl)} onKeyDown={(e) => handleKeyDown(e, tpl)} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
