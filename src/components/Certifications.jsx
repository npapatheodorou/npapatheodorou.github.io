import React, { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../utils/constants';

var LogoIcon = ({ logo }) => {
  var logos = {
    microsoft: (
      <div className="w-10 h-10 rounded-xl bg-[#00a4ef]/10 flex items-center justify-center">
        <svg className="w-6 h-6" viewBox="0 0 23 23">
          <rect x="0" y="0" width="11" height="11" fill="#f25022" />
          <rect x="12" y="0" width="11" height="11" fill="#7fba00" />
          <rect x="0" y="12" width="11" height="11" fill="#00a4ef" />
          <rect x="12" y="12" width="11" height="11" fill="#ffb900" />
        </svg>
      </div>
    ),
    aws: (
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
        <span className="text-amber-500 font-black text-xs tracking-tight">AWS</span>
      </div>
    ),
    oracle: (
      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
        <span className="text-red-500 font-black text-[10px] tracking-tight">Oracle</span>
      </div>
    ),
    vaadin: (
      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
        <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    ),
  };
  return logos[logo] || logos.oracle;
};

var StatusBadge = ({ status, expires }) => {
  if (expires) {
    var expDate = new Date(expires);
    var now = new Date();
    var monthsLeft = (expDate.getFullYear() - now.getFullYear()) * 12 + (expDate.getMonth() - now.getMonth());

    if (monthsLeft <= 0) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Expired
        </span>
      );
    }
    if (monthsLeft <= 6) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Expiring Soon
        </span>
      );
    }
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Active
    </span>
  );
};

var CertCard = ({ cert, isExpanded, onToggle }) => {
  return (
    <div className="card bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl overflow-hidden hover:border-primary-500/20 group">
      {/* Color accent */}
      <div className={'h-1.5 bg-gradient-to-r ' + cert.color} />

      <div className="p-6 sm:p-7">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <LogoIcon logo={cert.logo} />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <StatusBadge status={cert.status} expires={cert.expires} />
                <span className="px-2 py-0.5 text-xs font-bold bg-surface-700/40 text-surface-400 rounded-full">
                  {cert.level}
                </span>
              </div>
              <h3 className="text-heading font-bold text-lg leading-snug group-hover:text-primary-500 transition-colors">
                {cert.title}
              </h3>
              <p className="text-surface-500 text-sm font-semibold mt-1">{cert.issuer}</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-surface-900/40 rounded-xl p-3 border border-surface-700/20">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-surface-600 text-xs font-bold uppercase tracking-wider">Issued</span>
            </div>
            <span className="text-heading text-sm font-semibold">{cert.issued}</span>
          </div>
          <div className="bg-surface-900/40 rounded-xl p-3 border border-surface-700/20">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-surface-600 text-xs font-bold uppercase tracking-wider">Expires</span>
            </div>
            <span className="text-heading text-sm font-semibold">{cert.expires || 'No Expiration'}</span>
          </div>
        </div>

        {/* Credential ID */}
        <div className="flex items-center gap-2 mb-4 bg-surface-900/30 rounded-lg px-3 py-2 border border-surface-700/20">
          <svg className="w-4 h-4 text-surface-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span className="text-surface-500 text-xs font-mono truncate">{cert.credentialId}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cert.tags.map(function(tag) {
            return (
              <span key={tag} className="px-2 py-0.5 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-md">
                {tag}
              </span>
            );
          })}
        </div>

        {/* Expandable description */}
        <div className={'overflow-hidden transition-all duration-500 ' + (isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0')}>
          <div className="pt-3 border-t border-surface-700/30 mb-4">
            <p className="text-surface-400 text-sm leading-relaxed">{cert.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-700/30">
          <button
            onClick={function() { onToggle(cert.id); }}
            className="flex items-center gap-1.5 text-surface-500 hover:text-primary-500 text-sm font-medium transition-colors"
          >
            <svg className={'w-4 h-4 transition-transform duration-300 ' + (isExpanded ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isExpanded ? 'Less Info' : 'More Info'}
          </button>

          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-bold transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Verify
            <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

var Certifications = function() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');

  var issuers = ['all'];
  var seenIssuers = {};
  CERTIFICATIONS_DATA.forEach(function(c) {
    if (!seenIssuers[c.issuer]) {
      seenIssuers[c.issuer] = true;
      issuers.push(c.issuer);
    }
  });

  var filtered = filter === 'all'
    ? CERTIFICATIONS_DATA
    : CERTIFICATIONS_DATA.filter(function(c) { return c.issuer === filter; });

  var activeCerts = CERTIFICATIONS_DATA.filter(function(c) {
    if (!c.expires) return true;
    return new Date(c.expires) > new Date();
  }).length;

  return (
    <section id="certifications" className="py-24 bg-surface-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
            Professional Credentials
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Certifications</h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise in cloud platforms, Java development, and web technologies.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: CERTIFICATIONS_DATA.length, label: 'Total Certifications', icon: '🏆', color: 'text-emerald-500' },
            { value: activeCerts, label: 'Active', icon: '✅', color: 'text-green-500' },
            { value: Object.keys(seenIssuers).length, label: 'Issuers', icon: '🏛️', color: 'text-blue-500' },
            { value: CERTIFICATIONS_DATA.filter(function(c) { return c.level === 'Professional'; }).length, label: 'Professional Level', icon: '⭐', color: 'text-amber-500' },
          ].map(function(s) {
            return (
              <div key={s.label} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className={'text-3xl font-extrabold ' + s.color}>{s.value}</div>
                <div className="text-surface-500 text-sm font-medium mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Issuer Logos Banner */}
        <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6 mb-12">
          <p className="text-surface-600 text-xs uppercase tracking-widest font-bold mb-4 text-center">Certified By</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { name: 'Oracle', sub: 'Java SE 17', color: 'bg-red-600' },
              { name: 'AWS', sub: 'Cloud Practitioner', color: 'bg-amber-500' },
              { name: 'Microsoft', sub: 'Azure Admin', color: 'bg-blue-600' },
              { name: 'Vaadin', sub: 'v14 & v24', color: 'bg-cyan-600' },
            ].map(function(p) {
              return (
                <div key={p.name} className="flex items-center gap-3 px-5 py-3 bg-surface-900/50 border border-surface-700/30 rounded-xl hover:border-primary-500/20 transition-all">
                  <div className={p.color + ' w-8 h-8 rounded-lg flex items-center justify-center'}>
                    <span className="text-white text-[9px] font-black">{p.name === 'Microsoft' ? 'MS' : p.name}</span>
                  </div>
                  <div>
                    <span className="text-heading text-sm font-bold block">{p.name}</span>
                    <span className="text-surface-500 text-xs">{p.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {issuers.map(function(issuer) {
            return (
              <button
                key={issuer}
                onClick={function() { setFilter(issuer); }}
                className={'px-4 py-2 rounded-xl text-sm font-semibold transition-all ' +
                  (filter === issuer
                    ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30'
                    : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading hover:border-surface-600')}
              >
                {issuer === 'all' ? 'All Certifications' : issuer}
              </button>
            );
          })}
        </div>

        {/* Certs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(function(cert) {
            return (
              <CertCard
                key={cert.id}
                cert={cert}
                isExpanded={expandedId === cert.id}
                onToggle={function(id) { setExpandedId(expandedId === id ? null : id); }}
              />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surface-500">No certifications found for this filter.</p>
          </div>
        )}

        {/* Verification note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-surface-800/40 border border-surface-700/30 rounded-xl">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-surface-400 text-sm">All certifications are verifiable — click <strong className="text-heading">Verify</strong> on any card</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;