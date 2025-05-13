/**
 * Window Manager
 * Handles window creation, focus, z-index, and modal behavior
 */

// Window state store
const windows = new Map();
let activeWindowId = null;
let nextWindowId = 1;
let zIndexCounter = 100;

// Default window options
const defaultWindowOptions = {
  title: 'Untitled Window',
  width: 800,
  height: 600,
  minWidth: 320,
  minHeight: 240,
  x: 'center', // 'center' or number
  y: 'center', // 'center' or number
  resizable: true,
  minimizable: true,
  maximizable: true,
  closable: true,
  modal: false,
  icon: null,
  className: '',
  content: null, // HTML content or component
  onClose: null, // Callback when window is closed
  onFocus: null, // Callback when window is focused
  onBlur: null, // Callback when window loses focus
  onResize: null, // Callback when window is resized
  onMove: null, // Callback when window is moved
};

// Singleton instance
let windowManagerInstance = null;

/**
 * Initialize the window manager
 * @returns {Object} Window manager API
 */
export async function initWindowManager() {
  console.log('Initializing window manager...');
  
  // Return existing instance if already initialized
  if (windowManagerInstance) {
    return windowManagerInstance;
  }
  
  // Create container for windows if it doesn't exist
  let windowContainer = document.getElementById('window-container');
  if (!windowContainer) {
    windowContainer = document.createElement('div');
    windowContainer.id = 'window-container';
    windowContainer.style.position = 'absolute';
    windowContainer.style.top = '0';
    windowContainer.style.left = '0';
    windowContainer.style.width = '100%';
    windowContainer.style.height = '100%';
    windowContainer.style.overflow = 'hidden';
    windowContainer.style.pointerEvents = 'none'; // Let clicks pass through to elements below
    document.getElementById('app-root').appendChild(windowContainer);
  }
  
  // Listen for global click events to manage focus
  document.addEventListener('mousedown', handleGlobalMouseDown);
  
  // Listen for keyboard events for window management
  document.addEventListener('keydown', handleGlobalKeyDown);
  
  // Create API
  windowManagerInstance = {
    createWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    getActiveWindow,
    getAllWindows,
    moveWindow,
    resizeWindow,
    getWindow: (id) => windows.get(id)
  };
  
  // Return public API
  return windowManagerInstance;
}

/**
 * Get the window manager instance
 * @returns {Object} Window manager API
 */
export async function getWindowManager() {
  // Initialize if not already initialized
  if (!windowManagerInstance) {
    return initWindowManager();
  }
  return windowManagerInstance;
}

/**
 * Create a new window
 * @param {Object} options - Window options
 * @returns {Object} Window object
 */
