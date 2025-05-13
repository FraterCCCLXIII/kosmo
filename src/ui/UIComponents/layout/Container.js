/**
 * Container Component
 * Layout wrapper with padding/responsive breakpoints
 */

/**
 * Create a container element with responsive behavior
 * @param {Object} options - Container configuration
 * @param {string} options.id - Container ID
 * @param {string} options.className - Additional CSS classes
 * @param {string} options.maxWidth - Maximum width (sm, md, lg, xl, full)
 * @param {string} options.padding - Padding (none, sm, md, lg)
 * @param {boolean} options.center - Whether to center the container
 * @param {HTMLElement[]} options.children - Child elements to append
 * @returns {HTMLDivElement} Container element
 */
export function createContainer(options = {}) {
  const {
    id,
    className = '',
    maxWidth = 'lg',
    padding = 'md',
    center = true,
    children = [],
  } = options;

  // Create container element
  const container = document.createElement('div');
  if (id) container.id = id;
  container.className = `kosmo-container kosmo-container-${maxWidth} ${className}`.trim();
  
  // Apply container styles
  applyContainerStyles(container, maxWidth, padding, center);
  
  // Add children
  if (children && children.length > 0) {
    children.forEach(child => {
      if (child instanceof HTMLElement) {
        container.appendChild(child);
      }
    });
  }
  
  return container;
}

/**
 * Apply styles to container element
 * @param {HTMLDivElement} container - Container element
 * @param {string} maxWidth - Maximum width
 * @param {string} padding - Padding
 * @param {boolean} center - Whether to center the container
 */
function applyContainerStyles(container, maxWidth, padding, center) {
  // Base styles
  container.style.width = '100%';
  container.style.boxSizing = 'border-box';
  
  // Center container if requested
  if (center) {
    container.style.marginLeft = 'auto';
    container.style.marginRight = 'auto';
  }
  
  // Apply max width based on size
  switch (maxWidth) {
    case 'sm':
      container.style.maxWidth = '640px';
      break;
    case 'md':
      container.style.maxWidth = '768px';
      break;
    case 'lg':
      container.style.maxWidth = '1024px';
      break;
    case 'xl':
      container.style.maxWidth = '1280px';
      break;
    case 'full':
      container.style.maxWidth = '100%';
      break;
    default:
      container.style.maxWidth = '1024px'; // Default to lg
  }
  
  // Apply padding based on size
  switch (padding) {
    case 'none':
      container.style.padding = '0';
      break;
    case 'sm':
      container.style.padding = '0.5rem';
      break;
    case 'lg':
      container.style.padding = '2rem';
      break;
    case 'md':
    default:
      container.style.padding = '1rem';
  }
  
  // Add responsive padding adjustments
  const mediaQueryList = window.matchMedia('(min-width: 768px)');
  
  function handleMediaChange(e) {
    if (e.matches && padding !== 'none') {
      // Larger padding on larger screens
      switch (padding) {
        case 'sm':
          container.style.padding = '1rem';
          break;
        case 'md':
          container.style.padding = '1.5rem';
          break;
        case 'lg':
          container.style.padding = '3rem';
          break;
      }
    } else if (padding !== 'none') {
      // Reset to original padding on smaller screens
      switch (padding) {
        case 'sm':
          container.style.padding = '0.5rem';
          break;
        case 'md':
          container.style.padding = '1rem';
          break;
        case 'lg':
          container.style.padding = '2rem';
          break;
      }
    }
  }
  
  // Initial check
  handleMediaChange(mediaQueryList);
  
  // Add listener for changes
  try {
    // Modern API
    mediaQueryList.addEventListener('change', handleMediaChange);
    
    // Store the listener for potential cleanup
    container.mediaQueryListener = handleMediaChange;
  } catch (e) {
    // Fallback for older browsers
    mediaQueryList.addListener(handleMediaChange);
    
    // Store the listener for potential cleanup
    container.mediaQueryListener = handleMediaChange;
  }
}

/**
 * Add a child element to the container
 * @param {HTMLDivElement} container - Container element
 * @param {HTMLElement} child - Child element to append
 */
