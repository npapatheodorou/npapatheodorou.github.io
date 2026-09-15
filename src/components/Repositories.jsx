import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { calculateLanguageStats, formatDate, formatNumber, getLanguageColor } from '../utils/helpers';
import { FEATURED_REPO_NAMES } from '../utils/constants';

// A repo counts as "mine" if it is not a fork, or if it is explicitly curated
// (a substantially reworked fork still belongs in the showcase).
var isOwn = function (repo) { return !repo.fork || FEATURED_REPO_NAMES.indexOf(repo.name) !== -1; };
import SectionHeader from './SectionHeader';
import StatCard from './StatCard';

var RepoCard = ({ repo }) => (
  <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
    className="card group block bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-6 hover:border-primary-500/30 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-heading font-bold group-hover:text-primary-500 transition-colors truncate max-w-[220px]">{repo.name}</h3>
      <svg aria-hidden="true" className="w-4 h-4 text-surface-500 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
    <p className="text-surface-500 text-sm leading-relaxed mb-4 line-clamp-2 min-h-[40px]">{repo.description || 'No description available'}</p>
    {repo.topics && repo.topics.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {repo.topics.slice(0, 4).map(function(topic) {
          return <span key={topic} className="px-2 py-0.5 text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-md">{topic}</span>;
        })}
      </div>
    )}
    <div className="flex items-center justify-between pt-4 border-t border-surface-700/30">
      <div className="flex items-center gap-4">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
            <span className="text-surface-500 text-xs font-medium">{repo.language}</span>
          </div>
        )}
        {repo.stargazers_count > 0 && <span className="text-surface-500 text-xs">Stars {formatNumber(repo.stargazers_count)}</span>}
        {repo.forks_count > 0 && <span className="text-surface-500 text-xs">Forks {formatNumber(repo.forks_count)}</span>}
      </div>
      <span className="text-surface-600 text-xs">{formatDate(repo.pushed_at)}</span>
    </div>
  </a>
);

var ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <span className="text-heading text-sm font-semibold">{payload[0].name}</span>
        </div>
        <span className="text-surface-400 text-xs">{payload[0].payload.percentage}%</span>
      </div>
    );
  }
  return null;
};

var Repositories = ({ repos }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  var languages = useMemo(function() {
    var seen = {};
    var list = [];
    repos.forEach(function(repo) {
      if (repo.language && !seen[repo.language]) {
        seen[repo.language] = true;
        list.push(repo.language);
      }
    });
    return ['all'].concat(list.slice(0, 8));
  }, [repos]);

  var filtered = useMemo(function() {
    var items = repos.filter(function(repo) { return isOwn(repo) && !repo.archived; });
    if (filter !== 'all') items = items.filter(function(repo) { return repo.language === filter; });
    items.sort(function(a, b) {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count;
      if (sortBy === 'forks') return b.forks_count - a.forks_count || b.stargazers_count - a.stargazers_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'created') return new Date(b.created_at) - new Date(a.created_at);
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });
    return items;
  }, [repos, filter, sortBy]);

  var langStats = useMemo(function() { return calculateLanguageStats(repos); }, [repos]);
  var stars = repos.reduce(function(total, repo) { return total + repo.stargazers_count; }, 0);
  var forks = repos.reduce(function(total, repo) { return total + repo.forks_count; }, 0);

  return (
    <section id="repositories" className="py-24">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Open Source & Tooling"
          title="Open-Source Projects"
          subtitle="Public tools, utilities, and experiments I build in the open — across Go, Python, and JavaScript."
        >
          <p className="mt-5 inline-flex items-start gap-2 text-surface-500 text-xs font-medium bg-surface-800/50 border border-surface-700/40 rounded-xl px-4 py-2.5 text-left max-w-xl">
            <svg className="w-3.5 h-3.5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Most of my production Java / Spring / Quarkus and DevOps work lives in private and enterprise repositories. These public repos show how I build and document tooling in the open.
          </p>
        </SectionHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: repos.filter(isOwn).length, label: 'Repositories', icon: 'folder', color: 'text-primary-500' },
            { value: stars, label: 'Total Stars', icon: 'star', color: 'text-amber-500' },
            { value: forks, label: 'Total Forks', icon: 'fork', color: 'text-accent-500' },
            { value: langStats.length, label: 'Languages', icon: 'code', color: 'text-emerald-500' }
          ].map(function(stat) {
            return <StatCard key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} color={stat.color} />;
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6">
            <h3 className="text-heading font-bold mb-1">Language Distribution</h3>
            <p className="text-surface-500 text-xs mb-4">Across public repositories only</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={langStats} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
                    {langStats.map(function(entry, index) { return <Cell key={index} fill={entry.color} />; })}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-2 card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6">
            <h3 className="text-heading font-bold mb-4">Languages Used</h3>
            <div className="grid grid-cols-2 gap-3">
              {langStats.slice(0, 8).map(function(language) {
                return (
                  <div key={language.name} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: language.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="text-heading text-sm font-medium truncate">{language.name}</span>
                        <span className="text-surface-500 text-xs ml-2">{language.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-700/30 rounded-full mt-1 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: language.percentage + '%', backgroundColor: language.color }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {languages.map(function(language) {
              return (
                <button key={language} onClick={() => setFilter(language)} aria-pressed={filter === language}
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
            <option value="created">Newest First</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(0, 12).map(function(repo) { return <RepoCard key={repo.id} repo={repo} />; })}
        </div>
        {filtered.length === 0 && <p className="text-center py-12 text-surface-500">No repositories found.</p>}
      </div>
    </section>
  );
};

export default Repositories;
