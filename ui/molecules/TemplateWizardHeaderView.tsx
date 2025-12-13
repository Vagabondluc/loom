import React from 'react';
import { Wand2, X } from 'lucide-react';

type Props = {
  title: string;
  subtitle?: string;
  isGenerating?: boolean;
  onClose: () => void;
};

export const TemplateWizardHeaderView: React.FC<Props> = ({ title, subtitle, isGenerating, onClose }) => {
  return (
    <div className="navbar border-b border-base-200 px-6 h-16 flex-shrink-0 bg-base-100">
      <div className="flex-1 flex flex-col items-start justify-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" /> {title}
        </h2>
        {subtitle && <p className="text-xs text-base-content/60">{subtitle}</p>}
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost btn-circle" onClick={onClose} disabled={isGenerating}>
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TemplateWizardHeaderView;
