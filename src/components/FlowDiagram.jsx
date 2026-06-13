import React from 'react';

// Compact pipeline / architecture diagram for a project card. Renders the
// project's stages as numbered mono nodes joined by connectors — visual,
// on-brand proof for a DevOps engineer. Scrolls horizontally on small screens.
var FlowDiagram = ({ stages }) => {
  if (!stages || !stages.length) return null;
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 -mx-1 px-1" role="list" aria-label="Pipeline stages">
      {stages.map(function (stage, i) {
        return (
          <React.Fragment key={stage}>
            <span
              role="listitem"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-900/70 border border-surface-700/50 text-surface-300 text-xs font-mono font-semibold"
            >
              <span className="text-accent-400">{String(i + 1).padStart(2, '0')}</span>
              {stage}
            </span>
            {i < stages.length - 1 && (
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FlowDiagram;
