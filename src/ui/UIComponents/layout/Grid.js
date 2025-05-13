/**
 * Grid Component
 * Grid system layout with responsive columns
 */

/**
 * Create a grid container
 * @param {Object} options - Grid configuration
 * @param {string} options.id - Grid ID
 * @param {string} options.className - Additional CSS classes
 * @param {number} options.columns - Number of columns (1-12)
 * @param {string} options.gap - Gap between grid items (none, sm, md, lg)
 * @param {HTMLElement[]} options.children - Child elements to append
 * @returns {HTMLDivElement} Grid container element
 */
export function createGrid(options = {}) {
  const {
    id,
    className = '',
    columns = 12,
    gap = 'md',
    children = [],
  } = options;

  // Create grid container
  const gridContainer = document.createElement('div');
  if (id) gridContainer.id = id;
  gridContainer.className = `kosmo-grid kosmo-grid-cols-${columns} ${className}`.trim();
  
  // Apply grid styles
  applyGridStyles(gridContainer, columns, gap);
  
  // Add children
  if (children && children.length > 0) {
    children.forEach(child => {
      if (child instanceof HTMLElement) {
        gridContainer.appendChild(child);
      }
    });
  }
  
  return gridContainer;
}

/**
 * Apply styles to grid container
 * @param {HTMLDivElement} gridContainer - Grid container element
 * @param {number} columns - Number of columns
 * @param {string} gap - Gap between grid items
 */
function applyGridStyles(gridContainer, columns, gap) {
  // Base styles
  gridContainer.style.display = 'grid';
  gridContainer.style.width = '100%';
  gridContainer.style.boxSizing = 'border-box';
  
  // Set grid template columns
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  
  // Set gap based on size
  switch (gap) {
    case 'none':
      gridContainer.style.gap = '0';
      break;
    case 'sm':
      gridContainer.style.gap = '0.5rem';
      break;
    case 'lg':
      gridContainer.style.gap = '2rem';
      break;
    case 'md':
    default:
      gridContainer.style.gap = '1rem';
  }
  
  // Add responsive behavior
  const smallMediaQuery = window.matchMedia('(max-width: 640px)');
  const mediumMediaQuery = window.matchMedia('(min-width: 641px) and (max-width: 768px)');
  
  function handleSmallMediaChange(e) {
    if (e.matches) {
      // On small screens, stack items vertically
      gridContainer.style.gridTemplateColumns = '1fr';
    } else {
      // Reset to original columns on larger screens
      gridContainer.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    }
  }
  
  function handleMediumMediaChange(e) {
    if (e.matches) {
      // On medium screens, reduce columns by half (minimum 2)
      const mediumColumns = Math.max(2, Math.floor(columns / 2));
      gridContainer.style.gridTemplateColumns = `repeat(${mediumColumns}, minmax(0, 1fr))`;
    }
  }
  
  // Initial check
  handleSmallMediaChange(smallMediaQuery);
  handleMediumMediaChange(mediumMediaQuery);
  
  // Add listeners for changes
  try {
    // Modern API
    smallMediaQuery.addEventListener('change', handleSmallMediaChange);
    mediumMediaQuery.addEventListener('change', handleMediumMediaChange);
    
    // Store listeners for potential cleanup
    gridContainer.smallMediaQueryListener = handleSmallMediaChange;
    gridContainer.mediumMediaQueryListener = handleMediumMediaChange;
  } catch (e) {
    // Fallback for older browsers
    smallMediaQuery.addListener(handleSmallMediaChange);
    mediumMediaQuery.addListener(handleMediumMediaChange);
    
    // Store listeners for potential cleanup
    gridContainer.smallMediaQueryListener = handleSmallMediaChange;
    gridContainer.mediumMediaQueryListener = handleMediumMediaChange;
  }
}

/**
 * Create a grid item with specified column span
 * @param {Object} options - Grid item configuration
 * @param {string} options.id - Grid item ID
 * @param {string} options.className - Additional CSS classes
 * @param {number} options.colSpan - Number of columns to span (1-12)
 * @param {number} options.colStart - Starting column (1-12)
 * @param {number} options.rowSpan - Number of rows to span
 * @param {number} options.rowStart - Starting row
 * @param {HTMLElement[]} options.children - Child elements to append
 * @returns {HTMLDivElement} Grid item element
 */
