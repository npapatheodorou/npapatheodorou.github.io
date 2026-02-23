import { LANGUAGE_COLORS } from './constants';

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return diffDays + ' days ago';
  if (diffDays < 30) return Math.floor(diffDays / 7) + ' weeks ago';
  if (diffDays < 365) return Math.floor(diffDays / 30) + ' months ago';
  return Math.floor(diffDays / 365) + ' years ago';
};

export const getLanguageColor = (language) => {
  return LANGUAGE_COLORS[language] || '#8b949e';
};

export const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const calculateLanguageStats = (repos) => {
  const langMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + (repo.size || 1);
    }
  });

  const total = Object.values(langMap).reduce((sum, val) => sum + val, 0);

  return Object.entries(langMap)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / total) * 100).toFixed(1),
      color: getLanguageColor(name),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
};

export const generateContributionData = () => {
  const data = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;

    let count;
    const rand = Math.random();
    if (rand < 0.15) count = 0;
    else if (rand < 0.4) count = isWeekday ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2);
    else if (rand < 0.7) count = isWeekday ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 3) + 1;
    else if (rand < 0.9) count = isWeekday ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 4) + 1;
    else count = Math.floor(Math.random() * 12) + 6;

    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4,
    });
  }
  return data;
};

export const getContributionColor = (level, isDark) => {
  if (isDark === false) {
    var lightColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
    return lightColors[level] || lightColors[0];
  }
  var darkColors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  return darkColors[level] || darkColors[0];
};

export const smoothScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};