function createWindow(options = {}) {
  // Merge default options with provided options
  const windowOptions = { ...defaultWindowOptions, ...options };
  
  // Generate unique window ID
  const windowId = `window-${nextWindowId++}`;
  
  // Calculate window position
  const position = calculateWindowPosition(windowOptions);
  
  // Create window element
  const windowEl = document.createElement('div');
  windowEl.id = windowId;
  windowEl.className = `os-window ${windowOptions.className}`;
  windowEl.style.position = 'absolute';
  windowEl.style.width = `${windowOptions.width}px`;
  windowEl.style.height = `${windowOptions.height}px`;
  windowEl.style.left = `${position.x}px`;
  windowEl.style.top = `${position.y}px`;
  windowEl.style.backgroundColor = 'var(--color-bg-primary)';
  windowEl.style.borderRadius = 'var(--border-radius-md)';
  windowEl.style.boxShadow = 'var(--shadow-lg)';
  windowEl.style.display = 'flex';
  windowEl.style.flexDirection = 'column';
  windowEl.style.overflow = 'hidden';
  windowEl.style.transition = 'box-shadow var(--transition-fast)';
  windowEl.style.pointerEvents = 'auto'; // Make window clickable
  
  // Create window titlebar
  const titlebarEl = document.createElement('div');
  titlebarEl.className = 'os-window-titlebar';
  titlebarEl.style.display = 'flex';
  titlebarEl.style.alignItems = 'center';
  titlebarEl.style.padding = '0 var(--spacing-sm)';
  titlebarEl.style.height = '32px';
  titlebarEl.style.backgroundColor = 'var(--color-bg-secondary)';
  titlebarEl.style.borderTopLeftRadius = 'var(--border-radius-md)';
  titlebarEl.style.borderTopRightRadius = 'var(--border-radius-md)';
  titlebarEl.style.userSelect = 'none';
  titlebarEl.style.cursor = 'move';
  
  // Add window icon if provided
  if (windowOptions.icon) {
    const iconEl = document.createElement('img');
    iconEl.src = windowOptions.icon;
    iconEl.alt = '';
    iconEl.style.width = '16px';
    iconEl.style.height = '16px';
    iconEl.style.marginRight = 'var(--spacing-sm)';
    titlebarEl.appendChild(iconEl);
  }
  
  // Add window title
  const titleEl = document.createElement('div');
  titleEl.className = 'os-window-title';
  titleEl.textContent = windowOptions.title;
  titleEl.style.flex = '1';
  titleEl.style.overflow = 'hidden';
  titleEl.style.textOverflow = 'ellipsis';
  titleEl.style.whiteSpace = 'nowrap';
  titleEl.style.fontSize = 'var(--font-size-sm)';
  titlebarEl.appendChild(titleEl);
  
  // Add window controls
  const controlsEl = document.createElement('div');
  controlsEl.className = 'os-window-controls';
  controlsEl.style.display = 'flex';
  controlsEl.style.gap = 'var(--spacing-xs)';
  
  // Minimize button
  if (windowOptions.minimizable) {
    const minimizeEl = createWindowButton('minimize', '−');
    minimizeEl.addEventListener('click', () => minimizeWindow(windowId));
    controlsEl.appendChild(minimizeEl);
  }
  
  // Maximize button
  if (windowOptions.maximizable) {
    const maximizeEl = createWindowButton('maximize', '□');
    maximizeEl.addEventListener('click', () => maximizeWindow(windowId));
    controlsEl.appendChild(maximizeEl);
  }
  
  // Close button
  if (windowOptions.closable) {
    const closeEl = createWindowButton('close', '×');
    closeEl.style.backgroundColor = 'var(--color-error)';
    closeEl.addEventListener('click', () => closeWindow(windowId));
    controlsEl.appendChild(closeEl);
  }
  
  titlebarEl.appendChild(controlsEl);
  windowEl.appendChild(titlebarEl);
  
  // Create window content
  const contentEl = document.createElement('div');
  contentEl.className = 'os-window-content';
  contentEl.style.flex = '1';
  contentEl.style.overflow = 'auto';
  contentEl.style.position = 'relative';
  
  // Add content if provided
  if (windowOptions.content) {
    if (typeof windowOptions.content === 'string') {
      contentEl.innerHTML = windowOptions.content;
    } else if (windowOptions.content instanceof HTMLElement) {
      contentEl.appendChild(windowOptions.content);
    }
  }
  
  windowEl.appendChild(contentEl);
  
  // Add resize handle if window is resizable
  if (windowOptions.resizable) {
    const resizeHandleEl = document.createElement('div');
    resizeHandleEl.className = 'os-window-resize-handle';
    resizeHandleEl.style.position = 'absolute';
    resizeHandleEl.style.bottom = '0';
    resizeHandleEl.style.right = '0';
    resizeHandleEl.style.width = '16px';
    resizeHandleEl.style.height = '16px';
    resizeHandleEl.style.cursor = 'nwse-resize';
    resizeHandleEl.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 14L8 14L14 8L14 14Z" fill="var(--color-text-tertiary)" />
        <path d="M10 14L14 10L14 14L10 14Z" fill="var(--color-text-tertiary)" />
      </svg>
    `;
    windowEl.appendChild(resizeHandleEl);
    
    // Add resize functionality
    setupResizeHandlers(windowEl, resizeHandleEl, windowId, windowOptions);
  }
  
  // Add drag functionality to titlebar
  setupDragHandlers(windowEl, titlebarEl, windowId);
  
  // Add window to DOM
  document.getElementById('window-container').appendChild(windowEl);
  
  // Store window data
  const windowData = {
    id: windowId,
    element: windowEl,
    titlebar: titlebarEl,
    content: contentEl,
    options: windowOptions,
    state: {
      isMinimized: false,
      isMaximized: false,
      originalSize: {
        width: windowOptions.width,
        height: windowOptions.height,
        x: position.x,
        y: position.y,
      },
    },
  };
  
  windows.set(windowId, windowData);
  
  // Focus the new window
  focusWindow(windowId);
  
  // Return window object with public methods
  return {
    id: windowId,
    focus: () => focusWindow(windowId),
    close: () => closeWindow(windowId),
    minimize: () => minimizeWindow(windowId),
    maximize: () => maximizeWindow(windowId),
    restore: () => restoreWindow(windowId),
    move: (x, y) => moveWindow(windowId, x, y),
    resize: (width, height) => resizeWindow(windowId, width, height),
    getElement: () => windowEl,
    getContentElement: () => contentEl,
    setTitle: (title) => {
      titleEl.textContent = title;
      windowData.options.title = title;
    },
    setContent: (content) => {
      if (typeof content === 'string') {
        contentEl.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        contentEl.innerHTML = '';
        contentEl.appendChild(content);
      }
    },
    isMinimized: () => windowData.state.isMinimized,
    isMaximized: () => windowData.state.isMaximized,
  };
}

/**
 * Create a window control button
 * @param {string} name - Button name
 * @param {string} symbol - Button symbol
 * @returns {HTMLElement} Button element
 */
function createWindowButton(name, symbol) {
  const button = document.createElement('button');
  button.className = `os-window-button os-window-${name}`;
  button.setAttribute('aria-label', name);
  button.style.width = '24px';
  button.style.height = '24px';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.backgroundColor = 'var(--color-bg-tertiary)';
  button.style.color = 'var(--color-text-primary)';
  button.style.fontSize = '14px';
  button.style.lineHeight = '1';
  button.style.cursor = 'pointer';
  
  // Use Heroicons
  if (name === 'minimize') {
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`;
  } else if (name === 'maximize') {
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>`;
  } else if (name === 'close') {
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  }
  
  return button;
}

/**
 * Calculate window position
 * @param {Object} options - Window options
 * @returns {Object} Window position {x, y}
 */
function calculateWindowPosition(options) {
  const container = document.getElementById('app-root');
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  let x = options.x;
  let y = options.y;
  
  // Center window if requested
  if (x === 'center') {
    x = Math.max(0, (containerWidth - options.width) / 2);
  }
  
  if (y === 'center') {
    y = Math.max(0, (containerHeight - options.height) / 2);
  }
  
  // Apply cascade effect for new windows
  const windowCount = windows.size;
  if (windowCount > 0) {
    x += windowCount * 20;
    y += windowCount * 20;
  }
  
  // Ensure window is within viewport
  x = Math.min(Math.max(0, x), containerWidth - options.width);
  y = Math.min(Math.max(0, y), containerHeight - options.height);
  
  return { x, y };
}

/**
 * Set up drag handlers for window titlebar
 * @param {HTMLElement} windowEl - Window element
 * @param {HTMLElement} titlebarEl - Titlebar element
 * @param {string} windowId - Window ID
 */
function setupDragHandlers(windowEl, titlebarEl, windowId) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;
  
  titlebarEl.addEventListener('mousedown', (e) => {
    // Ignore if clicking on a button
    if (e.target.tagName === 'BUTTON') return;
    
    // Get window data
    const windowData = windows.get(windowId);
    if (!windowData || windowData.state.isMaximized) return;
    
    // Start dragging
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(windowEl.style.left, 10);
    startTop = parseInt(windowEl.style.top, 10);
    
    // Focus window
    focusWindow(windowId);
    
    // Prevent text selection during drag
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Calculate new position
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const newLeft = startLeft + dx;
    const newTop = startTop + dy;
    
    // Update window position
    windowEl.style.left = `${newLeft}px`;
    windowEl.style.top = `${newTop}px`;
    
    // Call onMove callback if provided
    const windowData = windows.get(windowId);
    if (windowData && windowData.options.onMove) {
      windowData.options.onMove(newLeft, newTop);
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

/**
 * Set up resize handlers for window
 * @param {HTMLElement} windowEl - Window element
 * @param {HTMLElement} handleEl - Resize handle element
 * @param {string} windowId - Window ID
 * @param {Object} options - Window options
 */
function setupResizeHandlers(windowEl, handleEl, windowId, options) {
  let isResizing = false;
  let startX, startY, startWidth, startHeight;
  
  handleEl.addEventListener('mousedown', (e) => {
    // Start resizing
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(windowEl.style.width, 10);
    startHeight = parseInt(windowEl.style.height, 10);
    
    // Focus window
    focusWindow(windowId);
    
    // Prevent text selection during resize
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    
    // Calculate new size
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const newWidth = Math.max(options.minWidth, startWidth + dx);
    const newHeight = Math.max(options.minHeight, startHeight + dy);
    
    // Update window size
    windowEl.style.width = `${newWidth}px`;
    windowEl.style.height = `${newHeight}px`;
    
    // Call onResize callback if provided
    const windowData = windows.get(windowId);
    if (windowData && windowData.options.onResize) {
      windowData.options.onResize(newWidth, newHeight);
    }
  });
  
  document.addEventListener('mouseup', () => {
    isResizing = false;
  });
}

/**
 * Handle global mouse down events for window focus
 * @param {MouseEvent} e - Mouse event
 */
function handleGlobalMouseDown(e) {
  // Find the window element that was clicked
  let windowEl = e.target;
  while (windowEl && !windowEl.id.startsWith('window-')) {
    windowEl = windowEl.parentElement;
  }
  
  // If a window was clicked, focus it
  if (windowEl && windowEl.id.startsWith('window-')) {
    focusWindow(windowEl.id);
  }
}

/**
 * Handle global key down events for window management
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleGlobalKeyDown(e) {
  // Alt+Tab to cycle through windows
  if (e.altKey && e.key === 'Tab') {
    e.preventDefault();
    
    // Get all non-minimized windows
    const visibleWindows = Array.from(windows.values())
      .filter(w => !w.state.isMinimized)
      .map(w => w.id);
    
    if (visibleWindows.length === 0) return;
    
    // Find current active window index
    const currentIndex = visibleWindows.indexOf(activeWindowId);
    
    // Calculate next window index (with shift key for reverse direction)
    const nextIndex = e.shiftKey
      ? (currentIndex <= 0 ? visibleWindows.length - 1 : currentIndex - 1)
      : (currentIndex >= visibleWindows.length - 1 ? 0 : currentIndex + 1);
    
    // Focus next window
    focusWindow(visibleWindows[nextIndex]);
  }
  
  // Alt+F4 to close active window
  if (e.altKey && e.key === 'F4' && activeWindowId) {
    e.preventDefault();
    closeWindow(activeWindowId);
  }
}

/**
 * Focus a window
 * @param {string} windowId - Window ID
 */
function focusWindow(windowId) {
  // Get window data
  const windowData = windows.get(windowId);
  if (!windowData || windowData.state.isMinimized) return;
  
  // Update active window
  const previousActiveWindowId = activeWindowId;
  activeWindowId = windowId;
  
  // Update z-index for all windows
  windows.forEach((data, id) => {
    const zIndex = id === windowId ? ++zIndexCounter : data.element.style.zIndex;
    data.element.style.zIndex = zIndex;
    
    // Update active state
    if (id === windowId) {
      data.element.classList.add('os-window-active');
      data.element.style.boxShadow = 'var(--shadow-xl)';
      
      // Call onFocus callback if provided
      if (data.options.onFocus) {
        data.options.onFocus();
      }
    } else {
      data.element.classList.remove('os-window-active');
      data.element.style.boxShadow = 'var(--shadow-lg)';
      
      // Call onBlur callback if provided
      if (id === previousActiveWindowId && data.options.onBlur) {
        data.options.onBlur();
      }
    }
  });
}

/**
 * Close a window
 * @param {string} windowId - Window ID
 */
function closeWindow(windowId) {
  // Get window data
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  // Call onClose callback if provided
  if (windowData.options.onClose) {
    // Allow callback to cancel close
    const shouldClose = windowData.options.onClose();
    if (shouldClose === false) return;
  }
  
  // Remove window element from DOM
  windowData.element.remove();
  
  // Remove window from store
  windows.delete(windowId);
  
  // Update active window if this was the active one
  if (activeWindowId === windowId) {
    // Find topmost visible window
    const topmostWindow = Array.from(windows.values())
      .filter(w => !w.state.isMinimized)
      .sort((a, b) => parseInt(b.element.style.zIndex, 10) - parseInt(a.element.style.zIndex, 10))[0];
    
    if (topmostWindow) {
      focusWindow(topmostWindow.id);
    } else {
      activeWindowId = null;
    }
  }
}

/**
 * Minimize a window
 * @param {string} windowId - Window ID
 */
function minimizeWindow(windowId) {
  // Get window data
  const windowData = windows.get(windowId);
  if (!windowData || windowData.state.isMinimized) return;
  
  // Hide window
  windowData.element.style.display = 'none';
  
  // Update state
  windowData.state.isMinimized = true;
  
  // Update active window if this was the active one
  if (activeWindowId === windowId) {
    // Find topmost visible window
    const topmostWindow = Array.from(windows.values())
      .filter(w => !w.state.isMinimized)
      .sort((a, b) => parseInt(b.element.style.zIndex, 10) - parseInt(a.element.style.zIndex, 10))[0];
    
    if (topmostWindow) {
      focusWindow(topmostWindow.id);
    } else {
      activeWindowId = null;
    }
  }
  
  // Notify taskbar of minimized window
  window.dispatchEvent(new CustomEvent('window-minimized', { 
    detail: { windowId }
  }));
}

/**
 * Restore a minimized window
 * @param {string} windowId - Window ID
 */
function restoreWindow(windowId) {
  // Get window data
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  // If window is minimized, restore it
  if (windowData.state.isMinimized) {
    windowData.element.style.display = 'flex';
    windowData.state.isMinimized = false;
    focusWindow(windowId);
    return;
  }
  
  // If window is maximized, restore it to original size
  if (windowData.state.isMaximized) {
    const { originalSize } = windowData.state;
    
    windowData.element.style.width = `${originalSize.width}px`;
    windowData.element.style.height = `${originalSize.height}px`;
    windowData.element.style.left = `${originalSize.x}px`;
    windowData.element.style.top = `${originalSize.y}px`;
    windowData.element.style.borderRadius = 'var(--border-radius-md)';
    
    // Update maximize button icon back to maximize
    const maximizeButton = windowData.element.querySelector('.os-window-maximize');
    if (maximizeButton) {
      maximizeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>`;
    }
    
    windowData.state.isMaximized = false;
    
    // Call onResize callback if provided
    if (windowData.options.onResize) {
      windowData.options.onResize(originalSize.width, originalSize.height);
    }
  }
}

