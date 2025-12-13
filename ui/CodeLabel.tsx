
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CodeLabelProps {
  label: string;
  className?: string;
}

export const CodeLabel: React.FC<CodeLabelProps> = ({ label, className }) => (
  <code className={twMerge(clsx("text-[10px] bg-base-300 px-1.5 py-0.5 rounded text-base-content/60 font-mono mt-2 inline-block", className))}>
    {label}
  </code>
);
