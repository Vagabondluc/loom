import React from 'react';

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  label?: string;
};

export const TemplateWizardContextView: React.FC<Props> = ({ value, placeholder, onChange, label }) => {
  return (
    <textarea
      className="textarea textarea-bordered w-full h-24"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label || placeholder || "Context input"}
    />
  );
};

export default TemplateWizardContextView;
