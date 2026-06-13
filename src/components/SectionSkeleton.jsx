import React from 'react';

// Reserves layout space while a lazily-loaded (code-split) section streams in,
// preventing content-jumping / CLS. Purely presentational.
var SectionSkeleton = ({ label }) => (
  <div className="py-24" aria-hidden="true">
    <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="h-6 w-40 mx-auto rounded-full bg-surface-800/70 animate-pulse" />
        <div className="h-10 w-64 mx-auto mt-4 rounded-lg bg-surface-800/70 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-surface-800/60 border border-surface-700/40 animate-pulse" />
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-44 rounded-2xl bg-surface-800/60 border border-surface-700/40 animate-pulse" />
        ))}
      </div>
      <span className="sr-only">{label || 'Loading section'}</span>
    </div>
  </div>
);

export default SectionSkeleton;
