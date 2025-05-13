/**
 * App Layout Components
 * 
 * Framework-agnostic app layout components using Web Components
 */

/**
 * KosmoAppLayout Component
 */
export class KosmoAppLayout extends HTMLElement {
  static get observedAttributes() {
    return ['sidebar-open'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  connectedCallback() {
    this.upgradeProperty('sidebarOpen');
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'sidebar-open' && oldValue !== newValue) {
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
  
  get sidebarOpen() {
    return this.hasAttribute('sidebar-open');
  }
  
  set sidebarOpen(value) {
    if (value) {
      this.setAttribute('sidebar-open', '');
    } else {
      this.removeAttribute('sidebar-open');
    }
  }
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  render() {
    const sidebarOpen = this.sidebarOpen;
    
    const styles = `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .kosmo-app-layout {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .kosmo-app-layout__main {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
      
      .kosmo-app-layout__sidebar {
        width: 240px;
        flex-shrink: 0;
        overflow: auto;
        background-color: var(--color-surface, #ffffff);
        border-right: 1px solid var(--color-border, rgba(0, 0, 0, 0.12));
        transition: transform 0.3s ease;
      }
      
      .kosmo-app-layout__content {
        flex: 1;
        overflow: auto;
        background-color: var(--color-background, #f5f5f5);
      }
      
      @media (max-width: 768px) {
        .kosmo-app-layout__sidebar {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          transform: translateX(-100%);
        }
        
        :host([sidebar-open]) .kosmo-app-layout__sidebar {
          transform: translateX(0);
        }
        
        .kosmo-app-layout__overlay {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 99;
        }
        
        :host([sidebar-open]) .kosmo-app-layout__overlay {
          display: block;
        }
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="kosmo-app-layout">
        <div class="kosmo-app-layout__header">
          <slot name="header"></slot>
        </div>
        <div class="kosmo-app-layout__main">
          <div class="kosmo-app-layout__sidebar">
            <slot name="sidebar"></slot>
          </div>
          <div class="kosmo-app-layout__overlay" @click="${() => this.toggleSidebar()}"></div>
          <div class="kosmo-app-layout__content">
            <slot name="content"></slot>
          </div>
        </div>
        <div class="kosmo-app-layout__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
    
    // Add event listener to overlay
    const overlay = this.shadowRoot.querySelector('.kosmo-app-layout__overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.toggleSidebar());
    }
  }
}

/**
 * KosmoAppHeader Component
 */
export class KosmoAppHeader extends HTMLElement {
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
      
      .kosmo-app-header {
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 16px;
        background-color: var(--color-surface, #ffffff);
        border-bottom: 1px solid var(--color-border, rgba(0, 0, 0, 0.12));
      }
      
      .kosmo-app-header__start {
        display: flex;
        align-items: center;
        margin-right: 16px;
      }
      
      .kosmo-app-header__title {
        flex: 1;
        font-size: var(--font-size-lg, 16px);
        font-weight: var(--font-weight-medium, 500);
        color: var(--color-text-primary, rgba(0, 0, 0, 0.87));
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .kosmo-app-header__end {
        display: flex;
        align-items: center;
        margin-left: 16px;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <header class="kosmo-app-header">
        <div class="kosmo-app-header__start">
          <slot name="start"></slot>
        </div>
        <h1 class="kosmo-app-header__title">
          <slot></slot>
        </h1>
        <div class="kosmo-app-header__end">
          <slot name="end"></slot>
        </div>
      </header>
    `;
  }
}

/**
 * KosmoAppContent Component
 */
export class KosmoAppContent extends HTMLElement {
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
        height: 100%;
        overflow: auto;
      }
      
      .kosmo-app-content {
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <main class="kosmo-app-content">
        <slot></slot>
      </main>
    `;
  }
}

/**
 * KosmoAppSidebar Component
 */
export class KosmoAppSidebar extends HTMLElement {
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
        height: 100%;
        overflow: auto;
      }
      
      .kosmo-app-sidebar {
        height: 100%;
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <nav class="kosmo-app-sidebar">
        <slot></slot>
      </nav>
    `;
  }
}

/**
 * KosmoAppFooter Component
 */
export class KosmoAppFooter extends HTMLElement {
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
      
      .kosmo-app-footer {
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 16px;
        background-color: var(--color-surface, #ffffff);
        border-top: 1px solid var(--color-border, rgba(0, 0, 0, 0.12));
        font-size: var(--font-size-sm, 12px);
        color: var(--color-text-secondary, rgba(0, 0, 0, 0.6));
      }
    `;
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <footer class="kosmo-app-footer">
        <slot></slot>
      </footer>
    `;
  }
}

// Define custom elements
if (!customElements.get('kosmo-app-layout')) {
  customElements.define('kosmo-app-layout', KosmoAppLayout);
}

if (!customElements.get('kosmo-app-header')) {
  customElements.define('kosmo-app-header', KosmoAppHeader);
}

if (!customElements.get('kosmo-app-content')) {
  customElements.define('kosmo-app-content', KosmoAppContent);
}

if (!customElements.get('kosmo-app-sidebar')) {
  customElements.define('kosmo-app-sidebar', KosmoAppSidebar);
}

if (!customElements.get('kosmo-app-footer')) {
  customElements.define('kosmo-app-footer', KosmoAppFooter);
}

/**
 * Factory function to create an app layout
 * 
 * @param {Object} options - App layout options
 * @param {boolean} [options.sidebarOpen=false] - Whether the sidebar is initially open
 * @param {Function} [options.onSidebarToggle] - Sidebar toggle event handler
 * @returns {HTMLElement} App layout element
 */
export function createAppLayout(options = {}) {
  const {
    sidebarOpen = false,
    onSidebarToggle
  } = options;
  
  const appLayout = document.createElement('kosmo-app-layout');
  appLayout.sidebarOpen = sidebarOpen;
  
  if (onSidebarToggle && typeof onSidebarToggle === 'function') {
    appLayout.addEventListener('sidebar-toggle', onSidebarToggle);
  }
  
  return appLayout;
}

/**
 * Factory function to create an app header
 * 
 * @param {Object} options - App header options
 * @param {string} [options.title] - Header title
 * @param {HTMLElement} [options.startContent] - Content for the start slot
 * @param {HTMLElement} [options.endContent] - Content for the end slot
 * @returns {HTMLElement} App header element
 */
export function createAppHeader(options = {}) {
  const {
    title = '',
    startContent,
    endContent
  } = options;
  
  const appHeader = document.createElement('kosmo-app-header');
  appHeader.textContent = title;
  appHeader.slot = 'header';
  
  if (startContent) {
    startContent.slot = 'start';
    appHeader.appendChild(startContent);
  }
  
  if (endContent) {
    endContent.slot = 'end';
    appHeader.appendChild(endContent);
  }
  
  return appHeader;
}

/**
 * Factory function to create an app content
 * 
 * @param {Object} options - App content options
 * @param {HTMLElement|string} [options.content] - Content
 * @returns {HTMLElement} App content element
 */
export function createAppContent(options = {}) {
  const { content } = options;
  
  const appContent = document.createElement('kosmo-app-content');
  appContent.slot = 'content';
  
  if (content) {
    if (typeof content === 'string') {
      appContent.innerHTML = content;
    } else {
      appContent.appendChild(content);
    }
  }
  
  return appContent;
}

/**
 * Factory function to create an app sidebar
 * 
 * @param {Object} options - App sidebar options
 * @param {HTMLElement|string} [options.content] - Content
 * @returns {HTMLElement} App sidebar element
 */
export function createAppSidebar(options = {}) {
  const { content } = options;
  
  const appSidebar = document.createElement('kosmo-app-sidebar');
  appSidebar.slot = 'sidebar';
  
  if (content) {
    if (typeof content === 'string') {
      appSidebar.innerHTML = content;
    } else {
      appSidebar.appendChild(content);
    }
  }
  
  return appSidebar;
}

/**
 * Factory function to create an app footer
 * 
 * @param {Object} options - App footer options
 * @param {string} [options.text] - Footer text
 * @returns {HTMLElement} App footer element
 */
export function createAppFooter(options = {}) {
  const { text = '' } = options;
  
  const appFooter = document.createElement('kosmo-app-footer');
  appFooter.textContent = text;
  appFooter.slot = 'footer';
  
  return appFooter;
}