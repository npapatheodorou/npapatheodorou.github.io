import React, { useState } from 'react';
import { PUBLICATIONS_DATA } from '../utils/constants';

var PUBLISHER_BRANDS = {
  IEEE: {
    alt: 'IEEE',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/ieee.svg',
    bg: 'bg-white',
    cardIconSize: 'w-4 h-4',
    bannerIconSize: 'w-4.5 h-4.5',
  },
  ACM: {
    alt: 'ACM',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/acm.svg',
    bg: 'bg-white',
    cardIconSize: 'w-4 h-4',
    bannerIconSize: 'w-4.5 h-4.5',
  },
  Springer: {
    alt: 'Springer',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/springer.svg',
    bg: 'bg-white',
    cardIconSize: 'w-5 h-5',
    bannerIconSize: 'w-5 h-5',
  },
  MDPI: {
    alt: 'MDPI',
    src: (process.env.PUBLIC_URL || '') + '/icons/brands/mdpi.svg',
    bg: 'bg-white',
    cardIconSize: 'w-5 h-5',
    bannerIconSize: 'w-5 h-5',
  },
};

var PublisherLogo = ({ publisher, banner }) => {
  var brand = PUBLISHER_BRANDS[publisher];

  if (!brand) {
    return <span className="text-surface-500 text-xs font-semibold">{publisher}</span>;
  }

  var iconSize = banner ? brand.bannerIconSize : brand.cardIconSize;
  var boxSize = banner ? 'w-7 h-7' : 'w-6 h-6';

  return (
    <div className="flex items-center gap-1.5">
      <div className={boxSize + ' rounded flex items-center justify-center overflow-hidden border border-surface-700/20 ' + brand.bg}>
        <img
          src={brand.src}
          alt={brand.alt + ' logo'}
          className={iconSize + ' object-contain'}
          loading="lazy"
        />
      </div>
      <span className="text-surface-500 text-xs font-semibold">{publisher}</span>
    </div>
  );
};

