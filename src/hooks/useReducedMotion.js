import { useState, useEffect } from 'react';

// Tracks the user's prefers-reduced-motion setting so JS-driven animations
// (typewriter, count-up, etc.) can be skipped for motion-sensitive visitors.
const QUERY = '(prefers-reduced-motion: reduce)';

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduced(mql.matches);
    // Safari < 14 only supports the deprecated addListener signature.
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return reduced;
};

export default useReducedMotion;
