import React, { useState } from 'react';
import { SKILLS_DATA } from '../utils/constants';
import SectionHeader from './SectionHeader';

// Proficiency tier is derived from real hands-on years, not a self-assigned
// percentage. The 3-segment meter mirrors the tier so it reads at a glance
// without implying false precision.
var getTier = function (years) {
  if (years >= 5) return { label: 'Expert', segments: 3, color: 'text-emerald-500', bar: 'bg-emerald-500' };
  if (years >= 3) return { label: 'Advanced', segments: 2, color: 'text-primary-500', bar: 'bg-primary-500' };
  return { label: 'Proficient', segments: 1, color: 'text-surface-400', bar: 'bg-surface-400' };
};

var SkillRow = ({ skill }) => {
  var tier = getTier(skill.years);
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-surface-700/20 last:border-0">
      <div className="min-w-0">
        <span className="text-heading text-sm font-semibold">{skill.name}</span>
        <span className="hidden sm:inline text-surface-500 text-xs ml-2">{skill.category}</span>
      </div>
      <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
        <span className="text-surface-500 text-xs font-mono tabular-nums">{skill.years}y</span>
        <div className="hidden min-[400px]:flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map(function (i) {
            return (
              <span
                key={i}
                className={'h-1.5 w-5 rounded-full ' + (i < tier.segments ? tier.bar : 'bg-surface-700/40')}
              />
            );
          })}
        </div>
        <span className={'text-xs font-bold w-[64px] text-right ' + tier.color}>{tier.label}</span>
      </div>
    </div>
  );
};

var icons = {
  server: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />,
  settings: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
  zap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
};

var Skills = () => {
  const [active, setActive] = useState('backend');
  var data = SKILLS_DATA[active];

  return (
    <section id="skills" className="py-24 bg-surface-900/40">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technical Expertise"
          title="Skills & Technologies"
          subtitle="Proficiency shown as hands-on years and tier — not arbitrary percentages."
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 text-emerald-500"><span className="h-1.5 w-5 rounded-full bg-emerald-500" />Expert · 5y+</span>
            <span className="inline-flex items-center gap-1.5 text-primary-500"><span className="h-1.5 w-5 rounded-full bg-primary-500" />Advanced · 3–4y</span>
            <span className="inline-flex items-center gap-1.5 text-surface-400"><span className="h-1.5 w-5 rounded-full bg-surface-400" />Proficient · &lt;3y</span>
          </div>
        </SectionHeader>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24 lg:self-start" role="tablist" aria-label="Skill categories">
            {Object.entries(SKILLS_DATA).map(([k, v]) => (
              <button key={k} onClick={() => setActive(k)}
                role="tab"
                aria-selected={active === k}
                className={'card flex items-center gap-3 px-5 py-4 rounded-xl text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ' +
                  (active === k ? 'bg-primary-500/10 border border-primary-500/25 text-heading' : 'bg-surface-800/40 border border-surface-700/50 text-surface-500 hover:text-heading hover:border-surface-600')}>
                <svg className={'w-5 h-5 flex-shrink-0 ' + (active === k ? 'text-primary-500' : 'text-surface-500')} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">{icons[v.icon]}</svg>
                <div><span className="font-bold text-sm block">{v.title}</span><span className="text-xs text-surface-500">{v.skills.length} skills</span></div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="card bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={'w-11 h-11 rounded-xl bg-gradient-to-br ' + data.color + ' flex items-center justify-center text-white shadow-lg'}>
                  <span className="text-lg font-extrabold">{data.skills.length}</span>
                </div>
                <div><h3 className="text-heading font-bold text-lg">{data.title}</h3><p className="text-surface-500 text-sm">Hands-on experience breakdown</p></div>
              </div>
              <div>
                {data.skills.map(s => <SkillRow key={s.name} skill={s} />)}
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
