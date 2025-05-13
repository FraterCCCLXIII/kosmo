/**
 * Button Component
 * Accessible, styled button with states
 */

/**
 * Create a button element with various options
 * @param {Object} options - Button configuration
 * @param {string} options.text - Button text
 * @param {string} options.variant - Button style variant (primary, secondary, text, icon)
 * @param {string} options.size - Button size (small, medium, large)
 * @param {Function} options.onClick - Click event handler
 * @param {string} options.icon - Optional icon SVG string
 * @param {boolean} options.disabled - Whether button is disabled
 * @param {string} options.ariaLabel - Accessibility label
 * @param {string} options.id - Button ID
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLButtonElement} Button element
 */
export function createButton(options = {}) {
  const {
    text = '',
    variant = 'primary',
    size = 'medium',
    onClick,
    icon,
    disabled = false,
    ariaLabel,
    id,
    className = '',
  } = options;

  // Create button element
  const button = document.createElement('button');
  
  // Set attributes
  if (id) button.id = id;
  button.className = `kosmo-button kosmo-button-${variant} kosmo-button-${size} ${className}`.trim();
  button.disabled = disabled;
  if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
  
  // Set styles based on variant and size
  applyButtonStyles(button, variant, size, disabled);
  
  // Add icon if provided
  if (icon) {
    const iconElement = document.createElement('span');
    iconElement.className = 'kosmo-button-icon';
    iconElement.innerHTML = icon;
    iconElement.style.display = 'inline-flex';
    iconElement.style.alignItems = 'center';
    iconElement.style.justifyContent = 'center';
    
    // Size the icon based on button size
    const iconSize = size === 'small' ? '16px' : size === 'large' ? '24px' : '20px';
    iconElement.style.width = iconSize;
    iconElement.style.height = iconSize;
    
    button.appendChild(iconElement);
  }
  
  // Add text if provided
  if (text) {
    const textElement = document.createElement('span');
    textElement.className = 'kosmo-button-text';
    textElement.textContent = text;
    button.appendChild(textElement);
  }
  
  // Add click handler
  if (onClick && typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }
  
  // Add hover and focus effects
  addButtonInteractions(button, variant);
  
  return button;
}

/**
 * Apply button styles based on variant and size
 * @param {HTMLButtonElement} button - Button element
 * @param {string} variant - Button style variant
 * @param {string} size - Button size
 * @param {boolean} disabled - Whether button is disabled
 */
function applyButtonStyles(button, variant, size, disabled) {
  // Base styles
  button.style.display = 'inline-flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.gap = '8px';
  button.style.border = 'none';
  button.style.borderRadius = '6px';
  button.style.fontFamily = 'inherit';
  button.style.fontWeight = '500';
  button.style.cursor = disabled ? 'not-allowed' : 'pointer';
  button.style.transition = 'all 0.2s ease';
  
  // Size styles
  if (size === 'small') {
    button.style.padding = '6px 12px';
    button.style.fontSize = '14px';
  } else if (size === 'large') {
    button.style.padding = '12px 24px';
    button.style.fontSize = '18px';
  } else { // medium (default)
    button.style.padding = '8px 16px';
    button.style.fontSize = '16px';
  }
  
  // Icon-only button adjustments
  if (variant === 'icon') {
    button.style.padding = size === 'small' ? '6px' : size === 'large' ? '12px' : '8px';
  }
  
  // Variant styles
  if (variant === 'primary') {
    button.style.backgroundColor = disabled ? 'var(--color-primary-disabled, #a0aec0)' : 'var(--color-primary, #3182ce)';
    button.style.color = 'white';
  } else if (variant === 'secondary') {
    button.style.backgroundColor = 'transparent';
    button.style.border = `1px solid ${disabled ? 'var(--color-border-disabled, #cbd5e0)' : 'var(--color-border, #e2e8f0)'}`;
    button.style.color = disabled ? 'var(--color-text-disabled, #a0aec0)' : 'var(--color-text, #4a5568)';
  } else if (variant === 'text') {
    button.style.backgroundColor = 'transparent';
    button.style.color = disabled ? 'var(--color-text-disabled, #a0aec0)' : 'var(--color-primary, #3182ce)';
    button.style.padding = size === 'small' ? '4px 8px' : size === 'large' ? '8px 16px' : '6px 12px';
  } else if (variant === 'icon') {
    button.style.backgroundColor = 'transparent';
    button.style.color = disabled ? 'var(--color-text-disabled, #a0aec0)' : 'var(--color-text, #4a5568)';
    button.style.borderRadius = '50%';
  }
  
  // Disabled opacity
  if (disabled) {
    button.style.opacity = '0.6';
  }
}

/**
 * Add hover and focus effects to button
 * @param {HTMLButtonElement} button - Button element
 * @param {string} variant - Button style variant
 */
function addButtonInteractions(button, variant) {
  // Store original styles
  const originalBgColor = button.style.backgroundColor;
  const originalColor = button.style.color;
  const originalBorder = button.style.border;
  
  // Hover effect
  button.addEventListener('mouseenter', () => {
    if (button.disabled) return;
    
    if (variant === 'primary') {
      button.style.backgroundColor = 'var(--color-primary-hover, #2b6cb0)';
    } else if (variant === 'secondary') {
      button.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
    } else if (variant === 'text') {
      button.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
    } else if (variant === 'icon') {
      button.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
    }
  });
  
  button.addEventListener('mouseleave', () => {
    if (button.disabled) return;
    button.style.backgroundColor = originalBgColor;
  });
  
  // Focus effect
  button.addEventListener('focus', () => {
    if (button.disabled) return;
    button.style.boxShadow = '0 0 0 3px var(--color-focus-ring, rgba(66, 153, 225, 0.5))';
  });
  
  button.addEventListener('blur', () => {
    button.style.boxShadow = 'none';
  });
  
  // Active effect
  button.addEventListener('mousedown', () => {
    if (button.disabled) return;
    
    if (variant === 'primary') {
      button.style.backgroundColor = 'var(--color-primary-active, #2c5282)';
    } else if (variant === 'secondary') {
      button.style.backgroundColor = 'var(--color-bg-active, #e2e8f0)';
    } else if (variant === 'text') {
      button.style.backgroundColor = 'var(--color-bg-active, #e2e8f0)';
    } else if (variant === 'icon') {
      button.style.backgroundColor = 'var(--color-bg-active, #e2e8f0)';
    }
  });
  
  button.addEventListener('mouseup', () => {
    if (button.disabled) return;
    
    if (variant === 'primary') {
      button.style.backgroundColor = 'var(--color-primary-hover, #2b6cb0)';
    } else if (variant === 'secondary') {
      button.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
    } else if (variant === 'text') {
      button.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
    } else if (variant === 'icon') {
      button.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
    }
  });
}

/**
 * Update button text
 * @param {HTMLButtonElement} button - Button element
 * @param {string} text - New button text
 */
export function updateButtonText(button, text) {
  const textElement = button.querySelector('.kosmo-button-text');
  if (textElement) {
    textElement.textContent = text;
  } else if (text) {
    const newTextElement = document.createElement('span');
    newTextElement.className = 'kosmo-button-text';
    newTextElement.textContent = text;
    button.appendChild(newTextElement);
  }
}

/**
 * Update button icon
 * @param {HTMLButtonElement} button - Button element
 * @param {string} icon - New icon SVG string
 */
export function updateButtonIcon(button, icon) {
  const iconElement = button.querySelector('.kosmo-button-icon');
  if (iconElement) {
    if (icon) {
      iconElement.innerHTML = icon;
    } else {
      button.removeChild(iconElement);
    }
  } else if (icon) {
    const newIconElement = document.createElement('span');
    newIconElement.className = 'kosmo-button-icon';
    newIconElement.innerHTML = icon;
    newIconElement.style.display = 'inline-flex';
    newIconElement.style.alignItems = 'center';
    newIconElement.style.justifyContent = 'center';
    
    // Get button size
    const buttonClass = Array.from(button.classList).find(cls => cls.startsWith('kosmo-button-') && (cls.endsWith('-small') || cls.endsWith('-medium') || cls.endsWith('-large')));
    const size = buttonClass ? buttonClass.split('-').pop() : 'medium';
    
    // Size the icon based on button size
    const iconSize = size === 'small' ? '16px' : size === 'large' ? '24px' : '20px';
    newIconElement.style.width = iconSize;
    newIconElement.style.height = iconSize;
    
    button.insertBefore(newIconElement, button.firstChild);
  }
}

/**
 * Enable or disable a button
 * @param {HTMLButtonElement} button - Button element
 * @param {boolean} disabled - Whether to disable the button
 */
export function setButtonDisabled(button, disabled) {
  button.disabled = disabled;
  
  // Update styles
  if (disabled) {
    button.style.cursor = 'not-allowed';
    button.style.opacity = '0.6';
    
    // Get button variant
    const variantClass = Array.from(button.classList).find(cls => 
      cls.startsWith('kosmo-button-') && 
      !cls.endsWith('-small') && 
      !cls.endsWith('-medium') && 
      !cls.endsWith('-large')
    );
    const variant = variantClass ? variantClass.replace('kosmo-button-', '') : 'primary';
    
    if (variant === 'primary') {
      button.style.backgroundColor = 'var(--color-primary-disabled, #a0aec0)';
    } else {
      button.style.color = 'var(--color-text-disabled, #a0aec0)';
      if (variant === 'secondary') {
        button.style.border = '1px solid var(--color-border-disabled, #cbd5e0)';
      }
    }
  } else {
    // Re-apply original styles by getting variant and size from class names
    const variantClass = Array.from(button.classList).find(cls => 
      cls.startsWith('kosmo-button-') && 
      !cls.endsWith('-small') && 
      !cls.endsWith('-medium') && 
      !cls.endsWith('-large')
    );
    const sizeClass = Array.from(button.classList).find(cls => 
      cls.startsWith('kosmo-button-') && 
      (cls.endsWith('-small') || cls.endsWith('-medium') || cls.endsWith('-large'))
    );
    
    const variant = variantClass ? variantClass.replace('kosmo-button-', '') : 'primary';
    const size = sizeClass ? sizeClass.replace('kosmo-button-', '') : 'medium';
    
    applyButtonStyles(button, variant, size, false);
  }
}