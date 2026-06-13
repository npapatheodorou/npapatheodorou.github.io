import React, { useState } from 'react';
import { CONFIG } from '../utils/constants';

// Copy-to-clipboard email control. Recruiters often browse on desktop where a
// raw mailto: opens nothing useful; copying the address removes that friction.
// aria-live announces the confirmation for screen-reader users.
const CopyEmail = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CONFIG.contactEmail).then(done).catch(done);
    } else {
      done();
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={'Copy email address ' + CONFIG.contactEmail}
      className={
        'group inline-flex items-center gap-2 rounded-xl border border-surface-700/50 bg-surface-800/50 px-4 py-2.5 text-sm font-semibold text-surface-300 transition-colors hover:border-primary-500/40 hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ' +
        className
      }
    >
      {copied ? (
        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
      <span className="font-mono">{copied ? 'Copied!' : CONFIG.contactEmail}</span>
      <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
    </button>
  );
};

export default CopyEmail;