var PublicationCard = ({ pub, isExpanded, onToggle }) => {
  var typeStyles = {
    'Journal Article': { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
    'Conference Paper': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    'Book Chapter': { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' },
  };

  var style = typeStyles[pub.type] || typeStyles['Conference Paper'];

  return (
    <div className="card bg-surface-800/60 backdrop-blur-sm border border-surface-700/50 rounded-2xl overflow-hidden hover:border-primary-500/20 group">
      {/* Color accent bar */}
      <div className={'h-1 bg-gradient-to-r ' + pub.color} />

      <div className="p-6 sm:p-8">
        {/* Top row: Type badge + Year + Publisher */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={'px-2.5 py-1 text-xs font-bold rounded-full ' + style.bg + ' ' + style.text}>
              {pub.type}
            </span>
            <span className="text-surface-500 text-xs font-semibold">{pub.year}</span>
          </div>
          <PublisherLogo publisher={pub.publisher} />
        </div>

        {/* Title */}
        <h3 className="text-heading font-bold text-lg leading-snug mb-3 group-hover:text-primary-500 transition-colors">
          {pub.title}
        </h3>

        {/* Authors */}
        <p className="text-surface-500 text-sm mb-2">
          <span className="text-surface-400 font-medium">{pub.authors}</span>
        </p>

        {/* Venue */}
        <div className="flex items-start gap-2 mb-3">
          <svg className="w-4 h-4 text-surface-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <div>
            <p className="text-surface-400 text-sm font-medium italic">{pub.venue}</p>
            {pub.volume && <p className="text-surface-600 text-xs mt-0.5">{pub.volume}</p>}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-surface-500 text-sm">{pub.date}</span>
        </div>

        {/* DOI */}
        {pub.doi && (
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="text-surface-600 text-xs font-mono">DOI: {pub.doi}</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pub.tags.map(function(tag) {
            return (
              <span key={tag} className="px-2 py-0.5 text-xs font-semibold bg-surface-700/30 text-surface-400 rounded-md">
                {tag}
              </span>
            );
          })}
        </div>

        {/* Expandable abstract */}
        <div className={'overflow-hidden transition-all duration-500 ' + (isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0')}>
          <div className="pt-4 border-t border-surface-700/30">
            <h4 className="text-surface-500 text-xs uppercase tracking-widest font-bold mb-2">Abstract</h4>
            <p className="text-surface-400 text-sm leading-relaxed">{pub.abstract}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-700/30 mt-4">
          <button
            onClick={function() { onToggle(pub.id); }}
            className="flex items-center gap-1.5 text-surface-500 hover:text-primary-500 text-sm font-medium transition-colors"
          >
            <svg className={'w-4 h-4 transition-transform duration-300 ' + (isExpanded ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isExpanded ? 'Hide Abstract' : 'Show Abstract'}
          </button>

          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-bold transition-all"
          >
            Read Paper
            <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

var CitationBlock = ({ pub }) => {
  const [copied, setCopied] = useState(false);

  var citation = pub.authors + '. "' + pub.title + '." ' + pub.venue +
    (pub.volume ? ', ' + pub.volume : '') + '. ' + pub.publisher + ', ' + pub.date + '.' +
    (pub.doi ? ' DOI: ' + pub.doi : '');

  var handleCopy = function() {
    navigator.clipboard.writeText(citation).then(function() {
      setCopied(true);
      setTimeout(function() { setCopied(false); }, 2000);
    });
  };

  return (
    <div className="bg-surface-900/50 rounded-lg p-3 border border-surface-700/20">
      <div className="flex items-start justify-between gap-2">
        <p className="text-surface-500 text-xs font-mono leading-relaxed flex-1">{citation}</p>
        <button onClick={handleCopy} className="flex-shrink-0 p-1.5 rounded-md hover:bg-surface-700/50 text-surface-500 hover:text-primary-500 transition-all" title="Copy citation">
          {copied ? (
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

var Publications = function() {
  const [expandedId, setExpandedId] = useState(null);
  const [showCitations, setShowCitations] = useState(false);

  var sortedPubs = PUBLICATIONS_DATA.slice().sort(function(a, b) { return b.year - a.year || b.id - a.id; });

  var stats = {
    total: PUBLICATIONS_DATA.length,
    journals: PUBLICATIONS_DATA.filter(function(p) { return p.type === 'Journal Article'; }).length,
    conferences: PUBLICATIONS_DATA.filter(function(p) { return p.type === 'Conference Paper'; }).length,
    chapters: PUBLICATIONS_DATA.filter(function(p) { return p.type === 'Book Chapter'; }).length,
  };

  var publishers = [];
  var seen = {};
  PUBLICATIONS_DATA.forEach(function(p) {
    if (!seen[p.publisher]) { seen[p.publisher] = true; publishers.push(p.publisher); }
  });

  return (
    <section id="publications" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
            Peer-Reviewed Research
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Publications</h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">
            Published research spanning cybersecurity, blockchain identity, automotive systems, and healthcare informatics.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: stats.total, label: 'Publications', icon: '📄', color: 'text-indigo-500' },
            { value: stats.journals, label: 'Journal Articles', icon: '📰', color: 'text-purple-500' },
            { value: stats.conferences, label: 'Conference Papers', icon: '🎤', color: 'text-blue-500' },
            { value: publishers.length, label: 'Publishers', icon: '🏛️', color: 'text-green-500' },
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

        {/* Timeline indicator */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-surface-500 text-sm font-semibold">Most Recent</span>
          </div>
          <div className="flex-1 mx-4 h-px bg-gradient-to-r from-green-500/50 via-primary-500/30 to-surface-700/30" />
          <div className="flex items-center gap-2">
            <span className="text-surface-600 text-sm font-semibold">2020</span>
            <div className="w-3 h-3 rounded-full bg-surface-600" />
          </div>
        </div>

        {/* Publications Grid */}
        <div className="space-y-6 mb-12">
          {sortedPubs.map(function(pub) {
            return (
              <PublicationCard
                key={pub.id}
                pub={pub}
                isExpanded={expandedId === pub.id}
                onToggle={function(id) { setExpandedId(expandedId === id ? null : id); }}
              />
            );
          })}
        </div>

        {/* Citation Export */}
        <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-heading font-bold">Citations</h3>
                <p className="text-surface-500 text-sm">Copy formatted citations for reference</p>
              </div>
            </div>
            <button
              onClick={function() { setShowCitations(!showCitations); }}
              className="flex items-center gap-2 px-4 py-2 bg-surface-700/30 hover:bg-surface-700/50 text-surface-400 hover:text-heading rounded-lg text-sm font-semibold transition-all"
            >
              {showCitations ? 'Hide' : 'Show All'}
              <svg className={'w-4 h-4 transition-transform duration-300 ' + (showCitations ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className={'overflow-hidden transition-all duration-500 ' + (showCitations ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0')}>
            <div className="space-y-3">
              {sortedPubs.map(function(pub) {
                return <CitationBlock key={pub.id} pub={pub} />;
              })}
            </div>
          </div>
        </div>

        {/* Publishers row */}
        <div className="mt-12 text-center">
          <p className="text-surface-600 text-xs uppercase tracking-widest font-bold mb-4">Published With</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { name: 'IEEE' },
              { name: 'ACM' },
              { name: 'Springer' },
              { name: 'MDPI' },
            ].map(function(p) {
              return (
                <div key={p.name} className="flex items-center gap-2 px-4 py-2 bg-surface-800/40 border border-surface-700/30 rounded-xl">
                  <PublisherLogo publisher={p.name} banner />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
