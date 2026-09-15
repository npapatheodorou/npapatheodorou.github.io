import React, { useMemo, useState } from 'react';
import { APPS_DATA, CONFIG } from '../utils/constants';
import { formatDate, formatNumber } from '../utils/helpers';
import SectionHeader from './SectionHeader';

// Shipped, publicly usable apps — the most direct proof on the page because a
// reviewer can open each one and try it. Cards are enriched with live GitHub
// stats (stars, forks, last push) and sortable; "Most stars" is the default so
// the strongest social proof leads.
var ICONS = {
  notes: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  bookmark: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />,
  key: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />,
  package: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  wifi: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />,
  terminal: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
};

var StarIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

var ForkIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v12" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9" />
  </svg>
);

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

// Real app icon (each app's own favicon, stored in public/icons/apps) with the
// Heroicons glyph as fallback for tools that have no logo. Exported so the
// Repositories section can show the same mark on its featured cards.
export var AppIcon = ({ app, className = 'w-11 h-11' }) => {
  if (app.iconSrc) {
    return (
      <span
        className={className + ' rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 border border-surface-700/40 shadow-lg ' + (app.iconPad ? 'p-1.5' : '')}
        style={app.iconBg ? { backgroundColor: app.iconBg } : undefined}
      >
        <img
          src={(process.env.PUBLIC_URL || '') + app.iconSrc}
          alt=""
          width="44"
          height="44"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </span>
    );
  }
  return (
    <span className={className + ' rounded-xl bg-gradient-to-br text-white flex items-center justify-center shadow-lg flex-shrink-0 ' + app.gradient}>
      <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{ICONS[app.icon]}</svg>
    </span>
  );
};

// Sort options. Apps without a public repo have no GitHub stats and always
// sort last on stat-based orders; ties fall back to the curated APPS_DATA order.
var SORTS = [
  { id: 'stars', label: 'Most stars', badge: 'Most starred', key: 'stars' },
  { id: 'forks', label: 'Most forks', badge: 'Most forked', key: 'forks' },
  { id: 'updated', label: 'Recently updated', badge: 'Latest update', key: 'pushedAt' },
  { id: 'name', label: 'A–Z', badge: null, key: 'name' },
];

var repoNameOf = function (app) { return app.repoUrl ? app.repoUrl.split('/').pop() : null; };

