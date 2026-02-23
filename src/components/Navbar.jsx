import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, CONFIG } from '../utils/constants';
import { smoothScroll } from '../utils/helpers';

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

  return (
    <nav className={'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' + (scrolled ? 'glass-nav backdrop-blur-xl shadow-sm' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => handleNav('overview')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-surface-700/40 shadow-lg shadow-primary-500/10 bg-white/90">
              <img
                src={(process.env.PUBLIC_URL || '') + '/apple-touch-icon.png'}
                alt="Nikos Papatheodorou logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-heading font-semibold text-sm">{CONFIG.name}</span>
              <span className="block text-surface-500 text-xs">{CONFIG.title}</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                className={'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ' +
                  (activeSection === item.id
                    ? 'bg-primary-500/15 text-primary-600'
                    : 'text-surface-500 hover:text-heading hover:bg-surface-800/50')}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button onClick={toggleDarkMode}
              className="relative w-14 h-8 rounded-full bg-surface-700/30 border border-surface-700/50 flex items-center transition-all duration-300 hover:border-primary-500/30 focus:outline-none"
              aria-label="Toggle theme">
              <div className={'absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ' +
                (darkMode ? 'translate-x-7 bg-surface-600' : 'translate-x-1 bg-amber-400')}>
                {darkMode ? (
                  <svg className="w-3.5 h-3.5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg bg-surface-800/50 hover:bg-surface-700/50 flex items-center justify-center text-surface-400 hover:text-heading transition-all"
              aria-label="Menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        <div className={'lg:hidden overflow-hidden transition-all duration-300 ' + (mobileOpen ? 'max-h-96 pb-4' : 'max-h-0')}>
          <div className="grid grid-cols-2 gap-1 pt-2">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                className={'px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ' +
                  (activeSection === item.id ? 'bg-primary-500/15 text-primary-600' : 'text-surface-500 hover:text-heading hover:bg-surface-800/50')}>
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
