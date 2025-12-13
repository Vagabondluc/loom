import React from 'react';
import { clsx } from 'clsx';

type Props = { index: number; title: string; bg?: string; text?: string };

export const TemplateWizardStepHeaderView: React.FC<Props> = ({ index, title, bg = 'bg-primary/10', text = 'text-primary' }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center font-bold', bg, text)}>{index}</div>
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};

export default TemplateWizardStepHeaderView;
