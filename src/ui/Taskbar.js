/**
 * Taskbar
 * Running apps UI, minimize/maximize
 */

// Taskbar state
let taskbarElement = null;
let runningApps = new Map();

/**
 * Initialize the taskbar
 * @returns {Object} Taskbar API
 */
export async function initTaskbar() {
  console.log('Initializing taskbar...');
  
  // Create taskbar element
  createTaskbarElement();
  
  // Return public API
  return {
    addApp,
    removeApp,
    updateApp,
    getRunningApps,
    highlightTaskbarItem,
  };
}

/**
 * Create taskbar element
 */
function createTaskbarElement() {
  // Check if taskbar already exists
  taskbarElement = document.getElementById('taskbar');
  if (taskbarElement) return;
  
  // Create taskbar container
  taskbarElement = document.createElement('div');
  taskbarElement.id = 'taskbar';
  taskbarElement.className = 'taskbar';
  taskbarElement.style.position = 'absolute';
  taskbarElement.style.bottom = '0';
  taskbarElement.style.left = '0';
  taskbarElement.style.width = '100%';
  taskbarElement.style.height = 'var(--taskbar-height)';
  taskbarElement.style.backgroundColor = 'var(--color-bg-secondary)';
  taskbarElement.style.borderTop = 'var(--border-width) solid var(--border-color)';
  taskbarElement.style.display = 'flex';
  taskbarElement.style.alignItems = 'center';
  taskbarElement.style.padding = '0 var(--spacing-md)';
  taskbarElement.style.zIndex = 'var(--z-index-fixed)';
  
  // Create start button
  const startButton = document.createElement('button');
  startButton.className = 'taskbar-start-button';
  startButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="8" height="8" rx="1" fill="var(--color-accent)" />
      <rect x="13" y="3" width="8" height="8" rx="1" fill="var(--color-accent)" opacity="0.8" />
      <rect x="3" y="13" width="8" height="8" rx="1" fill="var(--color-accent)" opacity="0.8" />
      <rect x="13" y="13" width="8" height="8" rx="1" fill="var(--color-accent)" opacity="0.6" />
    </svg>
  `;
  startButton.style.display = 'flex';
  startButton.style.alignItems = 'center';
  startButton.style.justifyContent = 'center';
  startButton.style.width = '40px';
  startButton.style.height = '40px';
  startButton.style.borderRadius = 'var(--border-radius-md)';
  startButton.style.border = 'none';
  startButton.style.backgroundColor = 'transparent';
  startButton.style.cursor = 'pointer';
  startButton.style.marginRight = 'var(--spacing-md)';
  startButton.style.transition = 'background-color var(--transition-fast)';
  
  // Add hover effect
  startButton.addEventListener('mouseenter', () => {
    startButton.style.backgroundColor = 'var(--color-bg-tertiary)';
  });
  
  startButton.addEventListener('mouseleave', () => {
    startButton.style.backgroundColor = 'transparent';
  });
  
  // Add click handler to toggle app launcher
  startButton.addEventListener('click', async () => {
    const { initAppLauncher } = await import('./AppLauncher.js');
    const appLauncher = await initAppLauncher();
    appLauncher.toggleLauncher();
  });
  
  taskbarElement.appendChild(startButton);
  
  // Create running apps container
  const appsContainer = document.createElement('div');
  appsContainer.className = 'taskbar-apps';
  appsContainer.style.display = 'flex';
  appsContainer.style.alignItems = 'center';
  appsContainer.style.gap = 'var(--spacing-xs)';
  appsContainer.style.flex = '1';
  appsContainer.style.height = '100%';
  appsContainer.style.overflow = 'hidden';
  taskbarElement.appendChild(appsContainer);
  
  // Create system tray
  const systemTray = document.createElement('div');
  systemTray.className = 'taskbar-system-tray';
  systemTray.style.display = 'flex';
  systemTray.style.alignItems = 'center';
  systemTray.style.gap = 'var(--spacing-md)';
  systemTray.style.marginLeft = 'auto';
  
  // Add AI button
  const aiButton = document.createElement('button');
  aiButton.className = 'taskbar-ai-button';
  aiButton.setAttribute('aria-label', 'AI Assistant');
  aiButton.style.display = 'flex';
  aiButton.style.alignItems = 'center';
  aiButton.style.justifyContent = 'center';
  aiButton.style.width = '36px';
  aiButton.style.height = '36px';
  aiButton.style.borderRadius = 'var(--border-radius-md)';
  aiButton.style.border = 'none';
  aiButton.style.backgroundColor = 'var(--color-accent)';
  aiButton.style.color = 'white';
  aiButton.style.cursor = 'pointer';
  aiButton.style.transition = 'background-color var(--transition-fast)';
  
  // Add AI icon (Heroicons)
  aiButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
      <circle cx="7.5" cy="14.5" r="1.5"></circle>
      <circle cx="16.5" cy="14.5" r="1.5"></circle>
    </svg>
  `;
  
  // Add hover effect
  aiButton.addEventListener('mouseenter', () => {
    aiButton.style.backgroundColor = 'var(--color-accent-light)';
  });
  
  aiButton.addEventListener('mouseleave', () => {
    aiButton.style.backgroundColor = 'var(--color-accent)';
  });
  
  // Add click handler to open AI panel
  aiButton.addEventListener('click', async () => {
    const { initAiPanel } = await import('../ai/AiPanel.js');
    const aiPanel = await initAiPanel();
    aiPanel.togglePanel(true);
  });
  
  systemTray.appendChild(aiButton);
  
  taskbarElement.appendChild(systemTray);
  
  // Add to DOM
  document.getElementById('app-root').appendChild(taskbarElement);
  
  // Adjust app-root padding to account for taskbar
  const appRoot = document.getElementById('app-root');
  appRoot.style.paddingBottom = 'var(--taskbar-height)';
  
  // Listen for window minimized events
  window.addEventListener('window-minimized', (e) => {
    const { windowId } = e.detail;
    highlightTaskbarItem(windowId);
  });
}