export function addToContainer(container, child) {
  if (child instanceof HTMLElement) {
    container.appendChild(child);
  }
}

/**
 * Remove a child element from the container
 * @param {HTMLDivElement} container - Container element
 * @param {HTMLElement} child - Child element to remove
 */
export function removeFromContainer(container, child) {
  if (child instanceof HTMLElement && container.contains(child)) {
    container.removeChild(child);
  }
}

/**
 * Clear all children from the container
 * @param {HTMLDivElement} container - Container element
 */
export function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**
 * Update container max width
 * @param {HTMLDivElement} container - Container element
 * @param {string} maxWidth - New maximum width (sm, md, lg, xl, full)
 */
export function updateContainerMaxWidth(container, maxWidth) {
  // Update class
  container.classList.remove('kosmo-container-sm', 'kosmo-container-md', 'kosmo-container-lg', 'kosmo-container-xl', 'kosmo-container-full');
  container.classList.add(`kosmo-container-${maxWidth}`);
  
  // Update style
  switch (maxWidth) {
    case 'sm':
      container.style.maxWidth = '640px';
      break;
    case 'md':
      container.style.maxWidth = '768px';
      break;
    case 'lg':
      container.style.maxWidth = '1024px';
      break;
    case 'xl':
      container.style.maxWidth = '1280px';
      break;
    case 'full':
      container.style.maxWidth = '100%';
      break;
  }
}

/**
 * Update container padding
 * @param {HTMLDivElement} container - Container element
 * @param {string} padding - New padding (none, sm, md, lg)
 */
export function updateContainerPadding(container, padding) {
  // Update base padding
  switch (padding) {
    case 'none':
      container.style.padding = '0';
      break;
    case 'sm':
      container.style.padding = '0.5rem';
      break;
    case 'lg':
      container.style.padding = '2rem';
      break;
    case 'md':
    default:
      container.style.padding = '1rem';
  }
  
  // Check current screen size and update accordingly
  const mediaQueryList = window.matchMedia('(min-width: 768px)');
  if (mediaQueryList.matches && padding !== 'none') {
    switch (padding) {
      case 'sm':
        container.style.padding = '1rem';
        break;
      case 'md':
        container.style.padding = '1.5rem';
        break;
      case 'lg':
        container.style.padding = '3rem';
        break;
    }
  }
  
  // Update media query listener
  if (container.mediaQueryListener) {
    try {
      // Remove old listener
      const oldMediaQueryList = window.matchMedia('(min-width: 768px)');
      oldMediaQueryList.removeEventListener('change', container.mediaQueryListener);
    } catch (e) {
      // Fallback for older browsers
      const oldMediaQueryList = window.matchMedia('(min-width: 768px)');
      oldMediaQueryList.removeListener(container.mediaQueryListener);
    }
  }
  
  // Create new listener
  const newMediaQueryList = window.matchMedia('(min-width: 768px)');
  
  function handleMediaChange(e) {
    if (e.matches && padding !== 'none') {
      // Larger padding on larger screens
      switch (padding) {
        case 'sm':
          container.style.padding = '1rem';
          break;
        case 'md':
          container.style.padding = '1.5rem';
          break;
        case 'lg':
          container.style.padding = '3rem';
          break;
      }
    } else if (padding !== 'none') {
      // Reset to original padding on smaller screens
      switch (padding) {
        case 'sm':
          container.style.padding = '0.5rem';
          break;
        case 'md':
          container.style.padding = '1rem';
          break;
        case 'lg':
          container.style.padding = '2rem';
          break;
      }
    }
  }
  
  // Add new listener
  try {
    // Modern API
    newMediaQueryList.addEventListener('change', handleMediaChange);
    
    // Store the listener for potential cleanup
    container.mediaQueryListener = handleMediaChange;
  } catch (e) {
    // Fallback for older browsers
    newMediaQueryList.addListener(handleMediaChange);
    
    // Store the listener for potential cleanup
    container.mediaQueryListener = handleMediaChange;
  }
}