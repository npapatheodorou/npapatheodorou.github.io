import React from 'react';

// Unified section heading: eyebrow pill + gradient title + accent underline +
// subtitle. Keeps rhythm/typography consistent across every section while still
// allowing a per-section accent color.
var ACCENTS = {
  primary: {
    pill: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
    dot: 'bg-primary-500',
    line: 'from-primary-500',
  },
  emerald: {
    pill: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    line: 'from-emerald-500',
  },
  indigo: {
    pill: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    dot: 'bg-indigo-500',
    line: 'from-indigo-500',
  },
  purple: {
    pill: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-500',
    line: 'from-purple-500',
  },
  cyan: {
    pill: 'bg-accent-500/10 text-accent-700 dark:text-accent-400',
    dot: 'bg-accent-500',
    line: 'from-accent-500',
  },
};

var SectionHeader = ({ eyebrow, title, subtitle, accent = 'primary', children }) => {
  var a = ACCENTS[accent] || ACCENTS.primary;
  return (
    <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
      <span className={'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 ' + a.pill}>
        <span className={'w-1.5 h-1.5 rounded-full ' + a.dot} />
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gradient leading-[1.25] pb-2 mb-4">{title}</h2>
      <div className={'mx-auto h-1 w-16 rounded-full bg-gradient-to-r to-transparent mb-4 ' + a.line} />
      {subtitle && <p className="text-surface-500 text-lg">{subtitle}</p>}
      {children}
    </div>
  );
};

export default SectionHeader;
