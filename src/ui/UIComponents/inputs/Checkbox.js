/**
 * Checkbox Component
 * Checkbox with label and aria support
 */

/**
 * Create a checkbox with label
 * @param {Object} options - Checkbox configuration
 * @param {string} options.id - Checkbox ID
 * @param {string} options.name - Checkbox name attribute
 * @param {string} options.label - Label text
 * @param {boolean} options.checked - Whether checkbox is checked
 * @param {boolean} options.disabled - Whether checkbox is disabled
 * @param {boolean} options.required - Whether checkbox is required
 * @param {string} options.helperText - Helper text displayed below checkbox
 * @param {string} options.errorText - Error text displayed when validation fails
 * @param {Function} options.onChange - Change event handler
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLDivElement} Checkbox container element
 */
export function createCheckbox(options = {}) {
  const {
    id,
    name,
    label,
    checked = false,
    disabled = false,
    required = false,
    helperText = '',
    errorText = '',
    onChange,
    className = '',
  } = options;

  // Create container
  const container = document.createElement('div');
  container.className = `kosmo-checkbox-container ${className}`.trim();
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.marginBottom = '16px';
  
  // Create checkbox wrapper
  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.className = 'kosmo-checkbox-wrapper';
  checkboxWrapper.style.display = 'flex';
  checkboxWrapper.style.alignItems = 'center';
  
  // Create checkbox input
  const input = document.createElement('input');
  input.type = 'checkbox';
  if (id) input.id = id;
  if (name) input.name = name;
  input.className = 'kosmo-checkbox';
  input.checked = checked;
  input.disabled = disabled;
  input.required = required;
  
  // Create custom checkbox (for styling)
  const customCheckbox = document.createElement('div');
  customCheckbox.className = 'kosmo-checkbox-custom';
  customCheckbox.style.position = 'relative';
  customCheckbox.style.width = '20px';
  customCheckbox.style.height = '20px';
  customCheckbox.style.borderRadius = '4px';
  customCheckbox.style.marginRight = '8px';
  customCheckbox.style.transition = 'all 0.2s ease';
  
  // Create checkmark icon
  const checkmark = document.createElement('div');
  checkmark.className = 'kosmo-checkbox-checkmark';
  checkmark.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;
  checkmark.style.position = 'absolute';
  checkmark.style.top = '0';
  checkmark.style.left = '0';
  checkmark.style.width = '100%';
  checkmark.style.height = '100%';
  checkmark.style.display = 'flex';
  checkmark.style.alignItems = 'center';
  checkmark.style.justifyContent = 'center';
  checkmark.style.color = 'white';
  checkmark.style.opacity = checked ? '1' : '0';
  checkmark.style.transform = checked ? 'scale(1)' : 'scale(0.8)';
  checkmark.style.transition = 'all 0.2s ease';
  
  customCheckbox.appendChild(checkmark);
  
  // Apply checkbox styles
  applyCheckboxStyles(input, customCheckbox, checkmark, checked, disabled, !!errorText);
  
  // Create label if provided
  const labelElement = document.createElement('label');
  if (id) labelElement.htmlFor = id;
  labelElement.className = 'kosmo-checkbox-label';
  labelElement.style.fontSize = '16px';
  labelElement.style.lineHeight = '1.5';
  labelElement.style.color = disabled ? 'var(--color-text-disabled, #a0aec0)' : 'var(--color-text, #4a5568)';
  labelElement.style.cursor = disabled ? 'not-allowed' : 'pointer';
  labelElement.style.userSelect = 'none';
  
  if (label) {
    labelElement.textContent = label;
    
    if (required) {
      const requiredMark = document.createElement('span');
      requiredMark.textContent = ' *';
      requiredMark.style.color = 'var(--color-error, #e53e3e)';
      labelElement.appendChild(requiredMark);
    }
  }
  
  // Create helper text element
  const helperTextElement = document.createElement('div');
  helperTextElement.className = 'kosmo-checkbox-helper-text';
  helperTextElement.style.fontSize = '12px';
  helperTextElement.style.marginTop = '4px';
  helperTextElement.style.marginLeft = '28px';
  helperTextElement.style.color = 'var(--color-text-secondary, #718096)';
  helperTextElement.textContent = helperText;
  
  // Create error text element
  const errorTextElement = document.createElement('div');
  errorTextElement.className = 'kosmo-checkbox-error-text';
  errorTextElement.style.fontSize = '12px';
  errorTextElement.style.marginTop = '4px';
  errorTextElement.style.marginLeft = '28px';
  errorTextElement.style.color = 'var(--color-error, #e53e3e)';
  errorTextElement.style.display = errorText ? 'block' : 'none';
  errorTextElement.textContent = errorText;
  
  // Add event listeners
  input.addEventListener('change', (e) => {
    // Update custom checkbox
    checkmark.style.opacity = input.checked ? '1' : '0';
    checkmark.style.transform = input.checked ? 'scale(1)' : 'scale(0.8)';
    
    // Apply styles
    applyCheckboxStyles(input, customCheckbox, checkmark, input.checked, disabled, !!errorTextElement.textContent);
    
    // Call onChange handler
    if (onChange && typeof onChange === 'function') {
      onChange(e);
    }
  });
  
  // Hide the native checkbox but keep it accessible
  input.style.position = 'absolute';
  input.style.opacity = '0';
  input.style.width = '0';
  input.style.height = '0';
  
  // Assemble the component
  checkboxWrapper.appendChild(input);
  checkboxWrapper.appendChild(customCheckbox);
  checkboxWrapper.appendChild(labelElement);
  container.appendChild(checkboxWrapper);
  container.appendChild(helperTextElement);
  container.appendChild(errorTextElement);
  
  // Add API methods to container
  container.isChecked = () => input.checked;
  container.setChecked = (isChecked) => {
    input.checked = isChecked;
    checkmark.style.opacity = isChecked ? '1' : '0';
    checkmark.style.transform = isChecked ? 'scale(1)' : 'scale(0.8)';
    applyCheckboxStyles(input, customCheckbox, checkmark, isChecked, disabled, !!errorTextElement.textContent);
  };
  container.setError = (error) => {
    errorTextElement.textContent = error;
    errorTextElement.style.display = error ? 'block' : 'none';
    applyCheckboxStyles(input, customCheckbox, checkmark, input.checked, disabled, !!error);
  };
  container.clearError = () => {
    errorTextElement.textContent = '';
    errorTextElement.style.display = 'none';
    applyCheckboxStyles(input, customCheckbox, checkmark, input.checked, disabled, false);
  };
  container.disable = () => {
    input.disabled = true;
    labelElement.style.color = 'var(--color-text-disabled, #a0aec0)';
    labelElement.style.cursor = 'not-allowed';
    applyCheckboxStyles(input, customCheckbox, checkmark, input.checked, true, !!errorTextElement.textContent);
  };
  container.enable = () => {
    input.disabled = false;
    labelElement.style.color = 'var(--color-text, #4a5568)';
    labelElement.style.cursor = 'pointer';
    applyCheckboxStyles(input, customCheckbox, checkmark, input.checked, false, !!errorTextElement.textContent);
  };
  container.focus = () => input.focus();
  
  return container;
}

