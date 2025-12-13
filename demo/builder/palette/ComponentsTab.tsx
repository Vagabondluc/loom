
import React from 'react';
import { useBuilderStore } from '../store';
import { COMPONENT_REGISTRY } from '../registries';
import { componentToTemplate } from './utils';
import { usePaletteInteractions } from './usePaletteInteractions';
import { PlayCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { PanelHeaderView, ComponentCardView } from '../../../ui';

export const ComponentsTab: React.FC = () => {
  const { handleMouseDown, handleKeyDown } = usePaletteInteractions();
  const recentlyUsed = useBuilderStore(s => s.recentlyUsed);
  const categories = ['layout', 'forms', 'patterns', 'daisyui', 'preline', 'data', 'media', 'typography', 'html'] as const;

  return (
    <div className="pb-8">
       {recentlyUsed.length > 0 && (
        <div className="pb-4 border-b border-base-300">
          <PanelHeaderView title={<span className="text-xs font-bold uppercase tracking-wider opacity-60">Recently Used</span>} className="p-0 bg-base-300/50 py-3 px-4 z-10 border-b border-t border-base-300 shadow-sm" />
            <div className="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
                <div className="flex space-x-3">
                    {recentlyUsed.map(componentId => {
                      const comp = COMPONENT_REGISTRY[componentId];
                      if (!comp) return null;
                      return (
                        <ComponentCardView
                          key={`recent-${comp.id}`}
                          id={comp.id}
                          label={comp.label}
                          icon={comp.icon}
                          runtimeOnly={comp.meta?.runtimeOnly}
                          onPointerDown={(e) => handleMouseDown(e, componentToTemplate(comp))}
                          onKeyDown={(e) => handleKeyDown(e, componentToTemplate(comp))}
                        />
                      );
                    })}
                </div>
            </div>
        </div>
      )}

      <PanelHeaderView title={<span className="text-xs font-bold uppercase tracking-wider opacity-60">Components</span>} className="p-0 bg-base-300/50 py-3 px-4 z-10 border-b border-t border-base-300 shadow-sm" />
      {categories.map(cat => (
          <div key={cat}>
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-50 pt-4 pb-2 px-4">
              {cat}
            </h4>
            
            <div className="grid grid-cols-2 gap-2 px-4">
              {Object.values(COMPONENT_REGISTRY)
                .filter(c => c.category === cat)
                .map((comp) => (
                  <ComponentCardView
                    key={comp.id}
                    id={comp.id}
                    label={comp.label}
                    icon={comp.icon}
                    runtimeOnly={comp.meta?.runtimeOnly}
                    onPointerDown={(e) => handleMouseDown(e, componentToTemplate(comp))}
                    onKeyDown={(e) => handleKeyDown(e, componentToTemplate(comp))}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
