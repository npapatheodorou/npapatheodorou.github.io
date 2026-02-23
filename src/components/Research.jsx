import React from 'react';
import { RESEARCH_DATA } from '../utils/constants';

var Research = () => (
  <section id="research" className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">Academic Contributions</span>
        <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Research & Teaching</h2>
        <p className="text-surface-500 text-lg max-w-2xl mx-auto">Combining academic depth with industry impact.</p>
      </div>

      <div className="card bg-gradient-to-br from-purple-500/5 to-surface-800/60 border border-purple-500/20 rounded-2xl p-8 mb-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <span className="text-purple-500 text-sm font-bold">{RESEARCH_DATA.thesis.degree} Thesis</span>
            <h3 className="text-heading text-2xl font-black mt-1">{RESEARCH_DATA.thesis.title}</h3>
          </div>
        </div>
        <p className="text-surface-400 leading-relaxed mb-6">{RESEARCH_DATA.thesis.description}</p>
        <div className="mb-6">
          <h4 className="text-purple-500 text-xs uppercase tracking-widest font-bold mb-3">Key Contributions</h4>
          <ul className="space-y-2">{RESEARCH_DATA.thesis.contributions.map((c, i) => (
            <li key={i} className="flex items-start gap-2.5 text-surface-400 text-sm"><span className="text-purple-500 mt-0.5 font-bold">✓</span>{c}</li>
          ))}</ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {RESEARCH_DATA.thesis.keywords.map(k => <span key={k} className="px-3 py-1 text-xs font-bold bg-purple-500/10 text-purple-500 rounded-full">{k}</span>)}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-heading font-black text-xl mb-6">🎤 Presentations & Workshops</h3>
          <div className="space-y-4">{RESEARCH_DATA.presentations.map((p, i) => (
            <div key={i} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 hover:border-primary-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs font-bold bg-primary-500/10 text-primary-500 rounded-full">{p.type}</span>
                <span className="text-surface-600 text-xs">{p.venue}</span>
              </div>
              <h4 className="text-heading font-bold mb-2">{p.title}</h4>
              <p className="text-surface-500 text-sm">{p.description}</p>
            </div>
          ))}</div>
        </div>
        <div>
          <h3 className="text-heading font-black text-xl mb-6">🎓 Teaching Experience</h3>
          <div className="space-y-4">
            {RESEARCH_DATA.teaching.map((c, i) => (
              <div key={i} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 hover:border-green-500/20">
                <span className="px-2 py-0.5 text-xs font-bold bg-green-500/10 text-green-500 rounded-full">{c.level}</span>
                <h4 className="text-heading font-bold mb-2 mt-2">{c.course}</h4>
                <p className="text-surface-500 text-sm">{c.description}</p>
              </div>
            ))}
            <div className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 hover:border-amber-500/20">
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-500 rounded-full">Mentorship</span>
              <h4 className="text-heading font-bold mb-2 mt-2">Technical Mentoring & Tutoring</h4>
              <p className="text-surface-500 text-sm">One-on-one mentoring for students and junior developers, guiding capstone projects and engineering best practices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Research;