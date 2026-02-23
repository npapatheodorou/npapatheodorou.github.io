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
    <div className="card group bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-5 hover:border-primary-500/30 hover:-translate-y-0.5">
      <div className="flex items-center gap-2.5 mb-2">
        <svg className={'w-4.5 h-4.5 ' + stat.color} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[stat.icon]}</svg>
        <span className="text-surface-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
      </div>
      <div className="text-3xl font-extrabold text-heading font-mono tracking-tight">{display}</div>
    </div>
  );
};

var Hero = ({ profile }) => {
  const [typed, setTyped] = useState('');
  var full = CONFIG.headline;
  useEffect(() => {
    var i = 0;
    var t = setInterval(() => { if (i <= full.length) { setTyped(full.slice(0, i)); i++; } else clearInterval(t); }, 35);
    return () => clearInterval(t);
  }, [full]);

  return (
    <section id="overview" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-primary-700/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(var(--s-400)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 dark:text-green-400 text-sm font-semibold">Available for opportunities</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-5 tracking-tight">
              <span className="text-heading">Hi, I'm</span><br />
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                {CONFIG.name.split(' ')[0]}
              </span>
            </h1>

            <div className="h-8 mb-6">
              <p className="text-surface-400 text-lg font-mono">
                <span className="text-primary-500">{'>'} </span>{typed}<span className="animate-pulse text-primary-500">|</span>
              </p>
            </div>

            <p className="text-surface-400 text-lg leading-relaxed max-w-xl mb-10">
              6+ years building <span className="text-heading font-semibold">secure</span>,{' '}
              <span className="text-heading font-semibold">scalable</span>, and{' '}
              <span className="text-heading font-semibold">automated</span> systems. Java ecosystem expert
              with deep CI/CD, infrastructure automation, and reliability engineering expertise.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => smoothScroll('repositories')}
                className="group px-7 py-3.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 flex items-center gap-2">
                View My Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button onClick={() => smoothScroll('contact')}
                className="px-7 py-3.5 border border-surface-700/50 hover:border-primary-500/40 text-heading rounded-xl font-semibold transition-all hover:bg-primary-500/5 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </button>
            </div>

            <div className="flex items-center gap-5">
              <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center text-surface-500 hover:text-primary-500 hover:border-primary-500/30 transition-all card" aria-label="LinkedIn">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={'https://github.com/' + CONFIG.githubUsername} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center text-surface-500 hover:text-heading hover:border-surface-600 transition-all card" aria-label="GitHub">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href={'mailto:' + CONFIG.contactEmail} className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center text-surface-500 hover:text-primary-500 hover:border-primary-500/30 transition-all card" aria-label="Email">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>

          <div className="animate-slide-up">
            {profile && (
              <div className="card bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <img src={profile.avatar_url} alt={profile.name || CONFIG.name} className="w-16 h-16 rounded-2xl border-2 border-primary-500/20 shadow-lg" />
                  <div>
                    <h3 className="text-heading font-bold text-lg">{profile.name || CONFIG.name}</h3>
                    <p className="text-surface-500 text-sm font-mono">@{profile.login}</p>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-surface-500 text-xs font-medium">{profile.public_repos} repos</span>
                      <span className="text-surface-500 text-xs font-medium">{profile.followers} followers</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {STATS_OVERVIEW.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;