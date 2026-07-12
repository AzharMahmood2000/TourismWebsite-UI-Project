import React from 'react';

const LoadingState = ({ message = "Loading content...", size = "normal" }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-24 px-6 bg-transparent text-center">
      <div className="relative flex justify-center items-center">
        <div className={`rounded-full border-[#d66847] border-t-transparent animate-spin ${size === 'small' ? 'w-8 h-8 border-2' : 'w-12 h-12 border-4'}`}></div>
        <div className={`absolute rounded-full border-slate-200 ${size === 'small' ? 'w-8 h-8 border-2' : 'w-12 h-12 border-4'} opacity-30`}></div>
      </div>
      <p className={`mt-5 text-slate-500 font-semibold tracking-wide ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
        {message}
      </p>
    </div>
  );
};

export default LoadingState;
