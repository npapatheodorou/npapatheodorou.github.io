import React, { useEffect, useState } from 'react';
import { CONFIG, STATS_OVERVIEW } from '../utils/constants';
import { smoothScroll } from '../utils/helpers';

var StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  var isPercent = stat.value.includes('%');
  var isPlus = stat.value.includes('+');
  var num = parseFloat(stat.value);

  useEffect(() => {
    var steps = 60; var current = 0; var step = num / steps;
    var timer = setInterval(() => {
      current += step;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(current);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [num]);

  var display = isPercent
    ? count.toFixed(count === num ? (stat.value.includes('.') ? 2 : 0) : 0) + '%'
    : Math.floor(count) + (isPlus ? '+' : '');

  var icons = {
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    server: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />,
    activity: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    rocket: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84" />,
  };

  return (
    <div className="card group bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-4 sm:p-5 hover:border-primary-500/30 hover:-translate-y-0.5">
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <svg className={'w-10 h-10 sm:w-11 sm:h-11 ' + stat.color + ' flex-shrink-0'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icons[stat.icon]}
        </svg>
        <div className="min-w-0">
          <div className="text-surface-500 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] leading-tight">
            {stat.label}
          </div>
        </div>
      </div>
      <div className="text-[1.85rem] sm:text-[1.95rem] font-extrabold text-heading font-mono tracking-tight">{display}</div>
    </div>
  );
};

var Hero = ({ profile }) => {
  const [typed, setTyped] = useState('');
  var proofPoints = [
    'Reduced release cycles from 4 hours to 12 minutes',
    'Delivered 99.95% uptime for production workloads',
    'Published research in security and identity systems',
  ];
  var focusAreas = ['Platform Engineering', 'Cloud & IaC', 'Secure Backend Systems'];
  var full = 'DevOps Engineer | Java | Spring | Quarkus | Secure, Scalable Systems';
  useEffect(() => {
    var i = 0;
    var t = setInterval(() => { if (i <= full.length) { setTyped(full.slice(0, i)); i++; } else clearInterval(t); }, 35);
    return () => clearInterval(t);
  }, [full]);

  return (
    <section id="overview" className="relative min-h-[100svh] flex items-start pt-24 pb-12 overflow-x-hidden lg:min-h-screen lg:items-center">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-24 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:-left-32 lg:w-[500px] lg:h-[500px] bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:-right-32 lg:w-[400px] lg:h-[400px] bg-primary-700/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(var(--s-400)) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-10 xl:gap-14 items-start">
          <div className="animate-fade-in max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 dark:text-green-400 text-sm font-semibold">Open to platform, DevOps, and backend roles</span>
            </div>

            <div className="mb-4">
              <span className="inline-block text-primary-600 dark:text-primary-400 text-base sm:text-lg font-black tracking-tight">
                {CONFIG.name}
              </span>
            </div>

            <h1 className="font-black mb-5 tracking-tight leading-[0.98] text-[clamp(2.2rem,4.6vw,4.4rem)]">
              <span className="block text-heading max-w-[12ch] lg:max-w-[13ch]">I build resilient delivery platforms for teams that need to move fast.</span>
            </h1>

            <div className="min-h-[2rem] mb-5 sm:mb-6">
              <p className="text-surface-400 text-sm sm:text-base lg:text-lg font-mono break-words">
                <span className="text-primary-500">{'>'} </span>{typed}<span className="animate-pulse text-primary-500">|</span>
              </p>
            </div>

            <p className="text-surface-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 sm:mb-10">
              DevOps engineer with 6+ years across Java platforms, CI/CD, infrastructure automation, and reliability engineering.
              I focus on turning fragile delivery processes into secure, repeatable systems with measurable operational gains.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {focusAreas.map(function(area) {
                return (
                  <span key={area} className="px-3 py-1.5 rounded-full border border-surface-700/50 bg-surface-800/50 text-surface-400 text-xs sm:text-sm font-medium">
                    {area}
                  </span>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-8 sm:mb-10 max-w-4xl">
              {proofPoints.map(function(point) {
                return (
                  <div key={point} className="rounded-2xl border border-surface-700/40 bg-surface-800/50 px-4 py-4">
                    <div className="text-primary-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Proof</div>
                    <p className="text-surface-300 text-sm leading-relaxed">{point}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => smoothScroll('projects')}
                className="group w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 flex items-center gap-2">
                Explore Case Studies
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button onClick={() => smoothScroll('career')}
                className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 border border-surface-700/50 hover:border-primary-500/40 text-heading rounded-xl font-semibold transition-all hover:bg-primary-500/5 flex items-center gap-2">
                View Experience
              </button>
              <a href={CONFIG.resumeUrl} download className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 border border-surface-700/50 hover:border-primary-500/40 text-heading rounded-xl font-semibold transition-all hover:bg-primary-500/5 flex items-center gap-2">
                Download Resume
              </a>
              <button onClick={() => smoothScroll('contact')}
                className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 border border-surface-700/50 hover:border-primary-500/40 text-heading rounded-xl font-semibold transition-all hover:bg-primary-500/5 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </button>
            </div>

            <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
              <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center flex-shrink-0 text-surface-500 hover:text-primary-500 hover:border-primary-500/30 transition-all card" aria-label="LinkedIn">
                <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={'https://github.com/' + CONFIG.githubUsername} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center flex-shrink-0 text-surface-500 hover:text-heading hover:border-surface-600 transition-all card" aria-label="GitHub">
                <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href={'mailto:' + CONFIG.contactEmail} className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center flex-shrink-0 text-surface-500 hover:text-primary-500 hover:border-primary-500/30 transition-all card" aria-label="Email">
                <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>

          <div className="animate-slide-up max-w-xl lg:max-w-none mx-auto lg:mx-0 w-full lg:pt-20">
            {profile && (
              <div className="card bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-4">
                  <img src={CONFIG.gravatarUrl} alt={profile.name || CONFIG.name} className="w-16 h-16 rounded-2xl border-2 border-primary-500/20 shadow-lg" />
                  <div className="min-w-0">
                    <h3 className="text-heading font-bold text-lg">{profile.name || CONFIG.name}</h3>
                    <p className="text-surface-500 text-sm font-mono truncate">@{profile.login}</p>
                    <div className="flex items-center gap-3 sm:gap-4 mt-1.5 flex-wrap">
                      <span className="text-surface-500 text-xs font-medium">{profile.public_repos} repos</span>
                      <span className="text-surface-500 text-xs font-medium">{profile.followers} followers</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="card bg-gradient-to-br from-primary-500/10 to-surface-800/60 border border-primary-500/20 rounded-2xl p-5 sm:p-6 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-primary-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Current Focus</p>
                  <h3 className="text-heading font-bold text-xl mb-2">Secure delivery, automation, and reliable cloud systems</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Best fit for teams modernizing CI/CD, hardening cloud deployments, or scaling Java services with better observability and operational confidence.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4">
              {STATS_OVERVIEW.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
