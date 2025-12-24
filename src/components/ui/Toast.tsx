import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Toast as ToastType } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-accent-emerald" />,
    error: <AlertCircle className="w-5 h-5 text-accent-rose" />,
    info: <Info className="w-5 h-5 text-accent-cyan" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
  };

  const colors = {
    success: 'border-accent-emerald/30 bg-accent-emerald/10',
    error: 'border-accent-rose/30 bg-accent-rose/10',
    info: 'border-accent-cyan/30 bg-accent-cyan/10',
    warning: 'border-amber-400/30 bg-amber-400/10',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl animate-slide-in-right',
        colors[toast.type]
      )}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-white">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="p-1 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onClose: (id: string) => void;
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 w-96">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default Toast;
