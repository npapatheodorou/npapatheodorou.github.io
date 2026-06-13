import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../utils/constants';

// Inline résumé preview so recruiters can read the CV without leaving the page
// or committing to a download. Closes on Escape / backdrop click and restores
// focus to the trigger. The PDF is only mounted while open (no upfront cost).
const ResumeModal = ({ triggerClassName = '', triggerLabel = 'Preview Resume' }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (triggerRef.current) triggerRef.current.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Résumé preview"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-4xl h-[85vh] bg-surface-900 border border-surface-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-surface-700/50">
              <h3 className="text-heading font-bold text-sm sm:text-base">{CONFIG.name} — Résumé</h3>
              <div className="flex items-center gap-2">
                <a
                  href={CONFIG.resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close résumé preview"
                  className="w-8 h-8 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-400 hover:text-heading flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <object data={CONFIG.resumeUrl + '#view=FitH'} type="application/pdf" className="flex-1 w-full bg-surface-800">
              <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
                <p className="text-surface-400 text-sm">Your browser can't display the PDF inline.</p>
                <a href={CONFIG.resumeUrl} download className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold">Download the résumé</a>
              </div>
            </object>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeModal;
