/**
 * Taskbar
 * Running apps UI, minimize/maximize
 */
// Import Heroicons SVG paths
const ICON_PATHS = {
  calculator: 'M6.75 4.5A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75ZM18 6.75v10.5H6V6.75h12ZM7.5 12h.75v.75H7.5V12Zm1.5 0h.75v.75H9V12Zm1.5 0h.75v.75H10.5V12Zm1.5 0h.75v.75H12V12Zm1.5 0h.75v.75H13.5V12Zm1.5 0h.75v.75H15V12Zm1.5 0h.75v.75H16.5V12Zm-9 1.5h.75v.75H7.5v-.75Zm1.5 0h.75v.75H9v-.75Zm1.5 0h.75v.75H10.5v-.75Zm1.5 0h.75v.75H12v-.75Zm1.5 0h.75v.75H13.5v-.75Zm1.5 0h.75v.75H15v-.75Zm1.5 0h.75v.75H16.5v-.75Zm-9 1.5h.75v.75H7.5v-.75Zm1.5 0h.75v.75H9v-.75Zm1.5 0h.75v.75H10.5v-.75Zm1.5 0h.75v.75H12v-.75Zm1.5 0h.75v.75H13.5v-.75Zm1.5 0h.75v.75H15v-.75Zm1.5 0h.75v.75H16.5v-.75Z',
  'text-editor': 'M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z M12.971 1.816A.75.75 0 0 1 14.25 2.25v3.75a.376.376 0 0 0 .375.375H18a.75.75 0 0 1 .578 1.235l-1.5 1.5a.75.75 0 0 1-1.042.018l-.013-.012-3.75-3.75a.75.75 0 0 1-.301-.592V2.25a.75.75 0 0 1 .75-.75 .75.75 0 0 1 .25.316Z',
  'file-browser': 'M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z',
  terminal: 'M5.25 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3H5.25ZM6.75 7.5a.75.75 0 0 0 0 1.5h.75v6a.75.75 0 0 0 1.5 0v-6h.75a.75.75 0 0 0 0-1.5h-3Zm7.5 0a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z',
  settings: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  browser: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
  'todo-list': 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
  ai: 'M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm.38 3.597a3.3 3.3 0 0 1 3.298 3.298c0 1.826-1.472 3.298-3.298 3.298-.355 0-.71-.05-1.027-.152L9.3 13.128a3.286 3.286 0 0 1-3.286-3.286 3.3 3.3 0 0 1 3.298-3.298c.344 0 .644.05.984.152l1.067-1.066c.304-.102.664-.152 1.028-.152zm-5.96 10.386 2.115-2.114a4.87 4.87 0 0 0 1.38.203c.313 0 .67-.05.984-.102l2.116 2.113a8.332 8.332 0 0 1-3.098.593c-1.218 0-2.436-.203-3.497-.693zm10.335-1.42-2.114-2.115c.152-.406.203-.813.203-1.218 0-.508-.102-.914-.203-1.32l2.113-2.114c.996 1.066 1.624 2.487 1.624 4.04-.102 1.015-.628 1.927-1.624 2.725z'
};

// Taskbar state
let taskbarElement = null;
let runningApps = new Map();
let iconMap = new Map();

/**
 * Initialize the taskbar
 * @returns {Object} Taskbar API
 */
