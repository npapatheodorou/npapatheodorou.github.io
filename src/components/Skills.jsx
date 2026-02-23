import React, { useState } from 'react';
import { SKILLS_DATA } from '../utils/constants';

var SkillBar = ({ skill, visible }) => (
  <div className="group">
    <div className="flex items-center justify-between mb-1.5">
      <div className="flex items-center gap-2">
        <span className="text-heading text-sm font-semibold">{skill.name}</span>
        <span className="text-surface-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{skill.years}y</span>
      </div>
      <span className="text-surface-500 text-xs font-mono font-bold">{skill.level}%</span>
    </div>
    <div className="w-full h-2 bg-surface-700/30 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-primary-500 to-primary-400"
        style={{ width: visible ? skill.level + '%' : '0%' }} />
    </div>
  </div>
);

var icons = {
  server: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />,
  settings: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
  zap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
};

var Skills = () => {
  const [active, setActive] = useState('backend');
  const [vis, setVis] = useState(true);
  var data = SKILLS_DATA[active];

  var change = (k) => { setVis(false); setTimeout(() => { setActive(k); setVis(true); }, 200); };

  return (
    <section id="skills" className="py-24 bg-surface-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">Technical Expertise</span>
          <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Skills & Technologies</h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">Comprehensive expertise spanning backend development, DevOps, and security engineering.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24 lg:self-start">
            {Object.entries(SKILLS_DATA).map(([k, v]) => (
              <button key={k} onClick={() => change(k)}
                className={'card flex items-center gap-3 px-5 py-4 rounded-xl text-left w-full transition-all ' +
                  (active === k ? 'bg-primary-500/10 border border-primary-500/25 text-heading' : 'bg-surface-800/40 border border-surface-700/50 text-surface-500 hover:text-heading hover:border-surface-600')}>
                <svg className={'w-5 h-5 flex-shrink-0 ' + (active === k ? 'text-primary-500' : 'text-surface-500')} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[v.icon]}</svg>
                <div><span className="font-bold text-sm block">{v.title}</span><span className="text-xs text-surface-500">{v.skills.length} skills</span></div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className={'card bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-8 transition-all duration-300 ' + (vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')}>
              <div className="flex items-center gap-3 mb-8">
                <div className={'w-11 h-11 rounded-xl bg-gradient-to-br ' + data.color + ' flex items-center justify-center text-white shadow-lg'}>
                  <span className="text-lg font-extrabold">{data.skills.length}</span>
                </div>
                <div><h3 className="text-heading font-bold text-lg">{data.title}</h3><p className="text-surface-500 text-sm">Proficiency breakdown</p></div>
              </div>
              <div className="space-y-5">
                {data.skills.map(s => <SkillBar key={s.name} skill={s} visible={vis} />)}
              </div>
              <div className="mt-8 pt-6 border-t border-surface-700/30">
                <h4 className="text-surface-500 text-xs uppercase tracking-widest font-bold mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(data.skills.map(s => s.category))].map(c => (
                    <span key={c} className="px-3 py-1 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;