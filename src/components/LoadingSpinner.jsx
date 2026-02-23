import React from 'react';

var LoadingSpinner = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-surface-700/30 rounded-full" />
      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
    </div>
    <p className="mt-6 text-surface-500 font-semibold animate-pulse">{message || 'Loading...'}</p>
    <div className="flex gap-1.5 mt-4">
      {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: i * 150 + 'ms' }} />)}
    </div>
  </div>
);

export default LoadingSpinner;