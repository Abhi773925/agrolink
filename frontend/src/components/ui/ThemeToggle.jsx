import React from 'react';
import { Sun, Moon, Monitor, Palette, Leaf, TreePine, Wheat } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ showAccentSelector = true, className = '' }) => {
  const { theme, toggleTheme, colors, colorSchemes, accentColor, setAccentColor } = useTheme();

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  };

  const themeOptions = [
    { key: 'standard', name: 'Standard', icon: Leaf, description: 'Professional agricultural theme' },
    { key: 'nature', name: 'Nature', icon: TreePine, description: 'Deep forest green theme' },
    { key: 'earth', name: 'Earth', icon: Wheat, description: 'Rich earth brown theme' }
  ];

  const ThemeIcon = themeIcons[theme];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="relative p-2 rounded-xl transition-transform duration-300 hover:scale-105"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          color: colors.textPrimary
        }}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <ThemeIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Accent/Theme Selector */}
      {showAccentSelector && (
        <div className="relative group">
          <button
            className="p-2 rounded-xl transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
              color: colors.textPrimary
            }}
          >
            <Palette className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          <div
            className="absolute top-full mt-2 right-0 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-4 min-w-[280px]"
            style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
            }}
          >
            <h4 className="font-medium mb-3 text-sm" style={{ color: colors.textPrimary }}>
              Color Themes
            </h4>
            <div className="space-y-2">
              {themeOptions.map((option) => {
                const IconComponent = option.icon;
                const isActive = accentColor === option.key;
                const themeColors = colorSchemes[option.key]?.[theme] || colorSchemes.standard[theme];

                return (
                  <button
                    key={option.key}
                    onClick={() => setAccentColor(option.key)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: isActive ? `${themeColors.primary}20` : 'transparent',
                      border: isActive ? `1px solid ${themeColors.primary}` : '1px solid transparent',
                      color: colors.textPrimary
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full border-2"
                      style={{ backgroundColor: themeColors.primary, borderColor: colors.surface }}
                    />
                    <IconComponent className="w-4 h-4" style={{ color: themeColors.primary }} />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{option.name}</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>
                        {option.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.primary }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
