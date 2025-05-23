/**
 * Contacts App
 * 
 * Manage your contact list
 */

import { getWindowManager } from '../../ui/WindowManager.js';
import ContactsApp from './vanilla/ContactsApp.js';
import './vanilla/ContactsApp.css';

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
    width: 800,
    height: 600,
    x: 50,
    y: 50,
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
    
    // Initialize the Contacts app with the content element
    const contactsApp = new ContactsApp(contentEl);
    
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