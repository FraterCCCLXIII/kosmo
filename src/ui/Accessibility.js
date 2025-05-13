/**
 * Accessibility
 * a11y helpers: focus trap, keyboard nav, screen reader support
 */

// Focus trap state
let trapStack = [];

/**
 * Initialize accessibility features
 * @returns {Object} Accessibility API
 */
export async function initAccessibility() {
  console.log('Initializing accessibility features...');
  
  // Create announcer for screen readers
  createAnnouncer();
  
  // Set up global keyboard handlers
  setupKeyboardHandlers();
  
  // Return public API
  return {
    createFocusTrap,
    releaseFocusTrap,
    announce,
    setTabIndex,
    enableKeyboardNavigation,
    disableKeyboardNavigation,
  };
}

/**
 * Create screen reader announcer
 */
function createAnnouncer() {
  // Check if announcer already exists
  let announcerEl = document.getElementById('a11y-announcer');
  if (announcerEl) return;
  
  // Create announcer element
  announcerEl = document.createElement('div');
  announcerEl.id = 'a11y-announcer';
  announcerEl.className = 'visually-hidden';
  announcerEl.setAttribute('aria-live', 'polite');
  announcerEl.setAttribute('aria-atomic', 'true');
  
  // Add to DOM
  document.body.appendChild(announcerEl);
}

/**
 * Set up global keyboard handlers
 */
function setupKeyboardHandlers() {
  // Handle Tab key for focus management
  document.addEventListener('keydown', (e) => {
    // Skip if no focus traps active
    if (trapStack.length === 0) return;
    
    // Handle Tab key
    if (e.key === 'Tab') {
      const currentTrap = trapStack[trapStack.length - 1];
      const focusableElements = currentTrap.focusableElements;
      
      // Skip if no focusable elements
      if (focusableElements.length === 0) return;
      
      // Get current focus index
      const currentIndex = focusableElements.indexOf(document.activeElement);
      
      // Handle forward tab
      if (!e.shiftKey) {
        // If at end or not in trap, go to first element
        if (currentIndex === -1 || currentIndex === focusableElements.length - 1) {
          e.preventDefault();
          focusableElements[0].focus();
        }
      }
      // Handle backward tab
      else {
        // If at start or not in trap, go to last element
        if (currentIndex === -1 || currentIndex === 0) {
          e.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
        }
      }
    }
    
    // Handle Escape key
    if (e.key === 'Escape') {
      const currentTrap = trapStack[trapStack.length - 1];
      if (currentTrap.escapeHandler) {
        currentTrap.escapeHandler();
      }
    }
  });
}

/**
 * Create a focus trap
 * @param {HTMLElement} containerEl - Container element
 * @param {Function} escapeHandler - Handler for Escape key
 * @returns {Object} Focus trap object
 */
function createFocusTrap(containerEl, escapeHandler = null) {
  // Get all focusable elements
  const focusableElements = getFocusableElements(containerEl);
  
  // Create focus trap object
  const focusTrap = {
    container: containerEl,
    focusableElements,
    previousFocus: document.activeElement,
    escapeHandler,
  };
  
  // Add to trap stack
  trapStack.push(focusTrap);
  
  // Focus first element if available
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
  
  // Return focus trap object
  return focusTrap;
}

/**
 * Release a focus trap
 * @param {Object} focusTrap - Focus trap object
 */
function releaseFocusTrap(focusTrap) {
  // Remove from trap stack
  const index = trapStack.indexOf(focusTrap);
  if (index !== -1) {
    trapStack.splice(index, 1);
  }
  
  // Restore previous focus
  if (focusTrap.previousFocus && typeof focusTrap.previousFocus.focus === 'function') {
    focusTrap.previousFocus.focus();
  }
}

/**
 * Get all focusable elements in a container
 * @param {HTMLElement} containerEl - Container element
 * @returns {Array} Array of focusable elements
 */
function getFocusableElements(containerEl) {
  // Selector for all potentially focusable elements
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'area[href]',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
  ].join(',');
  
  // Get all elements
  const elements = Array.from(containerEl.querySelectorAll(selector));
  
  // Filter out hidden elements
  return elements.filter(el => {
    return el.offsetWidth > 0 && el.offsetHeight > 0 && getComputedStyle(el).visibility !== 'hidden';
  });
}

/**
 * Announce a message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - Priority ('polite' or 'assertive')
 */
function announce(message, priority = 'polite') {
  // Get announcer element
  const announcerEl = document.getElementById('a11y-announcer');
  if (!announcerEl) return;
  
  // Set priority
  announcerEl.setAttribute('aria-live', priority);
  
  // Clear announcer (needed for some screen readers to announce again)
  announcerEl.textContent = '';
  
  // Set message after a small delay
  setTimeout(() => {
    announcerEl.textContent = message;
  }, 50);
}

/**
 * Set tab index for an element
 * @param {HTMLElement} element - Element to set tab index for
 * @param {number} index - Tab index
 */
function setTabIndex(element, index) {
  element.setAttribute('tabindex', index.toString());
}

/**
 * Enable keyboard navigation for an element
 * @param {HTMLElement} element - Element to enable keyboard navigation for
 * @param {Function} callback - Callback for keyboard events
 */
function enableKeyboardNavigation(element, callback) {
  // Make element focusable if not already
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0');
  }
  
  // Add keyboard event listener
  element.addEventListener('keydown', callback);
}

/**
 * Disable keyboard navigation for an element
 * @param {HTMLElement} element - Element to disable keyboard navigation for
 * @param {Function} callback - Callback to remove
 */
function disableKeyboardNavigation(element, callback) {
  // Remove keyboard event listener
  element.removeEventListener('keydown', callback);
}