/**
 * Tabs Components
 * 
 * Framework-agnostic tabs components using Web Components
 */

/**
 * KosmoTabs Component
 */
export class KosmoTabs extends HTMLElement {
  static get observedAttributes() {
    return ['selected-index'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._tabs = [];
    this._panels = [];
    this._selectedIndex = 0;
    this.render();
  }
  
  connectedCallback() {
    this.upgradeProperty('selectedIndex');
    this.addEventListener('kosmo-tab-click', this.handleTabClick);
    this.updateTabs();
  }
  
  disconnectedCallback() {
    this.removeEventListener('kosmo-tab-click', this.handleTabClick);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected-index' && oldValue !== newValue) {
      this.selectedIndex = parseInt(newValue, 10);
    }
  }
  
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  
  get selectedIndex() {
    return this._selectedIndex;
  }
  
  set selectedIndex(value) {
    const index = parseInt(value, 10);
    if (isNaN(index)) return;
    
    this._selectedIndex = index;
    this.setAttribute('selected-index', index);
    this.updateTabs();
    
    // Dispatch change event
    this.dispatchEvent(new CustomEvent('kosmo-tabs-change', {
      bubbles: true,
      composed: true,
      detail: { selectedIndex: index }
    }));
  }
  
  handleTabClick = (event) => {
    const tab = event.target;
    const index = this._tabs.indexOf(tab);
    if (index !== -1) {
      this.selectedIndex = index;
    }
  }
  
  updateTabs() {
    // Find all tab and panel elements
    this._tabs = Array.from(this.querySelectorAll('kosmo-tab'));
    this._panels = Array.from(this.querySelectorAll('kosmo-tab-panel'));
    
    // Ensure selectedIndex is within bounds
    if (this._selectedIndex >= this._tabs.length) {
      this._selectedIndex = this._tabs.length > 0 ? 0 : -1;
    }
    
    // Update tab and panel states
    this._tabs.forEach((tab, index) => {
      tab.selected = index === this._selectedIndex;
      tab.setAttribute('aria-selected', index === this._selectedIndex);
      tab.setAttribute('tabindex', index === this._selectedIndex ? '0' : '-1');
    });
    
    this._panels.forEach((panel, index) => {
      panel.hidden = index !== this._selectedIndex;
      panel.setAttribute('aria-hidden', index !== this._selectedIndex);
    });
  }
  
  render() {
    const styles = `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      
      .kosmo-tabs__tablist {
        display: flex;
        border-bottom: 1px solid var(--color-border, rgba(0, 0, 0, 0.12));
        overflow-x: auto;
        scrollbar-width: none;
      }
      
      .kosmo-tabs__tablist::-webkit-scrollbar {
        display: none;
      }
      
      .kosmo-tabs__content {
        flex: 1;
        overflow: auto;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="kosmo-tabs__tablist" role="tablist">
        <slot name="tab"></slot>
      </div>
      <div class="kosmo-tabs__content">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * KosmoTab Component
 */
export class KosmoTab extends HTMLElement {
  static get observedAttributes() {
    return ['selected', 'disabled'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  connectedCallback() {
    this.upgradeProperty('selected');
    this.upgradeProperty('disabled');
    
    this.setAttribute('role', 'tab');
    this.setAttribute('slot', 'tab');
    
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }
  
  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
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
  
  handleClick = (event) => {
    if (this.disabled) return;
    
    this.dispatchEvent(new CustomEvent('kosmo-tab-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }
  
  handleKeyDown = (event) => {
    if (this.disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.dispatchEvent(new CustomEvent('kosmo-tab-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event }
      }));
    }
  }
  
  render() {
    const selected = this.selected;
    const disabled = this.disabled;
    
    const styles = `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        cursor: pointer;
        font-size: var(--font-size-md, 14px);
        font-weight: var(--font-weight-medium, 500);
        color: var(--color-text-secondary, rgba(0, 0, 0, 0.6));
        transition: color 0.2s, background-color 0.2s;
        position: relative;
        user-select: none;
        white-space: nowrap;
      }
      
      :host(:hover) {
        background-color: var(--color-hover, rgba(0, 0, 0, 0.04));
      }
      
      :host([selected]) {
        color: var(--color-primary, #1976d2);
      }
      
      :host([selected])::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--color-primary, #1976d2);
      }
      
      :host([disabled]) {
        color: var(--color-disabled, rgba(0, 0, 0, 0.38));
        cursor: not-allowed;
      }
      
      :host([disabled]:hover) {
        background-color: transparent;
      }
      
      .kosmo-tab__icon {
        margin-right: 8px;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="kosmo-tab__icon">
        <slot name="icon"></slot>
      </div>
      <slot></slot>
    `;
  }
}

/**
 * KosmoTabPanel Component
 */
export class KosmoTabPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  connectedCallback() {
    this.setAttribute('role', 'tabpanel');
  }
  
  render() {
    const styles = `
      :host {
        display: block;
        padding: 16px;
      }
      
      :host([hidden]) {
        display: none;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="kosmo-tab-panel">
        <slot></slot>
      </div>
    `;
  }
}

// Define custom elements
if (!customElements.get('kosmo-tabs')) {
  customElements.define('kosmo-tabs', KosmoTabs);
}

if (!customElements.get('kosmo-tab')) {
  customElements.define('kosmo-tab', KosmoTab);
}

if (!customElements.get('kosmo-tab-panel')) {
  customElements.define('kosmo-tab-panel', KosmoTabPanel);
}

/**
 * Factory function to create a tabs container
 * 
 * @param {Object} options - Tabs options
 * @param {number} [options.selectedIndex=0] - Initially selected tab index
 * @param {Function} [options.onChange] - Change event handler
 * @returns {HTMLElement} Tabs element
 */
export function createTabs(options = {}) {
  const {
    selectedIndex = 0,
    onChange
  } = options;
  
  const tabs = document.createElement('kosmo-tabs');
  tabs.selectedIndex = selectedIndex;
  
  if (onChange && typeof onChange === 'function') {
    tabs.addEventListener('kosmo-tabs-change', onChange);
  }
  
  return tabs;
}

/**
 * Factory function to create a tab
 * 
 * @param {Object} options - Tab options
 * @param {string} [options.label] - Tab label
 * @param {HTMLElement} [options.icon] - Icon element
 * @param {boolean} [options.selected=false] - Whether the tab is selected
 * @param {boolean} [options.disabled=false] - Whether the tab is disabled
 * @returns {HTMLElement} Tab element
 */
export function createTab(options = {}) {
  const {
    label = '',
    icon,
    selected = false,
    disabled = false
  } = options;
  
  const tab = document.createElement('kosmo-tab');
  tab.textContent = label;
  tab.selected = selected;
  tab.disabled = disabled;
  
  if (icon) {
    icon.slot = 'icon';
    tab.appendChild(icon);
  }
  
  return tab;
}

/**
 * Factory function to create a tab panel
 * 
 * @param {Object} options - Tab panel options
 * @param {HTMLElement|string} [options.content] - Panel content
 * @returns {HTMLElement} Tab panel element
 */
export function createTabPanel(options = {}) {
  const { content } = options;
  
  const panel = document.createElement('kosmo-tab-panel');
  
  if (content) {
    if (typeof content === 'string') {
      panel.innerHTML = content;
    } else {
      panel.appendChild(content);
    }
  }
  
  return panel;
}