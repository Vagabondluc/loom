
import React, { useMemo } from 'react';
import { parseMarkdownToHtml } from '../../../../utils/markdown';
import { EyeOff } from 'lucide-react';
import { DropZone } from '../../DropZone';
import { NodeRenderer } from '../NodeRenderer';
import { BuilderNode } from '../../../../types';
import { useHtmxLogic } from '../hooks/useHtmxLogic';
import { useRuntimeStore } from '../../../../stores/runtimeStore';
import { interpolateText } from '../../../../utils/expressionEngine';
import { StructureVisuals } from './StructureVisuals';

interface ElementNodeProps {
  node: BuilderNode;
  Tag: React.ElementType;
  classes: string;
  safeProps: any;
  isVisible: boolean;
  isPreviewMode: boolean;
  isStructureMode: boolean;
  isContainer: boolean;
  isVoid: boolean;
  handlers: any;
  depth: number;
}

export const ElementNode: React.FC<ElementNodeProps> = ({
  node, Tag, classes, safeProps, isVisible, isPreviewMode, isStructureMode, isContainer, isVoid, handlers, depth
}) => {
  // HTMX Integration
  const { handleHtmxClick } = useHtmxLogic(safeProps, isPreviewMode);
  
  // Interpolation & Markdown Parsing
  const runtimeVariables = useRuntimeStore(s => s.variables);
  const displayLabel = node.data.label 
    ? interpolateText(node.data.label, runtimeVariables) 
    : null;

  const renderedMarkdown = useMemo(() => {
    if (node.type === 'markdown' && displayLabel) {
      // Use centralized utility for consistent parsing
      return { __html: parseMarkdownToHtml(displayLabel) };
    }
    return null;
  }, [node.type, displayLabel]);

  // Wrap click handler to support both standard interactions and HTMX
  const wrappedHandlers = {
    ...handlers,
    onClick: (e: React.MouseEvent) => {
      handleHtmxClick(); // Fire fetch if configured
      if (handlers.onClick) handlers.onClick(e);
    }
  };
  
  // Markdown components render via dangerouslySetInnerHTML and have no children
  if (renderedMarkdown) {
    return (
      <Tag 
        id={node.id} 
        className={classes} 
        style={node.data.style}
        {...wrappedHandlers}
        {...safeProps}
        dangerouslySetInnerHTML={renderedMarkdown}
      />
    );
  }

  if (isVoid) {
    return (
      <Tag 
        id={node.id} 
        className={classes} 
        style={node.data.style}
        {...wrappedHandlers}
        {...safeProps}
      />
    );
  }

  return (
    <Tag 
      id={node.id} 
      className={classes}
      style={node.data.style}
      {...wrappedHandlers}
      {...safeProps}
    >
      {/* Structure Mode Visuals */}
      {isStructureMode && !isVoid && (
          <StructureVisuals node={node} depth={depth} />
      )}

      {/* Visibility Indicator */}
      {!isVisible && !isPreviewMode && (
          <div className="absolute top-0 right-0 z-10 bg-warning/80 text-warning-content p-0.5 rounded-bl shadow-sm pointer-events-none" title="Hidden by logic">
              <EyeOff className="w-3 h-3" />
          </div>
      )}

      {/* Label/Text Content with Interpolation */}
      {displayLabel && node.type !== 'image' && (
          <span className={isStructureMode ? "pointer-events-none relative z-[2]" : "pointer-events-none"}>{displayLabel}</span>
      )}

      {/* Render Nested Image if Container wrapper */}
      {node.type === 'image' && Tag !== 'img' && safeProps.src && (
          <img src={safeProps.src} alt={safeProps.alt} className="w-full h-full object-cover" />
      )}

      {/* Recursion & DropZones */}
      {isContainer && (
          <>
              {node.children.length === 0 ? (
                  !isPreviewMode && <DropZone parentId={node.id} index={0} isEmpty />
              ) : (
                  <>
                      {node.children.map((childId, idx) => (
                          <React.Fragment key={childId}>
                              {!isPreviewMode && <DropZone parentId={node.id} index={idx} />}
                              <NodeRenderer nodeId={childId} depth={depth + 1} />
                          </React.Fragment>
                      ))}
                      {!isPreviewMode && <DropZone parentId={node.id} index={node.children.length} />}
                  </>
              )}
          </>
      )}
    </Tag>
  );
};