/**
 * Add an app to the taskbar
 * @param {Object} app - App object
 * @param {Object} window - Window object
 * @returns {HTMLElement} Taskbar item element
 */
function addApp(app, window) {
  // Check if taskbar exists
  if (!taskbarElement) return null;
  
  // Get apps container
  const appsContainer = taskbarElement.querySelector('.taskbar-apps');
  if (!appsContainer) return null;
  
  // Check if app is already in taskbar
  const existingItem = Array.from(appsContainer.children).find(
    item => item.dataset.windowId === window.id
  );
  
  if (existingItem) {
    return existingItem;
  }
  
  // Create taskbar item
  const itemEl = document.createElement('div');
  itemEl.className = 'taskbar-item';
  itemEl.dataset.appId = app.id;
  itemEl.dataset.windowId = window.id;
  itemEl.style.height = 'calc(100% - 8px)';
  itemEl.style.display = 'flex';
  itemEl.style.alignItems = 'center';
  itemEl.style.padding = '0 var(--spacing-sm)';
  itemEl.style.borderRadius = 'var(--border-radius-sm)';
  itemEl.style.backgroundColor = 'transparent';
  itemEl.style.cursor = 'pointer';
  itemEl.style.transition = 'all var(--transition-fast)';
  itemEl.style.borderBottom = '2px solid transparent';
  
  // Add hover effect
  itemEl.addEventListener('mouseenter', () => {
    itemEl.style.backgroundColor = 'var(--color-bg-tertiary)';
  });
  
  itemEl.addEventListener('mouseleave', () => {
    if (!window.isMinimized()) {
      itemEl.style.backgroundColor = 'transparent';
    }
  });
  
  // Add click handler
  itemEl.addEventListener('click', () => {
    if (window.isMinimized()) {
      window.restore();
    } else {
      window.minimize();
    }
  });
  
  // Add app icon
  const iconEl = document.createElement('div');
  iconEl.className = 'taskbar-item-icon';
  iconEl.style.width = '24px';
  iconEl.style.height = '24px';
  iconEl.style.marginRight = 'var(--spacing-xs)';
  iconEl.style.backgroundColor = 'var(--color-bg-tertiary)';
  iconEl.style.borderRadius = 'var(--border-radius-sm)';
  iconEl.style.display = 'flex';
  iconEl.style.alignItems = 'center';
  iconEl.style.justifyContent = 'center';
  
  // Add icon image if available
  if (app.icon) {
    const imgEl = document.createElement('img');
    imgEl.src = app.icon;
    imgEl.alt = app.title;
    imgEl.style.width = '16px';
    imgEl.style.height = '16px';
    iconEl.appendChild(imgEl);
  } else {
    // Use first letter of app title as fallback
    iconEl.textContent = app.title.charAt(0).toUpperCase();
    iconEl.style.fontSize = 'var(--font-size-sm)';
    iconEl.style.fontWeight = 'bold';
    iconEl.style.color = 'var(--color-text-primary)';
  }
  
  itemEl.appendChild(iconEl);
  
  // Add app title
  const titleEl = document.createElement('div');
  titleEl.className = 'taskbar-item-title';
  titleEl.textContent = app.title;
  titleEl.style.fontSize = 'var(--font-size-sm)';
  titleEl.style.fontWeight = 'var(--font-weight-medium)';
  titleEl.style.whiteSpace = 'nowrap';
  titleEl.style.overflow = 'hidden';
  titleEl.style.textOverflow = 'ellipsis';
  titleEl.style.maxWidth = '100px';
  itemEl.appendChild(titleEl);
  
  // Add to apps container
  appsContainer.appendChild(itemEl);
  
  // Store in running apps
  runningApps.set(window.id, {
    app,
    window,
    element: itemEl,
  });
  
  // Update active state
  updateActiveState(window.id, true);
  
  return itemEl;
}

