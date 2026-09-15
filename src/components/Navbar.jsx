import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, CONFIG } from '../utils/constants';
import { smoothScroll } from '../utils/helpers';

// Floating navbar: transparent over the hero, then detaches into an inset glass
// pill once the page scrolls (or the mobile menu opens, so the menu never sits
// on a transparent background). Height stays under the 5rem scroll-margin used
// by sections so anchored jumps keep clean headroom.
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    var handleScroll = () => {
      setScrolled(window.scrollY > 20);
      var current = NAV_ITEMS.map(i => i.id).find(id => {
        var el = document.getElementById(id);
        if (el) { var r = el.getBoundingClientRect(); return r.top <= 100 && r.bottom >= 100; }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  var handleNav = (id) => { smoothScroll(id); setMobileOpen(false); };
  var elevated = scrolled || mobileOpen;

  var linkClass = (id) =>
    'rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ' +
    (activeSection === id
      ? 'bg-primary-500/15 text-primary-600 dark:text-primary-400'
      : 'text-surface-500 hover:text-heading hover:bg-surface-800/50');

  return (
    <nav aria-label="Primary" className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3 pointer-events-none">
      <div
        className={'pointer-events-auto max-w-7xl 2xl:max-w-[88rem] mx-auto rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 px-3 sm:px-4 lg:px-5 ' +
          (elevated ? 'glass-nav backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30 border-surface-700/60' : 'bg-transparent border-transparent')}
      >
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => handleNav('overview')}
            aria-label="Back to top"
            className="flex items-center gap-3 group flex-shrink-0 mr-3 xl:mr-5 min-h-[44px] rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-surface-700/40 shadow-lg shadow-primary-500/10 bg-white/90">
              <img
                src={(process.env.PUBLIC_URL || '') + '/apple-touch-icon.png'}
                alt=""
                width="36"
                height="36"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight min-w-0 max-w-[180px] xl:max-w-none">
              <span className="text-heading font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{CONFIG.name}</span>
              <span className="hidden xl:block text-surface-500 text-xs whitespace-nowrap mt-0.5">{CONFIG.title}</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className={'px-3.5 py-2 ' + linkClass(item.id)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Theme toggle: 44px hit area around a 56x32 visual switch */}
            <button onClick={toggleDarkMode}
              className="group/toggle w-16 h-11 flex items-center justify-center rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={darkMode}>
              <span className="relative w-14 h-8 rounded-full bg-surface-700/30 border border-surface-700/50 flex items-center transition-colors duration-300 group-hover/toggle:border-primary-500/40">
                <span className={'absolute w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 shadow-sm ' +
                  (darkMode ? 'translate-x-7 bg-surface-600' : 'translate-x-1 bg-amber-400')}>
                  {darkMode ? (
                    <svg aria-hidden="true" className="w-3.5 h-3.5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" className="w-3.5 h-3.5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </span>
              </span>
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 rounded-lg bg-surface-800/50 hover:bg-surface-700/50 flex items-center justify-center text-surface-400 hover:text-heading transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav">
              <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          aria-hidden={!mobileOpen}
          className={'lg:hidden overflow-hidden transition-[max-height,padding] duration-300 ' + (mobileOpen ? 'max-h-96 pb-3' : 'max-h-0')}
        >
          <div className="grid grid-cols-2 gap-1 pt-2 border-t border-surface-700/40">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className={'px-4 py-3 min-h-[44px] text-left ' + linkClass(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
