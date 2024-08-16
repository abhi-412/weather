// src/utils/localStorage.ts

const HISTORY_KEY = 'weather-history';

export const getHistory = () => {
  if (typeof window !== 'undefined') {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  }
  return [];
};

export const addToHistory = (location: { name: string; lat: number; lon: number }) => {
  if (typeof window !== 'undefined') {
    const history = getHistory();
    history.push(location);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
};