export function createGridItem(options = {}) {
  const {
    id,
    className = '',
    colSpan = 1,
    colStart,
    rowSpan,
    rowStart,
    children = [],
  } = options;

  // Create grid item
  const gridItem = document.createElement('div');
  if (id) gridItem.id = id;
  gridItem.className = `kosmo-grid-item kosmo-col-span-${colSpan} ${className}`.trim();
  
  // Apply grid item styles
  applyGridItemStyles(gridItem, colSpan, colStart, rowSpan, rowStart);
  
  // Add children
  if (children && children.length > 0) {
    children.forEach(child => {
      if (child instanceof HTMLElement) {
        gridItem.appendChild(child);
      }
    });
  }
  
  return gridItem;
}

/**
 * Apply styles to grid item
 * @param {HTMLDivElement} gridItem - Grid item element
 * @param {number} colSpan - Number of columns to span
 * @param {number} colStart - Starting column
 * @param {number} rowSpan - Number of rows to span
 * @param {number} rowStart - Starting row
 */
function applyGridItemStyles(gridItem, colSpan, colStart, rowSpan, rowStart) {
  // Set column span
  gridItem.style.gridColumn = colStart ? `${colStart} / span ${colSpan}` : `span ${colSpan}`;
  
  // Set row span if provided
  if (rowSpan) {
    gridItem.style.gridRow = rowStart ? `${rowStart} / span ${rowSpan}` : `span ${rowSpan}`;
  }
  
  // Add responsive behavior
  const smallMediaQuery = window.matchMedia('(max-width: 640px)');
  
  function handleSmallMediaChange(e) {
    if (e.matches) {
      // On small screens, items take full width
      gridItem.style.gridColumn = '1 / -1';
    } else {
      // Reset to original span on larger screens
      gridItem.style.gridColumn = colStart ? `${colStart} / span ${colSpan}` : `span ${colSpan}`;
    }
  }
  
  // Initial check
  handleSmallMediaChange(smallMediaQuery);
  
  // Add listener for changes
  try {
    // Modern API
    smallMediaQuery.addEventListener('change', handleSmallMediaChange);
    
    // Store listener for potential cleanup
    gridItem.smallMediaQueryListener = handleSmallMediaChange;
  } catch (e) {
    // Fallback for older browsers
    smallMediaQuery.addListener(handleSmallMediaChange);
    
    // Store listener for potential cleanup
    gridItem.smallMediaQueryListener = handleSmallMediaChange;
  }
}

/**
 * Add a child element to a grid item
 * @param {HTMLDivElement} gridItem - Grid item element
 * @param {HTMLElement} child - Child element to append
 */
export function addToGridItem(gridItem, child) {
  if (child instanceof HTMLElement) {
    gridItem.appendChild(child);
  }
}

/**
 * Update grid columns
 * @param {HTMLDivElement} gridContainer - Grid container element
 * @param {number} columns - New number of columns (1-12)
 */
export function updateGridColumns(gridContainer, columns) {
  // Update class
  gridContainer.classList.remove(...Array.from(gridContainer.classList).filter(cls => cls.startsWith('kosmo-grid-cols-')));
  gridContainer.classList.add(`kosmo-grid-cols-${columns}`);
  
  // Update style
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  
  // Update media query listeners
  if (gridContainer.smallMediaQueryListener && gridContainer.mediumMediaQueryListener) {
    // Remove old listeners
    try {
      const smallMediaQuery = window.matchMedia('(max-width: 640px)');
      const mediumMediaQuery = window.matchMedia('(min-width: 641px) and (max-width: 768px)');
      
      smallMediaQuery.removeEventListener('change', gridContainer.smallMediaQueryListener);
      mediumMediaQuery.removeEventListener('change', gridContainer.mediumMediaQueryListener);
    } catch (e) {
      // Fallback for older browsers
      const smallMediaQuery = window.matchMedia('(max-width: 640px)');
      const mediumMediaQuery = window.matchMedia('(min-width: 641px) and (max-width: 768px)');
      
      smallMediaQuery.removeListener(gridContainer.smallMediaQueryListener);
      mediumMediaQuery.removeListener(gridContainer.mediumMediaQueryListener);
    }
  }
  
  // Create new listeners
  const smallMediaQuery = window.matchMedia('(max-width: 640px)');
  const mediumMediaQuery = window.matchMedia('(min-width: 641px) and (max-width: 768px)');
  
  function handleSmallMediaChange(e) {
    if (e.matches) {
      // On small screens, stack items vertically
      gridContainer.style.gridTemplateColumns = '1fr';
    } else {
      // Reset to original columns on larger screens
      gridContainer.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    }
  }
  
  function handleMediumMediaChange(e) {
    if (e.matches) {
      // On medium screens, reduce columns by half (minimum 2)
      const mediumColumns = Math.max(2, Math.floor(columns / 2));
      gridContainer.style.gridTemplateColumns = `repeat(${mediumColumns}, minmax(0, 1fr))`;
    }
  }
  
  // Initial check
  handleSmallMediaChange(smallMediaQuery);
  handleMediumMediaChange(mediumMediaQuery);
  
  // Add new listeners
  try {
    // Modern API
    smallMediaQuery.addEventListener('change', handleSmallMediaChange);
    mediumMediaQuery.addEventListener('change', handleMediumMediaChange);
    
    // Store listeners for potential cleanup
    gridContainer.smallMediaQueryListener = handleSmallMediaChange;
    gridContainer.mediumMediaQueryListener = handleMediumMediaChange;
  } catch (e) {
    // Fallback for older browsers
    smallMediaQuery.addListener(handleSmallMediaChange);
    mediumMediaQuery.addListener(handleMediumMediaChange);
    
    // Store listeners for potential cleanup
    gridContainer.smallMediaQueryListener = handleSmallMediaChange;
    gridContainer.mediumMediaQueryListener = handleMediumMediaChange;
  }
}

