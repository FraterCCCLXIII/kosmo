/**
 * Calendar App
 * 
 * Events and scheduling
 */

import { getWindowManager } from '../../ui/WindowManager.js';
import CalendarApp from './CalendarApp';
import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Launch the calendar app
 */
export async function launch() {
  console.log('Launching calendar app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Calendar',
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
    
    // Create root for React
    const root = createRoot(contentEl);
    
    // Render the Calendar app
    root.render(
      <CalendarApp />
    );
    
  } catch (error) {
    console.error('Error initializing calendar app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing calendar app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}