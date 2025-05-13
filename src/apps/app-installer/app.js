/**
 * app-installer App
 * 
 * Standalone app installer tools
 */

import { getWindowManager } from '../../ui/WindowManager.js';

/**
 * Launch the app-installer app
 */
export async function launch() {
  console.log('Launching app-installer app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'App Installer',
    width: 500,
    height: 400,
    x: 100,
    y: 100,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true
  });
  
  // Initialize app in window content
  try {
    // Make sure the content element has proper styling
    const contentEl = window.getContentElement();
    contentEl.style.display = 'flex';
    contentEl.style.flexDirection = 'column';
    contentEl.style.alignItems = 'center';
    contentEl.style.justifyContent = 'center';
    contentEl.style.width = '100%';
    contentEl.style.height = '100%';
    contentEl.style.padding = '20px';
    contentEl.style.backgroundColor = '#f5f5f5';
    
    // Create coming soon container
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.gap = '20px';
    container.style.textAlign = 'center';
    container.style.maxWidth = '400px';
    
    // Create icon
    const icon = document.createElement('div');
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/></svg>';
    icon.style.fontSize = '64px';
    icon.style.marginBottom = '10px';
    container.appendChild(icon);
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = 'App Installer';
    title.style.margin = '0';
    title.style.color = '#333';
    title.style.fontSize = '24px';
    container.appendChild(title);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = 'Standalone app installer tools';
    description.style.margin = '0';
    description.style.color = '#666';
    container.appendChild(description);
    
    // Create coming soon message
    const comingSoon = document.createElement('div');
    comingSoon.style.marginTop = '20px';
    comingSoon.style.padding = '10px 20px';
    comingSoon.style.backgroundColor = '#e0f7fa';
    comingSoon.style.borderRadius = '8px';
    comingSoon.style.color = '#00838f';
    comingSoon.style.fontWeight = 'bold';
    comingSoon.textContent = 'Coming Soon';
    container.appendChild(comingSoon);
    
    contentEl.appendChild(container);
    
  } catch (error) {
    console.error('Error initializing app-installer app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing app-installer app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}