import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatDate, getLanguageColor, formatNumber, calculateLanguageStats } from '../utils/helpers';

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
        {repo.topics.slice(0, 4).map(t => (
          <span key={t} className="px-2 py-0.5 text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-md">{t}</span>
        ))}
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
        {repo.stargazers_count > 0 && <span className="text-surface-500 text-xs">⭐ {formatNumber(repo.stargazers_count)}</span>}
        {repo.forks_count > 0 && <span className="text-surface-500 text-xs">🔀 {formatNumber(repo.forks_count)}</span>}
      </div>
      <span className="text-surface-600 text-xs">{formatDate(repo.pushed_at)}</span>
    </div>
  </a>
);

var ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) return (
    <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-xl">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
        <span className="text-heading text-sm font-semibold">{payload[0].name}</span>
      </div>
      <span className="text-surface-400 text-xs">{payload[0].payload.percentage}%</span>
    </div>
  );
  return null;
};

var Repositories = ({ repos }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  var languages = useMemo(() => {
    var s = {}; var l = [];
    repos.forEach(r => { if (r.language && !s[r.language]) { s[r.language] = true; l.push(r.language); } });
    return ['all'].concat(l.slice(0, 8));
  }, [repos]);

  var filtered = useMemo(() => {
    var r = repos.filter(x => !x.fork && !x.archived);
    if (filter !== 'all') r = r.filter(x => x.language === filter);
    r.sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'created') return new Date(b.created_at) - new Date(a.created_at);
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });
    return r;
  }, [repos, filter, sortBy]);

  var langStats = useMemo(() => calculateLanguageStats(repos), [repos]);
  var stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  var forks = repos.reduce((s, r) => s + r.forks_count, 0);

  return (
    <section id="repositories" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">Open Source</span>
          <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Repositories</h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">Projects showcasing backend development, DevOps automation, and infrastructure expertise.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[{ v: repos.filter(r => !r.fork).length, l: 'Repositories' }, { v: stars, l: 'Total Stars' }, { v: forks, l: 'Total Forks' }, { v: langStats.length, l: 'Languages' }].map(s => (
            <div key={s.l} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 text-center">
              <div className="text-2xl font-extrabold text-heading">{s.v}</div>
              <div className="text-surface-500 text-sm font-medium">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6">
            <h3 className="text-heading font-bold mb-4">Language Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={langStats} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {langStats.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie><Tooltip content={<ChartTooltip />} /></PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-2 card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6">
            <h3 className="text-heading font-bold mb-4">Languages Used</h3>
            <div className="grid grid-cols-2 gap-3">
              {langStats.slice(0, 8).map(l => (
                <div key={l.name} className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between"><span className="text-heading text-sm font-medium truncate">{l.name}</span><span className="text-surface-500 text-xs ml-2">{l.percentage}%</span></div>
                    <div className="w-full h-1.5 bg-surface-700/30 rounded-full mt-1 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: l.percentage + '%', backgroundColor: l.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {languages.map(l => (
              <button key={l} onClick={() => setFilter(l)}
                className={'px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ' +
                  (filter === l ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30' : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading hover:border-surface-600')}>
                {l === 'all' ? 'All' : l}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 bg-surface-800 border border-surface-700 rounded-lg text-surface-400 text-sm focus:outline-none focus:border-primary-500/50">
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="created">Newest First</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(0, 12).map(r => <RepoCard key={r.id} repo={r} />)}
        </div>
        {filtered.length === 0 && <p className="text-center py-12 text-surface-500">No repositories found.</p>}
      </div>
    </section>
  );
};

export default Repositories;