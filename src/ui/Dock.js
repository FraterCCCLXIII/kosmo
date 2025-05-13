/**
 * Dock
 * Apple-style dock for running apps and app shortcuts
 */

// Dock state
let dockElement = null;
let runningApps = new Map();
let pinnedApps = [
  { id: 'finder', title: 'Finder', icon: '/src/apps/finder/icon.svg' },
  { id: 'calculator', title: 'Calculator', icon: '/src/apps/calculator/icon.svg' },
  { id: 'text-editor', title: 'Text Editor', icon: '/src/apps/text-editor/icon.svg' },
  { id: 'browser', title: 'Browser', icon: '/src/apps/browser/icon.svg' },
  { id: 'terminal', title: 'Terminal', icon: '/src/apps/terminal/icon.svg' },
  { id: 'photos', title: 'Photos', icon: '/src/apps/photos/icon.svg' },
  { id: 'settings', title: 'Settings', icon: '/src/apps/settings/icon.svg' }
];

/**
 * Initialize the dock
 * @returns {Object} Dock API
 */
export async function initDock() {
  console.log('Initializing dock...');
  
  // Create dock element
  createDockElement();
  
  // Return public API
  return {
    addApp,
    removeApp,
    updateApp,
    getRunningApps,
    highlightDockIcon,
  };
}

/**
 * Create dock element
 */