/**
 * Remove an app from the taskbar
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
  
  // Remove element from DOM
  appData.element.remove();
  
  // Remove from running apps
  runningApps.delete(windowId);
  
  return true;
}

/**
 * Update an app in the taskbar
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
  
  // Update title if provided
  if (updates.title) {
    const titleEl = appData.element.querySelector('.taskbar-item-title');
    if (titleEl) {
      titleEl.textContent = updates.title;
    }
  }
  
  // Update icon if provided
  if (updates.icon) {
    const iconEl = appData.element.querySelector('.taskbar-item-icon');
    if (iconEl) {
      iconEl.innerHTML = '';
      
      const imgEl = document.createElement('img');
      imgEl.src = updates.icon;
      imgEl.alt = updates.title || appData.app.title;
      imgEl.style.width = '16px';
      imgEl.style.height = '16px';
      iconEl.appendChild(imgEl);
    }
  }
  
  // Update active state if provided
  if (updates.active !== undefined) {
    updateActiveState(windowId, updates.active);
  }
  
  return true;
}

/**
 * Update active state of a taskbar item
 * @param {string} windowId - Window ID
 * @param {boolean} isActive - Whether the window is active
 */
function updateActiveState(windowId, isActive) {
  // Check if app is in running apps
  if (!runningApps.has(windowId)) {
    return;
  }
  
  // Get app data
  const appData = runningApps.get(windowId);
  
  // Update element style
  if (isActive) {
    appData.element.style.backgroundColor = 'var(--color-bg-tertiary)';
    appData.element.style.borderBottom = '2px solid var(--color-accent)';
  } else {
    appData.element.style.backgroundColor = 'transparent';
    appData.element.style.borderBottom = '2px solid transparent';
  }
}

/**
 * Highlight a taskbar item for a minimized window
 * @param {string} windowId - Window ID
 */
function highlightTaskbarItem(windowId) {
  // Check if app is in running apps
  if (!runningApps.has(windowId)) {
    return;
  }
  
  // Get app data
  const appData = runningApps.get(windowId);
  
  // Add pulsing effect
  appData.element.style.backgroundColor = 'var(--color-bg-tertiary)';
  appData.element.style.animation = 'taskbar-item-pulse 2s infinite';
  
  // Add animation keyframes if not already added
  if (!document.getElementById('taskbar-item-pulse-animation')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'taskbar-item-pulse-animation';
    styleEl.textContent = `
      @keyframes taskbar-item-pulse {
        0%, 100% { background-color: var(--color-bg-tertiary); }
        50% { background-color: var(--color-accent-light); }
      }
    `;
    document.head.appendChild(styleEl);
  }
}

/**
 * Get all running apps
 * @returns {Map} Map of running apps
 */
function getRunningApps() {
  return runningApps;
}