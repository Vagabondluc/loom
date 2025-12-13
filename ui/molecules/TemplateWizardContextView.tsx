import React from 'react';

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const TemplateWizardContextView: React.FC<Props> = ({ value, placeholder, onChange }) => {
  return (
    <textarea
      className="textarea textarea-bordered w-full h-24"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TemplateWizardContextView;
