import React from 'react';
import { AlertCircle } from 'lucide-react';

type Props = { message: string | null; onClose?: () => void };

export const TemplateWizardErrorAlertView: React.FC<Props> = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="alert alert-error shadow-lg">
      <AlertCircle className="w-6 h-6" />
      <span>{message}</span>
      {onClose && (
        <button className="btn btn-ghost btn-xs ml-auto" onClick={onClose}>Dismiss</button>
      )}
    </div>
  );
};

export default TemplateWizardErrorAlertView;
