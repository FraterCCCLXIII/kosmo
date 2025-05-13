/**
 * Kosmo OS UI Kit - Theme Provider
 * 
 * This component provides theming functionality to the application.
 * It applies the selected theme's CSS variables to the :root element.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import themes from '../../styles/themes';

// Create a context for theme management
export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
export const ThemeProvider = ({ children, initialTheme = 'light' }) => {
  const [theme, setTheme] = useState(initialTheme);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Apply theme CSS variables when theme changes
  useEffect(() => {
    // Get the theme variables
    const themeVariables = themes[theme];
    
    // Apply theme variables to :root
    Object.entries(themeVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    // Add theme class to body
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // Store theme preference
    localStorage.setItem('kosmo-theme', theme);
  }, [theme]);
  
  // Initialize theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('kosmo-theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;