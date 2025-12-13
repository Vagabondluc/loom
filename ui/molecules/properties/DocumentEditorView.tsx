import React from 'react';
import { clsx } from 'clsx';
import { Edit2, Eye } from 'lucide-react';
import { parseMarkdownToHtml } from '../../../../utils/markdown';

interface DocumentEditorViewProps {
  mode: 'write' | 'preview';
  localContent: string;
  onSetMode: (m: 'write' | 'preview') => void;
  onChange: (v: string) => void;
  onBlur: () => void;
  onSnapshot: () => void;
}

export const DocumentEditorView: React.FC<DocumentEditorViewProps> = ({ mode, localContent, onSetMode, onChange, onBlur, onSnapshot }) => {
  return (
    <div className="flex flex-col h-64 border border-base-300 rounded-lg overflow-hidden bg-base-100">
      <div className="flex border-b border-base-300 bg-base-200/50">
        <button className={clsx('flex-1 btn btn-sm btn-ghost rounded-none gap-2', mode === 'write' && 'bg-base-100 text-primary border-b-2 border-primary')} onClick={() => onSetMode('write')}>
          <Edit2 className="w-3 h-3" /> Write
        </button>
        <button className={clsx('flex-1 btn btn-sm btn-ghost rounded-none gap-2', mode === 'preview' && 'bg-base-100 text-primary border-b-2 border-primary')} onClick={() => onSetMode('preview')}>
          <Eye className="w-3 h-3" /> Preview
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {mode === 'write' ? (
          <textarea
            className="w-full h-full p-3 text-xs font-mono resize-none focus:outline-none bg-transparent"
            value={localContent}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder="# Markdown Title..."
          />
        ) : (
          <div className="w-full h-full overflow-y-auto p-4 bg-base-100">
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(localContent) }} />
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
