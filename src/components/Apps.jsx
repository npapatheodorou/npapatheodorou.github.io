import React from 'react';
import { APPS_DATA, CONFIG } from '../utils/constants';
import { formatNumber } from '../utils/helpers';
import SectionHeader from './SectionHeader';

// Shipped, publicly usable apps — the most direct proof on the page because a
// reviewer can open each one and try it. Laid out as a bento grid: the featured
// app spans two columns on desktop, the rest tile around it.
var ICONS = {
  notes: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  bookmark: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />,
  key: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />,
  package: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  wifi: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />,
  terminal: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
};

var ExternalIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

var GitHubIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

var NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

var AppCard = ({ app, featured, stars }) => (
  <article
    className={'card group flex flex-col bg-surface-800/60 border border-surface-700/50 rounded-2xl overflow-hidden hover:border-primary-500/25 ' + (featured ? 'md:col-span-2' : '')}
    aria-labelledby={'app-' + app.id}
  >
    <div className={'h-1 bg-gradient-to-r ' + app.gradient} />
    <div className="p-6 sm:p-7 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className={'w-11 h-11 rounded-xl bg-gradient-to-br text-white flex items-center justify-center shadow-lg flex-shrink-0 ' + app.gradient}>
          <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{ICONS[app.icon]}</svg>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-surface-700/40 text-surface-400">{app.category}</span>
          {app.noBackend && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <svg aria-hidden="true" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              No backend
            </span>
          )}
        </div>
      </div>

      <h3 id={'app-' + app.id} className={'text-heading font-bold leading-snug ' + (featured ? 'text-2xl' : 'text-xl')}>
        <a
          href={app.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-500 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {app.name}<NewTab />
        </a>
      </h3>
      <p className="text-primary-600 dark:text-primary-400 text-sm font-semibold mt-1 mb-3">{app.tagline}</p>
      <p className="text-surface-400 text-sm leading-relaxed mb-5">{app.description}</p>

      <ul className={'gap-2 mb-6 ' + (featured ? 'grid sm:grid-cols-3' : 'space-y-2')}>
        {app.highlights.map(function (h) {
          return (
            <li key={h} className={'flex items-start gap-2 text-surface-500 text-sm leading-relaxed ' + (featured ? 'sm:flex-col sm:gap-1.5 sm:rounded-xl sm:border sm:border-surface-700/30 sm:bg-surface-900/30 sm:p-3' : '')}>
              <svg aria-hidden="true" className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{h}</span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
        {app.stack.map(function (tech) {
          return <span key={tech} className="px-2 py-0.5 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-md">{tech}</span>;
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-surface-700/30">
        <a
          href={app.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-4 min-h-[40px] rounded-lg text-white text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950"
        >
          {app.ctaLabel || 'Open app'}
          <ExternalIcon className="w-3.5 h-3.5" />
          <NewTab />
        </a>
        {app.repoUrl && app.repoUrl !== app.liveUrl && (
          <a
            href={app.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 min-h-[40px] rounded-lg border border-surface-700/50 text-surface-400 hover:text-heading hover:border-surface-600 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <GitHubIcon className="w-4 h-4" />
            Source
            <NewTab />
          </a>
        )}
        <span className="ml-auto inline-flex items-center gap-3 text-xs font-semibold text-surface-500">
          {typeof stars === 'number' && stars > 0 && (
            <span className="inline-flex items-center gap-1" aria-label={stars + ' GitHub stars'}>
              <svg aria-hidden="true" className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {formatNumber(stars)}
            </span>
          )}
          {app.type === 'tool' ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
              Open source
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              Live
            </span>
          )}
        </span>
      </div>
    </div>
  </article>
);

var Apps = ({ repos = [] }) => {
  var openSource = APPS_DATA.filter(function (a) { return a.repoUrl; }).length;
  var liveApps = APPS_DATA.filter(function (a) { return a.type !== 'tool'; }).length;
  var facts = [
    liveApps + ' live web apps',
    openSource + ' open source',
    'No accounts, no tracking',
  ];
  // Live star counts from the GitHub fetch, keyed by repo name (empty while loading).
  var starsByName = {};
  repos.forEach(function (r) { starsByName[r.name] = r.stargazers_count; });

  return (
    <section id="apps" className="py-24 bg-surface-900/40">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          accent="cyan"
          eyebrow="Shipped & Live"
          title="Apps & Tools I've Built"
          subtitle="Small, focused apps and tools I designed, built, and run — each solving a real problem I had, and each one you can open and use right now."
        >
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {facts.map(function (f) {
              return (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-700/50 bg-surface-800/40 text-surface-300 text-xs font-medium">
                  <svg aria-hidden="true" className="w-3.5 h-3.5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </span>
              );
            })}
          </div>
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {APPS_DATA.map(function (app) {
            var repoName = app.repoUrl ? app.repoUrl.split('/').pop() : null;
            return <AppCard key={app.id} app={app} featured={app.featured} stars={repoName ? starsByName[repoName] : undefined} />;
          })}
        </div>

        <p className="mt-10 text-center text-surface-500 text-sm">
          More experiments and tooling live on{' '}
          <a
            href={'https://github.com/' + CONFIG.githubUsername}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            GitHub<NewTab />
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Apps;
