import React from 'react';
import { CAREER_DATA } from '../utils/constants';

var colors = {
  current: { bg: 'bg-green-500/5', border: 'border-green-500/25', dot: 'bg-green-500', text: 'text-green-500', badge: 'bg-green-500/15 text-green-600 dark:text-green-400' },
  past: { bg: 'bg-primary-500/5', border: 'border-primary-500/20', dot: 'bg-primary-500', text: 'text-primary-500', badge: 'bg-primary-500/15 text-primary-600 dark:text-primary-400' },
  academic: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', dot: 'bg-purple-500', text: 'text-purple-500', badge: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
};

var Career = () => (
  <section id="career" className="py-24 bg-surface-900/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">Professional Journey</span>
        <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Career Timeline</h2>
        <p className="text-surface-500 text-lg max-w-2xl mx-auto">From academic research to enterprise engineering leadership.</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 via-primary-500/50 to-purple-500/50" />
        {CAREER_DATA.map((item, idx) => {
          var c = colors[item.type]; var left = idx % 2 === 0;
          return (
            <div key={item.id} className={'relative flex items-start gap-8 ' + (idx < CAREER_DATA.length - 1 ? 'mb-12' : '')}>
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                <div className={'w-4 h-4 rounded-full ' + c.dot + ' ring-4 ring-surface-950 ' + (item.type === 'current' ? 'animate-pulse' : '')} />
              </div>
              <div className={'w-full md:w-1/2 pl-20 md:pl-0 ' + (left ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto')}>
                <div className={'card ' + c.bg + ' border ' + c.border + ' rounded-2xl p-6'}>
                  <div className={'flex items-center gap-2 mb-3 flex-wrap ' + (left ? 'md:justify-end' : '')}>
                    <span className={'px-2.5 py-0.5 text-xs font-bold rounded-full ' + c.badge}>{item.type === 'current' ? '● Current' : item.duration}</span>
                    <span className="text-surface-600 text-xs font-medium">{item.period}</span>
                  </div>
                  <h3 className="text-heading text-xl font-black mb-1">{item.role}</h3>
                  <p className={c.text + ' font-bold text-sm mb-3'}>{item.company}</p>
                  <p className="text-surface-500 text-sm leading-relaxed mb-4">{item.description}</p>
                  <ul className={'space-y-1.5 mb-4 ' + (left ? 'md:text-left' : '')}>
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-surface-500 text-xs"><span className={c.text + ' font-bold'}>✓</span><span>{h}</span></li>
                    ))}
                  </ul>
                  <div className={'flex flex-wrap gap-1.5 ' + (left ? 'md:justify-end' : '')}>
                    {item.technologies.map(t => <span key={t} className="px-2 py-0.5 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-md">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Career;