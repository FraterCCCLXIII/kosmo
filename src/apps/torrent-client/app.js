/**
 * torrent-client App
 * 
 * Download media/files via P2P
 */

import { getWindowManager } from '../../ui/WindowManager.js';

/**
 * Launch the torrent-client app
 */
export async function launch() {
  console.log('Launching torrent-client app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Torrent Client',
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
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 0 1 3.096-5.5H2.5a.5.5 0 0 0 0 1h2A.5.5 0 0 0 5 3V1a.5.5 0 0 0-1 0v1.19A7.483 7.483 0 0 0 0 8a7.483 7.483 0 0 0 4 6.81V14a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0 0 1h2.096A6.5 6.5 0 0 1 1.5 8zm7-5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1h-2.096a6.5 6.5 0 0 1 0 11H9.5a.5.5 0 0 0 0 1h-2a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-1.19A7.483 7.483 0 0 0 16 8a7.483 7.483 0 0 0-4-6.81V2a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1H11.5a6.5 6.5 0 0 1 3 5.5 6.5 6.5 0 0 1-3 5.5H11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-1.19A7.483 7.483 0 0 0 16 8a7.483 7.483 0 0 0-4-6.81V2a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1h-2.096a6.5 6.5 0 0 1-3-5.5z"/></svg>';
    icon.style.fontSize = '64px';
    icon.style.marginBottom = '10px';
    container.appendChild(icon);
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = 'Torrent Client';
    title.style.margin = '0';
    title.style.color = '#333';
    title.style.fontSize = '24px';
    container.appendChild(title);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = 'Download media/files via P2P';
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
    console.error('Error initializing torrent-client app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing torrent-client app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}