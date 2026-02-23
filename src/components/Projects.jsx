import React, { useState } from 'react';
import { PROJECTS_DATA } from '../utils/constants';

var ProjectCard = ({ project, open, toggle }) => (
  <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl overflow-hidden hover:border-primary-500/20">
    <div className={'p-6 bg-gradient-to-r ' + project.gradient}>
      <div className="flex items-start justify-between">
        <div>
          <span className="px-2.5 py-1 text-xs font-bold bg-white/20 text-white rounded-full backdrop-blur-sm">{project.category}</span>
          <h3 className="text-white font-bold text-lg mt-2 drop-shadow-sm">{project.title}</h3>
        </div>
        <button onClick={() => toggle(project.id)} className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all backdrop-blur-sm">
          <svg className={'w-4 h-4 transition-transform duration-300 ' + (open ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
    <div className="p-6">
      <div className="mb-4">
        <h4 className="text-red-500 text-xs uppercase tracking-widest font-bold mb-2">⚠ Challenge</h4>
        <p className="text-surface-500 text-sm leading-relaxed">{project.challenge}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-green-500 text-xs uppercase tracking-widest font-bold mb-2">✓ Solution</h4>
        <p className="text-surface-500 text-sm leading-relaxed">{project.solution}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tools.map(t => <span key={t} className="px-2.5 py-1 text-xs font-semibold bg-surface-700/40 text-surface-400 rounded-lg">{t}</span>)}
      </div>

      <div className={'overflow-hidden transition-all duration-500 ' + (open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0')}>
        <div className="mt-4 pt-4 border-t border-surface-700/30">
          <h4 className="text-primary-500 text-xs uppercase tracking-widest font-bold mb-3">🏗 Architecture</h4>
          <ul className="space-y-2">
            {project.architecture.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-surface-500 text-sm"><span className="text-primary-500 mt-0.5 font-bold">›</span>{a}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-amber-500 text-xs uppercase tracking-widest font-bold mb-3">📈 Results</h4>
          <div className="grid grid-cols-2 gap-3">
            {project.results.map((r, i) => (
              <div key={i} className="bg-surface-900/50 rounded-xl p-3.5 border border-surface-700/20">
                <div className="text-surface-600 text-xs font-medium mb-1">{r.metric}</div>
                <div className="flex items-center gap-2">
                  <span className="text-surface-600 text-xs line-through">{r.before}</span>
                  <span className="text-green-500">→</span>
                  <span className="text-heading font-bold text-sm">{r.after}</span>
                </div>
                <div className="text-green-500 text-xs font-mono font-bold mt-1">↑ {r.improvement}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

var Projects = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');
  var cats = ['all'].concat([...new Set(PROJECTS_DATA.map(p => p.category))]);
  var filtered = filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">Engineering Impact</span>
          <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Projects & Case Studies</h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">Real-world challenges solved with measurable results.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={'px-4 py-2 rounded-xl text-sm font-semibold transition-all ' +
                (filter === c ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30' : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading')}>
              {c === 'all' ? 'All Projects' : c}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {filtered.map(p => <ProjectCard key={p.id} project={p} open={expandedId === p.id} toggle={id => setExpandedId(expandedId === id ? null : id)} />)}
        </div>
      </div>
    </section>
  );
};

export default Projects;