/**
 * Apply styles to checkbox elements
 * @param {HTMLInputElement} input - Checkbox input element
 * @param {HTMLDivElement} customCheckbox - Custom checkbox element
 * @param {HTMLDivElement} checkmark - Checkmark element
 * @param {boolean} checked - Whether checkbox is checked
 * @param {boolean} disabled - Whether checkbox is disabled
 * @param {boolean} hasError - Whether checkbox has error
 */
function applyCheckboxStyles(input, customCheckbox, checkmark, checked, disabled, hasError) {
  // Base styles
  customCheckbox.style.backgroundColor = checked 
    ? (disabled ? 'var(--color-primary-disabled, #a0aec0)' : 'var(--color-primary, #3182ce)') 
    : (disabled ? 'var(--color-bg-disabled, #edf2f7)' : 'var(--color-bg, white)');
  
  if (hasError) {
    customCheckbox.style.border = '2px solid var(--color-error, #e53e3e)';
  } else {
    customCheckbox.style.border = checked 
      ? `2px solid ${disabled ? 'var(--color-primary-disabled, #a0aec0)' : 'var(--color-primary, #3182ce)'}`
      : `2px solid ${disabled ? 'var(--color-border-disabled, #cbd5e0)' : 'var(--color-border, #e2e8f0)'}`;
  }
  
  // Focus styles
  input.addEventListener('focus', () => {
    if (!disabled) {
      customCheckbox.style.boxShadow = hasError 
        ? '0 0 0 3px rgba(229, 62, 62, 0.3)' 
        : '0 0 0 3px var(--color-focus-ring, rgba(66, 153, 225, 0.5))';
    }
  });
  
  input.addEventListener('blur', () => {
    customCheckbox.style.boxShadow = 'none';
  });
  
  // Hover styles
  customCheckbox.addEventListener('mouseenter', () => {
    if (!disabled) {
      customCheckbox.style.borderColor = checked 
        ? 'var(--color-primary-hover, #2b6cb0)' 
        : 'var(--color-border-hover, #a0aec0)';
    }
  });
  
  customCheckbox.addEventListener('mouseleave', () => {
    if (!disabled && !hasError) {
      customCheckbox.style.borderColor = checked 
        ? 'var(--color-primary, #3182ce)' 
        : 'var(--color-border, #e2e8f0)';
    }
  });
}

