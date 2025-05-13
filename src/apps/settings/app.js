/**
 * Settings App
 * Configure system settings and preferences
 */

// Import dependencies
import { Cog6ToothIcon, SunIcon, MoonIcon, LanguageIcon, BellIcon, UserIcon } from '@heroicons/react/24/solid';

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