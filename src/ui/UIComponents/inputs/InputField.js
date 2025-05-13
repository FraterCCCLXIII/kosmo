/**
 * Input Field Component
 * Text/number/email inputs with labels and validation
 */

/**
 * Create an input field with label and optional validation
 * @param {Object} options - Input field configuration
 * @param {string} options.type - Input type (text, number, email, password, etc.)
 * @param {string} options.id - Input ID
 * @param {string} options.name - Input name attribute
 * @param {string} options.label - Label text
 * @param {string} options.placeholder - Placeholder text
 * @param {string} options.value - Initial value
 * @param {boolean} options.required - Whether input is required
 * @param {boolean} options.disabled - Whether input is disabled
 * @param {string} options.helperText - Helper text displayed below input
 * @param {string} options.errorText - Error text displayed when validation fails
 * @param {Function} options.onChange - Change event handler
 * @param {Function} options.onFocus - Focus event handler
 * @param {Function} options.onBlur - Blur event handler
 * @param {Function} options.validate - Custom validation function
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLDivElement} Input field container element
 */
export function createInputField(options = {}) {
  const {
    type = 'text',
    id,
    name,
    label,
    placeholder = '',
    value = '',
    required = false,
    disabled = false,
    helperText = '',
    errorText = '',
    onChange,
    onFocus,
    onBlur,
    validate,
    className = '',
  } = options;

  // Create container
  const container = document.createElement('div');
  container.className = `kosmo-input-container ${className}`.trim();
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.marginBottom = '16px';
  
  // Create label if provided
  if (label) {
    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.className = 'kosmo-input-label';
    labelElement.textContent = label;
    labelElement.style.marginBottom = '6px';
    labelElement.style.fontSize = '14px';
    labelElement.style.fontWeight = '500';
    labelElement.style.color = 'var(--color-text, #4a5568)';
    
    if (required) {
      const requiredMark = document.createElement('span');
      requiredMark.textContent = ' *';
      requiredMark.style.color = 'var(--color-error, #e53e3e)';
      labelElement.appendChild(requiredMark);
    }
    
    container.appendChild(labelElement);
  }
  
  // Create input wrapper (for potential icons or addons)
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'kosmo-input-wrapper';
  inputWrapper.style.position = 'relative';
  inputWrapper.style.display = 'flex';
  inputWrapper.style.alignItems = 'center';
  
  // Create input element
  const input = document.createElement('input');
  input.type = type;
  if (id) input.id = id;
  if (name) input.name = name;
  input.className = 'kosmo-input';
  input.placeholder = placeholder;
  input.value = value;
  input.required = required;
  input.disabled = disabled;
  
  // Apply input styles
  applyInputStyles(input, disabled, !!errorText);
  
  // Create helper text element
  const helperTextElement = document.createElement('div');
  helperTextElement.className = 'kosmo-input-helper-text';
  helperTextElement.style.fontSize = '12px';
  helperTextElement.style.marginTop = '4px';
  helperTextElement.style.color = 'var(--color-text-secondary, #718096)';
  helperTextElement.textContent = helperText;
  
  // Create error text element
  const errorTextElement = document.createElement('div');
  errorTextElement.className = 'kosmo-input-error-text';
  errorTextElement.style.fontSize = '12px';
  errorTextElement.style.marginTop = '4px';
  errorTextElement.style.color = 'var(--color-error, #e53e3e)';
  errorTextElement.style.display = errorText ? 'block' : 'none';
  errorTextElement.textContent = errorText;
  
  // Add event listeners
  if (onChange && typeof onChange === 'function') {
    input.addEventListener('input', (e) => {
      onChange(e);
      validateInput(input, errorTextElement, validate);
    });
  }
  
  if (onFocus && typeof onFocus === 'function') {
    input.addEventListener('focus', onFocus);
  }
  
  if (onBlur && typeof onBlur === 'function') {
    input.addEventListener('blur', (e) => {
      onBlur(e);
      validateInput(input, errorTextElement, validate);
    });
  } else {
    input.addEventListener('blur', () => {
      validateInput(input, errorTextElement, validate);
    });
  }
  
  // Assemble the component
  inputWrapper.appendChild(input);
  container.appendChild(inputWrapper);
  container.appendChild(helperTextElement);
  container.appendChild(errorTextElement);
  
  // Add API methods to container
  container.getValue = () => input.value;
  container.setValue = (newValue) => {
    input.value = newValue;
    validateInput(input, errorTextElement, validate);
  };
  container.setError = (error) => {
    errorTextElement.textContent = error;
    errorTextElement.style.display = error ? 'block' : 'none';
    applyInputStyles(input, disabled, !!error);
  };
  container.clearError = () => {
    errorTextElement.textContent = '';
    errorTextElement.style.display = 'none';
    applyInputStyles(input, disabled, false);
  };
  container.disable = () => {
    input.disabled = true;
    applyInputStyles(input, true, !!errorTextElement.textContent);
  };
  container.enable = () => {
    input.disabled = false;
    applyInputStyles(input, false, !!errorTextElement.textContent);
  };
  container.focus = () => input.focus();
  container.blur = () => input.blur();
  
  return container;
}

