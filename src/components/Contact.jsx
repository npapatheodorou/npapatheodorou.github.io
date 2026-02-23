import React from 'react';
import { CONFIG } from '../utils/constants';

var Contact = () => (
  <section id="contact" className="py-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-900" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-semibold">Open to opportunities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">Let's Build Something Great</h2>
          <p className="text-blue-100/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Passionate about building secure, scalable systems and driving DevOps transformation.
            Let's discuss architecture, automation, or your next engineering challenge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href={'mailto:' + CONFIG.contactEmail}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center">
              📧 {CONFIG.contactEmail}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm w-full sm:w-auto justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[{ icon: '🔒', title: 'Security-First', desc: 'Secure architecture & DevSecOps' },
              { icon: '⚡', title: 'Automation-Driven', desc: 'CI/CD & infrastructure as code' },
              { icon: '📈', title: 'Performance-Focused', desc: 'Scalable & reliable systems' }].map(i => (
              <div key={i.title} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl backdrop-blur-sm">{i.icon}</div>
                <h4 className="text-white font-bold text-sm mb-1">{i.title}</h4>
                <p className="text-blue-200/50 text-xs">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;