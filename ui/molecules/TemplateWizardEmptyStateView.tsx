import React from 'react';
import { Sparkles } from 'lucide-react';

type Props = { message: string };

export const TemplateWizardEmptyStateView: React.FC<Props> = ({ message }) => {
  return (
    <div className="p-8 text-center opacity-50 border border-dashed border-base-300 rounded-lg">
      <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-50" />
      <div className="mt-2">{message}</div>
    </div>
  );
};

export default TemplateWizardEmptyStateView;
