import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Projects from './components/Projects';
import Career from './components/Career';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Publications from './components/Publications';
import Research from './components/Research';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import ScrollToTop from './components/ScrollToTop';
import Reveal from './components/Reveal';
import SectionSkeleton from './components/SectionSkeleton';
import useGitHub from './hooks/useGitHub';
import { CONFIG } from './utils/constants';

// Repositories pulls in Recharts (~90KB gzipped) and sits below the fold, so it
// is code-split and streamed in on demand to keep the initial bundle lean.
const Repositories = lazy(() => import('./components/Repositories'));

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    var saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const { profile, repos, loading, error, refetch } = useGitHub(CONFIG.githubUsername);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  var toggleDarkMode = () => setDarkMode(!darkMode);

  var repositoriesSection = (
    <Reveal as="section" aria-label="Repositories">
      <Suspense fallback={<SectionSkeleton label="Loading repositories" />}>
        <Repositories repos={error ? [] : repos} />
      </Suspense>
    </Reveal>
  );

  return (
    <div className="min-h-screen bg-surface-950 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-primary-600 focus:text-white focus:font-semibold focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      >
        Skip to content
      </a>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main id="main">
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner message="Fetching GitHub data..." />
          </div>
        ) : (
          <>
            <Hero profile={error ? null : profile} />
            <TrustBar />
            {error && (
              <div className="py-12">
                <ErrorState message={error} onRetry={refetch} />
              </div>
            )}
            <Reveal as="div"><Projects /></Reveal>
            <Reveal as="div"><Career /></Reveal>
            {repositoriesSection}
            <Reveal as="div"><Skills /></Reveal>
            <Reveal as="div"><Certifications /></Reveal>
            <Reveal as="div"><Publications /></Reveal>
            <Reveal as="div"><Research /></Reveal>
            <Reveal as="div"><Contact /></Reveal>
          </>
        )}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
