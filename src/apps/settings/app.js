/**
 * Settings App
 * Configure system settings and preferences
 */

// Import dependencies
import { getWindowManager } from '../../ui/WindowManager.js';
import { getThemeManager } from '../../ui/ThemeManager.js';
import { getI18n } from '../../i18n/index.js';

// Define icon SVG paths
const ICONS = {
  settings: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" /></svg>',
  sun: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" /></svg>',
  moon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" /></svg>',
  language: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.38 49.38 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 1 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.17 17.17 0 0 0 2.391-5.165 48.038 48.038 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 0 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z" clip-rule="evenodd" /></svg>',
  bell: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" /></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" /></svg>'
};

/**
 * Launch the settings app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching settings app...');
  
  // Create window
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Settings',
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
  });
  
  // Get dependencies
  const themeManager = getThemeManager();
  const i18n = getI18n();
  
  // Initialize settings in window content
  await init({ container: window.content, themeManager, i18n });
  
  return window;
}

/**
 * Initialize the settings app
 * @param {Object} params - App initialization parameters
 * @param {HTMLElement} params.container - Container element
 * @param {Object} params.themeManager - Theme manager instance
 * @param {Object} params.i18n - Internationalization instance
 * @returns {Object} App API
 */
export async function init({ container, themeManager, i18n }) {
  console.log('Initializing settings app...');
  
  // Current section
  let currentSection = 'appearance';
  
  // Create app UI
  createAppUI(container);
  
  // Load initial section
  loadSection(currentSection);
  
  // Return public API
  return {
    getCurrentSection: () => currentSection,
    navigateTo: (section) => {
      currentSection = section;
      loadSection(section);
    },
  };
  
  /**
   * Create app UI
   * @param {HTMLElement} container - Container element
   */
  function createAppUI(container) {
    // Clear container
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    
    // Create sidebar
    const sidebarEl = document.createElement('div');
    sidebarEl.className = 'settings-sidebar';
    sidebarEl.style.width = '200px';
    sidebarEl.style.borderRight = 'var(--border-width) solid var(--border-color)';
    sidebarEl.style.overflowY = 'auto';
    container.appendChild(sidebarEl);
    
    // Create sidebar items
    const sections = [
      { id: 'appearance', title: 'Appearance', icon: SunIcon },
      { id: 'language', title: 'Language', icon: LanguageIcon },
      { id: 'notifications', title: 'Notifications', icon: BellIcon },
      { id: 'account', title: 'Account', icon: UserIcon },
      { id: 'about', title: 'About', icon: Cog6ToothIcon },
    ];
    
    sections.forEach(section => {
      const itemEl = document.createElement('div');
      itemEl.className = 'settings-sidebar-item';
      itemEl.dataset.section = section.id;
      itemEl.style.display = 'flex';
      itemEl.style.alignItems = 'center';
      itemEl.style.padding = 'var(--spacing-md)';
      itemEl.style.cursor = 'pointer';
      itemEl.style.borderRadius = 'var(--border-radius-sm)';
      itemEl.style.margin = 'var(--spacing-sm)';
      
      // Add icon
      const iconEl = document.createElement('div');
      iconEl.className = 'settings-sidebar-item-icon';
      iconEl.style.marginRight = 'var(--spacing-md)';
      iconEl.style.display = 'flex';
      iconEl.style.alignItems = 'center';
      iconEl.style.justifyContent = 'center';
      iconEl.style.width = '24px';
      iconEl.style.height = '24px';
      iconEl.innerHTML = section.icon;
      itemEl.appendChild(iconEl);
      
      // Add title
      const titleEl = document.createElement('div');
      titleEl.className = 'settings-sidebar-item-title';
      titleEl.textContent = section.title;
      itemEl.appendChild(titleEl);
      
      // Add event listener
      itemEl.addEventListener('click', () => {
        navigateTo(section.id);
      });
      
      sidebarEl.appendChild(itemEl);
    });
    
    // Create content area
    const contentEl = document.createElement('div');
    contentEl.className = 'settings-content';
    contentEl.style.flex = '1';
    contentEl.style.padding = 'var(--spacing-lg)';
    contentEl.style.overflowY = 'auto';
    container.appendChild(contentEl);
  }
  
  /**
   * Load a settings section
   * @param {string} section - Section ID
   */
  function loadSection(section) {
    // Update sidebar selection
    document.querySelectorAll('.settings-sidebar-item').forEach(el => {
      if (el.dataset.section === section) {
        el.style.backgroundColor = 'var(--color-selection)';
      } else {
        el.style.backgroundColor = '';
      }
    });
    
    // Get content element
    const contentEl = document.querySelector('.settings-content');
    if (!contentEl) return;
    
    // Clear content
    contentEl.innerHTML = '';
    
    // Load section content
    switch (section) {
      case 'appearance':
        loadAppearanceSection(contentEl);
        break;
      case 'language':
        loadLanguageSection(contentEl);
        break;
      case 'notifications':
        loadNotificationsSection(contentEl);
        break;
      case 'account':
        loadAccountSection(contentEl);
        break;
      case 'about':
        loadAboutSection(contentEl);
        break;
      default:
        contentEl.textContent = 'Section not found';
    }
  }
  
  /**
   * Load appearance settings
   * @param {HTMLElement} container - Container element
   */
  function loadAppearanceSection(container) {
    // Create section title
    const titleEl = document.createElement('h2');
    titleEl.textContent = 'Appearance';
    titleEl.style.marginBottom = 'var(--spacing-lg)';
    container.appendChild(titleEl);
    
    // Create theme selector
    const themeGroupEl = document.createElement('div');
    themeGroupEl.className = 'settings-group';
    themeGroupEl.style.marginBottom = 'var(--spacing-xl)';
    
    // Add group label
    const themeLabelEl = document.createElement('label');
    themeLabelEl.textContent = 'Theme';
    themeLabelEl.style.display = 'block';
    themeLabelEl.style.marginBottom = 'var(--spacing-md)';
    themeLabelEl.style.fontWeight = 'bold';
    themeGroupEl.appendChild(themeLabelEl);
    
    // Add theme options
    const themeOptionsEl = document.createElement('div');
    themeOptionsEl.style.display = 'flex';
    themeOptionsEl.style.gap = 'var(--spacing-md)';
    
    // Light theme option
    const lightThemeEl = createThemeOption('light', 'Light', SunIcon);
    themeOptionsEl.appendChild(lightThemeEl);
    
    // Dark theme option
    const darkThemeEl = createThemeOption('dark', 'Dark', MoonIcon);
    themeOptionsEl.appendChild(darkThemeEl);
    
    // System theme option
    const systemThemeEl = createThemeOption('system', 'System', Cog6ToothIcon);
    themeOptionsEl.appendChild(systemThemeEl);
    
    themeGroupEl.appendChild(themeOptionsEl);
    container.appendChild(themeGroupEl);
    
    // Create accent color selector
    const colorGroupEl = document.createElement('div');
    colorGroupEl.className = 'settings-group';
    
    // Add group label
    const colorLabelEl = document.createElement('label');
    colorLabelEl.textContent = 'Accent Color';
    colorLabelEl.style.display = 'block';
    colorLabelEl.style.marginBottom = 'var(--spacing-md)';
    colorLabelEl.style.fontWeight = 'bold';
    colorGroupEl.appendChild(colorLabelEl);
    
    // Add color options
    const colorOptionsEl = document.createElement('div');
    colorOptionsEl.style.display = 'flex';
    colorOptionsEl.style.gap = 'var(--spacing-md)';
    colorOptionsEl.style.flexWrap = 'wrap';
    
    // Color options
    const colors = [
      { id: 'blue', name: 'Blue', value: '#3b82f6' },
      { id: 'purple', name: 'Purple', value: '#8b5cf6' },
      { id: 'pink', name: 'Pink', value: '#ec4899' },
      { id: 'red', name: 'Red', value: '#ef4444' },
      { id: 'orange', name: 'Orange', value: '#f97316' },
      { id: 'yellow', name: 'Yellow', value: '#eab308' },
      { id: 'green', name: 'Green', value: '#22c55e' },
      { id: 'teal', name: 'Teal', value: '#14b8a6' },
    ];
    
    colors.forEach(color => {
      const colorOptionEl = document.createElement('div');
      colorOptionEl.className = 'settings-color-option';
      colorOptionEl.style.width = '32px';
      colorOptionEl.style.height = '32px';
      colorOptionEl.style.borderRadius = '50%';
      colorOptionEl.style.backgroundColor = color.value;
      colorOptionEl.style.cursor = 'pointer';
      colorOptionEl.style.border = '2px solid transparent';
      colorOptionEl.title = color.name;
      
      // Check if this is the current accent color
      const currentAccentColor = themeManager.getAccentColor();
      if (color.id === currentAccentColor) {
        colorOptionEl.style.border = '2px solid var(--color-text-primary)';
      }
      
      // Add event listener
      colorOptionEl.addEventListener('click', () => {
        // Update accent color
        themeManager.setAccentColor(color.id);
        
        // Update UI
        document.querySelectorAll('.settings-color-option').forEach(el => {
          el.style.border = '2px solid transparent';
        });
        colorOptionEl.style.border = '2px solid var(--color-text-primary)';
      });
      
      colorOptionsEl.appendChild(colorOptionEl);
    });
    
    colorGroupEl.appendChild(colorOptionsEl);
    container.appendChild(colorGroupEl);
  }
  
  /**
   * Create a theme option element
   * @param {string} id - Theme ID
   * @param {string} name - Theme name
   * @param {string} icon - Theme icon
   * @returns {HTMLElement} Theme option element
   */
  function createThemeOption(id, name, icon) {
    const optionEl = document.createElement('div');
    optionEl.className = 'settings-theme-option';
    optionEl.style.display = 'flex';
    optionEl.style.flexDirection = 'column';
    optionEl.style.alignItems = 'center';
    optionEl.style.padding = 'var(--spacing-md)';
    optionEl.style.borderRadius = 'var(--border-radius-md)';
    optionEl.style.border = 'var(--border-width) solid var(--border-color)';
    optionEl.style.cursor = 'pointer';
    optionEl.style.width = '80px';
    
    // Check if this is the current theme
    const currentTheme = themeManager.getCurrentTheme();
    if (id === currentTheme) {
      optionEl.style.borderColor = 'var(--color-accent)';
      optionEl.style.backgroundColor = 'var(--color-selection)';
    }
    
    // Add icon
    const iconEl = document.createElement('div');
    iconEl.style.marginBottom = 'var(--spacing-sm)';
    iconEl.style.display = 'flex';
    iconEl.style.alignItems = 'center';
    iconEl.style.justifyContent = 'center';
    iconEl.style.width = '24px';
    iconEl.style.height = '24px';
    iconEl.innerHTML = icon;
    optionEl.appendChild(iconEl);
    
    // Add name
    const nameEl = document.createElement('div');
    nameEl.textContent = name;
    nameEl.style.fontSize = 'var(--font-size-sm)';
    optionEl.appendChild(nameEl);
    
    // Add event listener
    optionEl.addEventListener('click', () => {
      // Update theme
      themeManager.setTheme(id);
      
      // Update UI
      document.querySelectorAll('.settings-theme-option').forEach(el => {
        el.style.borderColor = 'var(--border-color)';
        el.style.backgroundColor = '';
      });
      optionEl.style.borderColor = 'var(--color-accent)';
      optionEl.style.backgroundColor = 'var(--color-selection)';
    });
    
    return optionEl;
  }
  
  /**
   * Load language settings
   * @param {HTMLElement} container - Container element
   */
  function loadLanguageSection(container) {
    // Create section title
    const titleEl = document.createElement('h2');
    titleEl.textContent = 'Language';
    titleEl.style.marginBottom = 'var(--spacing-lg)';
    container.appendChild(titleEl);
    
    // Create language selector
    const languageGroupEl = document.createElement('div');
    languageGroupEl.className = 'settings-group';
    
    // Add group label
    const languageLabelEl = document.createElement('label');
    languageLabelEl.textContent = 'Display Language';
    languageLabelEl.style.display = 'block';
    languageLabelEl.style.marginBottom = 'var(--spacing-md)';
    languageLabelEl.style.fontWeight = 'bold';
    languageGroupEl.appendChild(languageLabelEl);
    
    // Add language select
    const languageSelectEl = document.createElement('select');
    languageSelectEl.style.width = '100%';
    languageSelectEl.style.padding = 'var(--spacing-md)';
    languageSelectEl.style.borderRadius = 'var(--border-radius-sm)';
    languageSelectEl.style.border = 'var(--border-width) solid var(--border-color)';
    
    // Add language options
    const languages = [
      { id: 'en', name: 'English' },
      { id: 'es', name: 'Español' },
      { id: 'fr', name: 'Français' },
      { id: 'de', name: 'Deutsch' },
      { id: 'ja', name: '日本語' },
      { id: 'zh', name: '中文' },
    ];
    
    languages.forEach(language => {
      const optionEl = document.createElement('option');
      optionEl.value = language.id;
      optionEl.textContent = language.name;
      
      // Check if this is the current language
      const currentLanguage = i18n.getCurrentLanguage();
      if (language.id === currentLanguage) {
        optionEl.selected = true;
      }
      
      languageSelectEl.appendChild(optionEl);
    });
    
    // Add event listener
    languageSelectEl.addEventListener('change', () => {
      // Update language
      i18n.setLanguage(languageSelectEl.value);
    });
    
    languageGroupEl.appendChild(languageSelectEl);
    container.appendChild(languageGroupEl);
  }
  
  /**
   * Load notifications settings
   * @param {HTMLElement} container - Container element
   */
  function loadNotificationsSection(container) {
    // Create section title
    const titleEl = document.createElement('h2');
    titleEl.textContent = 'Notifications';
    titleEl.style.marginBottom = 'var(--spacing-lg)';
    container.appendChild(titleEl);
    
    // Create notifications toggle
    const notificationsGroupEl = document.createElement('div');
    notificationsGroupEl.className = 'settings-group';
    notificationsGroupEl.style.marginBottom = 'var(--spacing-xl)';
    
    // Add toggle
    const toggleEl = document.createElement('div');
    toggleEl.style.display = 'flex';
    toggleEl.style.justifyContent = 'space-between';
    toggleEl.style.alignItems = 'center';
    
    // Add label
    const labelEl = document.createElement('label');
    labelEl.textContent = 'Enable Notifications';
    labelEl.style.fontWeight = 'bold';
    toggleEl.appendChild(labelEl);
    
    // Add switch
    const switchEl = document.createElement('label');
    switchEl.className = 'settings-switch';
    switchEl.style.position = 'relative';
    switchEl.style.display = 'inline-block';
    switchEl.style.width = '60px';
    switchEl.style.height = '34px';
    
    const inputEl = document.createElement('input');
    inputEl.type = 'checkbox';
    inputEl.checked = true;
    inputEl.style.opacity = '0';
    inputEl.style.width = '0';
    inputEl.style.height = '0';
    
    const sliderEl = document.createElement('span');
    sliderEl.className = 'settings-slider';
    sliderEl.style.position = 'absolute';
    sliderEl.style.cursor = 'pointer';
    sliderEl.style.top = '0';
    sliderEl.style.left = '0';
    sliderEl.style.right = '0';
    sliderEl.style.bottom = '0';
    sliderEl.style.backgroundColor = 'var(--color-bg-tertiary)';
    sliderEl.style.borderRadius = '34px';
    sliderEl.style.transition = '.4s';
    
    // Add slider circle
    const circleEl = document.createElement('span');
    circleEl.style.position = 'absolute';
    circleEl.style.content = '""';
    circleEl.style.height = '26px';
    circleEl.style.width = '26px';
    circleEl.style.left = '4px';
    circleEl.style.bottom = '4px';
    circleEl.style.backgroundColor = 'white';
    circleEl.style.borderRadius = '50%';
    circleEl.style.transition = '.4s';
    sliderEl.appendChild(circleEl);
    
    // Add event listener
    inputEl.addEventListener('change', () => {
      if (inputEl.checked) {
        sliderEl.style.backgroundColor = 'var(--color-accent)';
        circleEl.style.transform = 'translateX(26px)';
      } else {
        sliderEl.style.backgroundColor = 'var(--color-bg-tertiary)';
        circleEl.style.transform = 'translateX(0)';
      }
    });
    
    // Initial state
    if (inputEl.checked) {
      sliderEl.style.backgroundColor = 'var(--color-accent)';
      circleEl.style.transform = 'translateX(26px)';
    }
    
    switchEl.appendChild(inputEl);
    switchEl.appendChild(sliderEl);
    toggleEl.appendChild(switchEl);
    
    notificationsGroupEl.appendChild(toggleEl);
    container.appendChild(notificationsGroupEl);
    
    // Create notification sound selector
    const soundGroupEl = document.createElement('div');
    soundGroupEl.className = 'settings-group';
    
    // Add group label
    const soundLabelEl = document.createElement('label');
    soundLabelEl.textContent = 'Notification Sound';
    soundLabelEl.style.display = 'block';
    soundLabelEl.style.marginBottom = 'var(--spacing-md)';
    soundLabelEl.style.fontWeight = 'bold';
    soundGroupEl.appendChild(soundLabelEl);
    
    // Add sound select
    const soundSelectEl = document.createElement('select');
    soundSelectEl.style.width = '100%';
    soundSelectEl.style.padding = 'var(--spacing-md)';
    soundSelectEl.style.borderRadius = 'var(--border-radius-sm)';
    soundSelectEl.style.border = 'var(--border-width) solid var(--border-color)';
    
    // Add sound options
    const sounds = [
      { id: 'default', name: 'Default' },
      { id: 'chime', name: 'Chime' },
      { id: 'bell', name: 'Bell' },
      { id: 'none', name: 'None' },
    ];
    
    sounds.forEach(sound => {
      const optionEl = document.createElement('option');
      optionEl.value = sound.id;
      optionEl.textContent = sound.name;
      soundSelectEl.appendChild(optionEl);
    });
    
    soundGroupEl.appendChild(soundSelectEl);
    container.appendChild(soundGroupEl);
  }
  
  /**
   * Load account settings
   * @param {HTMLElement} container - Container element
   */
  function loadAccountSection(container) {
    // Create section title
    const titleEl = document.createElement('h2');
    titleEl.textContent = 'Account';
    titleEl.style.marginBottom = 'var(--spacing-lg)';
    container.appendChild(titleEl);
    
    // Create account info
    const infoEl = document.createElement('div');
    infoEl.style.marginBottom = 'var(--spacing-xl)';
    
    // Add user icon
    const userIconEl = document.createElement('div');
    userIconEl.style.width = '64px';
    userIconEl.style.height = '64px';
    userIconEl.style.borderRadius = '50%';
    userIconEl.style.backgroundColor = 'var(--color-accent)';
    userIconEl.style.display = 'flex';
    userIconEl.style.alignItems = 'center';
    userIconEl.style.justifyContent = 'center';
    userIconEl.style.marginBottom = 'var(--spacing-md)';
    userIconEl.innerHTML = UserIcon;
    userIconEl.style.color = 'white';
    infoEl.appendChild(userIconEl);
    
    // Add user name
    const nameEl = document.createElement('div');
    nameEl.textContent = 'Guest User';
    nameEl.style.fontWeight = 'bold';
    nameEl.style.fontSize = 'var(--font-size-lg)';
    nameEl.style.marginBottom = 'var(--spacing-sm)';
    infoEl.appendChild(nameEl);
    
    // Add user email
    const emailEl = document.createElement('div');
    emailEl.textContent = 'guest@kosmo.os';
    emailEl.style.color = 'var(--color-text-secondary)';
    infoEl.appendChild(emailEl);
    
    container.appendChild(infoEl);
    
    // Create sign out button
    const signOutBtn = document.createElement('button');
    signOutBtn.textContent = 'Sign Out';
    signOutBtn.style.padding = 'var(--spacing-md) var(--spacing-lg)';
    signOutBtn.style.backgroundColor = 'var(--color-danger)';
    signOutBtn.style.color = 'white';
    signOutBtn.style.border = 'none';
    signOutBtn.style.borderRadius = 'var(--border-radius-sm)';
    signOutBtn.style.cursor = 'pointer';
    signOutBtn.addEventListener('click', () => {
      alert('Sign out functionality would be implemented here.');
    });
    
    container.appendChild(signOutBtn);
  }
  
  /**
   * Load about settings
   * @param {HTMLElement} container - Container element
   */
  function loadAboutSection(container) {
    // Create section title
    const titleEl = document.createElement('h2');
    titleEl.textContent = 'About';
    titleEl.style.marginBottom = 'var(--spacing-lg)';
    container.appendChild(titleEl);
    
    // Create about info
    const infoEl = document.createElement('div');
    
    // Add logo
    const logoEl = document.createElement('div');
    logoEl.style.fontSize = 'var(--font-size-xl)';
    logoEl.style.fontWeight = 'bold';
    logoEl.style.marginBottom = 'var(--spacing-md)';
    logoEl.textContent = 'Kosmo OS';
    infoEl.appendChild(logoEl);
    
    // Add version
    const versionEl = document.createElement('div');
    versionEl.style.marginBottom = 'var(--spacing-lg)';
    versionEl.textContent = 'Version 0.1.0';
    infoEl.appendChild(versionEl);
    
    // Add description
    const descEl = document.createElement('p');
    descEl.style.marginBottom = 'var(--spacing-lg)';
    descEl.textContent = 'Kosmo OS is an AI-first operating system UI framework designed to work across devices, contexts, and operating systems.';
    infoEl.appendChild(descEl);
    
    // Add copyright
    const copyrightEl = document.createElement('div');
    copyrightEl.style.color = 'var(--color-text-secondary)';
    copyrightEl.textContent = '© 2025 Kosmo OS. All rights reserved.';
    infoEl.appendChild(copyrightEl);
    
    container.appendChild(infoEl);
  }
}