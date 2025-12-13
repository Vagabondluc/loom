
import React, { useState } from 'react';
import { usePaletteInteractions } from './usePaletteInteractions';
import { componentToTemplate } from './utils';
import { COMPONENT_REGISTRY } from '../registries';
import { Image as ImageIcon, Heading, Quote, List, FileText, Code } from 'lucide-react';
import { Badge } from '../../../ui';
import { getMarkdownTokens } from '../../../utils/markdown';

interface ParsedBlock {
  type: string;
  label: string;
  props?: Record<string, any>;
  tagName?: string;
  icon: React.ReactNode;
}

export const MarkdownTab: React.FC = () => {
  const { handleMouseDown, handleKeyDown } = usePaletteInteractions();
  const [markdownText, setMarkdownText] = useState('');
  const [parsedBlocks, setParsedBlocks] = useState<ParsedBlock[]>([]);

  const parseMarkdown = () => {
    const tokens = getMarkdownTokens(markdownText);
    const blocks: ParsedBlock[] = [];

    tokens.forEach((token: any) => {
      // 1. Headings
      if (token.type === 'heading') {
        blocks.push({
          type: 'heading',
          label: token.text,
          tagName: `h${token.depth}`, // Capture H1-H6
          icon: <Heading className="w-3 h-3" />
        });
      }
      
      // 2. Paragraphs (Detect Images inside)
      else if (token.type === 'paragraph') {
        const imageToken = token.tokens?.find((t: any) => t.type === 'image');
        
        if (imageToken) {
           blocks.push({
             type: 'image',
             label: imageToken.text || 'Image',
             props: { src: imageToken.href, alt: imageToken.text },
             icon: <ImageIcon className="w-3 h-3" />
           });
        } else {
           blocks.push({
             type: 'paragraph',
             label: token.text,
             icon: <FileText className="w-3 h-3" />
           });
        }
      }

      // 3. Blockquotes -> Alerts
      else if (token.type === 'blockquote') {
        blocks.push({
          type: 'alert',
          label: token.text || token.tokens?.[0]?.text || '',
          icon: <Quote className="w-3 h-3" />
        });
      }

      // 4. Lists -> Individual Paragraphs with bullets (Simple mapping for now)
      else if (token.type === 'list') {
        token.items.forEach((item: any) => {
           blocks.push({
             type: 'paragraph',
             label: `• ${item.text}`,
             icon: <List className="w-3 h-3" />
           });
        });
      }

      // 5. Code Block -> Markdown Node (preserve formatting)
      else if (token.type === 'code') {
         blocks.push({
            type: 'markdown',
            label: `\`\`\`${token.lang || ''}\n${token.text}\n\`\`\``,
            icon: <Code className="w-3 h-3" />
         });
      }
    });

    setParsedBlocks(blocks);
  };

  const prepareTemplate = (block: ParsedBlock) => {
    const def = COMPONENT_REGISTRY[block.type];
    if (!def) return null;
    
    const template = componentToTemplate(def);
    const root = template.nodes[template.rootId];
    
    if (block.label) root.data.label = block.label;
    if (block.props) root.data.props = { ...root.data.props, ...block.props };
    if (block.tagName) root.data.tagName = block.tagName; // Set dynamic tag
    
    return template;
  };

  return (
    <div className="border-b border-base-300 flex flex-col h-full">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 bg-base-300/50 py-3 px-4 z-10 border-b border-base-300 shadow-sm">
        From Markdown
      </h3>
      <div className="p-4 space-y-4 flex-1 flex flex-col min-h-0">
        <div className="form-control flex-shrink-0">
          <textarea 
            className="textarea textarea-bordered h-32 text-xs font-mono"
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            placeholder={'# Heading\n\nParagraph text.\n\n> Quote block\n\n![Alt](https://picsum.photos/200/100)\n\n- List Item 1'}
          ></textarea>
          <button className="btn btn-sm btn-primary mt-2" onClick={parseMarkdown}>
            Generate Blocks (AST)
          </button>
        </div>
        
        <div className="divider text-xs m-0 flex-shrink-0">Draggable Blocks</div>
        
        <div className="space-y-2 flex-1 overflow-y-auto min-h-0 pr-1">
          {parsedBlocks.map((block, i) => {
              const template = prepareTemplate(block);
              if (!template) return null;

              return (
                  <div 
                    key={i}
                    tabIndex={0}
                    role="button"
                    style={{ touchAction: 'none' }}
                    onPointerDown={(e) => handleMouseDown(e, template)}
                    onKeyDown={(e) => handleKeyDown(e, template)}
                    className="p-3 bg-base-100 border border-base-300 rounded text-xs cursor-grab active:cursor-grabbing hover:border-primary flex items-center gap-3 transition-colors hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  >
                    <span className="opacity-50">{block.icon}</span>
                    <div className="truncate flex-1">
                      <span className="font-bold mr-2 text-[10px] opacity-40 uppercase">{block.type}</span>
                      {block.tagName && (
                        <Badge variant="ghost" size="xs" className="mr-2">{block.tagName}</Badge>
                      )}
                      <span className="truncate">{block.label}</span>
                    </div>
                  </div>
              );
          })}
          {parsedBlocks.length === 0 && (
            <div className="p-4 text-center opacity-40 text-xs border border-dashed border-base-content/20 rounded">
              No blocks generated yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
