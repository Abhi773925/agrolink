import { useTheme } from '../contexts/ThemeContext';

export const useColors = () => {
  const { colors, isDark, isLight, theme, toggleTheme } = useTheme();

  return {
    colors,
    isDark,
    isLight,
    theme,
    toggleTheme
  };
};