/**
 * Maximize a window
 * @param {string} windowId - Window ID
 */
function maximizeWindow(windowId) {
  // Get window data
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  // If already maximized, restore instead
  if (windowData.state.isMaximized) {
    restoreWindow(windowId);
    return;
  }
  
  // Save original size and position
  windowData.state.originalSize = {
    width: parseInt(windowData.element.style.width, 10),
    height: parseInt(windowData.element.style.height, 10),
    x: parseInt(windowData.element.style.left, 10),
    y: parseInt(windowData.element.style.top, 10),
  };
  
  // Get container dimensions
  const container = document.getElementById('app-root');
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight - 60; // Account for top nav
  
  // Maximize window
  windowData.element.style.width = `${containerWidth}px`;
  windowData.element.style.height = `${containerHeight}px`;
  windowData.element.style.left = '0';
  windowData.element.style.top = '40px'; // Below top nav
  windowData.element.style.borderRadius = '0';
  
  // Update maximize button icon to use restore icon
  const maximizeButton = windowData.element.querySelector('.os-window-maximize');
  if (maximizeButton) {
    maximizeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="10" height="10" rx="1" ry="1"/><rect x="11" y="11" width="10" height="10" rx="1" ry="1"/></svg>`;
  }
  
  // Update state
  windowData.state.isMaximized = true;
  
  // Focus window
  focusWindow(windowId);
  
  // Call onResize callback if provided
  if (windowData.options.onResize) {
    windowData.options.onResize(containerWidth, containerHeight);
  }
}

/**
 * Move a window
 * @param {string} windowId - Window ID
 * @param {number} x - X position
 * @param {number} y - Y position
 */
function moveWindow(windowId, x, y) {
  // Get window data
  const windowData = windows.get(windowId);
  if (!windowData || windowData.state.isMaximized) return;
  
  // Update window position
  windowData.element.style.left = `${x}px`;
  windowData.element.style.top = `${y}px`;
  
  // Call onMove callback if provided
  if (windowData.options.onMove) {
    windowData.options.onMove(x, y);
  }
}

/**
 * Resize a window
 * @param {string} windowId - Window ID
 * @param {number} width - Width
 * @param {number} height - Height
 */
function resizeWindow(windowId, width, height) {
  // Get window data
  const windowData = windows.get(windowId);
  if (!windowData || windowData.state.isMaximized) return;
  
  // Ensure minimum size
  const minWidth = windowData.options.minWidth;
  const minHeight = windowData.options.minHeight;
  width = Math.max(minWidth, width);
  height = Math.max(minHeight, height);
  
  // Update window size
  windowData.element.style.width = `${width}px`;
  windowData.element.style.height = `${height}px`;
  
  // Call onResize callback if provided
  if (windowData.options.onResize) {
    windowData.options.onResize(width, height);
  }
}

/**
 * Get the active window
 * @returns {Object|null} Active window data or null if no active window
 */
function getActiveWindow() {
  if (!activeWindowId) return null;
  return windows.get(activeWindowId);
}

/**
 * Get all windows
 * @returns {Map} Map of all windows
 */
function getAllWindows() {
  return windows;
}