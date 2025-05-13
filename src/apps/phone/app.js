/**
 * Phone App
 * 
 * Make and receive calls
 */

import { getWindowManager } from '../../ui/WindowManager.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppTemplate, { ComingSoonModal } from '../_template/AppTemplate.js';
import PhoneApp from './PhoneApp.js';
import './styles.css';

// Phone app icon
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
  </svg>
);

/**
 * Launch the phone app
 */
export async function launch() {
  console.log('Launching phone app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Phone',
    width: 360,
    height: 640,
    x: 100,
    y: 100,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true
  });
  
  // Initialize app in window content
  try {
    // Get content element
    const contentEl = window.getContentElement();
    
    // Create React root
    const root = createRoot(contentEl);
    
    // App metadata
    const appName = 'Phone';
    const appDescription = 'Make and receive calls';
    
    // Render coming soon modal for now
    root.render(
      <ComingSoonModal
        appName={appName}
        appIcon={<PhoneIcon />}
        appDescription={appDescription}
        onClose={() => window.close()}
      />
    );
    
    // In the future, we'll render the actual app:
    /*
    root.render(
      <PhoneApp
        appName={appName}
        appIcon={<PhoneIcon />}
        onClose={() => window.close()}
      />
    );
    */
    
  } catch (error) {
    console.error('Error initializing phone app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing phone app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}