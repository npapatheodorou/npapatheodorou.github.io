import React, { useState, useEffect } from 'react';

var ScrollToTop = () => {
  const [v, setV] = useState(false);
  useEffect(() => {
    var h = () => setV(window.scrollY > 500);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={'fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary-600 hover:bg-primary-500 text-white rounded-full shadow-lg shadow-primary-500/20 flex items-center justify-center transition-all duration-300 ' +
        (v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')}
      aria-label="Scroll to top">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTop;