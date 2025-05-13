/**
 * Loader Component
 * Loading spinner and progress indicators
 */

/**
 * Create a spinner loader
 * @param {Object} options - Spinner configuration
 * @param {string} options.size - Spinner size (small, medium, large)
 * @param {string} options.color - Spinner color (primary, secondary, or CSS color)
 * @param {string} options.thickness - Spinner thickness (thin, medium, thick)
 * @param {string} options.label - Accessibility label
 * @param {string} options.id - Spinner ID
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLDivElement} Spinner element
 */
export function createSpinner(options = {}) {
  const {
    size = 'medium',
    color = 'primary',
    thickness = 'medium',
    label = 'Loading...',
    id,
    className = '',
  } = options;

  // Create spinner container
  const spinner = document.createElement('div');
  if (id) spinner.id = id;
  spinner.className = `kosmo-spinner kosmo-spinner-${size} ${className}`.trim();
  spinner.setAttribute('role', 'status');
  spinner.setAttribute('aria-label', label);
  
  // Apply spinner styles
  applySpinnerStyles(spinner, size, color, thickness);
  
  // Create visually hidden text for screen readers
  const srText = document.createElement('span');
  srText.className = 'kosmo-spinner-sr-text';
  srText.textContent = label;
  srText.style.position = 'absolute';
  srText.style.width = '1px';
  srText.style.height = '1px';
  srText.style.padding = '0';
  srText.style.margin = '-1px';
  srText.style.overflow = 'hidden';
  srText.style.clip = 'rect(0, 0, 0, 0)';
  srText.style.whiteSpace = 'nowrap';
  srText.style.borderWidth = '0';
  
  // Add to spinner
  spinner.appendChild(srText);
  
  return spinner;
}

/**
 * Apply styles to spinner element
 * @param {HTMLDivElement} spinner - Spinner element
 * @param {string} size - Spinner size
 * @param {string} color - Spinner color
 * @param {string} thickness - Spinner thickness
 */
function applySpinnerStyles(spinner, size, color, thickness) {
  // Base styles
  spinner.style.display = 'inline-block';
  spinner.style.borderRadius = '50%';
  spinner.style.borderStyle = 'solid';
  spinner.style.borderColor = 'rgba(0, 0, 0, 0.1)';
  spinner.style.borderTopColor = getSpinnerColor(color);
  spinner.style.animation = 'kosmo-spinner-rotate 0.8s linear infinite';
  
  // Add keyframes if not already added
  if (!document.getElementById('kosmo-spinner-keyframes')) {
    const style = document.createElement('style');
    style.id = 'kosmo-spinner-keyframes';
    style.textContent = `
      @keyframes kosmo-spinner-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Size styles
  let spinnerSize;
  switch (size) {
    case 'small':
      spinnerSize = '16px';
      break;
    case 'large':
      spinnerSize = '48px';
      break;
    case 'medium':
    default:
      spinnerSize = '32px';
  }
  
  spinner.style.width = spinnerSize;
  spinner.style.height = spinnerSize;
  
  // Thickness styles
  let borderWidth;
  switch (thickness) {
    case 'thin':
      borderWidth = '2px';
      break;
    case 'thick':
      borderWidth = '4px';
      break;
    case 'medium':
    default:
      borderWidth = '3px';
  }
  
  spinner.style.borderWidth = borderWidth;
}

/**
 * Get spinner color based on theme or custom color
 * @param {string} color - Color name or CSS color
 * @returns {string} CSS color value
 */
function getSpinnerColor(color) {
  switch (color) {
    case 'primary':
      return 'var(--color-primary, #3182ce)';
    case 'secondary':
      return 'var(--color-secondary, #718096)';
    case 'success':
      return 'var(--color-success, #38a169)';
    case 'warning':
      return 'var(--color-warning, #dd6b20)';
    case 'error':
      return 'var(--color-error, #e53e3e)';
    case 'info':
      return 'var(--color-info, #3182ce)';
    default:
      return color; // Assume it's a valid CSS color
  }
}

/**
 * Create a progress bar
 * @param {Object} options - Progress bar configuration
 * @param {number} options.value - Current progress value (0-100)
 * @param {string} options.color - Progress bar color (primary, secondary, or CSS color)
 * @param {string} options.size - Progress bar size (small, medium, large)
 * @param {boolean} options.showLabel - Whether to show percentage label
 * @param {string} options.label - Accessibility label
 * @param {string} options.id - Progress bar ID
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLDivElement} Progress bar container element
 */
export function createProgressBar(options = {}) {
  const {
    value = 0,
    color = 'primary',
    size = 'medium',
    showLabel = false,
    label = 'Loading...',
    id,
    className = '',
  } = options;

  // Create container
  const container = document.createElement('div');
  if (id) container.id = id;
  container.className = `kosmo-progress-container kosmo-progress-${size} ${className}`.trim();
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'kosmo-progress-bar';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-valuenow', value);
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  progressBar.setAttribute('aria-label', label);
  
  // Create progress track
  const progressTrack = document.createElement('div');
  progressTrack.className = 'kosmo-progress-track';
  
  // Create progress fill
  const progressFill = document.createElement('div');
  progressFill.className = 'kosmo-progress-fill';
  
  // Apply styles
  applyProgressBarStyles(container, progressTrack, progressFill, value, color, size);
  
  // Create label if needed
  let labelElement = null;
  if (showLabel) {
    labelElement = document.createElement('div');
    labelElement.className = 'kosmo-progress-label';
    labelElement.textContent = `${Math.round(value)}%`;
    
    // Apply label styles
    labelElement.style.marginLeft = '8px';
    labelElement.style.fontSize = size === 'small' ? '12px' : size === 'large' ? '16px' : '14px';
    labelElement.style.fontWeight = '500';
    labelElement.style.color = 'var(--color-text, #4a5568)';
  }
  
  // Assemble the component
  progressFill.style.width = `${value}%`;
  progressTrack.appendChild(progressFill);
  progressBar.appendChild(progressTrack);
  container.appendChild(progressBar);
  if (labelElement) {
    container.appendChild(labelElement);
  }
  
  // Add API methods to container
  container.setValue = (newValue) => {
    const clampedValue = Math.max(0, Math.min(100, newValue));
    progressBar.setAttribute('aria-valuenow', clampedValue);
    progressFill.style.width = `${clampedValue}%`;
    if (labelElement) {
      labelElement.textContent = `${Math.round(clampedValue)}%`;
    }
  };
  
  container.setColor = (newColor) => {
    progressFill.style.backgroundColor = getSpinnerColor(newColor);
  };
  
  return container;
}

/**
 * Apply styles to progress bar elements
 * @param {HTMLDivElement} container - Container element
 * @param {HTMLDivElement} track - Track element
 * @param {HTMLDivElement} fill - Fill element
 * @param {number} value - Current progress value
 * @param {string} color - Progress bar color
 * @param {string} size - Progress bar size
 */
function applyProgressBarStyles(container, track, fill, value, color, size) {
  // Container styles
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.width = '100%';
  
  // Progress bar styles
  const progressBar = container.querySelector('.kosmo-progress-bar');
  if (progressBar) {
    progressBar.style.flex = '1';
  }
  
  // Track styles
  track.style.width = '100%';
  track.style.backgroundColor = 'var(--color-bg-secondary, #edf2f7)';
  track.style.borderRadius = '9999px';
  track.style.overflow = 'hidden';
  
  // Size-specific styles
  switch (size) {
    case 'small':
      track.style.height = '4px';
      break;
    case 'large':
      track.style.height = '12px';
      break;
    case 'medium':
    default:
      track.style.height = '8px';
  }
  
  // Fill styles
  fill.style.height = '100%';
  fill.style.width = `${value}%`;
  fill.style.backgroundColor = getSpinnerColor(color);
  fill.style.borderRadius = '9999px';
  fill.style.transition = 'width 0.3s ease';
}

/**
 * Create a circular progress indicator
 * @param {Object} options - Circular progress configuration
 * @param {number} options.value - Current progress value (0-100)
 * @param {string} options.color - Progress color (primary, secondary, or CSS color)
 * @param {string} options.size - Progress size (small, medium, large)
 * @param {string} options.thickness - Circle thickness (thin, medium, thick)
 * @param {boolean} options.showLabel - Whether to show percentage label
 * @param {string} options.label - Accessibility label
 * @param {string} options.id - Progress ID
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLDivElement} Circular progress container element
 */
export function createCircularProgress(options = {}) {
  const {
    value = 0,
    color = 'primary',
    size = 'medium',
    thickness = 'medium',
    showLabel = false,
    label = 'Loading...',
    id,
    className = '',
  } = options;

  // Create container
  const container = document.createElement('div');
  if (id) container.id = id;
  container.className = `kosmo-circular-progress kosmo-circular-progress-${size} ${className}`.trim();
  container.setAttribute('role', 'progressbar');
  container.setAttribute('aria-valuenow', value);
  container.setAttribute('aria-valuemin', '0');
  container.setAttribute('aria-valuemax', '100');
  container.setAttribute('aria-label', label);
  
  // Apply container styles
  applyCircularProgressStyles(container, value, color, size, thickness);
  
  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  
  // Create background circle
  const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  bgCircle.setAttribute('cx', '50');
  bgCircle.setAttribute('cy', '50');
  bgCircle.setAttribute('r', '45');
  bgCircle.setAttribute('fill', 'none');
  bgCircle.setAttribute('stroke', 'var(--color-bg-secondary, #edf2f7)');
  
  // Set stroke width based on thickness
  let strokeWidth;
  switch (thickness) {
    case 'thin':
      strokeWidth = '5';
      break;
    case 'thick':
      strokeWidth = '10';
      break;
    case 'medium':
    default:
      strokeWidth = '8';
  }
  
  bgCircle.setAttribute('stroke-width', strokeWidth);
  
  // Create progress circle
  const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  progressCircle.setAttribute('cx', '50');
  progressCircle.setAttribute('cy', '50');
  progressCircle.setAttribute('r', '45');
  progressCircle.setAttribute('fill', 'none');
  progressCircle.setAttribute('stroke', getSpinnerColor(color));
  progressCircle.setAttribute('stroke-width', strokeWidth);
  progressCircle.setAttribute('stroke-linecap', 'round');
  
  // Calculate stroke-dasharray and stroke-dashoffset
  const circumference = 2 * Math.PI * 45;
  progressCircle.setAttribute('stroke-dasharray', circumference);
  progressCircle.setAttribute('stroke-dashoffset', circumference - (value / 100) * circumference);
  
  // Add circles to SVG
  svg.appendChild(bgCircle);
  svg.appendChild(progressCircle);
  
  // Add SVG to container
  container.appendChild(svg);
  
  // Create label if needed
  if (showLabel) {
    const labelElement = document.createElement('div');
    labelElement.className = 'kosmo-circular-progress-label';
    labelElement.textContent = `${Math.round(value)}%`;
    
    // Apply label styles
    labelElement.style.position = 'absolute';
    labelElement.style.top = '50%';
    labelElement.style.left = '50%';
    labelElement.style.transform = 'translate(-50%, -50%)';
    labelElement.style.fontSize = size === 'small' ? '12px' : size === 'large' ? '18px' : '14px';
    labelElement.style.fontWeight = '600';
    labelElement.style.color = 'var(--color-text, #4a5568)';
    
    container.appendChild(labelElement);
  }
  
  // Add API methods to container
  container.setValue = (newValue) => {
    const clampedValue = Math.max(0, Math.min(100, newValue));
    container.setAttribute('aria-valuenow', clampedValue);
    
    const progressCircle = container.querySelector('circle:nth-child(2)');
    if (progressCircle) {
      const circumference = 2 * Math.PI * 45;
      progressCircle.setAttribute('stroke-dashoffset', circumference - (clampedValue / 100) * circumference);
    }
    
    const labelElement = container.querySelector('.kosmo-circular-progress-label');
    if (labelElement) {
      labelElement.textContent = `${Math.round(clampedValue)}%`;
    }
  };
  
  container.setColor = (newColor) => {
    const progressCircle = container.querySelector('circle:nth-child(2)');
    if (progressCircle) {
      progressCircle.setAttribute('stroke', getSpinnerColor(newColor));
    }
  };
  
  return container;
}

/**
 * Apply styles to circular progress container
 * @param {HTMLDivElement} container - Container element
 * @param {number} value - Current progress value
 * @param {string} color - Progress color
 * @param {string} size - Progress size
 * @param {string} thickness - Circle thickness
 */
function applyCircularProgressStyles(container, value, color, size, thickness) {
  // Base styles
  container.style.position = 'relative';
  container.style.display = 'inline-block';
  
  // Size styles
  let containerSize;
  switch (size) {
    case 'small':
      containerSize = '32px';
      break;
    case 'large':
      containerSize = '96px';
      break;
    case 'medium':
    default:
      containerSize = '64px';
  }
  
  container.style.width = containerSize;
  container.style.height = containerSize;
  
  // SVG styles
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.transform = 'rotate(-90deg)';
  svg.style.width = '100%';
  svg.style.height = '100%';
}