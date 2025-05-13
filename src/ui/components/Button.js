/**
 * Button Component
 * 
 * A framework-agnostic button component using Web Components
 */

export class KosmoButton extends HTMLElement {
  // Define observed attributes for property changes
  static get observedAttributes() {
    return ['variant', 'disabled', 'size'];
  }
  
  constructor() {
    super();
    
    // Create shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Initial render
    this.render();
  }
  
  // Lifecycle: When component is added to DOM
  connectedCallback() {
    this.upgradeProperty('variant');
    this.upgradeProperty('disabled');
    this.upgradeProperty('size');
    
    // Add event listeners
    this.addEventListener('click', this.handleClick);
  }
  
  // Lifecycle: When component is removed from DOM
  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }
  
  // Lifecycle: When attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  // Handle property/attribute synchronization
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  
  // Getters and setters for properties
  get variant() {
    return this.getAttribute('variant') || 'primary';
  }
  
  set variant(value) {
    this.setAttribute('variant', value);
  }
  
  get disabled() {
    return this.hasAttribute('disabled');
  }
  
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  
  get size() {
    return this.getAttribute('size') || 'medium';
  }
  
  set size(value) {
    this.setAttribute('size', value);
  }
  
  // Event handlers
  handleClick = (event) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('kosmo-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }
  
  // Render component
  render() {
    const variant = this.variant;
    const disabled = this.disabled;
    const size = this.size;
    
    // Define CSS
    const styles = `
      :host {
        display: inline-block;
      }
      
      .kosmo-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-md, 4px);
        font-family: var(--font-family, sans-serif);
        font-weight: var(--font-weight-medium, 500);
        cursor: pointer;
        transition: background-color 0.2s, border-color 0.2s, color 0.2s;
        border: var(--border-width-1, 1px) solid transparent;
        outline: none;
        user-select: none;
      }
      
      .kosmo-button:focus-visible {
        box-shadow: 0 0 0 2px var(--color-focus, rgba(25, 118, 210, 0.5));
      }
      
      /* Size variants */
      .kosmo-button--small {
        padding: 4px 12px;
        font-size: var(--font-size-sm, 12px);
        height: 28px;
      }
      
      .kosmo-button--medium {
        padding: 6px 16px;
        font-size: var(--font-size-md, 14px);
        height: 36px;
      }
      
      .kosmo-button--large {
        padding: 8px 22px;
        font-size: var(--font-size-lg, 16px);
        height: 44px;
      }
      
      /* Variant: Primary */
      .kosmo-button--primary {
        background-color: var(--color-primary, #1976d2);
        color: var(--color-on-primary, #ffffff);
      }
      
      .kosmo-button--primary:hover:not(:disabled) {
        background-color: var(--color-primary-dark, #1565c0);
      }
      
      /* Variant: Secondary */
      .kosmo-button--secondary {
        background-color: transparent;
        border-color: var(--color-primary, #1976d2);
        color: var(--color-primary, #1976d2);
      }
      
      .kosmo-button--secondary:hover:not(:disabled) {
        background-color: var(--color-primary-light, rgba(25, 118, 210, 0.1));
      }
      
      /* Variant: Text */
      .kosmo-button--text {
        background-color: transparent;
        color: var(--color-primary, #1976d2);
        padding-left: 8px;
        padding-right: 8px;
      }
      
      .kosmo-button--text:hover:not(:disabled) {
        background-color: var(--color-primary-light, rgba(25, 118, 210, 0.1));
      }
      
      /* Disabled state */
      .kosmo-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
    
    // Create HTML
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <button 
        class="kosmo-button kosmo-button--${variant} kosmo-button--${size}"
        ?disabled="${disabled}"
      >
        <slot></slot>
      </button>
    `;
  }
}

// Define custom element
if (!customElements.get('kosmo-button')) {
  customElements.define('kosmo-button', KosmoButton);
}

/**
 * Factory function to create a button element
 * 
 * @param {Object} options - Button options
 * @param {string} [options.text] - Button text
 * @param {string} [options.variant='primary'] - Button variant (primary, secondary, text)
 * @param {string} [options.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [options.disabled=false] - Whether the button is disabled
 * @param {Function} [options.onClick] - Click event handler
 * @returns {HTMLElement} Button element
 */
export function createButton(options = {}) {
  const {
    text = '',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick
  } = options;
  
  // Create button element
  const button = document.createElement('kosmo-button');
  
  // Set attributes
  button.variant = variant;
  button.size = size;
  button.disabled = disabled;
  button.textContent = text;
  
  // Add event listener
  if (onClick && typeof onClick === 'function') {
    button.addEventListener('kosmo-click', onClick);
  }
  
  return button;
}