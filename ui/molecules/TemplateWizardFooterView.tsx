import React from 'react';
import { Sparkles } from 'lucide-react';

type Props = {
  isGenerating: boolean;
  onCancel: () => void;
  onGenerate: () => void;
};

export const TemplateWizardFooterView: React.FC<Props> = ({ isGenerating, onCancel, onGenerate }) => {
  return (
    <div className="border-t border-base-200 p-4 bg-base-100 flex items-center justify-between flex-shrink-0">
      <div className="text-xs opacity-50 hidden sm:block">
        Generates static, editable nodes. No runtime JS.
      </div>
      <div className="flex gap-3">
        <button className="btn btn-ghost" onClick={onCancel} disabled={isGenerating}>Cancel</button>
        <button className="btn btn-primary min-w-[160px]" onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? <span className="loading loading-spinner loading-xs"></span> : <Sparkles className="w-4 h-4 mr-2" />}
          {isGenerating ? 'Weaving...' : 'Generate Page'}
        </button>
      </div>
    </div>
  );
};

export default TemplateWizardFooterView;
