import React, { useState } from 'react';
import { PROJECTS_DATA } from '../utils/constants';
import SectionHeader from './SectionHeader';
import FlowDiagram from './FlowDiagram';

var cleanText = function(value) {
  if (!value) return value;
  return value
    .replace(/\u00e2\u20ac\u00a0/g, ' ')
    .replace(/\u00e2\u20ac\u00a2/g, '|')
    .replace(/\u00e2\u2020\u2019/g, '->')
    .replace(/\u00e2\u02c6\u017e/g, 'large gain');
};

var ProjectCard = ({ project, open, toggle }) => (
  <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl overflow-hidden hover:border-primary-500/20">
    <div className={'p-6 bg-gradient-to-r ' + project.gradient}>
      <div className="flex items-start justify-between">
        <div>
          <span className="px-2.5 py-1 text-xs font-bold bg-white/20 text-white rounded-full backdrop-blur-sm">{project.category}</span>
          <h3 className="text-white font-bold text-lg mt-2 drop-shadow-sm">{project.title}</h3>
        </div>
        <button onClick={() => toggle(project.id)} aria-expanded={open} aria-label={(open ? 'Collapse' : 'Expand') + ' details for ' + project.title} className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors backdrop-blur-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
          <svg className={'w-4 h-4 transition-transform duration-300 ' + (open ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
    <div className="p-6">
      <div className="mb-4">
        <h4 className="text-red-500 text-xs uppercase tracking-widest font-bold mb-2">Challenge</h4>
        <p className="text-surface-500 text-sm leading-relaxed">{project.challenge}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-green-500 text-xs uppercase tracking-widest font-bold mb-2">Solution</h4>
        <p className="text-surface-500 text-sm leading-relaxed">{project.solution}</p>
      </div>
      {project.flow && (
        <div className="mb-4">
          <h4 className="text-accent-500 dark:text-accent-400 text-xs uppercase tracking-widest font-bold mb-2.5">Flow</h4>
          <FlowDiagram stages={project.flow} />
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tools.map(function(tool) {
          return <span key={tool} className="px-2.5 py-1 text-xs font-semibold bg-surface-700/40 text-surface-400 rounded-lg">{tool}</span>;
        })}
      </div>

      <div className={'overflow-hidden transition-all duration-500 ' + (open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0')}>
        <div className="mt-4 pt-4 border-t border-surface-700/30">
          <h4 className="text-primary-500 text-xs uppercase tracking-widest font-bold mb-3">Architecture</h4>
          <ul className="space-y-2">
            {project.architecture.map(function(item, index) {
              return (
                <li key={index} className="flex items-start gap-2 text-surface-500 text-sm">
                  <span className="text-primary-500 mt-0.5 font-bold">{'>'}</span>
                  {cleanText(item)}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-amber-500 text-xs uppercase tracking-widest font-bold mb-3">Outcomes</h4>
          <ul className="space-y-2">
            {project.outcomes.map(function(outcome, index) {
              return (
                <li key={index} className="flex items-start gap-2.5 text-surface-400 text-sm leading-relaxed">
                  <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {cleanText(outcome)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

var Projects = () => {
  const [expandedId, setExpandedId] = useState(PROJECTS_DATA[0] ? PROJECTS_DATA[0].id : null);
  const [filter, setFilter] = useState('all');
  var cats = ['all'].concat([...new Set(PROJECTS_DATA.map(function(project) { return project.category; }))]);
  var filtered = filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter(function(project) { return project.category === filter; });

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Work"
          title="Projects & Case Studies"
          subtitle="Selected work focused on delivery acceleration, cloud reliability, secure platform design, and backend modernization."
        >
          <p className="mt-5 inline-flex items-center gap-2 text-surface-500 text-xs font-medium bg-surface-800/50 border border-surface-700/40 rounded-full px-4 py-2 text-left">
            <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Representative engagements illustrating the type of problems I solve — anonymized, with qualitative outcomes rather than client-specific figures.
          </p>
        </SectionHeader>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cats.map(function(category) {
            return (
              <button key={category} onClick={() => setFilter(category)}
                className={'px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ' +
                  (filter === category ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30' : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading hover:border-surface-600')}>
                {category === 'all' ? 'All Projects' : category}
              </button>
            );
          })}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {filtered.map(function(project) {
            return <ProjectCard key={project.id} project={project} open={expandedId === project.id} toggle={function(id) { setExpandedId(expandedId === id ? null : id); }} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
