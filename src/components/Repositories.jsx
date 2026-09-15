import React, { useMemo, useState } from 'react';
import { formatDate, formatNumber, getLanguageColor } from '../utils/helpers';
import { FEATURED_REPO_NAMES, HIDDEN_REPOS } from '../utils/constants';
import SectionHeader from './SectionHeader';

// A repo counts as "mine" if it is not a fork, or if it is explicitly curated
// (a substantially reworked fork still belongs in the showcase). Housekeeping
// repos (profile config, this site) are hidden — they add noise, not signal.
var isOwn = function (repo) {
  if (HIDDEN_REPOS.indexOf(repo.name) !== -1) return false;
  return !repo.fork || FEATURED_REPO_NAMES.indexOf(repo.name) !== -1;
};

var INITIAL_COUNT = 6;

var RepoCard = ({ repo }) => (
  <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
    className="card group block bg-surface-800/60 border border-surface-700/50 rounded-2xl p-5 hover:border-primary-500/30 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
    <div className="flex items-start justify-between gap-3 mb-2">
      <h3 className="text-heading font-bold group-hover:text-primary-500 transition-colors truncate">{repo.name}</h3>
      <svg aria-hidden="true" className="w-4 h-4 text-surface-500 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
    <p className="text-surface-500 text-sm leading-relaxed mb-3 line-clamp-2 min-h-[40px]">{repo.description || 'No description available'}</p>
    {repo.topics && repo.topics.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-3">
        {repo.topics.slice(0, 4).map(function(topic) {
          return <span key={topic} className="px-2 py-0.5 text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-md">{topic}</span>;
        })}
      </div>
    )}
    <div className="flex items-center justify-between pt-3 border-t border-surface-700/30 text-xs text-surface-500 tabular-nums">
      <div className="flex items-center gap-3">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && <span>{formatNumber(repo.stargazers_count)} stars</span>}
        {repo.forks_count > 0 && <span>{formatNumber(repo.forks_count)} forks</span>}
      </div>
      <span className="text-surface-600">{formatDate(repo.pushed_at)}</span>
    </div>
  </a>
);

var Repositories = ({ repos }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [showAll, setShowAll] = useState(false);

  var own = useMemo(function() {
    return repos.filter(function(repo) { return isOwn(repo) && !repo.archived; });
  }, [repos]);

  var languages = useMemo(function() {
    var seen = {};
    var list = [];
    own.forEach(function(repo) {
      if (repo.language && !seen[repo.language]) {
        seen[repo.language] = true;
        list.push(repo.language);
      }
    });
    return ['all'].concat(list.slice(0, 8));
  }, [own]);

  var filtered = useMemo(function() {
    var items = filter === 'all' ? own.slice() : own.filter(function(repo) { return repo.language === filter; });
    items.sort(function(a, b) {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count;
      if (sortBy === 'forks') return b.forks_count - a.forks_count || b.stargazers_count - a.stargazers_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });
    return items;
  }, [own, filter, sortBy]);

  var stars = own.reduce(function(total, repo) { return total + repo.stargazers_count; }, 0);
  var forks = own.reduce(function(total, repo) { return total + repo.forks_count; }, 0);
  var visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  var hiddenCount = filtered.length - visible.length;

  var summary = [
    own.length + ' public repos',
    formatNumber(stars) + ' stars',
    formatNumber(forks) + ' forks',
  ];

  return (
    <section id="repositories" className="py-20">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Open Source"
          title="Public Repositories"
          subtitle="Everything I keep public on GitHub. Production Java, Spring and DevOps work lives in private enterprise repositories."
        >
          <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-2 text-surface-500 text-sm font-medium tabular-nums">
            {summary.map(function (s, i) {
              return (
                <React.Fragment key={s}>
                  {i > 0 && <span className="text-surface-700" aria-hidden="true">·</span>}
                  <span>{s}</span>
                </React.Fragment>
              );
            })}
          </p>
        </SectionHeader>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2 flex-1" role="group" aria-label="Filter by language">
            {languages.map(function(language) {
              return (
                <button key={language} onClick={() => { setFilter(language); setShowAll(false); }} aria-pressed={filter === language}
                  className={'px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ' +
                    (filter === language ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30' : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading hover:border-surface-600')}>
                  {language === 'all' ? 'All' : language}
                </button>
              );
            })}
          </div>
          <select value={sortBy} onChange={function(event) { setSortBy(event.target.value); }} aria-label="Sort repositories"
            className="px-4 py-2.5 min-h-[44px] bg-surface-800 border border-surface-700 rounded-lg text-surface-300 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map(function(repo) { return <RepoCard key={repo.id} repo={repo} />; })}
        </div>
        {filtered.length === 0 && <p className="text-center py-12 text-surface-500">No repositories found.</p>}

        {(hiddenCount > 0 || showAll) && filtered.length > INITIAL_COUNT && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={function() { setShowAll(!showAll); }}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 px-5 min-h-[44px] rounded-xl border border-surface-700/50 bg-surface-800/50 text-surface-400 hover:text-heading hover:border-surface-600 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {showAll ? 'Show fewer' : 'Show all ' + filtered.length + ' repositories'}
              <svg aria-hidden="true" className={'w-4 h-4 transition-transform duration-300 ' + (showAll ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Repositories;
