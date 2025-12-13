import React from 'react';
import { Button } from '../../../../index';
import { Wand2, RefreshCw } from 'lucide-react';

type Props = {
  mode: 'short' | 'medium' | 'long';
  onSetMode: (mode: 'short' | 'medium' | 'long') => void;
  onRegenerate: () => void;
};

export const LoremControlView: React.FC<Props> = ({ mode, onSetMode, onRegenerate }) => {
  return (
    <div className="space-y-3 bg-base-100 p-3 rounded-lg border border-base-300">
      <div className="flex items-center gap-2 mb-2 text-xs font-bold opacity-70">
        <Wand2 className="w-3 h-3" /> Lorem Generator
      </div>

      <div className="join w-full">
        {(['short', 'medium', 'long'] as const).map(m => (
          <button key={m} className={`join-item btn btn-xs flex-1 ${mode === m ? 'btn-active' : ''}`} onClick={() => onSetMode(m)}>
            {m}
          </button>
        ))}
      </div>
      <Button size="xs" variant="ghost" className="w-full gap-2 border border-base-200" onClick={onRegenerate}>
        <RefreshCw className="w-3 h-3" /> Regenerate Text
      </Button>
    </div>
  );
};

export default LoremControlView;
