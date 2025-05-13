/**
 * Dropdown Component
 * Select dropdown with keyboard navigation
 */

/**
 * Create a dropdown select with options
 * @param {Object} options - Dropdown configuration
 * @param {string} options.id - Dropdown ID
 * @param {string} options.name - Dropdown name attribute
 * @param {string} options.label - Label text
 * @param {string} options.placeholder - Placeholder text
 * @param {Array<Object>} options.options - Array of option objects with value and label
 * @param {string} options.value - Initial selected value
 * @param {boolean} options.required - Whether dropdown is required
 * @param {boolean} options.disabled - Whether dropdown is disabled
 * @param {string} options.helperText - Helper text displayed below dropdown
 * @param {string} options.errorText - Error text displayed when validation fails
 * @param {Function} options.onChange - Change event handler
 * @param {Function} options.onFocus - Focus event handler
 * @param {Function} options.onBlur - Blur event handler
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLDivElement} Dropdown container element
 */
export function createDropdown(options = {}) {
  const {
    id,
    name,
    label,
    placeholder = 'Select an option',
    options: dropdownOptions = [],
    value = '',
    required = false,
    disabled = false,
    helperText = '',
    errorText = '',
    onChange,
    onFocus,
    onBlur,
    className = '',
  } = options;

  // Create container
  const container = document.createElement('div');
  container.className = `kosmo-dropdown-container ${className}`.trim();
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.marginBottom = '16px';
  
  // Create label if provided
  if (label) {
    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.className = 'kosmo-dropdown-label';
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
  
  // Create dropdown wrapper (for custom styling)
  const dropdownWrapper = document.createElement('div');
  dropdownWrapper.className = 'kosmo-dropdown-wrapper';
  dropdownWrapper.style.position = 'relative';
  dropdownWrapper.style.display = 'flex';
  dropdownWrapper.style.alignItems = 'center';
  
  // Create custom dropdown
  const customDropdown = document.createElement('div');
  customDropdown.className = 'kosmo-dropdown';
  customDropdown.tabIndex = disabled ? -1 : 0;
  customDropdown.setAttribute('role', 'combobox');
  customDropdown.setAttribute('aria-expanded', 'false');
  customDropdown.setAttribute('aria-haspopup', 'listbox');
  if (id) customDropdown.id = `${id}-dropdown`;
  
  // Apply dropdown styles
  applyDropdownStyles(customDropdown, disabled, !!errorText);
  
  // Create selected value display
  const selectedDisplay = document.createElement('div');
  selectedDisplay.className = 'kosmo-dropdown-selected';
  selectedDisplay.style.flex = '1';
  selectedDisplay.style.overflow = 'hidden';
  selectedDisplay.style.textOverflow = 'ellipsis';
  selectedDisplay.style.whiteSpace = 'nowrap';
  
  // Set initial selected value or placeholder
  const initialOption = dropdownOptions.find(opt => opt.value === value);
  selectedDisplay.textContent = initialOption ? initialOption.label : placeholder;
  selectedDisplay.style.color = initialOption ? 'var(--color-text, #4a5568)' : 'var(--color-text-placeholder, #a0aec0)';
  
  // Create dropdown arrow
  const dropdownArrow = document.createElement('div');
  dropdownArrow.className = 'kosmo-dropdown-arrow';
  dropdownArrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `;
  dropdownArrow.style.marginLeft = '8px';
  dropdownArrow.style.display = 'flex';
  dropdownArrow.style.alignItems = 'center';
  dropdownArrow.style.justifyContent = 'center';
  dropdownArrow.style.color = 'var(--color-text-secondary, #718096)';
  dropdownArrow.style.transition = 'transform 0.2s ease';
  
  // Create dropdown options list
  const optionsList = document.createElement('ul');
  optionsList.className = 'kosmo-dropdown-options';
  optionsList.setAttribute('role', 'listbox');
  if (id) optionsList.id = `${id}-options`;
  optionsList.style.position = 'absolute';
  optionsList.style.top = '100%';
  optionsList.style.left = '0';
  optionsList.style.right = '0';
  optionsList.style.zIndex = '10';
  optionsList.style.maxHeight = '200px';
  optionsList.style.overflowY = 'auto';
  optionsList.style.backgroundColor = 'var(--color-bg, white)';
  optionsList.style.border = '1px solid var(--color-border, #e2e8f0)';
  optionsList.style.borderRadius = '0 0 6px 6px';
  optionsList.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  optionsList.style.display = 'none';
  optionsList.style.margin = '0';
  optionsList.style.padding = '4px 0';
  optionsList.style.listStyle = 'none';
  
  // Create hidden native select for form submission
  const hiddenSelect = document.createElement('select');
  if (id) hiddenSelect.id = id;
  if (name) hiddenSelect.name = name;
  hiddenSelect.required = required;
  hiddenSelect.disabled = disabled;
  hiddenSelect.style.position = 'absolute';
  hiddenSelect.style.opacity = '0';
  hiddenSelect.style.height = '0';
  hiddenSelect.style.width = '0';
  hiddenSelect.style.overflow = 'hidden';
  
  // Add options to both the custom dropdown and hidden select
  dropdownOptions.forEach(option => {
    // Create option for hidden select
    const selectOption = document.createElement('option');
    selectOption.value = option.value;
    selectOption.textContent = option.label;
    selectOption.selected = option.value === value;
    hiddenSelect.appendChild(selectOption);
    
    // Create list item for custom dropdown
    const listItem = document.createElement('li');
    listItem.className = 'kosmo-dropdown-option';
    listItem.setAttribute('role', 'option');
    listItem.setAttribute('data-value', option.value);
    if (option.value === value) {
      listItem.setAttribute('aria-selected', 'true');
      listItem.classList.add('kosmo-dropdown-option-selected');
    } else {
      listItem.setAttribute('aria-selected', 'false');
    }
    listItem.textContent = option.label;
    listItem.style.padding = '8px 12px';
    listItem.style.cursor = 'pointer';
    
    // Add hover effect
    listItem.addEventListener('mouseenter', () => {
      listItem.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
    });
    
    listItem.addEventListener('mouseleave', () => {
      listItem.style.backgroundColor = '';
    });
    
    // Add click handler
    listItem.addEventListener('click', () => {
      selectOption.selected = true;
      selectedDisplay.textContent = option.label;
      selectedDisplay.style.color = 'var(--color-text, #4a5568)';
      
      // Update aria-selected
      optionsList.querySelectorAll('.kosmo-dropdown-option').forEach(item => {
        item.setAttribute('aria-selected', 'false');
        item.classList.remove('kosmo-dropdown-option-selected');
      });
      listItem.setAttribute('aria-selected', 'true');
      listItem.classList.add('kosmo-dropdown-option-selected');
      
      // Close dropdown
      optionsList.style.display = 'none';
      dropdownArrow.style.transform = 'rotate(0deg)';
      customDropdown.setAttribute('aria-expanded', 'false');
      
      // Trigger change event
      if (onChange && typeof onChange === 'function') {
        const event = new Event('change', { bubbles: true });
        hiddenSelect.dispatchEvent(event);
        onChange(event);
      }
    });
    
    optionsList.appendChild(listItem);
  });
  
  // Create helper text element
  const helperTextElement = document.createElement('div');
  helperTextElement.className = 'kosmo-dropdown-helper-text';
  helperTextElement.style.fontSize = '12px';
  helperTextElement.style.marginTop = '4px';
  helperTextElement.style.color = 'var(--color-text-secondary, #718096)';
  helperTextElement.textContent = helperText;
  
  // Create error text element
  const errorTextElement = document.createElement('div');
  errorTextElement.className = 'kosmo-dropdown-error-text';
  errorTextElement.style.fontSize = '12px';
  errorTextElement.style.marginTop = '4px';
  errorTextElement.style.color = 'var(--color-error, #e53e3e)';
  errorTextElement.style.display = errorText ? 'block' : 'none';
  errorTextElement.textContent = errorText;
  
  // Add dropdown toggle functionality
  customDropdown.addEventListener('click', () => {
    if (disabled) return;
    
    const isExpanded = customDropdown.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      optionsList.style.display = 'none';
      dropdownArrow.style.transform = 'rotate(0deg)';
      customDropdown.setAttribute('aria-expanded', 'false');
    } else {
      optionsList.style.display = 'block';
      dropdownArrow.style.transform = 'rotate(180deg)';
      customDropdown.setAttribute('aria-expanded', 'true');
      
      // Scroll to selected option
      const selectedOption = optionsList.querySelector('.kosmo-dropdown-option-selected');
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'nearest' });
      }
    }
  });
  
  // Add keyboard navigation
  customDropdown.addEventListener('keydown', (e) => {
    if (disabled) return;
    
    const isExpanded = customDropdown.getAttribute('aria-expanded') === 'true';
    const options = Array.from(optionsList.querySelectorAll('.kosmo-dropdown-option'));
    const selectedIndex = options.findIndex(opt => opt.classList.contains('kosmo-dropdown-option-selected'));
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isExpanded) {
          const selectedOption = options.find(opt => opt.classList.contains('kosmo-dropdown-option-selected'));
          if (selectedOption) {
            selectedOption.click();
          }
        } else {
          customDropdown.click();
        }
        break;
        
      case 'Escape':
        if (isExpanded) {
          e.preventDefault();
          optionsList.style.display = 'none';
          dropdownArrow.style.transform = 'rotate(0deg)';
          customDropdown.setAttribute('aria-expanded', 'false');
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (!isExpanded) {
          customDropdown.click();
        } else if (selectedIndex < options.length - 1) {
          options[selectedIndex + 1].click();
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (!isExpanded) {
          customDropdown.click();
        } else if (selectedIndex > 0) {
          options[selectedIndex - 1].click();
        }
        break;
        
      case 'Home':
        if (isExpanded) {
          e.preventDefault();
          options[0].click();
        }
        break;
        
      case 'End':
        if (isExpanded) {
          e.preventDefault();
          options[options.length - 1].click();
        }
        break;
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!customDropdown.contains(e.target) && customDropdown.getAttribute('aria-expanded') === 'true') {
      optionsList.style.display = 'none';
      dropdownArrow.style.transform = 'rotate(0deg)';
      customDropdown.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Add focus and blur handlers
  customDropdown.addEventListener('focus', () => {
    if (disabled) return;
    
    customDropdown.style.boxShadow = '0 0 0 3px var(--color-focus-ring, rgba(66, 153, 225, 0.5))';
    
    if (onFocus && typeof onFocus === 'function') {
      const event = new FocusEvent('focus', { bubbles: true });
      hiddenSelect.dispatchEvent(event);
      onFocus(event);
    }
  });
  
  customDropdown.addEventListener('blur', (e) => {
    // Don't blur if clicking on an option
    if (e.relatedTarget && optionsList.contains(e.relatedTarget)) {
      return;
    }
    
    customDropdown.style.boxShadow = 'none';
    
    if (onBlur && typeof onBlur === 'function') {
      const event = new FocusEvent('blur', { bubbles: true });
      hiddenSelect.dispatchEvent(event);
      onBlur(event);
    }
  });
  
  // Assemble the component
  customDropdown.appendChild(selectedDisplay);
  customDropdown.appendChild(dropdownArrow);
  dropdownWrapper.appendChild(customDropdown);
  dropdownWrapper.appendChild(optionsList);
  dropdownWrapper.appendChild(hiddenSelect);
  container.appendChild(dropdownWrapper);
  container.appendChild(helperTextElement);
  container.appendChild(errorTextElement);
  
  // Add API methods to container
  container.getValue = () => hiddenSelect.value;
  container.setValue = (newValue) => {
    // Update hidden select
    const option = hiddenSelect.querySelector(`option[value="${newValue}"]`);
    if (option) {
      option.selected = true;
      
      // Update display
      const displayOption = dropdownOptions.find(opt => opt.value === newValue);
      if (displayOption) {
        selectedDisplay.textContent = displayOption.label;
        selectedDisplay.style.color = 'var(--color-text, #4a5568)';
      }
      
      // Update aria-selected
      optionsList.querySelectorAll('.kosmo-dropdown-option').forEach(item => {
        item.setAttribute('aria-selected', 'false');
        item.classList.remove('kosmo-dropdown-option-selected');
        
        if (item.getAttribute('data-value') === newValue) {
          item.setAttribute('aria-selected', 'true');
          item.classList.add('kosmo-dropdown-option-selected');
        }
      });
      
      // Trigger change event
      if (onChange && typeof onChange === 'function') {
        const event = new Event('change', { bubbles: true });
        hiddenSelect.dispatchEvent(event);
        onChange(event);
      }
    }
  };
  container.setOptions = (newOptions) => {
    // Clear existing options
    hiddenSelect.innerHTML = '';
    optionsList.innerHTML = '';
    
    // Add new options
    newOptions.forEach(option => {
      // Create option for hidden select
      const selectOption = document.createElement('option');
      selectOption.value = option.value;
      selectOption.textContent = option.label;
      hiddenSelect.appendChild(selectOption);
      
      // Create list item for custom dropdown
      const listItem = document.createElement('li');
      listItem.className = 'kosmo-dropdown-option';
      listItem.setAttribute('role', 'option');
      listItem.setAttribute('data-value', option.value);
      listItem.setAttribute('aria-selected', 'false');
      listItem.textContent = option.label;
      listItem.style.padding = '8px 12px';
      listItem.style.cursor = 'pointer';
      
      // Add hover effect
      listItem.addEventListener('mouseenter', () => {
        listItem.style.backgroundColor = 'var(--color-bg-hover, #f7fafc)';
      });
      
      listItem.addEventListener('mouseleave', () => {
        listItem.style.backgroundColor = '';
      });
      
      // Add click handler
      listItem.addEventListener('click', () => {
        selectOption.selected = true;
        selectedDisplay.textContent = option.label;
        selectedDisplay.style.color = 'var(--color-text, #4a5568)';
        
        // Update aria-selected
        optionsList.querySelectorAll('.kosmo-dropdown-option').forEach(item => {
          item.setAttribute('aria-selected', 'false');
          item.classList.remove('kosmo-dropdown-option-selected');
        });
        listItem.setAttribute('aria-selected', 'true');
        listItem.classList.add('kosmo-dropdown-option-selected');
        
        // Close dropdown
        optionsList.style.display = 'none';
        dropdownArrow.style.transform = 'rotate(0deg)';
        customDropdown.setAttribute('aria-expanded', 'false');
        
        // Trigger change event
        if (onChange && typeof onChange === 'function') {
          const event = new Event('change', { bubbles: true });
          hiddenSelect.dispatchEvent(event);
          onChange(event);
        }
      });
      
      optionsList.appendChild(listItem);
    });
    
    // Reset selected value
    selectedDisplay.textContent = placeholder;
    selectedDisplay.style.color = 'var(--color-text-placeholder, #a0aec0)';
  };
  container.setError = (error) => {
    errorTextElement.textContent = error;
    errorTextElement.style.display = error ? 'block' : 'none';
    applyDropdownStyles(customDropdown, disabled, !!error);
  };
  container.clearError = () => {
    errorTextElement.textContent = '';
    errorTextElement.style.display = 'none';
    applyDropdownStyles(customDropdown, disabled, false);
  };
  container.disable = () => {
    hiddenSelect.disabled = true;
    customDropdown.tabIndex = -1;
    applyDropdownStyles(customDropdown, true, !!errorTextElement.textContent);
  };
  container.enable = () => {
    hiddenSelect.disabled = false;
    customDropdown.tabIndex = 0;
    applyDropdownStyles(customDropdown, false, !!errorTextElement.textContent);
  };
  container.focus = () => customDropdown.focus();
  
  return container;
}

/**
 * Apply styles to dropdown element
 * @param {HTMLElement} dropdown - Dropdown element
 * @param {boolean} disabled - Whether dropdown is disabled
 * @param {boolean} hasError - Whether dropdown has error
 */
function applyDropdownStyles(dropdown, disabled, hasError) {
  dropdown.style.width = '100%';
  dropdown.style.padding = '10px 12px';
  dropdown.style.fontSize = '16px';
  dropdown.style.lineHeight = '1.5';
  dropdown.style.borderRadius = '6px';
  dropdown.style.transition = 'all 0.2s ease';
  dropdown.style.backgroundColor = disabled ? 'var(--color-bg-disabled, #edf2f7)' : 'var(--color-bg, white)';
  dropdown.style.color = disabled ? 'var(--color-text-disabled, #a0aec0)' : 'var(--color-text, #4a5568)';
  dropdown.style.cursor = disabled ? 'not-allowed' : 'pointer';
  dropdown.style.display = 'flex';
  dropdown.style.alignItems = 'center';
  dropdown.style.justifyContent = 'space-between';
  
  if (hasError) {
    dropdown.style.border = '1px solid var(--color-error, #e53e3e)';
    dropdown.style.boxShadow = '0 0 0 1px var(--color-error, #e53e3e)';
  } else {
    dropdown.style.border = `1px solid ${disabled ? 'var(--color-border-disabled, #cbd5e0)' : 'var(--color-border, #e2e8f0)'}`;
    dropdown.style.boxShadow = 'none';
  }
}