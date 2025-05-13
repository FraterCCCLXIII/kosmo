/**
 * Toast Component
 * Notification popups for user feedback
 */

// Store for active toasts
const toastStore = {
  container: null,
  toasts: [],
  maxToasts: 5,
  defaultDuration: 5000, // 5 seconds
};

/**
 * Initialize the toast container
 * @returns {HTMLDivElement} Toast container element
 */
export function initToastContainer() {
  // Check if container already exists
  if (toastStore.container) {
    return toastStore.container;
  }
  
  // Create container
  const container = document.createElement('div');
  container.className = 'kosmo-toast-container';
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'polite');
  
  // Apply container styles
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '10px';
  container.style.zIndex = '9999';
  container.style.maxWidth = '350px';
  container.style.width = '100%';
  
  // Add to document
  document.body.appendChild(container);
  
  // Store reference
  toastStore.container = container;
  
  return container;
}

/**
 * Show a toast notification
 * @param {Object} options - Toast configuration
 * @param {string} options.message - Toast message
 * @param {string} options.type - Toast type (info, success, warning, error)
 * @param {number} options.duration - Duration in milliseconds (0 for persistent)
 * @param {boolean} options.dismissible - Whether toast can be dismissed
 * @param {Function} options.onDismiss - Callback when toast is dismissed
 * @returns {Object} Toast control object with dismiss method
 */
