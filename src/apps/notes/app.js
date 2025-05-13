/**
 * Notes App
 * 
 * Quick notes and checklists
 */

import { getWindowManager } from '../../ui/WindowManager.js';
import NotesApp from './NotesApp.js';

/**
 * Launch the notes app
 */
export async function launch() {
  console.log('Launching notes app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Notes',
    width: 800,
    height: 600,
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
    contentEl.style.width = '100%';
    contentEl.style.height = '100%';
    contentEl.style.overflow = 'hidden';
    
    // Initialize the Notes app with the content element
    const notesApp = new NotesApp(contentEl);
    
  } catch (error) {
    console.error('Error initializing notes app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing notes app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}