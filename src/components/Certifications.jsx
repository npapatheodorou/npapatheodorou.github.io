import React, { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../utils/constants';
import SectionHeader from './SectionHeader';

var BRAND_LOGOS = {
  microsoft: {
    alt: 'Microsoft Azure',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/azure.svg',
    bg: 'bg-blue-500/10',
    cardSize: 'w-6 h-6',
    bannerSize: 'w-6 h-6',
  },
  aws: {
    alt: 'Amazon Web Services',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/aws-plain.svg',
    bg: 'bg-amber-500/10',
    cardSize: 'w-8 h-8',
    bannerSize: 'w-7 h-7',
  },
  oracle: {
    alt: 'Oracle',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/oracle.svg',
    bg: 'bg-red-500/10',
    cardSize: 'w-8 h-8',
    bannerSize: 'w-7 h-7',
  },
  vaadin: {
    alt: 'Vaadin',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/vaadin.svg',
    bg: 'bg-cyan-500/10',
    cardSize: 'w-6 h-6',
    bannerSize: 'w-6 h-6',
  },
};

var LogoIcon = ({ logo }) => {
  var brand = BRAND_LOGOS[logo] || BRAND_LOGOS.oracle;
  return (
    <div className={'w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden ' + brand.bg}>
      <img src={brand.src} alt={brand.alt + ' logo'} className={brand.cardSize + ' object-contain'} loading="lazy" />
    </div>
  );
};

var StatusBadge = ({ expires }) => {
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

var CertCard = ({ cert, isExpanded, onToggle }) => (
  <div className="card bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl overflow-hidden hover:border-primary-500/20 group">
    <div className={'h-1.5 bg-gradient-to-r ' + cert.color} />

    <div className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-4">
          <LogoIcon logo={cert.logo} />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <StatusBadge expires={cert.expires} />
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

      <p className="text-surface-500 text-xs font-medium mb-4 tabular-nums">
        Issued {cert.issued}
        <span className="mx-1.5 text-surface-700" aria-hidden="true">·</span>
        {cert.expires ? 'Expires ' + cert.expires : 'No expiration'}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {cert.tags.map(function(tag) {
          return <span key={tag} className="px-2 py-0.5 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-md">{tag}</span>;
        })}
      </div>

      <div className={'overflow-hidden transition-all duration-500 ' + (isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0')}>
        <div className="pt-3 border-t border-surface-700/30 mb-4">
          <p className="text-surface-400 text-sm leading-relaxed mb-3">{cert.description}</p>
          <p className="text-surface-500 text-xs font-mono break-all">Credential ID: {cert.credentialId}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-surface-700/30">
        <button onClick={function() { onToggle(cert.id); }} aria-expanded={isExpanded} className="flex items-center gap-1.5 py-2 -my-2 rounded-md text-surface-500 hover:text-primary-500 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          <svg aria-hidden="true" className={'w-4 h-4 transition-transform duration-300 ' + (isExpanded ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {isExpanded ? 'Less Info' : 'More Info'}
        </button>

        <a href={cert.url} target="_blank" rel="noopener noreferrer"
          className="group/link flex items-center gap-2 px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-bold transition-colors min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          Verify
          <svg aria-hidden="true" className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
);

var Certifications = function() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');

  var issuers = ['all'];
  var seenIssuers = {};
  CERTIFICATIONS_DATA.forEach(function(cert) {
    if (!seenIssuers[cert.issuer]) {
      seenIssuers[cert.issuer] = true;
      issuers.push(cert.issuer);
    }
  });

  var filtered = filter === 'all'
    ? CERTIFICATIONS_DATA
    : CERTIFICATIONS_DATA.filter(function(cert) { return cert.issuer === filter; });

  var activeCerts = CERTIFICATIONS_DATA.filter(function(cert) {
    if (!cert.expires) return true;
    return new Date(cert.expires) > new Date();
  }).length;

  return (
    <section id="certifications" className="py-20 bg-surface-900/40">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          accent="emerald"
          eyebrow="Professional Credentials"
          title="Certifications"
          subtitle="Industry-recognized certifications validating expertise in cloud platforms, Java development, and modern web technologies."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter by issuer">
          {issuers.map(function(issuer) {
            return (
              <button key={issuer} onClick={function() { setFilter(issuer); }}
                aria-pressed={filter === issuer}
                className={'px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ' +
                  (filter === issuer
                    ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400 border border-primary-500/30'
                    : 'bg-surface-800/50 text-surface-500 border border-surface-700/50 hover:text-heading hover:border-surface-600')}>
                {issuer === 'all' ? 'All Certifications' : issuer}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(function(cert) {
            return <CertCard key={cert.id} cert={cert} isExpanded={expandedId === cert.id} onToggle={function(id) { setExpandedId(expandedId === id ? null : id); }} />;
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surface-500">No certifications found for this filter.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Certifications;
