import { useState, useEffect, useCallback, useRef } from 'react';

var CACHE_DURATION = 5 * 60 * 1000;

const useGitHub = (username) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const cacheRef = useRef({});

  const getCached = useCallback((key) => {
    const cached = cacheRef.current[key];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, []);

  const setCache = useCallback((key, data) => {
    cacheRef.current[key] = { data: data, timestamp: Date.now() };
  }, []);

  const fetchWithRetry = useCallback(async (url, retries) => {
    if (retries === undefined) retries = 3;
    for (var i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        const remaining = response.headers.get('X-RateLimit-Remaining');
        const resetTime = response.headers.get('X-RateLimit-Reset');

        setRateLimitInfo({
          remaining: parseInt(remaining, 10),
          resetTime: resetTime ? new Date(parseInt(resetTime, 10) * 1000) : null,
        });

        if (response.status === 403 && remaining === '0') {
          const resetDate = new Date(parseInt(resetTime, 10) * 1000);
          throw new Error('GitHub API rate limit exceeded. Resets at ' + resetDate.toLocaleTimeString());
        }

        if (!response.ok) {
          throw new Error('GitHub API error: ' + response.status + ' ' + response.statusText);
        }

        return await response.json();
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }, []);

  const fetchGitHubData = useCallback(async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const cachedProfile = getCached('profile-' + username);
      const cachedRepos = getCached('repos-' + username);

      if (cachedProfile && cachedRepos) {
        setProfile(cachedProfile);
        setRepos(cachedRepos);
        setLoading(false);
        return;
      }

      const profileData = await fetchWithRetry('https://api.github.com/users/' + username);
      setProfile(profileData);
      setCache('profile-' + username, profileData);

      const reposData = await fetchWithRetry(
        'https://api.github.com/users/' + username + '/repos?per_page=100&sort=updated&direction=desc'
      );

      const enrichedRepos = reposData.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        watchers_count: repo.watchers_count,
        open_issues_count: repo.open_issues_count,
        size: repo.size,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        topics: repo.topics || [],
        fork: repo.fork,
        archived: repo.archived,
        default_branch: repo.default_branch,
        homepage: repo.homepage,
        license: repo.license,
        visibility: repo.visibility,
      }));

      setRepos(enrichedRepos);
      setCache('repos-' + username, enrichedRepos);
    } catch (err) {
      console.error('GitHub API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username, fetchWithRetry, getCached, setCache]);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  const refetch = useCallback(() => {
    cacheRef.current = {};
    fetchGitHubData();
  }, [fetchGitHubData]);

  return {
    profile: profile,
    repos: repos,
    loading: loading,
    error: error,
    rateLimitInfo: rateLimitInfo,
    refetch: refetch,
  };
};

export default useGitHub;