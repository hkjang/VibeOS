import React from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage, clearToast } = useVibeStore();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-slate-900/90 text-emerald-100',
    error: 'border-rose-500/30 bg-slate-900/90 text-rose-100',
    warning: 'border-amber-500/30 bg-slate-900/90 text-amber-100',
    info: 'border-cyan-500/30 bg-slate-900/90 text-cyan-100',
  };

  const type = toastMessage.type || 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${borders[type]} max-w-md`}
      >
        {icons[type]}
        <p className="text-sm font-medium pr-2">{toastMessage.text}</p>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
