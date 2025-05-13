/**
 * audio-player App
 * 
 * Play music and audio files
 */

import { getWindowManager } from '../../ui/WindowManager.js';

/**
 * Launch the audio-player app
 */
export async function launch() {
  console.log('Launching audio-player app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Audio Player',
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
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/><path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/></svg>';
    icon.style.fontSize = '64px';
    icon.style.marginBottom = '10px';
    container.appendChild(icon);
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = 'Audio Player';
    title.style.margin = '0';
    title.style.color = '#333';
    title.style.fontSize = '24px';
    container.appendChild(title);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = 'Play music and audio files';
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
    console.error('Error initializing audio-player app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing audio-player app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}