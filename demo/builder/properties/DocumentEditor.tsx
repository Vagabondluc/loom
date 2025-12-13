
import React, { useState, useEffect } from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { TextArea, Button } from '../../../ui';
import { FileText, Eye, Edit2 } from 'lucide-react';
import { parseMarkdownToHtml } from '../../../utils/markdown';
import { clsx } from 'clsx';

interface DocumentEditorProps {
  node: BuilderNode;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ node }) => {
  const updateNodeData = useBuilderStore(s => s.updateNodeData);
  const snapshot = useBuilderStore(s => s.snapshot);
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [localContent, setLocalContent] = useState(node.data.label || '');

  // Sync local state when selection changes
  useEffect(() => {
    setLocalContent(node.data.label || '');
  }, [node.id, node.data.label]);

  const handleChange = (val: string) => {
    setLocalContent(val);
    updateNodeData(node.id, { label: val }, { skipHistory: true });
  };

  const handleBlur = () => {
    // Commit logic if needed, but updateNodeData handles transient updates well
    snapshot(); 
  };

  return (
    <div className="flex flex-col h-64 border border-base-300 rounded-lg overflow-hidden bg-base-100">
      <div className="flex border-b border-base-300 bg-base-200/50">
        <button 
          className={clsx("flex-1 btn btn-sm btn-ghost rounded-none gap-2", mode === 'write' && "bg-base-100 text-primary border-b-2 border-primary")}
          onClick={() => setMode('write')}
        >
          <Edit2 className="w-3 h-3" /> Write
        </button>
        <button 
          className={clsx("flex-1 btn btn-sm btn-ghost rounded-none gap-2", mode === 'preview' && "bg-base-100 text-primary border-b-2 border-primary")}
          onClick={() => setMode('preview')}
        >
          <Eye className="w-3 h-3" /> Preview
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {mode === 'write' ? (
          <textarea
            className="w-full h-full p-3 text-xs font-mono resize-none focus:outline-none bg-transparent"
            value={localContent}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="# Markdown Title..."
          />
        ) : (
          <div className="w-full h-full overflow-y-auto p-4 bg-base-100">
             <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(localContent) }}
             />
          </div>
        )}
      </div>
      
      <div className="p-2 bg-base-200/30 text-[10px] opacity-60 border-t border-base-300 flex justify-between">
         <span>markdown-ast</span>
         <span>{localContent.length} chars</span>
      </div>
    </div>
  );
};
