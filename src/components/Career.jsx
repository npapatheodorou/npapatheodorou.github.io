import React from 'react';
import { CAREER_DATA } from '../utils/constants';

var tones = {
  current: {
    dot: 'bg-green-500',
    cardBorder: 'border-green-500/25',
    cardBg: 'bg-green-500/5',
    badge: 'bg-green-500/15 text-green-500',
    title: 'text-green-500',
  },
  past: {
    dot: 'bg-primary-500',
    cardBorder: 'border-primary-500/25',
    cardBg: 'bg-primary-500/5',
    badge: 'bg-primary-500/15 text-primary-500',
    title: 'text-primary-500',
  },
  academic: {
    dot: 'bg-purple-500',
    cardBorder: 'border-purple-500/25',
    cardBg: 'bg-purple-500/5',
    badge: 'bg-purple-500/15 text-purple-500',
    title: 'text-purple-500',
  },
};

var COMPANY_LOGOS = {
  ey: {
    src: (process.env.PUBLIC_URL || '') + '/icons/companies/ey.jpg',
    alt: 'EY logo',
    wrap: 'bg-black',
    size: 'w-8 h-8',
  },
  apt: {
    src: (process.env.PUBLIC_URL || '') + '/icons/companies/apt.png',
    alt: 'APT Information Systems logo',
    wrap: 'bg-white',
    size: 'w-8 h-8',
  },
  hmu: {
    src: (process.env.PUBLIC_URL || '') + '/icons/companies/hmu.png',
    alt: 'Hellenic Mediterranean University logo',
    wrap: 'bg-white',
    size: 'w-8 h-8',
  },
};

var Logo = ({ item }) => {
  var logo = COMPANY_LOGOS[item.logo];
  if (!logo) {
    return (
      <div className="w-12 h-12 rounded-xl bg-surface-700/50 border border-surface-600/40 flex items-center justify-center text-surface-300 font-bold text-sm">
        {(item.company || '?').slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={'w-12 h-12 rounded-xl border border-surface-600/40 overflow-hidden flex items-center justify-center ' + logo.wrap}>
      <img src={logo.src} alt={logo.alt} className={logo.size + ' object-contain'} loading="lazy" />
    </div>
  );
};

var MetaPill = ({ label, value }) => (
  <div className="rounded-lg border border-surface-700/40 bg-surface-900/40 px-3 py-2">
    <div className="text-[11px] uppercase tracking-wider text-surface-600 font-bold">{label}</div>
    <div className="text-sm text-heading font-semibold mt-0.5">{value}</div>
  </div>
);

var CareerCard = ({ item }) => {
  var tone = tones[item.type] || tones.past;

  return (
    <div className={'card rounded-2xl border p-5 sm:p-6 ' + tone.cardBg + ' ' + tone.cardBorder}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Logo item={item} />
          <div>
            <h3 className="text-heading text-xl font-black leading-tight">{item.title || item.role}</h3>
            <p className={tone.title + ' text-sm font-bold mt-1'}>{item.company}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.employmentType && (
            <span className={'px-2.5 py-1 rounded-full text-xs font-bold ' + tone.badge}>{item.employmentType}</span>
          )}
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-surface-700/50 text-surface-300">
            {item.type === 'current' ? 'Current' : 'Completed'}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-2 mb-4">
        <MetaPill label="Dates" value={item.period} />
        <MetaPill label="Duration" value={item.duration} />
        <MetaPill label="Location" value={item.location || 'N/A'} />
      </div>

      {(item.summary || item.description) && (
        <p className="text-surface-400 text-sm leading-relaxed mb-4">{item.summary || item.description}</p>
      )}

      {item.courses && item.courses.length > 0 && (
        <div className="mb-4">
          <p className="text-surface-500 text-xs font-bold uppercase tracking-wider mb-2">Taught Courses</p>
          <div className="grid sm:grid-cols-2 gap-1.5">
            {item.courses.map(function(course) {
              return (
                <div key={course} className="text-surface-400 text-xs border border-surface-700/30 bg-surface-900/30 rounded-md px-2.5 py-1.5">
                  {course}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {item.highlights && item.highlights.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {item.highlights.map(function(highlight) {
            return (
              <li key={highlight} className="flex items-start gap-2 text-surface-500 text-xs">
                <span className={tone.title + ' font-bold'}>+</span>
                <span>{highlight}</span>
              </li>
            );
          })}
        </ul>
      )}

      {item.technologies && item.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map(function(tech) {
            return (
              <span key={tech} className="px-2 py-0.5 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-md">
                {tech}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

var Career = () => (
  <section id="career" className="py-24 bg-surface-900/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">
          Professional Journey
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Career Timeline</h2>
        <p className="text-surface-500 text-lg max-w-3xl mx-auto">
          Consolidated timeline of engineering and teaching roles with clear scope, dates, and responsibilities.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-surface-700/50" />
        <div className="space-y-7">
          {CAREER_DATA.map(function(item) {
            var tone = tones[item.type] || tones.past;
            return (
              <div key={item.id} className="relative pl-12">
                <div className={'absolute left-[14px] top-7 w-3 h-3 rounded-full ring-4 ring-surface-950 ' + tone.dot + (item.type === 'current' ? ' animate-pulse' : '')} />
                <CareerCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Career;
