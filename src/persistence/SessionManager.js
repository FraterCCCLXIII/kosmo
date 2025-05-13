/**
 * Session Manager
 * Tracks and restores open windows, app states
 */

// Session state
let sessionData = {
  windows: [],
  apps: {},
  settings: {},
  lastSaved: null,
};

// Auto-save interval ID
let autoSaveIntervalId = null;

/**
 * Initialize the session manager
 * @param {Object} options - Session manager options
 * @returns {Object} Session manager API
 */
export async function initSessionManager(options = {}) {
  console.log('Initializing session manager...');
  
  // Set default options
  const defaultOptions = {
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    storageKey: 'os-session',
  };
  
  // Merge options
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Load session data
  await loadSession(mergedOptions.storageKey);
  
  // Set up auto-save if enabled
  if (mergedOptions.autoSave) {
    startAutoSave(mergedOptions.autoSaveInterval, mergedOptions.storageKey);
  }
  
  // Return public API
  return {
    saveSession: () => saveSession(mergedOptions.storageKey),
    loadSession: () => loadSession(mergedOptions.storageKey),
    clearSession: () => clearSession(mergedOptions.storageKey),
    getSessionData,
    updateSessionData,
    saveWindowState,
    restoreWindows,
    saveAppState,
    getAppState,
  };
}

/**
 * Start auto-save
 * @param {number} interval - Auto-save interval in milliseconds
 * @param {string} storageKey - Storage key
 */
function startAutoSave(interval, storageKey) {
  // Clear existing interval if any
  if (autoSaveIntervalId) {
    clearInterval(autoSaveIntervalId);
  }
  
  // Set up new interval
  autoSaveIntervalId = setInterval(() => {
    saveSession(storageKey);
  }, interval);
}

/**
 * Save session data to storage
 * @param {string} storageKey - Storage key
 * @returns {boolean} Success
 */
async function saveSession(storageKey) {
  try {
    // Update last saved timestamp
    sessionData.lastSaved = Date.now();
    
    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(sessionData));
    
    console.log('Session saved');
    return true;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
}

/**
 * Load session data from storage
 * @param {string} storageKey - Storage key
 * @returns {boolean} Success
 */
async function loadSession(storageKey) {
  try {
    // Get from localStorage
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      // Parse saved data
      const parsedData = JSON.parse(savedData);
      
      // Update session data
      sessionData = parsedData;
      
      console.log('Session loaded');
      return true;
    }
    
    console.log('No saved session found');
    return false;
  } catch (error) {
    console.error('Error loading session:', error);
    return false;
  }
}

/**
 * Clear session data from storage
 * @param {string} storageKey - Storage key
 * @returns {boolean} Success
 */
async function clearSession(storageKey) {
  try {
    // Clear from localStorage
    localStorage.removeItem(storageKey);
    
    // Reset session data
    sessionData = {
      windows: [],
      apps: {},
      settings: {},
      lastSaved: null,
    };
    
    console.log('Session cleared');
    return true;
  } catch (error) {
    console.error('Error clearing session:', error);
    return false;
  }
}

/**
 * Get session data
 * @returns {Object} Session data
 */
function getSessionData() {
  return { ...sessionData };
}

/**
 * Update session data
 * @param {Object} updates - Updates to apply
 * @returns {Object} Updated session data
 */
function updateSessionData(updates) {
  // Merge updates with current data
  sessionData = {
    ...sessionData,
    ...updates,
  };
  
  return { ...sessionData };
}

/**
 * Save window state
 * @param {string} windowId - Window ID
 * @param {Object} windowState - Window state
 */
function saveWindowState(windowId, windowState) {
  // Find existing window state
  const existingIndex = sessionData.windows.findIndex(w => w.id === windowId);
  
  if (existingIndex !== -1) {
    // Update existing window state
    sessionData.windows[existingIndex] = {
      ...sessionData.windows[existingIndex],
      ...windowState,
      id: windowId,
      updatedAt: Date.now(),
    };
  } else {
    // Add new window state
    sessionData.windows.push({
      id: windowId,
      ...windowState,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }
}

/**
 * Restore windows from session
 * @returns {Promise<Array>} Restored windows
 */
async function restoreWindows() {
  try {
    // Check if we have windows to restore
    if (!sessionData.windows || sessionData.windows.length === 0) {
      console.log('No windows to restore');
      return [];
    }
    
    console.log(`Restoring ${sessionData.windows.length} windows`);
    
    // Import WindowManager
    const { initWindowManager } = await import('../ui/WindowManager.js');
    const windowManager = await initWindowManager();
    
    // Restore each window
    const restoredWindows = [];
    
    for (const windowState of sessionData.windows) {
      try {
        // Create window with saved state
        const window = windowManager.createWindow({
          ...windowState,
          // Don't restore position for maximized windows
          x: windowState.isMaximized ? 'center' : windowState.x,
          y: windowState.isMaximized ? 'center' : windowState.y,
        });
        
        // Apply maximized state if needed
        if (windowState.isMaximized) {
          window.maximize();
        }
        
        // Apply minimized state if needed
        if (windowState.isMinimized) {
          window.minimize();
        }
        
        restoredWindows.push(window);
      } catch (error) {
        console.error(`Error restoring window ${windowState.id}:`, error);
      }
    }
    
    return restoredWindows;
  } catch (error) {
    console.error('Error restoring windows:', error);
    return [];
  }
}

/**
 * Save app state
 * @param {string} appId - App ID
 * @param {Object} appState - App state
 */
function saveAppState(appId, appState) {
  // Update app state
  sessionData.apps[appId] = {
    ...sessionData.apps[appId],
    ...appState,
    updatedAt: Date.now(),
  };
}

/**
 * Get app state
 * @param {string} appId - App ID
 * @returns {Object|null} App state or null if not found
 */
function getAppState(appId) {
  return sessionData.apps[appId] || null;
}