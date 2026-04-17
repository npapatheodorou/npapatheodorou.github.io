import React from 'react';
import { CONFIG } from '../utils/constants';

var Contact = () => (
  <section id="contact" className="py-24">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-900" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-semibold">Open to full-time and consulting opportunities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">Let's Build Something Great</h2>
          <p className="text-blue-100/70 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            I am open to DevOps, platform engineering, backend, and cloud delivery roles.
            If you need faster releases, stronger reliability, or better engineering automation, let's talk.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
            {[
              { title: 'Best For', desc: 'Platform engineering, cloud delivery, Java services, and DevOps modernization.' },
              { title: 'What You Get', desc: 'A practical engineer who can design, implement, and operationalize the solution.' },
              { title: 'Collaboration', desc: 'Happy to discuss roles, consulting, architecture reviews, or delivery challenges.' },
            ].map(function(item) {
              return (
                <div key={item.title} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 text-left">
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col lg:flex-row lg:flex-wrap items-center justify-center gap-4 mb-8">
            <a href={'mailto:' + CONFIG.contactEmail}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl w-full lg:w-auto justify-center">
              Email Me
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm w-full lg:w-auto justify-center">
              Connect on LinkedIn
            </a>
            <a href={CONFIG.resumeUrl} download
              className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm w-full lg:w-auto justify-center">
              Download Resume
            </a>
            <a href={'https://github.com/' + CONFIG.githubUsername} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm w-full lg:w-auto justify-center">
              View GitHub
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <a href={'mailto:' + CONFIG.contactEmail} className="text-white/85 font-medium hover:text-white transition-colors">
              {CONFIG.contactEmail}
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer" className="text-white/85 font-medium hover:text-white transition-colors">
              LinkedIn
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a href={'https://github.com/' + CONFIG.githubUsername} target="_blank" rel="noopener noreferrer" className="text-white/85 font-medium hover:text-white transition-colors">
              GitHub
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
            {[
              { emoji: '🔐', eyebrow: 'Security', title: 'Security-First', desc: 'Secure architecture and DevSecOps practices.' },
              { emoji: '🤖', eyebrow: 'Automation', title: 'Automation-Driven', desc: 'CI/CD, infrastructure as code, and repeatable delivery.' },
              { emoji: '🚀', eyebrow: 'Reliability', title: 'Performance-Focused', desc: 'Scalable services with strong operational discipline.' }
            ].map(function(item) {
              return (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-3 text-2xl backdrop-blur-sm text-white shadow-lg">
                    <span aria-hidden="true">{item.emoji}</span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/65 mb-2">{item.eyebrow}</div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-blue-200/50 text-xs">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