export async function initTaskbar() {
  console.log('Initializing taskbar...');
  
  // Create taskbar element
  createTaskbarElement();
  
  // Initialize icon map
  initIconMap();
  
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
  taskbarElement.style.bottom = '10px';
  taskbarElement.style.left = '50%';
  taskbarElement.style.transform = 'translateX(-50%)';
  taskbarElement.style.width = 'auto';
  taskbarElement.style.maxWidth = '80%';
  taskbarElement.style.height = 'var(--taskbar-height)';
  taskbarElement.style.backgroundColor = 'rgba(var(--color-bg-secondary-rgb), 0.8)';
  taskbarElement.style.backdropFilter = 'blur(10px)';
  taskbarElement.style.WebkitBackdropFilter = 'blur(10px)';
  taskbarElement.style.borderRadius = '18px';
  taskbarElement.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
  taskbarElement.style.display = 'flex';
  taskbarElement.style.alignItems = 'center';
  taskbarElement.style.justifyContent = 'center';
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
 * Initialize the icon map with Heroicons for different app types
 */
function initIconMap() {
  // Map app IDs to Heroicons SVG paths
  Object.keys(ICON_PATHS).forEach(key => {
    iconMap.set(key, ICON_PATHS[key]);
  });
  
  // Add any missing icons with defaults
  if (!iconMap.has('calendar')) iconMap.set('calendar', ICON_PATHS['calculator']);
  if (!iconMap.has('mail')) iconMap.set('mail', ICON_PATHS['calculator']);
  if (!iconMap.has('photos')) iconMap.set('photos', ICON_PATHS['calculator']);
  if (!iconMap.has('music')) iconMap.set('music', ICON_PATHS['calculator']);
  if (!iconMap.has('chat')) iconMap.set('chat', ICON_PATHS['calculator']);
  if (!iconMap.has('ai')) iconMap.set('ai', ICON_PATHS['ai']);
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
  itemEl.style.height = '40px';
  itemEl.style.width = '40px';
  itemEl.style.display = 'flex';
  itemEl.style.alignItems = 'center';
  itemEl.style.justifyContent = 'center';
  itemEl.style.margin = '0 var(--spacing-xs)';
  itemEl.style.borderRadius = '10px';
  itemEl.style.backgroundColor = 'rgba(var(--color-bg-tertiary-rgb), 0.8)';
  itemEl.style.cursor = 'pointer';
  itemEl.style.transition = 'all var(--transition-normal)';
  itemEl.style.transform = 'scale(1)';
  itemEl.style.position = 'relative';
  
  // Add hover effect
  itemEl.addEventListener('mouseenter', () => {
    itemEl.style.transform = 'scale(1.15)';
    itemEl.style.backgroundColor = 'rgba(var(--color-bg-tertiary-rgb), 0.9)';
  });
  
  itemEl.addEventListener('mouseleave', () => {
    itemEl.style.transform = 'scale(1)';
    if (!window.isMinimized()) {
      itemEl.style.backgroundColor = 'rgba(var(--color-bg-tertiary-rgb), 0.8)';
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
  iconEl.style.width = '32px';
  iconEl.style.height = '32px';
  iconEl.style.borderRadius = '8px';
  iconEl.style.display = 'flex';
  iconEl.style.alignItems = 'center';
  iconEl.style.justifyContent = 'center';
  
  // Use Heroicon if available in the map, otherwise use provided icon or fallback
  if (iconMap.has(app.id)) {
    // Use Heroicon SVG path from map
    const iconPath = iconMap.get(app.id);
    iconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="${iconPath}"></path></svg>`;
    iconEl.style.color = 'var(--color-text-primary)';
  } else if (app.icon) {
    // Use provided icon
    const imgEl = document.createElement('img');
    imgEl.src = app.icon;
    imgEl.alt = app.title;
    imgEl.style.width = '32px';
    imgEl.style.height = '32px';
    imgEl.style.borderRadius = '8px';
    iconEl.appendChild(imgEl);
  } else {
    // Use default icon as fallback
    const defaultPath = ICON_PATHS.calculator || 'M6.75 4.5A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75Z';
    iconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="${defaultPath}"></path></svg>`;
    iconEl.style.color = 'var(--color-text-primary)';
  }
  
  itemEl.appendChild(iconEl);
  
  // Add tooltip for app title
  itemEl.title = app.title;
  
  // Add indicator dot for running apps
  const indicatorEl = document.createElement('div');
  indicatorEl.className = 'taskbar-item-indicator';
  indicatorEl.style.position = 'absolute';
  indicatorEl.style.bottom = '-5px';
  indicatorEl.style.left = '50%';
  indicatorEl.style.transform = 'translateX(-50%)';
  indicatorEl.style.width = '4px';
  indicatorEl.style.height = '4px';
  indicatorEl.style.borderRadius = '50%';
  indicatorEl.style.backgroundColor = 'var(--color-accent)';
  indicatorEl.style.opacity = '0';
  itemEl.appendChild(indicatorEl);
  
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
  
  // Update indicator dot
  const indicatorEl = appData.element.querySelector('.taskbar-item-indicator');
  if (indicatorEl) {
    if (isActive) {
      indicatorEl.style.opacity = '1';
    } else {
      indicatorEl.style.opacity = '0.5';
    }
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
  
  // Add pulsing effect to the indicator dot
  const indicatorEl = appData.element.querySelector('.taskbar-item-indicator');
  if (indicatorEl) {
    indicatorEl.style.opacity = '1';
    indicatorEl.style.animation = 'taskbar-indicator-pulse 2s infinite';
  
    // Add animation keyframes if not already added
    if (!document.getElementById('taskbar-indicator-pulse-animation')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'taskbar-indicator-pulse-animation';
      styleEl.textContent = `
        @keyframes taskbar-indicator-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `;
      document.head.appendChild(styleEl);
    }
  }
}

/**
 * Get all running apps
 * @returns {Map} Map of running apps
 */
function getRunningApps() {
  return runningApps;
}