import React from 'react';
import { TextArea, FormField } from '../../index';

interface StyleEditorViewProps {
  classNameValue: string;
  onChange: (value: string) => void;
  onSnapshot: () => void;
}

export const StyleEditorView: React.FC<StyleEditorViewProps> = ({ classNameValue, onChange, onSnapshot }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider opacity-50">Custom Styles</h3>
      <FormField label="Additional Classes">
        <TextArea
          className="font-mono text-xs h-24"
          value={classNameValue}
          onFocus={onSnapshot}
          onChange={(e) => onChange(e.target.value)}
        />
      </FormField>
      <div className="text-[10px] opacity-60">Supports all Tailwind and DaisyUI utility classes.</div>
    </div>
  );
};
