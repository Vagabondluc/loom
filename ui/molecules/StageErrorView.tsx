import React from 'react';
import { Bug } from 'lucide-react';
import { Button } from '../atoms/Button';

type Props = { message?: string; onReset: () => void };

export const StageErrorView: React.FC<Props> = ({ message, onReset }) => {
  return (
    <div className="p-6 text-center text-error bg-error/10 rounded-box border border-error/20">
      <Bug className="w-8 h-8 mx-auto mb-2" />
      <h3 className="font-bold">Runtime Crash</h3>
      <p className="text-sm opacity-80 mb-4">{message}</p>
      <Button size="sm" variant="error" outline onClick={onReset}>Reset Stage</Button>
    </div>
  );
};

export default StageErrorView;
