import React from 'react';

// Signature CLI motif. A faux terminal window used as the hero's focal element
// and reusable elsewhere. Prompt `$` is cyan (accent), output `→` is indigo
// (primary) — the site's two brand colors.
export const TermLine = ({ cmd, out, caret }) => (
  <div className="leading-relaxed">
    <div className="whitespace-pre-wrap break-words">
      <span className="text-accent-400 select-none">$ </span>
      <span className="text-slate-400">{cmd}</span>
    </div>
    {(out !== undefined && out !== '') && (
      <div className="text-slate-200 break-words">
        <span className="text-primary-400 select-none">→ </span>
        {out}
        {caret && <span className="terminal-caret" aria-hidden="true" />}
      </div>
    )}
  </div>
);

const Terminal = ({ title = 'nikos@portfolio: ~', className = '', children }) => (
  <div className={'terminal shadow-2xl shadow-black/30 ' + className}>
    <div className="terminal-bar flex items-center gap-2 px-4 py-2.5">
      <span className="w-3 h-3 rounded-full bg-red-400/80" />
      <span className="w-3 h-3 rounded-full bg-amber-400/80" />
      <span className="w-3 h-3 rounded-full bg-green-400/80" />
      <span className="ml-2 text-xs text-slate-500 font-mono truncate">{title}</span>
    </div>
    <div className="p-5 sm:p-6 text-[13px] sm:text-sm">{children}</div>
  </div>
);

export default Terminal;
