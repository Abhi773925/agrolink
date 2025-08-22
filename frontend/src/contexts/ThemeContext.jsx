import React, { createContext, useContext, useState, useEffect } from 'react';

const lightColors = {
  background: '#F9FAFB',
  card: '#FFFFFF',
  border: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  greenPrimary: '#16A34A',
  greenHover: '#15803D',
  yellowAccent: '#EAB308',
};

const darkColors = {
  background: '#111827',
  card: '#1F2937',
  border: '#374151',
  textPrimary: '#FFFFFF',
  textSecondary: '#D1D5DB',
  greenPrimary: '#22C55E',
  greenHover: '#16A34A',
  yellowAccent: '#FACC15',
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('agrolink-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('agrolink-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, isDark: theme === 'dark', isLight: theme === 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
};
