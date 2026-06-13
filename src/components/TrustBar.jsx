import React from 'react';

// Honest social proof: real organizations from the work history (no fabricated
// testimonials). Logos live in public/icons/companies.
var ORGS = [
  { name: 'Ernst & Young (EY)', src: '/icons/companies/ey.jpg', wrap: 'bg-black' },
  { name: 'APT Information Systems', src: '/icons/companies/apt.png', wrap: 'bg-white' },
  { name: 'Hellenic Mediterranean University', src: '/icons/companies/hmu.png', wrap: 'bg-white' },
];

var TrustBar = () => (
  <section aria-label="Organizations I have worked with" className="py-12 border-y border-surface-700/30 bg-surface-900/30">
    <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-surface-500 text-xs font-bold uppercase tracking-[0.22em] mb-7">
        Experience across enterprise, product &amp; academia
      </p>
      <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
        {ORGS.map(function (org) {
          return (
            <div key={org.name} className="flex items-center gap-3 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className={'w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center border border-surface-700/40 ' + org.wrap}>
                <img
                  src={(process.env.PUBLIC_URL || '') + org.src}
                  alt={org.name + ' logo'}
                  className="w-7 h-7 object-contain"
                  loading="lazy"
                  width="28"
                  height="28"
                />
              </div>
              <span className="text-surface-400 text-sm font-semibold">{org.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustBar;
