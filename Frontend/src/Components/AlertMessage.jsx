import React from 'react';

const AlertMessage = ({ 
  type = 'info', 
  title, 
  message, 
  onClose, 
  actionText, 
  onAction 
}) => {
  const styles = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-500',
      text: 'text-emerald-800',
      iconText: 'text-emerald-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      btn: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
    },
    error: {
      bg: 'bg-rose-50',
      border: 'border-rose-500',
      text: 'text-rose-800',
      iconText: 'text-rose-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      btn: 'bg-rose-100 hover:bg-rose-200 text-rose-800'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-500',
      text: 'text-amber-800',
      iconText: 'text-amber-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3.L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      btn: 'bg-amber-100 hover:bg-amber-200 text-amber-800'
    },
    info: {
      bg: 'bg-sky-50',
      border: 'border-sky-500',
      text: 'text-sky-800',
      iconText: 'text-sky-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      btn: 'bg-sky-100 hover:bg-sky-200 text-sky-800'
    }
  };

  const current = styles[type] || styles.info;

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-6 rounded-xl border-l-[6px] shadow-sm transition-all duration-300 ${current.bg} ${current.border}`}>
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 shrink-0 ${current.iconText}`}>
          {current.icon}
        </div>
        <div className="flex flex-col">
          {title && <h4 className={`text-sm font-bold ${current.text} leading-tight mb-1`}>{title}</h4>}
          <p className={`text-sm ${current.text} opacity-90 leading-relaxed`}>{message}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto h-full px-1">
        {actionText && onAction && (
          <button 
            onClick={onAction}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm ml-auto sm:ml-4 whitespace-nowrap ${current.btn}`}
          >
            {actionText}
          </button>
        )}
        {onClose && (
          <button 
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-black/5 transition-colors ml-auto sm:ml-2 ${current.iconText}`}
            aria-label="Dismiss alert"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertMessage;