/**
 * Create a checkbox group with multiple options
 * @param {Object} options - Checkbox group configuration
 * @param {string} options.id - Group ID prefix
 * @param {string} options.name - Group name attribute
 * @param {string} options.label - Group label text
 * @param {Array<Object>} options.options - Array of checkbox options with value, label, and checked properties
 * @param {boolean} options.disabled - Whether all checkboxes are disabled
 * @param {string} options.helperText - Helper text displayed below group
 * @param {string} options.errorText - Error text displayed when validation fails
 * @param {Function} options.onChange - Change event handler for any checkbox in the group
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLDivElement} Checkbox group container element
 */
export function createCheckboxGroup(options = {}) {
  const {
    id,
    name,
    label,
    options: checkboxOptions = [],
    disabled = false,
    helperText = '',
    errorText = '',
    onChange,
    className = '',
  } = options;

  // Create container
  const container = document.createElement('div');
  container.className = `kosmo-checkbox-group ${className}`.trim();
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.marginBottom = '16px';
  
  // Create group label if provided
  if (label) {
    const groupLabel = document.createElement('div');
    groupLabel.className = 'kosmo-checkbox-group-label';
    groupLabel.textContent = label;
    groupLabel.style.marginBottom = '8px';
    groupLabel.style.fontSize = '14px';
    groupLabel.style.fontWeight = '500';
    groupLabel.style.color = 'var(--color-text, #4a5568)';
    container.appendChild(groupLabel);
  }
  
  // Create checkboxes container
  const checkboxesContainer = document.createElement('div');
  checkboxesContainer.className = 'kosmo-checkbox-group-options';
  checkboxesContainer.style.display = 'flex';
  checkboxesContainer.style.flexDirection = 'column';
  checkboxesContainer.style.gap = '8px';
  
  // Create checkboxes
  const checkboxElements = checkboxOptions.map((option, index) => {
    const checkboxId = id ? `${id}-${index}` : `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    
    return createCheckbox({
      id: checkboxId,
      name: name ? `${name}[${index}]` : undefined,
      label: option.label,
      checked: option.checked || false,
      disabled: option.disabled || disabled,
      onChange: (e) => {
        if (onChange && typeof onChange === 'function') {
          // Pass the updated values of all checkboxes
          const values = checkboxElements.map(checkbox => ({
            value: checkbox.getAttribute('data-value'),
            checked: checkbox.isChecked(),
          }));
          
          onChange(e, values);
        }
      },
    });
  });
  
  // Add checkboxes to container
  checkboxElements.forEach((checkbox, index) => {
    // Store the value for later retrieval
    checkbox.setAttribute('data-value', checkboxOptions[index].value);
    checkboxesContainer.appendChild(checkbox);
  });
  
  // Create helper text element
  const helperTextElement = document.createElement('div');
  helperTextElement.className = 'kosmo-checkbox-group-helper-text';
  helperTextElement.style.fontSize = '12px';
  helperTextElement.style.marginTop = '4px';
  helperTextElement.style.color = 'var(--color-text-secondary, #718096)';
  helperTextElement.textContent = helperText;
  
  // Create error text element
  const errorTextElement = document.createElement('div');
  errorTextElement.className = 'kosmo-checkbox-group-error-text';
  errorTextElement.style.fontSize = '12px';
  errorTextElement.style.marginTop = '4px';
  errorTextElement.style.color = 'var(--color-error, #e53e3e)';
  errorTextElement.style.display = errorText ? 'block' : 'none';
  errorTextElement.textContent = errorText;
  
  // Assemble the component
  container.appendChild(checkboxesContainer);
  container.appendChild(helperTextElement);
  container.appendChild(errorTextElement);
  
  // Add API methods to container
  container.getValues = () => {
    return checkboxElements.map(checkbox => ({
      value: checkbox.getAttribute('data-value'),
      checked: checkbox.isChecked(),
    }));
  };
  container.setValues = (values) => {
    values.forEach(value => {
      const checkbox = checkboxElements.find(cb => cb.getAttribute('data-value') === value.value);
      if (checkbox) {
        checkbox.setChecked(value.checked);
      }
    });
  };
  container.setError = (error) => {
    errorTextElement.textContent = error;
    errorTextElement.style.display = error ? 'block' : 'none';
    
    // Apply error styles to all checkboxes
    checkboxElements.forEach(checkbox => {
      checkbox.setError(error);
    });
  };
  container.clearError = () => {
    errorTextElement.textContent = '';
    errorTextElement.style.display = 'none';
    
    // Clear error styles from all checkboxes
    checkboxElements.forEach(checkbox => {
      checkbox.clearError();
    });
  };
  container.disable = () => {
    checkboxElements.forEach(checkbox => {
      checkbox.disable();
    });
  };
  container.enable = () => {
    checkboxElements.forEach(checkbox => {
      checkbox.enable();
    });
  };
  
  return container;
}