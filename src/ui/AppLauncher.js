/**
 * App Launcher
 * Grid or start menu of available apps
 */

// App registry
const appRegistry = new Map();

// App launcher state
let isVisible = false;
let launcherElement = null;

/**
 * Initialize the app launcher
 * @param {Array} initialApps - Initial apps to load
 * @returns {Object} App launcher API
 */
export async function initAppLauncher(initialApps = []) {
  console.log('Initializing app launcher...');
  
  // Create launcher element
  createLauncherElement();
  
  // Load initial apps
  if (initialApps && initialApps.length > 0) {
    await Promise.all(initialApps.map(loadApp));
  }
  
  // Return public API
  return {
    loadApp,
    unloadApp,
    launchApp,
    getInstalledApps,
    showLauncher,
    hideLauncher,
    toggleLauncher,
  };
}

/**
 * Create app launcher element
 */
function createLauncherElement() {
  // Check if launcher already exists
  launcherElement = document.getElementById('app-launcher');
  if (launcherElement) return;
  
  // Create launcher container
  launcherElement = document.createElement('div');
  launcherElement.id = 'app-launcher';
  launcherElement.className = 'app-launcher';
  launcherElement.style.position = 'absolute';
  launcherElement.style.top = '0';
  launcherElement.style.left = '0';
  launcherElement.style.width = '100%';
  launcherElement.style.height = '100%';
  launcherElement.style.backgroundColor = 'var(--color-bg-primary)';
  launcherElement.style.display = 'none';
  launcherElement.style.flexDirection = 'column';
  launcherElement.style.padding = 'var(--spacing-lg)';
  launcherElement.style.zIndex = 'var(--z-index-modal)';
  
  // Create launcher header
  const headerEl = document.createElement('div');
  headerEl.className = 'app-launcher-header';
  headerEl.style.marginBottom = 'var(--spacing-lg)';
  
  // Add search input
  const searchEl = document.createElement('input');
  searchEl.type = 'text';
  searchEl.placeholder = 'Search apps...';
  searchEl.className = 'app-launcher-search';
  searchEl.style.width = '100%';
  searchEl.style.padding = 'var(--spacing-md)';
  searchEl.style.borderRadius = 'var(--border-radius-md)';
  searchEl.style.border = 'var(--border-width) solid var(--border-color)';
  searchEl.style.fontSize = 'var(--font-size-lg)';
  searchEl.style.backgroundColor = 'var(--color-bg-secondary)';
  searchEl.style.color = 'var(--color-text-primary)';
  
  // Add search event listener
  searchEl.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filterApps(query);
  });
  
  headerEl.appendChild(searchEl);
  launcherElement.appendChild(headerEl);
  
  // Create app grid
  const gridEl = document.createElement('div');
  gridEl.className = 'app-launcher-grid';
  gridEl.style.display = 'grid';
  gridEl.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
  gridEl.style.gap = 'var(--spacing-lg)';
  gridEl.style.flex = '1';
  gridEl.style.overflowY = 'auto';
  launcherElement.appendChild(gridEl);
  
  // Add to DOM
  document.getElementById('app-root').appendChild(launcherElement);
  
  // Add click handler to close launcher when clicking outside app icons
  launcherElement.addEventListener('click', (e) => {
    if (e.target === launcherElement || e.target === gridEl) {
      hideLauncher();
    }
  });
  
  // Add escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isVisible) {
      hideLauncher();
    }
  });
}

/**
 * Load an app
 * @param {string} appId - App ID
 * @returns {Promise<Object>} App object
 */
async function loadApp(appId) {
  console.log(`Loading app: ${appId}`);
  
  try {
    // Check if app is already loaded
    if (appRegistry.has(appId)) {
      return appRegistry.get(appId);
    }
    
    // Load app manifest
    const manifest = await loadAppManifest(appId);
    
    // Create app object
    const app = {
      id: appId,
      title: manifest.title || appId,
      description: manifest.description || '',
      icon: manifest.icon || null,
      version: manifest.version || '1.0.0',
      author: manifest.author || 'Unknown',
      permissions: manifest.permissions || [],
      main: manifest.main || 'app.js',
      singleton: manifest.singleton !== false, // Default to true
      module: null, // Will be loaded when app is launched
    };
    
    // Add to registry
    appRegistry.set(appId, app);
    
    // Add to launcher
    addAppToLauncher(app);
    
    return app;
  } catch (error) {
    console.error(`Failed to load app ${appId}:`, error);
    throw error;
  }
}

/**
 * Load app manifest
 * @param {string} appId - App ID
 * @returns {Promise<Object>} App manifest
 */
async function loadAppManifest(appId) {
  try {
    // In a real implementation, this would load the manifest from the file system
    // For now, we'll return mock data
    return {
      title: appId.charAt(0).toUpperCase() + appId.slice(1).replace(/-/g, ' '),
      description: `${appId} application`,
      icon: `/src/apps/${appId}/icon.png`,
      version: '1.0.0',
      author: 'AI-First OS',
      permissions: [],
      main: 'app.js',
      singleton: true,
    };
  } catch (error) {
    console.error(`Failed to load manifest for ${appId}:`, error);
    throw error;
  }
}

/**
 * Add app to launcher
 * @param {Object} app - App object
 */
