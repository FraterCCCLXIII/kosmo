/**
 * Browser App
 * A simple web browser
 */

import { getWindowManager } from '../../ui/WindowManager.js';

// Define icon SVG paths
const ICONS = {
  browser: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" /></svg>',
  back: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" /></svg>',
  forward: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" /></svg>',
  refresh: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" /></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 0 0 1.061 1.06l8.69-8.69Z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.43Z" /></svg>',
  bookmark: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" /></svg>'
};

/**
 * Launch the browser app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching browser app...');
  
  // Get window manager instance
  const windowManager = await getWindowManager();
  const window = windowManager.createWindow({
    title: 'Browser',
    width: 1024,
    height: 768,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
  });
  
  // Create browser UI
  createBrowserUI(window.content);
  
  // Return window instance
  return window;
}

/**
 * Create browser UI
 * @param {HTMLElement} containerEl - Container element
 */
function createBrowserUI(containerEl) {
  // Create toolbar
  const toolbarEl = document.createElement('div');
  toolbarEl.className = 'browser-toolbar';
  toolbarEl.style.display = 'flex';
  toolbarEl.style.alignItems = 'center';
  toolbarEl.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  toolbarEl.style.borderBottom = 'var(--border-width) solid var(--border-color)';
  toolbarEl.style.backgroundColor = 'var(--color-bg-secondary)';
  
  // Add navigation buttons
  const backButton = createToolbarButton('Back', ICONS.back);
  const forwardButton = createToolbarButton('Forward', ICONS.forward);
  const refreshButton = createToolbarButton('Refresh', ICONS.refresh);
  const homeButton = createToolbarButton('Home', ICONS.home);
  
  toolbarEl.appendChild(backButton);
  toolbarEl.appendChild(forwardButton);
  toolbarEl.appendChild(refreshButton);
  toolbarEl.appendChild(homeButton);
  
  // Add URL input
  const urlInputContainer = document.createElement('div');
  urlInputContainer.style.flex = '1';
  urlInputContainer.style.margin = '0 var(--spacing-md)';
  urlInputContainer.style.position = 'relative';
  
  const urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.className = 'browser-url-input';
  urlInput.value = 'https://kosmo.ai';
  urlInput.style.width = '100%';
  urlInput.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  urlInput.style.border = 'var(--border-width) solid var(--border-color)';
  urlInput.style.borderRadius = 'var(--border-radius-md)';
  urlInput.style.backgroundColor = 'var(--color-bg-primary)';
  
  // Add key event listener for Enter key
  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      navigateToUrl(urlInput.value);
    }
  });
  
  urlInputContainer.appendChild(urlInput);
  toolbarEl.appendChild(urlInputContainer);
  
  // Add bookmark button
  const bookmarkButton = createToolbarButton('Bookmark', ICONS.bookmark);
  
  toolbarEl.appendChild(bookmarkButton);
  
  containerEl.appendChild(toolbarEl);
  
  // Create browser content area (iframe)
  const browserContentEl = document.createElement('div');
  browserContentEl.className = 'browser-content';
  browserContentEl.style.flex = '1';
  browserContentEl.style.overflow = 'hidden';
  
  // Create iframe for browser content
  const iframeEl = document.createElement('iframe');
  iframeEl.className = 'browser-iframe';
  iframeEl.style.width = '100%';
  iframeEl.style.height = '100%';
  iframeEl.style.border = 'none';
  iframeEl.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
  iframeEl.setAttribute('src', 'about:blank');
  
  browserContentEl.appendChild(iframeEl);
  containerEl.appendChild(browserContentEl);
  
  // Create status bar
  const statusBarEl = document.createElement('div');
  statusBarEl.className = 'browser-status-bar';
  statusBarEl.style.padding = 'var(--spacing-xs) var(--spacing-md)';
  statusBarEl.style.borderTop = 'var(--border-width) solid var(--border-color)';
  statusBarEl.style.backgroundColor = 'var(--color-bg-secondary)';
  statusBarEl.style.fontSize = 'var(--font-size-sm)';
  statusBarEl.style.color = 'var(--color-text-secondary)';
  statusBarEl.textContent = 'Ready';
  
  containerEl.appendChild(statusBarEl);
  
  // Navigate to initial URL
  setTimeout(() => {
    navigateToUrl('https://kosmo.ai');
  }, 100);
  
  /**
   * Navigate to URL
   * @param {string} url - URL to navigate to
   */
  function navigateToUrl(url) {
    // Add https:// if not present
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Update URL input
    urlInput.value = url;
    
    // Update status bar
    statusBarEl.textContent = 'Loading ' + url + '...';
    
    // In a real implementation, we would load the URL in the iframe
    // For this demo, we'll just show a placeholder
    iframeEl.srcdoc = `
      <html>
        <head>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background-color: #f9fafb;
              color: #111827;
            }
            .container {
              text-align: center;
              max-width: 600px;
              padding: 2rem;
            }
            h1 {
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }
            p {
              margin-bottom: 1.5rem;
              line-height: 1.5;
            }
            .url {
              font-weight: bold;
              color: #4f46e5;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Kosmo Browser</h1>
            <p>This is a simulated browser environment. In a real implementation, this iframe would load the requested URL.</p>
            <p>You requested: <span class="url">${url}</span></p>
          </div>
        </body>
      </html>
    `;
    
    // Update status bar after "loading"
    setTimeout(() => {
      statusBarEl.textContent = 'Loaded ' + url;
    }, 500);
  }
}

/**
 * Create a toolbar button
 * @param {string} label - Button label
 * @param {string} icon - Button icon SVG
 * @returns {HTMLElement} Button element
 */
function createToolbarButton(label, icon) {
  const button = document.createElement('button');
  button.className = 'browser-toolbar-button';
  button.setAttribute('aria-label', label);
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.width = '32px';
  button.style.height = '32px';
  button.style.borderRadius = 'var(--border-radius-md)';
  button.style.border = 'none';
  button.style.backgroundColor = 'transparent';
  button.style.cursor = 'pointer';
  button.style.color = 'var(--color-text-primary)';
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'var(--color-bg-tertiary)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'transparent';
  });
  
  // Add icon
  button.innerHTML = icon;
  
  return button;
}