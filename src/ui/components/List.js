/**
 * List Components
 * 
 * Framework-agnostic list components using Web Components
 */

/**
 * KosmoList Component
 */
export class KosmoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  connectedCallback() {
    // Add any initialization if needed
  }
  
  render() {
    const styles = `
      :host {
        display: block;
        width: 100%;
      }
      
      .kosmo-list {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        overflow: auto;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <ul class="kosmo-list">
        <slot></slot>
      </ul>
    `;
  }
}

/**
 * KosmoListItem Component
 */
export class KosmoListItem extends HTMLElement {
  static get observedAttributes() {
    return ['primary', 'secondary', 'selected'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  connectedCallback() {
    this.upgradeProperty('primary');
    this.upgradeProperty('secondary');
    this.upgradeProperty('selected');
    
    this.addEventListener('click', this.handleClick);
  }
  
  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  
  get primary() {
    return this.getAttribute('primary') || '';
  }
  
  set primary(value) {
    this.setAttribute('primary', value);
  }
  
  get secondary() {
    return this.getAttribute('secondary') || '';
  }
  
  set secondary(value) {
    this.setAttribute('secondary', value);
  }
  
  get selected() {
    return this.hasAttribute('selected');
  }
  
  set selected(value) {
    if (value) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }
  
  handleClick = (event) => {
    this.dispatchEvent(new CustomEvent('kosmo-item-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }
  
  render() {
    const primary = this.primary;
    const secondary = this.secondary;
    const selected = this.selected;
    
    const styles = `
      :host {
        display: block;
        width: 100%;
      }
      
      .kosmo-list-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        position: relative;
      }
      
      .kosmo-list-item:hover {
        background-color: var(--color-hover, rgba(0, 0, 0, 0.04));
      }
      
      .kosmo-list-item--selected {
        background-color: var(--color-selected, rgba(25, 118, 210, 0.08));
      }
      
      .kosmo-list-item--selected:hover {
        background-color: var(--color-selected-hover, rgba(25, 118, 210, 0.12));
      }
      
      .kosmo-list-item__start {
        margin-right: 16px;
        display: flex;
        align-items: center;
      }
      
      .kosmo-list-item__content {
        flex: 1;
        min-width: 0;
      }
      
      .kosmo-list-item__primary {
        font-size: var(--font-size-md, 14px);
        font-weight: var(--font-weight-medium, 500);
        color: var(--color-text-primary, rgba(0, 0, 0, 0.87));
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .kosmo-list-item__secondary {
        font-size: var(--font-size-sm, 12px);
        color: var(--color-text-secondary, rgba(0, 0, 0, 0.6));
        margin: 4px 0 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .kosmo-list-item__end {
        margin-left: 16px;
        display: flex;
        align-items: center;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <li class="kosmo-list-item ${selected ? 'kosmo-list-item--selected' : ''}">
        <div class="kosmo-list-item__start">
          <slot name="start-icon"></slot>
        </div>
        <div class="kosmo-list-item__content">
          ${primary ? `<p class="kosmo-list-item__primary">${primary}</p>` : ''}
          ${secondary ? `<p class="kosmo-list-item__secondary">${secondary}</p>` : ''}
          <slot></slot>
        </div>
        <div class="kosmo-list-item__end">
          <slot name="end-icon"></slot>
        </div>
      </li>
    `;
  }
}

/**
 * KosmoListDivider Component
 */
export class KosmoListDivider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  render() {
    const styles = `
      :host {
        display: block;
        width: 100%;
      }
      
      .kosmo-list-divider {
        height: 1px;
        background-color: var(--color-border, rgba(0, 0, 0, 0.12));
        margin: 8px 0;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="kosmo-list-divider"></div>
    `;
  }
}

/**
 * KosmoListSubheader Component
 */
export class KosmoListSubheader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  render() {
    const styles = `
      :host {
        display: block;
        width: 100%;
      }
      
      .kosmo-list-subheader {
        font-size: var(--font-size-sm, 12px);
        font-weight: var(--font-weight-medium, 500);
        color: var(--color-text-secondary, rgba(0, 0, 0, 0.6));
        padding: 16px 16px 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="kosmo-list-subheader">
        <slot></slot>
      </div>
    `;
  }
}

// Define custom elements
if (!customElements.get('kosmo-list')) {
  customElements.define('kosmo-list', KosmoList);
}

if (!customElements.get('kosmo-list-item')) {
  customElements.define('kosmo-list-item', KosmoListItem);
}

if (!customElements.get('kosmo-list-divider')) {
  customElements.define('kosmo-list-divider', KosmoListDivider);
}

if (!customElements.get('kosmo-list-subheader')) {
  customElements.define('kosmo-list-subheader', KosmoListSubheader);
}

/**
 * Factory function to create a list element
 * 
 * @param {Object} options - List options
 * @param {string} [options.className] - Additional CSS class
 * @returns {HTMLElement} List element
 */
export function createList(options = {}) {
  const { className } = options;
  
  const list = document.createElement('kosmo-list');
  
  if (className) {
    list.className = className;
  }
  
  return list;
}

/**
 * Factory function to create a list item element
 * 
 * @param {Object} options - List item options
 * @param {string} [options.primary] - Primary text
 * @param {string} [options.secondary] - Secondary text
 * @param {boolean} [options.selected=false] - Whether the item is selected
 * @param {HTMLElement} [options.startIcon] - Icon element to display at the start
 * @param {HTMLElement} [options.endIcon] - Icon element to display at the end
 * @param {Function} [options.onClick] - Click event handler
 * @returns {HTMLElement} List item element
 */
export function createListItem(options = {}) {
  const {
    primary,
    secondary,
    selected = false,
    startIcon,
    endIcon,
    onClick
  } = options;
  
  const listItem = document.createElement('kosmo-list-item');
  
  if (primary) {
    listItem.primary = primary;
  }
  
  if (secondary) {
    listItem.secondary = secondary;
  }
  
  listItem.selected = selected;
  
  if (startIcon) {
    startIcon.slot = 'start-icon';
    listItem.appendChild(startIcon);
  }
  
  if (endIcon) {
    endIcon.slot = 'end-icon';
    listItem.appendChild(endIcon);
  }
  
  if (onClick && typeof onClick === 'function') {
    listItem.addEventListener('kosmo-item-click', onClick);
  }
  
  return listItem;
}

/**
 * Factory function to create a list divider element
 * 
 * @returns {HTMLElement} List divider element
 */
export function createListDivider() {
  return document.createElement('kosmo-list-divider');
}

/**
 * Factory function to create a list subheader element
 * 
 * @param {Object} options - List subheader options
 * @param {string} [options.text] - Subheader text
 * @returns {HTMLElement} List subheader element
 */
export function createListSubheader(options = {}) {
  const { text = '' } = options;
  
  const subheader = document.createElement('kosmo-list-subheader');
  subheader.textContent = text;
  
  return subheader;
}