/**
 * Apply styles to input element
 * @param {HTMLInputElement} input - Input element
 * @param {boolean} disabled - Whether input is disabled
 * @param {boolean} hasError - Whether input has error
 */
function applyInputStyles(input, disabled, hasError) {
  input.style.width = '100%';
  input.style.padding = '10px 12px';
  input.style.fontSize = '16px';
  input.style.lineHeight = '1.5';
  input.style.borderRadius = '6px';
  input.style.transition = 'all 0.2s ease';
  input.style.backgroundColor = disabled ? 'var(--color-bg-disabled, #edf2f7)' : 'var(--color-bg, white)';
  input.style.color = disabled ? 'var(--color-text-disabled, #a0aec0)' : 'var(--color-text, #4a5568)';
  
  if (hasError) {
    input.style.border = '1px solid var(--color-error, #e53e3e)';
    input.style.boxShadow = '0 0 0 1px var(--color-error, #e53e3e)';
  } else {
    input.style.border = `1px solid ${disabled ? 'var(--color-border-disabled, #cbd5e0)' : 'var(--color-border, #e2e8f0)'}`;
    input.style.boxShadow = 'none';
  }
  
  // Focus styles (applied via event listeners)
  input.addEventListener('focus', () => {
    if (!disabled && !hasError) {
      input.style.border = '1px solid var(--color-primary, #3182ce)';
      input.style.boxShadow = '0 0 0 1px var(--color-primary, #3182ce)';
    }
  });
  
  input.addEventListener('blur', () => {
    if (!hasError) {
      input.style.border = `1px solid ${disabled ? 'var(--color-border-disabled, #cbd5e0)' : 'var(--color-border, #e2e8f0)'}`;
      input.style.boxShadow = 'none';
    }
  });
}

/**
 * Validate input and show/hide error message
 * @param {HTMLInputElement} input - Input element
 * @param {HTMLDivElement} errorElement - Error message element
 * @param {Function} validateFn - Custom validation function
 */
