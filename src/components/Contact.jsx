import React from 'react';
import { CONFIG } from '../utils/constants';
import ResumeModal from './ResumeModal';

var Contact = () => (
  <section id="contact" className="py-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-800" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative px-6 py-14 sm:px-16 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-semibold">Open to full-time and consulting opportunities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">Let's Build Something Great</h2>
          <p className="text-white/85 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            I am open to DevOps, platform engineering, backend, and cloud delivery roles.
            If you need faster releases, stronger reliability, or better engineering automation, let's talk.
          </p>

          <div className="flex flex-col lg:flex-row lg:flex-wrap items-center justify-center gap-4 mb-8">
            <a href={'mailto:' + CONFIG.contactEmail}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl w-full lg:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-700">
              Email Me
              <svg aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors backdrop-blur-sm w-full lg:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              Connect on LinkedIn
            </a>
            <ResumeModal
              triggerLabel="Preview Resume"
              triggerClassName="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors backdrop-blur-sm w-full lg:w-auto justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            />
            <a href={'https://github.com/' + CONFIG.githubUsername} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors backdrop-blur-sm w-full lg:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              View GitHub
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <a href={'mailto:' + CONFIG.contactEmail} className="text-white/90 font-medium hover:text-white transition-colors py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              {CONFIG.contactEmail}
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a href={CONFIG.linkedIn} target="_blank" rel="noopener noreferrer" className="text-white/90 font-medium hover:text-white transition-colors py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              LinkedIn
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a href={'https://github.com/' + CONFIG.githubUsername} target="_blank" rel="noopener noreferrer" className="text-white/90 font-medium hover:text-white transition-colors py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