function createDockElement() {
  // Check if dock already exists
  dockElement = document.getElementById('dock');
  if (dockElement) return;
  
  // Create dock container
  dockElement = document.createElement('div');
  dockElement.id = 'dock';
  dockElement.className = 'dock';
  dockElement.style.position = 'absolute';
  dockElement.style.bottom = '10px';
  dockElement.style.left = '50%';
  dockElement.style.transform = 'translateX(-50%)';
  dockElement.style.height = '70px';
  dockElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  dockElement.style.backdropFilter = 'blur(10px)';
  dockElement.style.borderRadius = '16px';
  dockElement.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
  dockElement.style.display = 'flex';
  dockElement.style.alignItems = 'center';
  dockElement.style.padding = '0 12px';
  dockElement.style.zIndex = 'var(--z-index-fixed)';
  
  // Create apps container
  const appsContainer = document.createElement('div');
  appsContainer.className = 'dock-apps';
  appsContainer.style.display = 'flex';
  appsContainer.style.alignItems = 'center';
  appsContainer.style.gap = '8px';
  appsContainer.style.height = '100%';
  dockElement.appendChild(appsContainer);
  
  // Add pinned apps
  pinnedApps.forEach(app => {
    const appIcon = createDockIcon(app);
    appsContainer.appendChild(appIcon);
  });
  
  // Add separator before system icons
  const separator = document.createElement('div');
  separator.className = 'dock-separator';
  separator.style.width = '1px';
  separator.style.height = '40%';
  separator.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  separator.style.margin = '0 8px';
  appsContainer.appendChild(separator);
  
  // Add AI button
  const aiButton = document.createElement('button');
  aiButton.className = 'dock-ai-button';
  aiButton.setAttribute('aria-label', 'AI Assistant');
  aiButton.style.display = 'flex';
  aiButton.style.alignItems = 'center';
  aiButton.style.justifyContent = 'center';
  aiButton.style.width = '48px';
  aiButton.style.height = '48px';
  aiButton.style.borderRadius = '50%';
  aiButton.style.border = 'none';
  aiButton.style.backgroundColor = 'var(--color-accent)';
  aiButton.style.color = 'white';
  aiButton.style.cursor = 'pointer';
  aiButton.style.transition = 'transform 0.2s ease, background-color 0.2s ease';
  
  // Add AI icon
  aiButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
      <circle cx="7.5" cy="14.5" r="1.5"></circle>
      <circle cx="16.5" cy="14.5" r="1.5"></circle>
    </svg>
  `;
  
  // Add hover effect
  aiButton.addEventListener('mouseenter', () => {
    aiButton.style.transform = 'scale(1.1)';
    aiButton.style.backgroundColor = 'var(--color-accent-light)';
  });
  
  aiButton.addEventListener('mouseleave', () => {
    aiButton.style.transform = 'scale(1)';
    aiButton.style.backgroundColor = 'var(--color-accent)';
  });
  
  // Add click handler to open AI panel
  aiButton.addEventListener('click', async () => {
    const { initAiPanel } = await import('../ai/AiPanel.js');
    const aiPanel = await initAiPanel();
    aiPanel.togglePanel(true);
  });
  
  appsContainer.appendChild(aiButton);
  
  // Add to DOM
  document.getElementById('app-root').appendChild(dockElement);
  
  // Adjust app-root padding to account for dock
  const appRoot = document.getElementById('app-root');
  appRoot.style.paddingBottom = '90px';
  
  // Listen for window minimized events
  window.addEventListener('window-minimized', (e) => {
    const { windowId } = e.detail;
    highlightDockIcon(windowId);
  });
  
  // Add dock magnification effect
  addDockMagnificationEffect();
}

/**
 * Create a dock icon for an app
 * @param {Object} app - App object
 * @returns {HTMLElement} Dock icon element
 */
function createDockIcon(app) {
  const iconEl = document.createElement('button');
  iconEl.className = 'dock-icon';
  iconEl.dataset.appId = app.id;
  iconEl.setAttribute('aria-label', app.title);
  iconEl.style.display = 'flex';
  iconEl.style.alignItems = 'center';
  iconEl.style.justifyContent = 'center';
  iconEl.style.width = '48px';
  iconEl.style.height = '48px';
  iconEl.style.borderRadius = '12px';
  iconEl.style.border = 'none';
  iconEl.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  iconEl.style.cursor = 'pointer';
  iconEl.style.transition = 'transform 0.2s ease, background-color 0.2s ease';
  iconEl.style.position = 'relative';
  
  // Add icon image if available
  if (app.icon) {
    const imgEl = document.createElement('img');
    imgEl.src = app.icon;
    imgEl.alt = app.title;
    imgEl.style.width = '32px';
    imgEl.style.height = '32px';
    iconEl.appendChild(imgEl);
  } else {
    // Use first letter of app title as fallback
    iconEl.textContent = app.title.charAt(0).toUpperCase();
    iconEl.style.fontSize = 'var(--font-size-lg)';
    iconEl.style.fontWeight = 'bold';
    iconEl.style.color = 'var(--color-text-primary)';
  }
  
  // Add indicator dot for running apps
  const indicator = document.createElement('div');
  indicator.className = 'dock-indicator';
  indicator.style.position = 'absolute';
  indicator.style.bottom = '-5px';
  indicator.style.left = '50%';
  indicator.style.transform = 'translateX(-50%)';
  indicator.style.width = '4px';
  indicator.style.height = '4px';
  indicator.style.borderRadius = '50%';
  indicator.style.backgroundColor = 'white';
  indicator.style.opacity = '0';
  indicator.style.transition = 'opacity 0.2s ease';
  iconEl.appendChild(indicator);
  
  // Add hover effect
  iconEl.addEventListener('mouseenter', () => {
    iconEl.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  });
  
  iconEl.addEventListener('mouseleave', () => {
    iconEl.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  });
  
  // Add click handler to launch app
  iconEl.addEventListener('click', async () => {
    launchApp(app);
  });
  
  // Add tooltip with app name
  const tooltip = document.createElement('div');
  tooltip.className = 'dock-tooltip';
  tooltip.textContent = app.title;
  tooltip.style.position = 'absolute';
  tooltip.style.top = '-30px';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translateX(-50%)';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  tooltip.style.color = 'white';
  tooltip.style.padding = '4px 8px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = 'var(--font-size-sm)';
  tooltip.style.whiteSpace = 'nowrap';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 0.2s ease';
  tooltip.style.pointerEvents = 'none';
  iconEl.appendChild(tooltip);
  
  iconEl.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
  });
  
  iconEl.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
  
  return iconEl;
}

/**
 * Add magnification effect to dock icons
 */
function addDockMagnificationEffect() {
  const dock = document.getElementById('dock');
  const icons = dock.querySelectorAll('.dock-icon, .dock-ai-button');
  
  dock.addEventListener('mousemove', (e) => {
    const dockRect = dock.getBoundingClientRect();
    const mouseX = e.clientX;
    
    icons.forEach(icon => {
      const iconRect = icon.getBoundingClientRect();
      const iconX = iconRect.left + iconRect.width / 2;
      const distance = Math.abs(mouseX - iconX);
      const maxDistance = 100;
      
      if (distance < maxDistance) {
        const scale = 1 + 0.3 * (1 - distance / maxDistance);
        icon.style.transform = `scale(${scale})`;
      } else {
        icon.style.transform = 'scale(1)';
      }
    });
  });
  
  dock.addEventListener('mouseleave', () => {
    icons.forEach(icon => {
      icon.style.transform = 'scale(1)';
    });
  });
}

/**
 * Launch an app
 * @param {Object} app - App object
 */
async function launchApp(app) {
  console.log(`Launching app: ${app.id}`);
  
  // Import WindowManager
  const { getWindowManager } = await import('./WindowManager.js');
  const windowManager = await getWindowManager();
  
  // Check if app is already running
  const existingWindow = Array.from(runningApps.values()).find(
    appData => appData.app.id === app.id
  );
  
  if (existingWindow) {
    // Restore window if minimized
    if (existingWindow.window.isMinimized()) {
      existingWindow.window.restore();
    }
    // Focus window
    existingWindow.window.focus();
    return;
  }
  
  // Show indicator dot
  const iconEl = document.querySelector(`.dock-icon[data-app-id="${app.id}"]`);
  if (iconEl) {
    const indicator = iconEl.querySelector('.dock-indicator');
    if (indicator) {
      indicator.style.opacity = '1';
    }
  }
  
  // Launch app based on ID
  switch (app.id) {
    case 'finder':
      const { initFileBrowser } = await import('../apps/file-browser/app.js');
      initFileBrowser(windowManager);
      break;
    case 'calculator':
      const { initCalculator } = await import('../apps/calculator/app.js');
      initCalculator(windowManager);
      break;
    case 'text-editor':
      const { initTextEditor } = await import('../apps/text-editor/app.js');
      initTextEditor(windowManager);
      break;
    case 'browser':
      const { initBrowser } = await import('../apps/browser/app.js');
      initBrowser(windowManager);
      break;
    case 'terminal':
      const { initTerminal } = await import('../apps/terminal/app.js');
      initTerminal(windowManager);
      break;
    case 'photos':
      const { initPhotos } = await import('../apps/photos/app.js');
      initPhotos(windowManager);
      break;
    case 'settings':
      const { initSettings } = await import('../apps/settings/app.js');
      initSettings(windowManager);
      break;
    default:
      console.warn(`Unknown app: ${app.id}`);
  }
}

/**
 * Add an app to the dock
 * @param {Object} app - App object
 * @param {Object} window - Window object
 * @returns {HTMLElement} Dock icon element
 */
function addApp(app, window) {
  // Check if app is already in dock (pinned)
  const existingIcon = document.querySelector(`.dock-icon[data-app-id="${app.id}"]`);
  
  if (existingIcon) {
    // Show indicator dot
    const indicator = existingIcon.querySelector('.dock-indicator');
    if (indicator) {
      indicator.style.opacity = '1';
    }
    
    // Store in running apps
    runningApps.set(window.id, {
      app,
      window,
      element: existingIcon,
    });
    
    return existingIcon;
  }
  
  // If app is not pinned, create a temporary dock icon
  const appsContainer = dockElement.querySelector('.dock-apps');
  const separator = dockElement.querySelector('.dock-separator');
  
  const iconEl = createDockIcon(app);
  iconEl.dataset.windowId = window.id;
  
  // Show indicator dot
  const indicator = iconEl.querySelector('.dock-indicator');
  if (indicator) {
    indicator.style.opacity = '1';
  }
  
  // Insert before separator
  appsContainer.insertBefore(iconEl, separator);
  
  // Store in running apps
  runningApps.set(window.id, {
    app,
    window,
    element: iconEl,
  });
  
  return iconEl;
}

/**
 * Remove an app from the dock
 * @param {string} windowId - Window ID
 * @returns {boolean} Success
 */
function removeApp(windowId) {
  // Check if app is in running apps
  if (!runningApps.has(windowId)) {
    return false;
  }
  
  // Get app data
  const appData = runningApps.get(windowId);
  
  // Check if app is pinned
  const isPinned = pinnedApps.some(app => app.id === appData.app.id);
  
  if (isPinned) {
    // Hide indicator dot
    const indicator = appData.element.querySelector('.dock-indicator');
    if (indicator) {
      indicator.style.opacity = '0';
    }
  } else {
    // Remove element from DOM
    appData.element.remove();
  }
  
  // Remove from running apps
  runningApps.delete(windowId);
  
  return true;
}

/**
 * Update an app in the dock
 * @param {string} windowId - Window ID
 * @param {Object} updates - Updates to apply
 * @returns {boolean} Success
 */
function updateApp(windowId, updates) {
  // Check if app is in running apps
  if (!runningApps.has(windowId)) {
    return false;
  }
  
  // Get app data
  const appData = runningApps.get(windowId);
  
  // Update title if provided (affects tooltip)
  if (updates.title) {
    const tooltip = appData.element.querySelector('.dock-tooltip');
    if (tooltip) {
      tooltip.textContent = updates.title;
    }
  }
  
  // Update icon if provided
  if (updates.icon) {
    const imgEl = appData.element.querySelector('img');
    if (imgEl) {
      imgEl.src = updates.icon;
      imgEl.alt = updates.title || appData.app.title;
    }
  }
  
  return true;
}

/**
 * Highlight a dock icon for a minimized window
 * @param {string} windowId - Window ID
 */
function highlightDockIcon(windowId) {
  // Check if app is in running apps
  if (!runningApps.has(windowId)) {
    return;
  }
  
  // Get app data
  const appData = runningApps.get(windowId);
  
  // Add bounce animation
  appData.element.style.animation = 'dock-icon-bounce 0.5s ease 3';
  
  // Add animation keyframes if not already added
  if (!document.getElementById('dock-icon-bounce-animation')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'dock-icon-bounce-animation';
    styleEl.textContent = `
      @keyframes dock-icon-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  // Remove animation after it completes
  setTimeout(() => {
    appData.element.style.animation = '';
  }, 1500);
}

/**
 * Get all running apps
 * @returns {Map} Map of running apps
 */
function getRunningApps() {
  return runningApps;
}