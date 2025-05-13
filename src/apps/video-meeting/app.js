/**
 * video-meeting App
 * 
 * Online meetings and video conferencing
 */

import { getWindowManager } from '../../ui/WindowManager.js';

/**
 * Launch the video-meeting app
 */
export async function launch() {
  console.log('Launching video-meeting app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Video Meeting',
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
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/><path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A1.5 1.5 0 0 0 4 4.5v8A1.5 1.5 0 0 0 5.5 14h5a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 10.5 3h-2V1.866ZM7 3V2a1 1 0 0 1 2 0v1H7Z"/></svg>';
    icon.style.fontSize = '64px';
    icon.style.marginBottom = '10px';
    container.appendChild(icon);
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = 'Video Meeting';
    title.style.margin = '0';
    title.style.color = '#333';
    title.style.fontSize = '24px';
    container.appendChild(title);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = 'Online meetings and video conferencing';
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
    console.error('Error initializing video-meeting app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing video-meeting app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}