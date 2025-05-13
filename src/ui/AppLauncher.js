/**
 * App Launcher
 * Grid or start menu of available apps
 */

// Import Heroicons
import { 
  CalculatorIcon, 
  DocumentTextIcon, 
  FolderIcon, 
  CommandLineIcon, 
  Cog6ToothIcon, 
  GlobeAltIcon, 
  ListBulletIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhotoIcon,
  MusicalNoteIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid';

// App registry
const appRegistry = new Map();

// App launcher state
let isVisible = false;
let launcherElement = null;

// Icon map for apps
const iconMap = new Map();

/**
 * Initialize the app launcher
 * @param {Array} initialApps - Initial apps to load
 * @returns {Object} App launcher API
 */
export async function initAppLauncher(initialApps = []) {
  console.log('Initializing app launcher...');
  
  // Initialize icon map
  initIconMap();
  
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
 * Initialize the icon map with Heroicons for different app types
 */
function initIconMap() {
  // Map app IDs to Heroicons
  iconMap.set('calculator', CalculatorIcon);
  iconMap.set('text-editor', DocumentTextIcon);
  iconMap.set('browser', GlobeAltIcon);
  iconMap.set('todo-list', ClipboardDocumentCheckIcon);
  iconMap.set('file-browser', FolderIcon);
  iconMap.set('settings', Cog6ToothIcon);
  iconMap.set('terminal', CommandLineIcon);
  iconMap.set('calendar', CalendarIcon);
  iconMap.set('mail', EnvelopeIcon);
  iconMap.set('photos', PhotoIcon);
  iconMap.set('music', MusicalNoteIcon);
  iconMap.set('chat', ChatBubbleLeftRightIcon);
  iconMap.set('ai', SparklesIcon);
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
  headerEl.style.display = 'flex';
  headerEl.style.justifyContent = 'space-between';
  headerEl.style.alignItems = 'center';
  headerEl.style.marginBottom = 'var(--spacing-lg)';
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'app-launcher-close';
  closeButton.setAttribute('aria-label', 'Close app launcher');
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.style.padding = 'var(--spacing-sm)';
  closeButton.style.marginLeft = 'var(--spacing-md)';
  closeButton.style.borderRadius = 'var(--border-radius-full)';
  closeButton.style.display = 'flex';
  closeButton.style.alignItems = 'center';
  closeButton.style.justifyContent = 'center';
  closeButton.style.color = 'var(--color-text-primary)';
  
  // Add close icon (X) using Heroicons
  closeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>
  `;
  
  // Add hover effect
  closeButton.addEventListener('mouseenter', () => {
    closeButton.style.backgroundColor = 'var(--color-bg-tertiary)';
  });
  
  closeButton.addEventListener('mouseleave', () => {
    closeButton.style.backgroundColor = 'transparent';
  });
  
  // Add click handler
  closeButton.addEventListener('click', () => {
    hideLauncher();
  });
  
  // Create search container
  const searchContainer = document.createElement('div');
  searchContainer.style.flex = '1';
  searchContainer.style.position = 'relative';
  searchContainer.style.display = 'flex';
  searchContainer.style.alignItems = 'center';
  
  // Add search icon using Heroicons
  const searchIconEl = document.createElement('div');
  searchIconEl.className = 'app-launcher-search-icon';
  searchIconEl.style.position = 'absolute';
  searchIconEl.style.left = 'var(--spacing-md)';
  searchIconEl.style.pointerEvents = 'none';
  searchIconEl.style.color = 'var(--color-text-secondary)';
  
  // Add search icon
  searchIconEl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
    </svg>
  `;
  searchContainer.appendChild(searchIconEl);
  
  // Add search input
  const searchEl = document.createElement('input');
  searchEl.type = 'text';
  searchEl.placeholder = 'Search apps...';
  searchEl.className = 'app-launcher-search';
  searchEl.style.width = '100%';
  searchEl.style.padding = 'var(--spacing-md)';
  searchEl.style.paddingLeft = 'calc(var(--spacing-md) * 2 + 20px)'; // Make room for the icon
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
  
  searchContainer.appendChild(searchEl);
  headerEl.appendChild(searchContainer);
  headerEl.appendChild(closeButton);
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
    // For now, we'll return mock data with Heroicons SVG icons
    
    // Define app-specific icons using Heroicons
    const appIcons = {
      'calculator': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M6.32 1.827a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93zM7.5 11.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H8.25zm-.75 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75H8.25zm1.748-6a.75.75 0 01.75-.75h.007a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.007a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-.007zm-.75 3a.75.75 0 01.75-.75h.007a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.007a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75h-.007zm1.754-6a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-.008zm-.75 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75h-.008zm1.748-6a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-.008zm-8.25-6A.75.75 0 018.25 6h7.5a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-.75zm9 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75h-.008zM15.75 16.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
      </svg>`,
      'text-editor': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
      </svg>`,
      'browser': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
      </svg>`,
      'terminal': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
      </svg>`,
      'photos': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
      </svg>`,
      'settings': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
      </svg>`,
      'finder': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
      </svg>`,
      'ai': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 7.5h-9v9h9v-9z" />
        <path fill-rule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clip-rule="evenodd" />
      </svg>`
    };
    
    // Default icon for apps without specific icons
    const defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
    </svg>`;
    
    return {
      title: appId.charAt(0).toUpperCase() + appId.slice(1).replace(/-/g, ' '),
      description: `${appId} application`,
      icon: appIcons[appId] || defaultIcon,
      version: '1.0.0',
      author: 'Kosmo OS',
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
  iconEl.style.color = 'var(--color-text-primary)';
  
  // Use appropriate icon based on app ID
  if (app.id === 'calculator') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path fill-rule="evenodd" d="M6.32 1.827a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93zM7.5 11.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H8.25zm-.75 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75H8.25zm1.748-6a.75.75 0 01.75-.75h.007a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.007a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-.007zm-.75 3a.75.75 0 01.75-.75h.007a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.007a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75h-.007zm1.754-6a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-.008zm-.75 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75h-.008zm1.748-6a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 1.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-.008zm-8.25-6A.75.75 0 018.25 6h7.5a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-.75zm9 9a.75.75 0 00-.75.75v.75c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.75z" clip-rule="evenodd" />
      </svg>
    `;
  } else if (app.id === 'text-editor') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
      </svg>
    `;
  } else if (app.id === 'file-browser') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
      </svg>
    `;
  } else if (app.id === 'terminal') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
      </svg>
    `;
  } else if (app.id === 'settings') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
      </svg>
    `;
  } else if (app.id === 'browser') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
      </svg>
    `;
  } else if (app.id === 'todo-list') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
        <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
      </svg>
    `;
  } else if (app.id === 'ai') {
    iconEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path fill-rule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clip-rule="evenodd" />
      </svg>
    `;
  } else if (app.icon) {
    // Check if icon is an SVG string
    if (typeof app.icon === 'string' && app.icon.trim().startsWith('<svg')) {
      iconEl.innerHTML = app.icon;
      // Style the SVG
      const svgEl = iconEl.querySelector('svg');
      if (svgEl) {
        svgEl.style.width = '40px';
        svgEl.style.height = '40px';
      }
    } else {
      // Handle image URL
      const imgEl = document.createElement('img');
      imgEl.src = app.icon;
      imgEl.alt = app.title;
      imgEl.style.width = '48px';
      imgEl.style.height = '48px';
      iconEl.appendChild(imgEl);
    }
  } else {
    // Use first letter of app title as fallback
    iconEl.textContent = app.title.charAt(0).toUpperCase();
    iconEl.style.fontSize = '32px';
    iconEl.style.fontWeight = 'bold';
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