import React, { useRef, useState, useEffect } from 'react';

// Lightweight scroll-reveal wrapper built on IntersectionObserver (no animation
// library). Fades + lifts content into view once, then disconnects. Honors
// prefers-reduced-motion via the .reveal rules in App.css, and degrades to
// always-visible if IntersectionObserver is unavailable.
const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={'reveal ' + (visible ? 'is-visible ' : '') + className}
      style={delay ? { transitionDelay: delay + 'ms' } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
