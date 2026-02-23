import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Repositories from './components/Repositories';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contributions from './components/Contributions';
import Research from './components/Research';
import Career from './components/Career';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import ScrollToTop from './components/ScrollToTop';
import useGitHub from './hooks/useGitHub';
import { CONFIG } from './utils/constants';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { profile, repos, loading, error, refetch } = useGitHub(CONFIG.githubUsername);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner message="Fetching GitHub data..." />
          </div>
        ) : error ? (
          <div className="min-h-screen flex flex-col">
            <Hero profile={null} />
            <div className="py-12">
              <ErrorState message={error} onRetry={refetch} />
            </div>
            <Skills />
            <Projects />
            <Contributions />
            <Research />
            <Career />
            <Contact />
          </div>
        ) : (
          <>
            <Hero profile={profile} />
            <Repositories repos={repos} />
            <Skills />
            <Projects />
            <Contributions />
            <Research />
            <Career />
            <Contact />
          </>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;