var AppCard = ({ app, badge }) => (
  <article
    className="card group flex flex-col bg-surface-800/60 border border-surface-700/50 rounded-2xl overflow-hidden hover:border-primary-500/25"
    aria-labelledby={'app-' + app.id}
  >
    <div className={'h-1 bg-gradient-to-r ' + app.gradient} />
    <div className="p-6 sm:p-7 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-3 mb-4">
        <AppIcon app={app} />
        <div className="flex flex-wrap justify-end gap-1.5">
          {badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <StarIcon className="w-3 h-3" />
              {badge}
            </span>
          )}
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

      <h3 id={'app-' + app.id} className="text-heading font-bold text-xl leading-snug">
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

      <ul className="space-y-2 mb-6">
        {app.highlights.map(function (h) {
          return (
            <li key={h} className="flex items-start gap-2 text-surface-500 text-sm leading-relaxed">
              <svg aria-hidden="true" className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{h}</span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
        {app.stack.map(function (tech) {
          return <span key={tech} className="px-2 py-0.5 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-md">{tech}</span>;
        })}
      </div>

      {/* GitHub stats row — only for apps with a public repo */}
      {app.repoUrl && (
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs font-semibold text-surface-500 tabular-nums">
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Stars</dt>
            <StarIcon className="w-3.5 h-3.5 text-amber-500" />
            <dd>{formatNumber(app.stars)}<span className="sr-only"> stars</span></dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Forks</dt>
            <ForkIcon className="w-3.5 h-3.5 text-accent-500" />
            <dd>{formatNumber(app.forks)}<span className="sr-only"> forks</span></dd>
          </div>
          {app.pushedAt && (
            <div className="inline-flex items-center gap-1.5 text-surface-600">
              <dt className="sr-only">Last update</dt>
              <dd>Updated {formatDate(app.pushedAt)}</dd>
            </div>
          )}
        </dl>
      )}

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
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500">
          <span className={'w-1.5 h-1.5 rounded-full ' + (app.type === 'tool' ? 'bg-primary-500' : 'bg-green-500')} aria-hidden="true" />
          {app.type === 'tool' ? 'Open source' : 'Live'}
        </span>
      </div>
    </div>
  </article>
);

var Apps = ({ repos = [] }) => {
  const [sortBy, setSortBy] = useState('stars');

  // Merge live GitHub stats into the curated app list, keyed by repo name.
  var apps = useMemo(function () {
    var byName = {};
    repos.forEach(function (r) { byName[r.name] = r; });
    return APPS_DATA.map(function (app, index) {
      var repo = byName[repoNameOf(app)];
      return Object.assign({}, app, {
        order: index,
        stars: repo ? repo.stargazers_count : (app.repoUrl ? 0 : null),
        forks: repo ? repo.forks_count : (app.repoUrl ? 0 : null),
        pushedAt: repo ? repo.pushed_at : null,
      });
    });
  }, [repos]);

  var sorted = useMemo(function () {
    var sort = SORTS.find(function (s) { return s.id === sortBy; }) || SORTS[0];
    var list = apps.slice();
    list.sort(function (a, b) {
      if (sort.key === 'name') return a.name.localeCompare(b.name);
      var av = a[sort.key], bv = b[sort.key];
      // Missing stats (no public repo) always sink to the bottom.
      if (av == null && bv == null) return a.order - b.order;
      if (av == null) return 1;
      if (bv == null) return -1;
      var diff = sort.key === 'pushedAt' ? new Date(bv) - new Date(av) : bv - av;
      return diff !== 0 ? diff : a.order - b.order;
    });
    return { list: list, sort: sort };
  }, [apps, sortBy]);

  var totalStars = apps.reduce(function (n, a) { return n + (a.stars || 0); }, 0);
  var totalForks = apps.reduce(function (n, a) { return n + (a.forks || 0); }, 0);
  var openSource = apps.filter(function (a) { return a.repoUrl; }).length;
  var liveApps = apps.filter(function (a) { return a.type !== 'tool'; }).length;

  var facts = [
    { label: liveApps + ' live web apps' },
    { label: openSource + ' open source' },
    totalStars > 0 && { label: formatNumber(totalStars) + ' stars · ' + formatNumber(totalForks) + ' forks on GitHub', icon: 'star' },
    { label: 'No accounts, no tracking' },
  ].filter(Boolean);

  // The leading card gets a badge naming why it leads (only for stat-based sorts
  // and only when it actually has that stat).
  var leader = sorted.list[0];
  var leaderBadge = sorted.sort.badge && leader && leader[sorted.sort.key] ? sorted.sort.badge : null;

  return (
    <section id="apps" className="py-20 bg-surface-900/40">
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
                <span key={f.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-700/50 bg-surface-800/40 text-surface-300 text-xs font-medium">
                  {f.icon === 'star' ? (
                    <StarIcon className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <svg aria-hidden="true" className="w-3.5 h-3.5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {f.label}
                </span>
              );
            })}
          </div>
        </SectionHeader>

        {/* Sort control */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <p className="text-surface-500 text-sm">
            <span className="text-heading font-semibold tabular-nums">{sorted.list.length}</span> apps &amp; tools · GitHub stats update live
          </p>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Sort apps">
            <span className="text-surface-500 text-xs font-bold uppercase tracking-wider mr-1">Sort</span>
            {SORTS.map(function (s) {
              var active = sortBy === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={function () { setSortBy(s.id); }}
                  aria-pressed={active}
                  className={'px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ' +
                    (active
                      ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30'
                      : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading hover:border-surface-600')}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.list.map(function (app, index) {
            return <AppCard key={app.id} app={app} badge={index === 0 ? leaderBadge : null} />;
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
