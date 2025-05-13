/**
 * Top Navigation Bar
 * Contains clock, theme switcher, and system controls
 */

// TopNav state
let topNavElement = null;

/**
 * Initialize the top navigation bar
 * @returns {Object} TopNav API
 */
export async function initTopNav() {
  console.log('Initializing top navigation bar...');
  
  // Create top nav element
  createTopNavElement();
  
  // Return public API
  return {
    updateClock,
    toggleThemeMenu,
  };
}

/**
 * Create top navigation bar element
 */
function createTopNavElement() {
  // Check if top nav already exists
  topNavElement = document.getElementById('top-nav');
  if (topNavElement) return;
  
  // Create top nav container
  topNavElement = document.createElement('div');
  topNavElement.id = 'top-nav';
  topNavElement.className = 'top-nav';
  topNavElement.style.position = 'absolute';
  topNavElement.style.top = '0';
  topNavElement.style.left = '0';
  topNavElement.style.width = '100%';
  topNavElement.style.height = '40px';
  topNavElement.style.backgroundColor = 'var(--color-bg-secondary)';
  topNavElement.style.borderBottom = 'var(--border-width) solid var(--border-color)';
  topNavElement.style.display = 'flex';
  topNavElement.style.alignItems = 'center';
  topNavElement.style.padding = '0 var(--spacing-md)';
  topNavElement.style.zIndex = 'var(--z-index-fixed)';
  
  // Create left section
  const leftSection = document.createElement('div');
  leftSection.className = 'top-nav-left';
  leftSection.style.display = 'flex';
  leftSection.style.alignItems = 'center';
  leftSection.style.gap = 'var(--spacing-md)';
  topNavElement.appendChild(leftSection);
  
  // Create center section with clock
  const centerSection = document.createElement('div');
  centerSection.className = 'top-nav-center';
  centerSection.style.display = 'flex';
  centerSection.style.alignItems = 'center';
  centerSection.style.justifyContent = 'center';
  centerSection.style.flex = '1';
  
  // Add clock
  const clock = document.createElement('div');
  clock.id = 'top-nav-clock';
  clock.className = 'top-nav-clock';
  clock.style.fontSize = 'var(--font-size-md)';
  clock.style.fontWeight = 'var(--font-weight-medium)';
  clock.style.color = 'var(--color-text-primary)';
  centerSection.appendChild(clock);
  
  // Update clock
  updateClock();
  setInterval(updateClock, 1000);
  
  topNavElement.appendChild(centerSection);
  
  // Create right section with settings
  const rightSection = document.createElement('div');
  rightSection.className = 'top-nav-right';
  rightSection.style.display = 'flex';
  rightSection.style.alignItems = 'center';
  rightSection.style.gap = 'var(--spacing-md)';
  
  // Add settings button
  const settingsButton = document.createElement('button');
  settingsButton.className = 'top-nav-settings-button';
  settingsButton.setAttribute('aria-label', 'Settings');
  settingsButton.style.display = 'flex';
  settingsButton.style.alignItems = 'center';
  settingsButton.style.justifyContent = 'center';
  settingsButton.style.width = '32px';
  settingsButton.style.height = '32px';
  settingsButton.style.borderRadius = 'var(--border-radius-md)';
  settingsButton.style.border = 'none';
  settingsButton.style.backgroundColor = 'transparent';
  settingsButton.style.cursor = 'pointer';
  settingsButton.style.transition = 'background-color var(--transition-fast)';
  
  // Add settings icon (Heroicons)
  settingsButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  `;
  
  // Add hover effect
  settingsButton.addEventListener('mouseenter', () => {
    settingsButton.style.backgroundColor = 'var(--color-bg-tertiary)';
  });
  
  settingsButton.addEventListener('mouseleave', () => {
    settingsButton.style.backgroundColor = 'transparent';
  });
  
  // Add click handler to toggle theme menu
  settingsButton.addEventListener('click', () => {
    toggleThemeMenu();
  });
  
  rightSection.appendChild(settingsButton);
  topNavElement.appendChild(rightSection);
  
  // Create theme menu (hidden by default)
  createThemeMenu();
  
  // Add to DOM
  document.getElementById('app-root').appendChild(topNavElement);
  
  // Adjust app-root padding to account for top nav
  const appRoot = document.getElementById('app-root');
  appRoot.style.paddingTop = '40px';
}

/**
 * Create theme menu
 */
function createThemeMenu() {
  // Check if theme menu already exists
  let themeMenu = document.getElementById('theme-menu');
  if (themeMenu) return;
  
  // Create theme menu
  themeMenu = document.createElement('div');
  themeMenu.id = 'theme-menu';
  themeMenu.className = 'theme-menu';
  themeMenu.style.position = 'absolute';
  themeMenu.style.top = '45px';
  themeMenu.style.right = '10px';
  themeMenu.style.width = '200px';
  themeMenu.style.backgroundColor = 'var(--color-bg-primary)';
  themeMenu.style.borderRadius = 'var(--border-radius-md)';
  themeMenu.style.boxShadow = 'var(--shadow-lg)';
  themeMenu.style.padding = 'var(--spacing-md)';
  themeMenu.style.display = 'none';
  themeMenu.style.flexDirection = 'column';
  themeMenu.style.gap = 'var(--spacing-sm)';
  themeMenu.style.zIndex = 'var(--z-index-dropdown)';
  
  // Add theme options
  const themes = [
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'sepia', name: 'Sepia' }
  ];
  
  // Add title
  const title = document.createElement('div');
  title.textContent = 'Theme';
  title.style.fontWeight = 'var(--font-weight-bold)';
  title.style.marginBottom = 'var(--spacing-sm)';
  title.style.color = 'var(--color-text-primary)';
  themeMenu.appendChild(title);
  
  // Add theme options
  themes.forEach(theme => {
    const option = document.createElement('button');
    option.className = 'theme-option';
    option.dataset.theme = theme.id;
    option.style.display = 'flex';
    option.style.alignItems = 'center';
    option.style.gap = 'var(--spacing-sm)';
    option.style.width = '100%';
    option.style.padding = 'var(--spacing-sm)';
    option.style.border = 'none';
    option.style.borderRadius = 'var(--border-radius-sm)';
    option.style.backgroundColor = 'transparent';
    option.style.cursor = 'pointer';
    option.style.textAlign = 'left';
    option.style.color = 'var(--color-text-primary)';
    
    // Add color indicator
    const colorIndicator = document.createElement('div');
    colorIndicator.style.width = '16px';
    colorIndicator.style.height = '16px';
    colorIndicator.style.borderRadius = '50%';
    
    // Set color based on theme
    if (theme.id === 'light') {
      colorIndicator.style.backgroundColor = '#ffffff';
      colorIndicator.style.border = '1px solid #e9e9eb';
    } else if (theme.id === 'dark') {
      colorIndicator.style.backgroundColor = '#1d1d1f';
    } else if (theme.id === 'sepia') {
      colorIndicator.style.backgroundColor = '#f9f5eb';
      colorIndicator.style.border = '1px solid #e6dcc6';
    }
    
    option.appendChild(colorIndicator);
    
    // Add theme name
    const themeName = document.createElement('span');
    themeName.textContent = theme.name;
    option.appendChild(themeName);
    
    // Add click handler
    option.addEventListener('click', async () => {
      // Import theme manager
      const { initTheme } = await import('./ThemeManager.js');
      const themeManager = await initTheme();
      
      // Set theme
      themeManager.setTheme(theme.id);
      
      // Hide menu
      toggleThemeMenu(false);
    });
    
    // Add hover effect
    option.addEventListener('mouseenter', () => {
      option.style.backgroundColor = 'var(--color-bg-tertiary)';
    });
    
    option.addEventListener('mouseleave', () => {
      option.style.backgroundColor = 'transparent';
    });
    
    themeMenu.appendChild(option);
  });
  
  // Add to DOM
  document.body.appendChild(themeMenu);
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (themeMenu.style.display === 'flex' && 
        !themeMenu.contains(e.target) && 
        !document.querySelector('.top-nav-settings-button').contains(e.target)) {
      toggleThemeMenu(false);
    }
  });
}

/**
 * Update the clock
 */
function updateClock() {
  const clockEl = document.getElementById('top-nav-clock');
  if (!clockEl) return;
  
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

/**
 * Toggle theme menu visibility
 * @param {boolean} [show] - Force show/hide
 */
function toggleThemeMenu(show) {
  const themeMenu = document.getElementById('theme-menu');
  if (!themeMenu) return;
  
  if (show === undefined) {
    // Toggle
    themeMenu.style.display = themeMenu.style.display === 'none' ? 'flex' : 'none';
  } else {
    // Force
    themeMenu.style.display = show ? 'flex' : 'none';
  }
}