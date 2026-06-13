import React, { useEffect, useState } from 'react';
import { CONFIG, STATS_OVERVIEW } from '../utils/constants';
import { smoothScroll } from '../utils/helpers';
import useReducedMotion from '../hooks/useReducedMotion';
import Avatar from './Avatar';
import CopyEmail from './CopyEmail';
import ResumeModal from './ResumeModal';
import Terminal, { TermLine } from './Terminal';

// Short labels for the terminal `stats` line, derived from the honest STATS_OVERVIEW.
var STAT_SHORT = {
  'Years Experience': 'yrs',
  'Peer-Reviewed Papers': 'papers',
  'Certifications': 'certs',
  'Engineering Roles': 'roles',
};

var Hero = ({ profile }) => {
  const reduced = useReducedMotion();
  var role = 'DevOps Engineer · Java · Spring · Quarkus';
  const [typedRole, setTypedRole] = useState(reduced ? role : '');

  useEffect(() => {
    if (reduced) { setTypedRole(role); return undefined; }
    var i = 0;
    var t = setInterval(() => {
      if (i <= role.length) { setTypedRole(role.slice(0, i)); i++; } else clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, [role, reduced]);

  var typingDone = typedRole.length === role.length;
  var statsLine = STATS_OVERVIEW.map(function (s) { return s.value + ' ' + (STAT_SHORT[s.label] || ''); }).join(' · ');

  var proof = [
    '6+ yrs building Java platforms',
    '4 peer-reviewed papers',
    'Azure & AWS certified',
  ];

  return (
    <section id="overview" className="relative min-h-[100svh] flex items-start pt-28 pb-16 overflow-x-hidden lg:min-h-screen lg:items-center">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-24 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:-left-32 lg:w-[520px] lg:h-[520px] bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:-right-32 lg:w-[420px] lg:h-[420px] bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(var(--s-400)) 1px, transparent 0)',
          backgroundSize: '34px 34px'
        }} />
      </div>

      <div className="relative max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center">
          {/* ---------- Left: identity + value prop ---------- */}
          <div className="animate-fade-in">
            <div className="flex flex-wrap items-center gap-2.5 mb-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold">{CONFIG.availability}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-800/60 border border-surface-700/50 text-surface-300 text-sm font-medium">
                <svg className="w-3.5 h-3.5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {CONFIG.location} · Hybrid / Remote-friendly
              </span>
            </div>

            <span className="block text-primary-500 dark:text-primary-400 text-sm font-bold tracking-[0.12em] uppercase mb-4 font-mono">
              {CONFIG.name}
            </span>

            <h1 className="font-black tracking-tight leading-[1.02] text-[clamp(2.4rem,5vw,4.6rem)] mb-6">
              I build <span className="text-gradient">resilient delivery platforms</span> for teams that move fast.
            </h1>

            <p className="text-surface-400 text-base sm:text-lg leading-relaxed max-w-xl mb-7">
              DevOps engineer with 6+ years turning fragile delivery into secure, automated, observable systems —
              across CI/CD, cloud infrastructure, and Java services.
            </p>

            <div className="flex flex-wrap gap-2 mb-9">
              {proof.map(function (p) {
                return (
                  <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-700/50 bg-surface-800/40 text-surface-300 text-xs sm:text-sm font-medium">
                    <svg className="w-3.5 h-3.5 text-accent-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-7">
              <button onClick={() => smoothScroll('projects')}
                className="group btn-primary justify-center px-7 py-3.5 text-white rounded-xl font-semibold flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950">
                View Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <ResumeModal
                triggerLabel="Preview Résumé"
                triggerClassName="justify-center px-6 py-3.5 border border-surface-700/50 hover:border-primary-500/40 text-heading rounded-xl font-semibold transition-colors hover:bg-primary-500/5 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <CopyEmail />
              <div className="flex items-center gap-3">
                <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center text-surface-500 hover:text-primary-500 hover:border-primary-500/30 transition-colors card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="LinkedIn profile">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href={'https://github.com/' + CONFIG.githubUsername} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface-800/50 border border-surface-700/50 flex items-center justify-center text-surface-500 hover:text-heading hover:border-surface-600 transition-colors card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="GitHub profile">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* ---------- Right: signature terminal profile ---------- */}
          <div className="animate-slide-up w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <Terminal title="nikos@portfolio: ~">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-700/50">
                <Avatar
                  alt={(profile && profile.name) || CONFIG.name}
                  className="w-16 h-16 rounded-xl border border-accent-400/30 object-cover flex-shrink-0"
                />
                <div className="min-w-0 font-sans">
                  <div className="text-white font-bold text-base leading-tight">{(profile && profile.name) || CONFIG.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{CONFIG.title}</div>
                  {profile && (
                    <div className="text-slate-500 text-xs mt-1 font-mono">@{profile.login} · {profile.followers} followers</div>
                  )}
                </div>
              </div>
              <div className="space-y-2.5">
                <TermLine cmd="whoami" out={typedRole} caret={!typingDone} />
                {typingDone && <TermLine cmd="cat location.txt" out={CONFIG.location + ' · Hybrid / Remote'} />}
                {typingDone && <TermLine cmd="stack --top" out="Docker · Kubernetes · Terraform · AWS · Azure" />}
                {typingDone && <TermLine cmd="stats" out={statsLine} caret />}
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
