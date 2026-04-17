import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { calculateLanguageStats, formatDate, formatNumber, getLanguageColor } from '../utils/helpers';

var RepoCard = ({ repo }) => (
  <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
    className="card group block bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-6 hover:border-primary-500/30 hover:-translate-y-1">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-heading font-bold group-hover:text-primary-500 transition-colors truncate max-w-[220px]">{repo.name}</h3>
      <svg className="w-4 h-4 text-surface-500 group-hover:text-primary-500 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

var FeaturedRepoCard = ({ repo }) => (
  <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
    className="card group block bg-gradient-to-br from-primary-500/10 to-surface-800/60 border border-primary-500/20 rounded-2xl p-6 hover:border-primary-500/40 hover:-translate-y-1">
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <div className="text-primary-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Featured Repository</div>
        <h3 className="text-heading font-bold text-xl group-hover:text-primary-500 transition-colors">{repo.name}</h3>
      </div>
      <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
    <p className="text-surface-400 text-sm leading-relaxed mb-5 min-h-[60px]">{repo.description || 'Repository showcasing practical engineering work.'}</p>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {(repo.topics || []).slice(0, 5).map(function(topic) {
        return <span key={topic} className="px-2.5 py-1 text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg">{topic}</span>;
      })}
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-surface-700/30">
      <div className="flex items-center gap-4 text-xs text-surface-500">
        {repo.language && <span>{repo.language}</span>}
        {repo.stargazers_count > 0 && <span>Stars {formatNumber(repo.stargazers_count)}</span>}
        {repo.forks_count > 0 && <span>Forks {formatNumber(repo.forks_count)}</span>}
      </div>
      <span className="text-surface-600 text-xs">{formatDate(repo.pushed_at)}</span>
    </div>
  </a>
);

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
    var items = repos.filter(function(repo) { return !repo.fork && !repo.archived; });
    if (filter !== 'all') items = items.filter(function(repo) { return repo.language === filter; });
    items.sort(function(a, b) {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'created') return new Date(b.created_at) - new Date(a.created_at);
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });
    return items;
  }, [repos, filter, sortBy]);

  var langStats = useMemo(function() { return calculateLanguageStats(repos); }, [repos]);
  var stars = repos.reduce(function(total, repo) { return total + repo.stargazers_count; }, 0);
  var forks = repos.reduce(function(total, repo) { return total + repo.forks_count; }, 0);
  var featuredRepos = useMemo(function() {
    var scored = repos
      .filter(function(repo) { return !repo.fork && !repo.archived && repo.description; })
      .map(function(repo) {
        var score = 0;
        score += Math.min(repo.stargazers_count * 5, 30);
        score += Math.min(repo.forks_count * 3, 15);
        score += Math.min((repo.topics || []).length * 4, 16);
        if (repo.homepage) score += 8;
        if (repo.language) score += 4;
        if (repo.description) score += 6;
        return { repo: repo, score: score };
      })
      .sort(function(a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.repo.pushed_at) - new Date(a.repo.pushed_at);
      });

    return scored.slice(0, 3).map(function(item) { return item.repo; });
  }, [repos]);

  return (
    <section id="repositories" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">Open Source Signal</span>
          <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Repositories</h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">Selected repositories that reinforce backend, automation, and infrastructure experience.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: repos.filter(function(repo) { return !repo.fork; }).length, label: 'Repositories' },
            { value: stars, label: 'Total Stars' },
            { value: forks, label: 'Total Forks' },
            { value: langStats.length, label: 'Languages' }
          ].map(function(stat) {
            return (
              <div key={stat.label} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 text-center">
                <div className="text-2xl font-extrabold text-heading">{stat.value}</div>
                <div className="text-surface-500 text-sm font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {featuredRepos.length > 0 && (
          <div className="mb-12">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h3 className="text-heading font-black text-2xl mb-2">Featured Repositories</h3>
                <p className="text-surface-500 text-sm max-w-2xl">A curated set of repositories surfaced first so visitors can scan representative work quickly.</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
              {featuredRepos.map(function(repo) { return <FeaturedRepoCard key={repo.id} repo={repo} />; })}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6">
            <h3 className="text-heading font-bold mb-4">Language Distribution</h3>
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
                <button key={language} onClick={() => setFilter(language)}
                  className={'px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ' +
                    (filter === language ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30' : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading hover:border-surface-600')}>
                  {language === 'all' ? 'All' : language}
                </button>
              );
            })}
          </div>
          <select value={sortBy} onChange={function(event) { setSortBy(event.target.value); }}
            className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-lg text-surface-400 text-sm focus:outline-none focus:border-primary-500/50">
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
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
