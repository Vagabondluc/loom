
import React from 'react';
import { BuilderNode } from '../../../types';
import { COMPONENT_REGISTRY } from '../../registries';
import { ArrowRight, ArrowDown, Grid, Layout } from 'lucide-react';
import { clsx } from 'clsx';

interface StructureVisualsProps {
  node: BuilderNode;
  depth: number;
}

export const StructureVisuals: React.FC<StructureVisualsProps> = ({ node, depth }) => {
  const layout = node.layout;
  const def = COMPONENT_REGISTRY[node.type];
  const isContainer = def.allowChildren;
  
  // Calculate depth color (heat map)
  // Deeper nests get slightly darker/warmer overlays to show structure
  const depthOpacity = Math.min(depth * 0.03, 0.2);
  
  // Determine display tag (for H1, H2, etc.)
  const displayTag = node.data.tagName || def.defaultTag;
  
  return (
    <div 
        className="absolute inset-0 pointer-events-none z-[1] overflow-hidden rounded-[inherit]"
        style={{ backgroundColor: isContainer ? `rgba(0,0,0,${depthOpacity})` : undefined }}
    >
        {/* Border Outline - Always present in structure mode via parent class, but we reinforce corner markers here */}
        
        {/* Component Badge */}
        <div className={clsx(
            "absolute top-0 left-0 px-1.5 py-0.5 text-[9px] font-mono leading-none rounded-br z-10 flex items-center gap-1 shadow-sm border-r border-b border-white/10 backdrop-blur-sm",
            isContainer ? "bg-primary/90 text-primary-content" : "bg-neutral/80 text-neutral-content"
        )}>
            <span className="font-bold tracking-tighter">{def.label}</span>
            {/* Show specific tag for typography elements to reveal hierarchy */}
            {def.category === 'typography' && displayTag && (
                <span className="font-bold opacity-80 uppercase border-l border-white/20 pl-1 ml-1">{displayTag}</span>
            )}
            {layout?.mode !== 'static' && layout?.mode && (
                <span className="opacity-70 font-normal scale-90">({layout.mode})</span>
            )}
        </div>

        {/* Layout Flow Indicators (Flex Arrows) */}
        {isContainer && layout && layout.mode === 'flex' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                {/* Large background arrow indicating flow direction */}
                {layout.direction === 'col' || layout.direction === 'col-reverse' ? (
                    <ArrowDown className="w-1/2 h-1/2" />
                ) : (
                    <ArrowRight className="w-1/2 h-1/2" />
                )}
            </div>
        )}

        {/* Layout Stats Badge (Top Right) */}
        {isContainer && layout && layout.mode !== 'static' && (
            <div className="absolute top-1 right-1 flex items-center gap-1.5 p-1 bg-base-100/50 backdrop-blur-md rounded border border-base-content/5 text-base-content/70 shadow-sm z-10">
                {layout.mode === 'flex' && (
                    <>
                        <Layout className="w-3 h-3" />
                        {layout.gap !== undefined && layout.gap > 0 && (
                            <span className="text-[8px] font-mono leading-none border-l border-base-content/20 pl-1">
                                gap-{layout.gap}
                            </span>
                        )}
                        {layout.wrap === 'wrap' && (
                            <span className="text-[8px] font-mono leading-none border-l border-base-content/20 pl-1">
                                wrap
                            </span>
                        )}
                    </>
                )}
                
                {layout.mode === 'grid' && (
                    <>
                        <Grid className="w-3 h-3" />
                        <span className="text-[8px] font-mono leading-none border-l border-base-content/20 pl-1">
                            {layout.cols}c
                        </span>
                        {layout.gap !== undefined && (
                            <span className="text-[8px] font-mono leading-none border-l border-base-content/20 pl-1">
                                gap-{layout.gap}
                            </span>
                        )}
                    </>
                )}
            </div>
        )}
    </div>
  );
};
