/**
 * contacts App
 * 
 * Manage your contact list
 */

import { getWindowManager } from '../../ui/WindowManager.js';

/**
 * Launch the contacts app
 */
export async function launch() {
  console.log('Launching contacts app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Contacts',
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
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>';
    icon.style.fontSize = '64px';
    icon.style.marginBottom = '10px';
    container.appendChild(icon);
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = 'Contacts';
    title.style.margin = '0';
    title.style.color = '#333';
    title.style.fontSize = '24px';
    container.appendChild(title);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = 'Manage your contact list';
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
    console.error('Error initializing contacts app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing contacts app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}