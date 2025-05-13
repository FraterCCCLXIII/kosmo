/**
 * Theme Manager
 * Handles theme switching using CSS variables
 */

// Available themes
const themes = {
  light: {
    name: 'Light',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f5f5f7',
      bgTertiary: '#e9e9eb',
      textPrimary: '#1d1d1f',
      textSecondary: '#515154',
      textTertiary: '#86868b',
      accent: '#0066cc',
      accentLight: '#0066cc20',
      error: '#ff3b30',
      success: '#34c759',
      warning: '#ff9500',
      info: '#007aff',
      borderColor: '#e9e9eb',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      bgPrimary: '#1d1d1f',
      bgSecondary: '#2c2c2e',
      bgTertiary: '#3a3a3c',
      textPrimary: '#f5f5f7',
      textSecondary: '#aeaeb2',
      textTertiary: '#8e8e93',
      accent: '#0a84ff',
      accentLight: '#0a84ff20',
      error: '#ff453a',
      success: '#30d158',
      warning: '#ff9f0a',
      info: '#64d2ff',
      borderColor: '#3a3a3c',
    },
  },
  highContrast: {
    name: 'High Contrast',
    colors: {
      bgPrimary: '#000000',
      bgSecondary: '#1c1c1e',
      bgTertiary: '#2c2c2e',
      textPrimary: '#ffffff',
      textSecondary: '#eeeeef',
      textTertiary: '#d1d1d6',
      accent: '#0080ff',
      accentLight: '#0080ff30',
      error: '#ff6961',
      success: '#4cd964',
      warning: '#ffcc00',
      info: '#5ac8fa',
      borderColor: '#ffffff',
    },
  },
  sepia: {
    name: 'Sepia',
    colors: {
      bgPrimary: '#f9f5eb',
      bgSecondary: '#f0e9d8',
      bgTertiary: '#e6dcc6',
      textPrimary: '#5c4b35',
      textSecondary: '#7a654a',
      textTertiary: '#9c8b70',
      accent: '#8b572a',
      accentLight: '#8b572a20',
      error: '#c1432e',
      success: '#2e894e',
      warning: '#c87e2e',
      info: '#2e77c8',
      borderColor: '#e6dcc6',
    },
  },
};

// Current theme
let currentTheme = null;

/**
 * Initialize the theme manager
 * @param {Object} config - Theme configuration
 * @returns {Object} Theme manager API
 */
export async function initTheme(config = {}) {
  console.log('Initializing theme manager...');
  
  // Set default theme based on config or system preference
  const defaultTheme = config.name || getSystemPreferredTheme();
  
  // Apply theme
  await setTheme(defaultTheme);
  
  // Listen for system theme changes
  setupSystemThemeListener();
  
  // Return public API
  return {
    setTheme,
    getCurrentTheme,
    getAvailableThemes,
    addCustomTheme,
  };
}

/**
 * Get system preferred theme
 * @returns {string} Theme name
 */
function getSystemPreferredTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Set up listener for system theme changes
 */
function setupSystemThemeListener() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only change theme if user hasn't manually selected one
    if (!localStorage.getItem('os-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Set the current theme
 * @param {string} themeName - Theme name
 * @returns {boolean} Success
 */
async function setTheme(themeName) {
  // Get theme
  const theme = themes[themeName];
  if (!theme) {
    console.error(`Theme "${themeName}" not found`);
    return false;
  }
  
  // Update current theme
  currentTheme = themeName;
  
  // Apply theme colors to CSS variables
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--color-${cssVar}`, value);
  });
  
  // Add theme class to body
  document.body.className = `theme-${themeName}`;
  
  // Save theme preference
  localStorage.setItem('os-theme', themeName);
  
  // Dispatch theme change event
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: themeName } }));
  
  console.log(`Theme set to "${theme.name}"`);
  return true;
}

/**
 * Get the current theme
 * @returns {string} Current theme name
 */
function getCurrentTheme() {
  return currentTheme;
}

/**
 * Get all available themes
 * @returns {Object} Available themes
 */
function getAvailableThemes() {
  return Object.keys(themes).map(key => ({
    id: key,
    name: themes[key].name,
  }));
}

/**
 * Add a custom theme
 * @param {string} id - Theme ID
 * @param {string} name - Theme name
 * @param {Object} colors - Theme colors
 * @returns {boolean} Success
 */
function addCustomTheme(id, name, colors) {
  if (themes[id]) {
    console.error(`Theme "${id}" already exists`);
    return false;
  }
  
  themes[id] = {
    name,
    colors,
  };
  
  console.log(`Custom theme "${name}" added`);
  return true;
}