function validateInput(input, errorElement, validateFn) {
  if (!input.value && input.required) {
    errorElement.textContent = 'This field is required';
    errorElement.style.display = 'block';
    applyInputStyles(input, input.disabled, true);
    return false;
  }
  
  if (input.type === 'email' && input.value && !validateEmail(input.value)) {
    errorElement.textContent = 'Please enter a valid email address';
    errorElement.style.display = 'block';
    applyInputStyles(input, input.disabled, true);
    return false;
  }
  
  if (validateFn && typeof validateFn === 'function') {
    const validationResult = validateFn(input.value);
    if (validationResult !== true) {
      errorElement.textContent = validationResult || 'Invalid input';
      errorElement.style.display = 'block';
      applyInputStyles(input, input.disabled, true);
      return false;
    }
  }
  
  errorElement.textContent = '';
  errorElement.style.display = 'none';
  applyInputStyles(input, input.disabled, false);
  return true;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Create a text area with label and optional validation
 * @param {Object} options - Text area configuration (same as createInputField plus rows)
 * @param {number} options.rows - Number of rows for the textarea
 * @returns {HTMLDivElement} Text area container element
 */
export function createTextArea(options = {}) {
  const {
    id,
    name,
    label,
    placeholder = '',
    value = '',
    rows = 4,
    required = false,
    disabled = false,
    helperText = '',
    errorText = '',
    onChange,
    onFocus,
    onBlur,
    validate,
    className = '',
  } = options;

  // Create container
  const container = document.createElement('div');
  container.className = `kosmo-textarea-container ${className}`.trim();
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.marginBottom = '16px';
  
  // Create label if provided
  if (label) {
    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.className = 'kosmo-textarea-label';
    labelElement.textContent = label;
    labelElement.style.marginBottom = '6px';
    labelElement.style.fontSize = '14px';
    labelElement.style.fontWeight = '500';
    labelElement.style.color = 'var(--color-text, #4a5568)';
    
    if (required) {
      const requiredMark = document.createElement('span');
      requiredMark.textContent = ' *';
      requiredMark.style.color = 'var(--color-error, #e53e3e)';
      labelElement.appendChild(requiredMark);
    }
    
    container.appendChild(labelElement);
  }
  
  // Create textarea element
  const textarea = document.createElement('textarea');
  if (id) textarea.id = id;
  if (name) textarea.name = name;
  textarea.className = 'kosmo-textarea';
  textarea.placeholder = placeholder;
  textarea.value = value;
  textarea.rows = rows;
  textarea.required = required;
  textarea.disabled = disabled;
  
  // Apply textarea styles
  applyTextareaStyles(textarea, disabled, !!errorText);
  
  // Create helper text element
  const helperTextElement = document.createElement('div');
  helperTextElement.className = 'kosmo-textarea-helper-text';
  helperTextElement.style.fontSize = '12px';
  helperTextElement.style.marginTop = '4px';
  helperTextElement.style.color = 'var(--color-text-secondary, #718096)';
  helperTextElement.textContent = helperText;
  
  // Create error text element
  const errorTextElement = document.createElement('div');
  errorTextElement.className = 'kosmo-textarea-error-text';
  errorTextElement.style.fontSize = '12px';
  errorTextElement.style.marginTop = '4px';
  errorTextElement.style.color = 'var(--color-error, #e53e3e)';
  errorTextElement.style.display = errorText ? 'block' : 'none';
  errorTextElement.textContent = errorText;
  
  // Add event listeners
  if (onChange && typeof onChange === 'function') {
    textarea.addEventListener('input', (e) => {
      onChange(e);
      validateTextarea(textarea, errorTextElement, validate);
    });
  }
  
  if (onFocus && typeof onFocus === 'function') {
    textarea.addEventListener('focus', onFocus);
  }
  
  if (onBlur && typeof onBlur === 'function') {
    textarea.addEventListener('blur', (e) => {
      onBlur(e);
      validateTextarea(textarea, errorTextElement, validate);
    });
  } else {
    textarea.addEventListener('blur', () => {
      validateTextarea(textarea, errorTextElement, validate);
    });
  }
  
  // Assemble the component
  container.appendChild(textarea);
  container.appendChild(helperTextElement);
  container.appendChild(errorTextElement);
  
  // Add API methods to container
  container.getValue = () => textarea.value;
  container.setValue = (newValue) => {
    textarea.value = newValue;
    validateTextarea(textarea, errorTextElement, validate);
  };
  container.setError = (error) => {
    errorTextElement.textContent = error;
    errorTextElement.style.display = error ? 'block' : 'none';
    applyTextareaStyles(textarea, disabled, !!error);
  };
  container.clearError = () => {
    errorTextElement.textContent = '';
    errorTextElement.style.display = 'none';
    applyTextareaStyles(textarea, disabled, false);
  };
  container.disable = () => {
    textarea.disabled = true;
    applyTextareaStyles(textarea, true, !!errorTextElement.textContent);
  };
  container.enable = () => {
    textarea.disabled = false;
    applyTextareaStyles(textarea, false, !!errorTextElement.textContent);
  };
  container.focus = () => textarea.focus();
  container.blur = () => textarea.blur();
  
  return container;
}

/**
 * Apply styles to textarea element
 * @param {HTMLTextAreaElement} textarea - Textarea element
 * @param {boolean} disabled - Whether textarea is disabled
 * @param {boolean} hasError - Whether textarea has error
 */
function applyTextareaStyles(textarea, disabled, hasError) {
  textarea.style.width = '100%';
  textarea.style.padding = '10px 12px';
  textarea.style.fontSize = '16px';
  textarea.style.lineHeight = '1.5';
  textarea.style.borderRadius = '6px';
  textarea.style.transition = 'all 0.2s ease';
  textarea.style.resize = 'vertical';
  textarea.style.minHeight = '80px';
  textarea.style.backgroundColor = disabled ? 'var(--color-bg-disabled, #edf2f7)' : 'var(--color-bg, white)';
  textarea.style.color = disabled ? 'var(--color-text-disabled, #a0aec0)' : 'var(--color-text, #4a5568)';
  
  if (hasError) {
    textarea.style.border = '1px solid var(--color-error, #e53e3e)';
    textarea.style.boxShadow = '0 0 0 1px var(--color-error, #e53e3e)';
  } else {
    textarea.style.border = `1px solid ${disabled ? 'var(--color-border-disabled, #cbd5e0)' : 'var(--color-border, #e2e8f0)'}`;
    textarea.style.boxShadow = 'none';
  }
  
  // Focus styles (applied via event listeners)
  textarea.addEventListener('focus', () => {
    if (!disabled && !hasError) {
      textarea.style.border = '1px solid var(--color-primary, #3182ce)';
      textarea.style.boxShadow = '0 0 0 1px var(--color-primary, #3182ce)';
    }
  });
  
  textarea.addEventListener('blur', () => {
    if (!hasError) {
      textarea.style.border = `1px solid ${disabled ? 'var(--color-border-disabled, #cbd5e0)' : 'var(--color-border, #e2e8f0)'}`;
      textarea.style.boxShadow = 'none';
    }
  });
}

/**
 * Validate textarea and show/hide error message
 * @param {HTMLTextAreaElement} textarea - Textarea element
 * @param {HTMLDivElement} errorElement - Error message element
 * @param {Function} validateFn - Custom validation function
 */
function validateTextarea(textarea, errorElement, validateFn) {
  if (!textarea.value && textarea.required) {
    errorElement.textContent = 'This field is required';
    errorElement.style.display = 'block';
    applyTextareaStyles(textarea, textarea.disabled, true);
    return false;
  }
  
  if (validateFn && typeof validateFn === 'function') {
    const validationResult = validateFn(textarea.value);
    if (validationResult !== true) {
      errorElement.textContent = validationResult || 'Invalid input';
      errorElement.style.display = 'block';
      applyTextareaStyles(textarea, textarea.disabled, true);
      return false;
    }
  }
  
  errorElement.textContent = '';
  errorElement.style.display = 'none';
  applyTextareaStyles(textarea, textarea.disabled, false);
  return true;
}