import React from 'react';
import { clsx } from 'clsx';

type Variant = 'solid' | 'outline' | 'ghost';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const VARIANT_CLASS: Record<Variant, string> = {
  solid: 'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none',
  outline: 'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none',
  ghost: 'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none'
};

export const PrelineButtonView: React.FC<Props> = ({ variant = 'solid', className, children, ...rest }) => {
  return (
    <button className={clsx(VARIANT_CLASS[variant], className)} {...rest}>
      {children}
    </button>
  );
};

export default PrelineButtonView;