export function showToast(options = {}) {
  const {
    message = '',
    type = 'info',
    duration = toastStore.defaultDuration,
    dismissible = true,
    onDismiss,
  } = options;

  // Ensure container exists
  if (!toastStore.container) {
    initToastContainer();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `kosmo-toast kosmo-toast-${type}`;
  toast.setAttribute('role', 'status');
  
  // Apply toast styles
  applyToastStyles(toast, type);
  
  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'kosmo-toast-content';
  contentWrapper.style.display = 'flex';
  contentWrapper.style.alignItems = 'flex-start';
  contentWrapper.style.gap = '10px';
  contentWrapper.style.flex = '1';
  
  // Add icon based on type
  const icon = document.createElement('div');
  icon.className = 'kosmo-toast-icon';
  icon.style.flexShrink = '0';
  icon.style.display = 'flex';
  icon.style.alignItems = 'center';
  icon.style.justifyContent = 'center';
  icon.style.width = '20px';
  icon.style.height = '20px';
  
  // Set icon content based on type
  switch (type) {
    case 'success':
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>`;
      break;
    case 'warning':
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>`;
      break;
    case 'error':
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>`;
      break;
    case 'info':
    default:
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>`;
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = 'kosmo-toast-message';
  messageElement.textContent = message;
  messageElement.style.flex = '1';
  
  // Add dismiss button if dismissible
  let dismissButton = null;
  if (dismissible) {
    dismissButton = document.createElement('button');
    dismissButton.className = 'kosmo-toast-dismiss';
    dismissButton.setAttribute('aria-label', 'Dismiss notification');
    dismissButton.style.background = 'transparent';
    dismissButton.style.border = 'none';
    dismissButton.style.cursor = 'pointer';
    dismissButton.style.padding = '0';
    dismissButton.style.color = 'inherit';
    dismissButton.style.opacity = '0.7';
    dismissButton.style.marginLeft = '10px';
    dismissButton.style.flexShrink = '0';
    dismissButton.style.display = 'flex';
    dismissButton.style.alignItems = 'center';
    dismissButton.style.justifyContent = 'center';
    dismissButton.style.width = '20px';
    dismissButton.style.height = '20px';
    
    dismissButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>`;
    
    dismissButton.addEventListener('mouseenter', () => {
      dismissButton.style.opacity = '1';
    });
    
    dismissButton.addEventListener('mouseleave', () => {
      dismissButton.style.opacity = '0.7';
    });
  }
  
  // Assemble the toast
  contentWrapper.appendChild(icon);
  contentWrapper.appendChild(messageElement);
  toast.appendChild(contentWrapper);
  if (dismissButton) {
    toast.appendChild(dismissButton);
  }
  
  // Add to container
  toastStore.container.appendChild(toast);
  
  // Add to store
  const toastId = Date.now();
  toastStore.toasts.push({
    id: toastId,
    element: toast,
    timer: null,
  });
  
  // Limit number of toasts
  if (toastStore.toasts.length > toastStore.maxToasts) {
    const oldestToast = toastStore.toasts.shift();
    dismissToast(oldestToast.id);
  }
  
  // Create dismiss function
  const dismiss = () => {
    dismissToast(toastId);
    if (onDismiss && typeof onDismiss === 'function') {
      onDismiss();
    }
  };
  
  // Add click handler to dismiss button
  if (dismissButton) {
    dismissButton.addEventListener('click', dismiss);
  }
  
  // Set auto-dismiss timer if duration > 0
  if (duration > 0) {
    const toastIndex = toastStore.toasts.findIndex(t => t.id === toastId);
    if (toastIndex !== -1) {
      toastStore.toasts[toastIndex].timer = setTimeout(dismiss, duration);
    }
  }
  
  // Add entrance animation
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(100%)';
  
  // Trigger reflow
  void toast.offsetWidth;
  
  // Apply transition
  toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(0)';
  
  // Return control object
  return {
    dismiss,
    id: toastId,
  };
}

/**
 * Dismiss a toast by ID
 * @param {number} id - Toast ID
 */
function dismissToast(id) {
  const toastIndex = toastStore.toasts.findIndex(t => t.id === id);
  if (toastIndex === -1) return;
  
  const toast = toastStore.toasts[toastIndex];
  
  // Clear timer if exists
  if (toast.timer) {
    clearTimeout(toast.timer);
  }
  
  // Add exit animation
  toast.element.style.opacity = '0';
  toast.element.style.transform = 'translateX(100%)';
  
  // Remove after animation
  setTimeout(() => {
    if (toast.element.parentNode) {
      toast.element.parentNode.removeChild(toast.element);
    }
    
    // Remove from store
    const currentIndex = toastStore.toasts.findIndex(t => t.id === id);
    if (currentIndex !== -1) {
      toastStore.toasts.splice(currentIndex, 1);
    }
  }, 300);
}

/**
 * Apply styles to toast element
 * @param {HTMLDivElement} toast - Toast element
 * @param {string} type - Toast type
 */
function applyToastStyles(toast, type) {
  // Base styles
  toast.style.display = 'flex';
  toast.style.alignItems = 'flex-start';
  toast.style.justifyContent = 'space-between';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '6px';
  toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  toast.style.fontFamily = 'inherit';
  toast.style.fontSize = '14px';
  toast.style.lineHeight = '1.5';
  toast.style.width = '100%';
  toast.style.boxSizing = 'border-box';
  
  // Type-specific styles
  switch (type) {
    case 'success':
      toast.style.backgroundColor = 'var(--color-success-bg, #f0fff4)';
      toast.style.color = 'var(--color-success, #38a169)';
      toast.style.borderLeft = '4px solid var(--color-success, #38a169)';
      break;
    case 'warning':
      toast.style.backgroundColor = 'var(--color-warning-bg, #fffaf0)';
      toast.style.color = 'var(--color-warning, #dd6b20)';
      toast.style.borderLeft = '4px solid var(--color-warning, #dd6b20)';
      break;
    case 'error':
      toast.style.backgroundColor = 'var(--color-error-bg, #fff5f5)';
      toast.style.color = 'var(--color-error, #e53e3e)';
      toast.style.borderLeft = '4px solid var(--color-error, #e53e3e)';
      break;
    case 'info':
    default:
      toast.style.backgroundColor = 'var(--color-info-bg, #ebf8ff)';
      toast.style.color = 'var(--color-info, #3182ce)';
      toast.style.borderLeft = '4px solid var(--color-info, #3182ce)';
  }
}

/**
 * Show an info toast
 * @param {string} message - Toast message
 * @param {Object} options - Additional toast options
 * @returns {Object} Toast control object
 */
export function showInfoToast(message, options = {}) {
  return showToast({
    message,
    type: 'info',
    ...options,
  });
}

/**
 * Show a success toast
 * @param {string} message - Toast message
 * @param {Object} options - Additional toast options
 * @returns {Object} Toast control object
 */
export function showSuccessToast(message, options = {}) {
  return showToast({
    message,
    type: 'success',
    ...options,
  });
}

/**
 * Show a warning toast
 * @param {string} message - Toast message
 * @param {Object} options - Additional toast options
 * @returns {Object} Toast control object
 */
export function showWarningToast(message, options = {}) {
  return showToast({
    message,
    type: 'warning',
    ...options,
  });
}

/**
 * Show an error toast
 * @param {string} message - Toast message
 * @param {Object} options - Additional toast options
 * @returns {Object} Toast control object
 */
export function showErrorToast(message, options = {}) {
  return showToast({
    message,
    type: 'error',
    ...options,
  });
}

/**
 * Set the maximum number of toasts to display at once
 * @param {number} max - Maximum number of toasts
 */
export function setMaxToasts(max) {
  if (typeof max === 'number' && max > 0) {
    toastStore.maxToasts = max;
    
    // Remove excess toasts if needed
    while (toastStore.toasts.length > toastStore.maxToasts) {
      const oldestToast = toastStore.toasts.shift();
      dismissToast(oldestToast.id);
    }
  }
}

/**
 * Set the default duration for toasts
 * @param {number} duration - Default duration in milliseconds
 */
export function setDefaultToastDuration(duration) {
  if (typeof duration === 'number' && duration >= 0) {
    toastStore.defaultDuration = duration;
  }
}

/**
 * Dismiss all active toasts
 */
export function dismissAllToasts() {
  // Create a copy of the toasts array to avoid issues during iteration
  const toastsCopy = [...toastStore.toasts];
  
  // Dismiss each toast
  toastsCopy.forEach(toast => {
    dismissToast(toast.id);
  });
}

/**
 * Set the position of the toast container
 * @param {string} position - Position (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
 */
export function setToastPosition(position) {
  if (!toastStore.container) {
    initToastContainer();
  }
  
  // Reset positions
  toastStore.container.style.top = 'auto';
  toastStore.container.style.right = 'auto';
  toastStore.container.style.bottom = 'auto';
  toastStore.container.style.left = 'auto';
  toastStore.container.style.transform = 'none';
  
  // Set position based on parameter
  switch (position) {
    case 'top-right':
      toastStore.container.style.top = '20px';
      toastStore.container.style.right = '20px';
      break;
    case 'top-left':
      toastStore.container.style.top = '20px';
      toastStore.container.style.left = '20px';
      break;
    case 'bottom-left':
      toastStore.container.style.bottom = '20px';
      toastStore.container.style.left = '20px';
      break;
    case 'top-center':
      toastStore.container.style.top = '20px';
      toastStore.container.style.left = '50%';
      toastStore.container.style.transform = 'translateX(-50%)';
      break;
    case 'bottom-center':
      toastStore.container.style.bottom = '20px';
      toastStore.container.style.left = '50%';
      toastStore.container.style.transform = 'translateX(-50%)';
      break;
    case 'bottom-right':
    default:
      toastStore.container.style.bottom = '20px';
      toastStore.container.style.right = '20px';
  }
}