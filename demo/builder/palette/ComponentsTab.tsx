
import React from 'react';
import { useBuilderStore } from '../store';
import { COMPONENT_REGISTRY } from '../registries';
import { componentToTemplate } from './utils';
import { usePaletteInteractions } from './usePaletteInteractions';
import { PlayCircle } from 'lucide-react';
import { clsx } from 'clsx';

export const ComponentsTab: React.FC = () => {
  const { handleMouseDown, handleKeyDown } = usePaletteInteractions();
  const recentlyUsed = useBuilderStore(s => s.recentlyUsed);
  const categories = ['layout', 'forms', 'patterns', 'daisyui', 'preline', 'data', 'media', 'typography', 'html'] as const;

  return (
    <div className="pb-8">
       {recentlyUsed.length > 0 && (
        <div className="pb-4 border-b border-base-300">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 bg-base-300/50 py-3 px-4 z-10 border-b border-t border-base-300 shadow-sm">
                Recently Used
            </h3>
            <div className="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
                <div className="flex space-x-3">
                    {recentlyUsed.map(componentId => {
                        const comp = COMPONENT_REGISTRY[componentId];
                        if (!comp) return null;
                        return (
                            <div
                                key={`recent-${comp.id}`}
                                tabIndex={0}
                                role="button"
                                style={{ touchAction: 'none' }}
                                onPointerDown={(e) => handleMouseDown(e, componentToTemplate(comp))}
                                onKeyDown={(e) => handleKeyDown(e, componentToTemplate(comp))}
                                className={clsx(
                                "flex-shrink-0 w-24 p-3 bg-base-100 rounded border border-base-300 hover:border-primary cursor-grab active:cursor-grabbing flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 relative",
                                comp.meta?.runtimeOnly && "tooltip"
                                )}
                                data-tip={comp.meta?.runtimeOnly ? "Interactive in Preview Mode only" : undefined}
                            >
                                {comp.meta?.runtimeOnly && (
                                <PlayCircle className="w-4 h-4 absolute top-1 right-1 text-secondary opacity-80" />
                                )}
                                {comp.icon && <comp.icon className="w-5 h-5 opacity-70" />}
                                <span className="text-xs text-center leading-tight">{comp.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      )}

      <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 bg-base-300/50 py-3 px-4 z-10 border-b border-t border-base-300 shadow-sm">
        Components
      </h3>
      {categories.map(cat => (
          <div key={cat}>
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-50 pt-4 pb-2 px-4">
              {cat}
            </h4>
            
            <div className="grid grid-cols-2 gap-2 px-4">
              {Object.values(COMPONENT_REGISTRY)
                .filter(c => c.category === cat)
                .map((comp) => (
                  <div
                    key={comp.id}
                    tabIndex={0}
                    role="button"
                    style={{ touchAction: 'none' }}
                    onPointerDown={(e) => handleMouseDown(e, componentToTemplate(comp))}
                    onKeyDown={(e) => handleKeyDown(e, componentToTemplate(comp))}
                    className={clsx(
                      "p-3 bg-base-100 rounded border border-base-300 hover:border-primary cursor-grab active:cursor-grabbing flex flex-col items-center gap-2 transition-all hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 relative",
                      comp.meta?.runtimeOnly && "tooltip"
                    )}
                    data-tip={comp.meta?.runtimeOnly ? "Interactive in Preview Mode only" : undefined}
                  >
                    {comp.meta?.runtimeOnly && (
                      <PlayCircle className="w-4 h-4 absolute top-1 right-1 text-secondary opacity-80" />
                    )}
                    {comp.icon && <comp.icon className="w-5 h-5 opacity-70" />}
                    <span className="text-xs text-center leading-tight">{comp.label}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
