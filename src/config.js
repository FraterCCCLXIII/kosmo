/**
 * Global configuration settings for the OS
 * Includes themes, initial apps, platform config
 */

// Default configuration
const defaultConfig = {
  // UI theme settings
  theme: {
    name: 'light',
    accentColor: '#0066cc',
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '8px',
    animation: {
      enabled: true,
      speed: 'normal' // 'slow', 'normal', 'fast'
    }
  },
  
  // Language settings
  language: 'en',
  
  // Feature flags
  features: {
    aiAssistant: true,
    gitIntegration: true,
    virtualFileSystem: true,
    accessibilityTools: true
  },
  
  // Default apps to load
  apps: [
    // Core System Apps
    'calculator',
    'settings',
    'phone',
    'messaging',
    'contacts',
    'clock',
    'voice-assistant',
    'app-store',
    'trash-bin',
    'app-installer',
    
    // Media & Creative Tools
    'camera',
    'photo-editor',
    'vector-editor',
    'ui-design',
    'voice-memos',
    'photos',
    'video-player',
    'audio-player',
    'media-streaming',
    'podcasts',
    'movies-tv',
    'books',
    'preview',
    'torrent-client',
    
    // Productivity & Office
    'email',
    'word-processor',
    'spreadsheet',
    'presentation',
    'notes',
    'calendar',
    'cloud-storage',
    'font-manager',
    'code-editor',
    'dictionary',
    'kosmographica',
    'text-editor',
    'file-browser',
    'terminal',
    
    // Connectivity & Communication
    'maps',
    'social-media',
    'video-meeting',
    'browser',
    
    // Finance & Utilities
    'banking',
    'crypto-wallet',
    
    // Gaming
    'game-hub',
    
    // Lifestyle & Info
    'weather',
    'news',
    'todo-list'
  ],
  
  // Git configuration
  git: {
    provider: 'github', // 'github', 'gitlab', 'fake'
    defaultBranch: 'main',
    autoCommit: false
  },
  
  // AI assistant configuration
  ai: {
    model: 'default',
    systemPrompt: 'You are an AI assistant in an operating system. Help the user with tasks.',
    features: {
      codeCompletion: true,
      commandSuggestions: true,
      contextAwareness: true
    }
  },
  
  // Session management
  restoreSession: true,
  autosaveInterval: 30000, // ms
  
  // Platform detection
  platform: {
    detectAutomatically: true,
    // Will be populated at runtime: 'desktop', 'mobile', 'tablet', 'watch'
    type: null,
    // Will be populated at runtime: 'windows', 'macos', 'linux', 'ios', 'android'
    os: null
  },
  
  // Performance settings
  performance: {
    enableHardwareAcceleration: true,
    limitAnimationsOnBattery: true,
    prefetchApps: true
  },
  
  // Developer settings
  developer: {
    debugMode: false,
    showFPS: false,
    logLevel: 'error' // 'debug', 'info', 'warn', 'error'
  }
};

/**
 * Loads configuration from storage and merges with defaults
 * @returns {Promise<Object>} The merged configuration
 */
export async function loadConfig() {
  try {
    // Try to load saved config from localStorage
    const savedConfig = localStorage.getItem('os-config');
    
    // Detect platform information
    const platformInfo = detectPlatform();
    
    if (savedConfig) {
      // Merge saved config with defaults
      const parsedConfig = JSON.parse(savedConfig);
      const mergedConfig = deepMerge(defaultConfig, parsedConfig);
      
      // Always update platform info
      mergedConfig.platform = {
        ...mergedConfig.platform,
        ...platformInfo
      };
      
      return mergedConfig;
    }
    
    // If no saved config, use defaults with detected platform
    return {
      ...defaultConfig,
      platform: {
        ...defaultConfig.platform,
        ...platformInfo
      }
    };
  } catch (error) {
    console.error('Error loading config:', error);
    return defaultConfig;
  }
}

/**
 * Saves the current configuration to storage
 * @param {Object} config - The configuration to save
 * @returns {Promise<void>}
 */
export async function saveConfig(config) {
  try {
    localStorage.setItem('os-config', JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

/**
 * Detects the current platform and OS
 * @returns {Object} Platform information
 */
function detectPlatform() {
  const ua = navigator.userAgent;
  const platform = {
    type: 'desktop',
    os: 'unknown'
  };
  
  // Detect device type
  if (/iPhone|iPod/.test(ua)) {
    platform.type = 'mobile';
  } else if (/iPad/.test(ua)) {
    platform.type = 'tablet';
  } else if (/Android/.test(ua)) {
    platform.type = /Mobile/.test(ua) ? 'mobile' : 'tablet';
  } else if (/Windows Phone/.test(ua)) {
    platform.type = 'mobile';
  }
  
  // Detect OS
  if (/Windows/.test(ua)) {
    platform.os = 'windows';
  } else if (/Macintosh|Mac OS X/.test(ua)) {
    platform.os = 'macos';
  } else if (/Linux/.test(ua)) {
    platform.os = 'linux';
  } else if (/iPhone|iPad|iPod/.test(ua)) {
    platform.os = 'ios';
  } else if (/Android/.test(ua)) {
    platform.os = 'android';
  }
  
  return platform;
}

/**
 * Deep merges two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
function deepMerge(target, source) {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
}

/**
 * Checks if value is an object
 * @param {*} item - Value to check
 * @returns {boolean} True if object
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

// Export default config for testing
export { defaultConfig };