import React from 'react';

const EmptyState = ({ 
  title = "No data found", 
  message = "Everything looks empty here.", 
  actionText, 
  onAction,
  icon
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-20 px-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 mb-5">
        {icon || (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m14 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m14 0H4" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium text-sm mt-3 max-w-sm leading-relaxed">
        {message}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-8 px-6 py-2.5 bg-[#d66847] hover:bg-[#c55b3b] text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#d66847]/20 transition-all active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