function addAppToLauncher(app) {
  // Get app grid
  const gridEl = document.querySelector('.app-launcher-grid');
  if (!gridEl) return;
  
  // Create app icon element
  const appEl = document.createElement('div');
  appEl.className = 'app-launcher-item';
  appEl.dataset.appId = app.id;
  appEl.style.display = 'flex';
  appEl.style.flexDirection = 'column';
  appEl.style.alignItems = 'center';
  appEl.style.justifyContent = 'center';
  appEl.style.padding = 'var(--spacing-md)';
  appEl.style.borderRadius = 'var(--border-radius-md)';
  appEl.style.cursor = 'pointer';
  appEl.style.textAlign = 'center';
  appEl.style.transition = 'background-color var(--transition-fast)';
  
  // Add hover effect
  appEl.addEventListener('mouseenter', () => {
    appEl.style.backgroundColor = 'var(--color-bg-secondary)';
  });
  
  appEl.addEventListener('mouseleave', () => {
    appEl.style.backgroundColor = 'transparent';
  });
  
  // Add click handler
  appEl.addEventListener('click', () => {
    launchApp(app.id);
    hideLauncher();
  });
  
  // Add app icon
  const iconEl = document.createElement('div');
  iconEl.className = 'app-launcher-icon';
  iconEl.style.width = '64px';
  iconEl.style.height = '64px';
  iconEl.style.marginBottom = 'var(--spacing-sm)';
  iconEl.style.backgroundColor = 'var(--color-bg-tertiary)';
  iconEl.style.borderRadius = 'var(--border-radius-md)';
  iconEl.style.display = 'flex';
  iconEl.style.alignItems = 'center';
  iconEl.style.justifyContent = 'center';
  
  // Add icon image if available
  if (app.icon) {
    const imgEl = document.createElement('img');
    imgEl.src = app.icon;
    imgEl.alt = app.title;
    imgEl.style.width = '48px';
    imgEl.style.height = '48px';
    iconEl.appendChild(imgEl);
  } else {
    // Use first letter of app title as fallback
    iconEl.textContent = app.title.charAt(0).toUpperCase();
    iconEl.style.fontSize = '32px';
    iconEl.style.fontWeight = 'bold';
    iconEl.style.color = 'var(--color-text-primary)';
  }
  
  appEl.appendChild(iconEl);
  
  // Add app title
  const titleEl = document.createElement('div');
  titleEl.className = 'app-launcher-title';
  titleEl.textContent = app.title;
  titleEl.style.fontSize = 'var(--font-size-sm)';
  titleEl.style.fontWeight = 'var(--font-weight-medium)';
  titleEl.style.marginTop = 'var(--spacing-xs)';
  appEl.appendChild(titleEl);
  
  // Add to grid
  gridEl.appendChild(appEl);
}

/**
 * Filter apps by search query
 * @param {string} query - Search query
 */
function filterApps(query) {
  // Get all app items
  const appItems = document.querySelectorAll('.app-launcher-item');
  
  // Filter apps
  appItems.forEach(appEl => {
    const appId = appEl.dataset.appId;
    const app = appRegistry.get(appId);
    
    if (!app) return;
    
    // Check if app matches query
    const matches = app.title.toLowerCase().includes(query) || 
                   app.description.toLowerCase().includes(query) ||
                   app.id.toLowerCase().includes(query);
    
    // Show or hide app
    appEl.style.display = matches ? 'flex' : 'none';
  });
}

/**
 * Unload an app
 * @param {string} appId - App ID
 * @returns {boolean} Success
 */
function unloadApp(appId) {
  // Check if app is loaded
  if (!appRegistry.has(appId)) {
    console.warn(`App ${appId} is not loaded`);
    return false;
  }
  
  // Remove from registry
  appRegistry.delete(appId);
  
  // Remove from launcher
  const appEl = document.querySelector(`.app-launcher-item[data-app-id="${appId}"]`);
  if (appEl) {
    appEl.remove();
  }
  
  console.log(`Unloaded app: ${appId}`);
  return true;
}

/**
 * Launch an app
 * @param {string} appId - App ID
 * @returns {Promise<Object>} Window object
 */
async function launchApp(appId) {
  console.log(`Launching app: ${appId}`);
  
  try {
    // Get app from registry
    const app = appRegistry.get(appId);
    if (!app) {
      throw new Error(`App ${appId} is not loaded`);
    }
    
    // In a real implementation, this would load the app module
    // For now, we'll create a mock window
    
    // Import WindowManager
    const { initWindowManager } = await import('./WindowManager.js');
    const windowManager = await initWindowManager();
    
    // Create window
    const window = windowManager.createWindow({
      title: app.title,
      width: 800,
      height: 600,
      icon: app.icon,
      content: `
        <div style="padding: 20px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h2>${app.title}</h2>
          <p>Version: ${app.version}</p>
          <p>Author: ${app.author}</p>
          <p>This is a placeholder for the ${app.title} app.</p>
        </div>
      `,
    });
    
    return window;
  } catch (error) {
    console.error(`Failed to launch app ${appId}:`, error);
    throw error;
  }
}

/**
 * Get all installed apps
 * @returns {Array} Array of app objects
 */
function getInstalledApps() {
  return Array.from(appRegistry.values());
}

/**
 * Show the app launcher
 */
function showLauncher() {
  if (!launcherElement) return;
  
  launcherElement.style.display = 'flex';
  isVisible = true;
  
  // Focus search input
  const searchEl = launcherElement.querySelector('.app-launcher-search');
  if (searchEl) {
    searchEl.focus();
  }
}

/**
 * Hide the app launcher
 */
function hideLauncher() {
  if (!launcherElement) return;
  
  launcherElement.style.display = 'none';
  isVisible = false;
}

/**
 * Toggle the app launcher
 */
function toggleLauncher() {
  if (isVisible) {
    hideLauncher();
  } else {
    showLauncher();
  }
}