/**
 * Update grid gap
 * @param {HTMLDivElement} gridContainer - Grid container element
 * @param {string} gap - New gap between grid items (none, sm, md, lg)
 */
export function updateGridGap(gridContainer, gap) {
  // Update gap based on size
  switch (gap) {
    case 'none':
      gridContainer.style.gap = '0';
      break;
    case 'sm':
      gridContainer.style.gap = '0.5rem';
      break;
    case 'lg':
      gridContainer.style.gap = '2rem';
      break;
    case 'md':
    default:
      gridContainer.style.gap = '1rem';
  }
}

/**
 * Update grid item column span
 * @param {HTMLDivElement} gridItem - Grid item element
 * @param {number} colSpan - New number of columns to span (1-12)
 */
export function updateGridItemColSpan(gridItem, colSpan) {
  // Update class
  gridItem.classList.remove(...Array.from(gridItem.classList).filter(cls => cls.startsWith('kosmo-col-span-')));
  gridItem.classList.add(`kosmo-col-span-${colSpan}`);
  
  // Get current colStart if it exists
  const currentStyle = gridItem.style.gridColumn;
  const colStart = currentStyle && currentStyle.includes('/') ? 
    parseInt(currentStyle.split('/')[0].trim()) : 
    null;
  
  // Update style
  gridItem.style.gridColumn = colStart ? `${colStart} / span ${colSpan}` : `span ${colSpan}`;
  
  // Update media query listener
  if (gridItem.smallMediaQueryListener) {
    // Remove old listener
    try {
      const smallMediaQuery = window.matchMedia('(max-width: 640px)');
      smallMediaQuery.removeEventListener('change', gridItem.smallMediaQueryListener);
    } catch (e) {
      // Fallback for older browsers
      const smallMediaQuery = window.matchMedia('(max-width: 640px)');
      smallMediaQuery.removeListener(gridItem.smallMediaQueryListener);
    }
  }
  
  // Create new listener
  const smallMediaQuery = window.matchMedia('(max-width: 640px)');
  
  function handleSmallMediaChange(e) {
    if (e.matches) {
      // On small screens, items take full width
      gridItem.style.gridColumn = '1 / -1';
    } else {
      // Reset to original span on larger screens
      gridItem.style.gridColumn = colStart ? `${colStart} / span ${colSpan}` : `span ${colSpan}`;
    }
  }
  
  // Initial check
  handleSmallMediaChange(smallMediaQuery);
  
  // Add new listener
  try {
    // Modern API
    smallMediaQuery.addEventListener('change', handleSmallMediaChange);
    
    // Store listener for potential cleanup
    gridItem.smallMediaQueryListener = handleSmallMediaChange;
  } catch (e) {
    // Fallback for older browsers
    smallMediaQuery.addListener(handleSmallMediaChange);
    
    // Store listener for potential cleanup
    gridItem.smallMediaQueryListener = handleSmallMediaChange;
  }
}