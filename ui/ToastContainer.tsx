
import React from 'react';
import { useToastStore } from '../stores/toastStore';
import { X, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const Icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle
};

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore(s => s.toasts);
  const removeToast = useToastStore(s => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="toast toast-bottom toast-end z-[9999] p-4 gap-2">
      {toasts.map(t => {
        const Icon = Icons[t.type];
        return (
          <div 
            key={t.id} 
            className={clsx(
              "alert shadow-lg min-w-[300px] flex justify-between animate-in slide-in-from-right fade-in duration-300",
              `alert-${t.type}`
            )}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5" />
              <span>{t.message}</span>
            </div>
            <button 
              onClick={() => removeToast(t.id)} 
              className="btn btn-ghost btn-xs btn-circle hover:bg-black/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
