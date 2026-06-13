import React from 'react';
import { RESEARCH_DATA } from '../utils/constants';
import SectionHeader from './SectionHeader';

var Research = () => (
  <section id="research" className="py-24 bg-surface-900/40">
    <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        accent="purple"
        eyebrow="Academic & Research"
        title="Research & Teaching"
        subtitle="Combining academic depth with industry impact — published security research, graduate study, and teaching."
      />

      {/* Education */}
      <div className="grid sm:grid-cols-2 gap-5 mb-12 max-w-4xl mx-auto">
        {RESEARCH_DATA.education.map(function (ed) {
          return (
            <div key={ed.degree} className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-heading font-bold leading-snug">{ed.degree}</h3>
                  <p className="text-purple-500 text-sm font-semibold">{ed.field}</p>
                </div>
                <span className="ml-auto text-surface-500 text-xs font-mono whitespace-nowrap">{ed.period}</span>
              </div>
              <p className="text-surface-400 text-sm leading-relaxed">{ed.detail}</p>
            </div>
          );
        })}
      </div>

      {/* MSc thesis */}
      <div className="card bg-gradient-to-br from-purple-500/5 to-surface-800/60 border border-purple-500/20 rounded-2xl p-8 mb-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            <li key={i} className="flex items-start gap-2.5 text-surface-400 text-sm">
              <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {c}
            </li>
          ))}</ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {RESEARCH_DATA.thesis.keywords.map(k => <span key={k} className="px-3 py-1 text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full">{k}</span>)}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="flex items-center gap-2 text-heading font-black text-xl mb-6">
            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z" />
            </svg>
            Presentations & Workshops
          </h3>
          <div className="space-y-4">{RESEARCH_DATA.presentations.map((p, i) => (
            <div key={i} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 hover:border-primary-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs font-bold bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full">{p.type}</span>
                <span className="text-surface-500 text-xs">{p.venue}</span>
              </div>
              <h4 className="text-heading font-bold mb-2">{p.title}</h4>
              <p className="text-surface-500 text-sm">{p.description}</p>
            </div>
          ))}</div>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-heading font-black text-xl mb-6">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
            </svg>
            Teaching Experience
          </h3>
          <div className="space-y-4">
            {RESEARCH_DATA.teaching.map((c, i) => (
              <div key={i} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 hover:border-green-500/20">
                <span className="px-2 py-0.5 text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">{c.level}</span>
                <h4 className="text-heading font-bold mb-2 mt-2">{c.course}</h4>
                <p className="text-surface-500 text-sm">{c.description}</p>
              </div>
            ))}
            <div className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 hover:border-amber-500/20">
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">Mentorship</span>
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
