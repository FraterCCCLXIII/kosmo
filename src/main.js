/**
 * Main entry point for the AI-First OS GUI Framework
 * Initializes core systems and launches the UI
 */

import { loadConfig } from './config.js';
import { initTheme } from './ui/ThemeManager.js';
import { initWindowManager } from './ui/WindowManager.js';
import { initAppLauncher } from './ui/AppLauncher.js';
import { initTaskbar } from './ui/Taskbar.js';
import { initTopNav } from './ui/TopNav.js';
import { initVirtualFS } from './fs/VirtualFS.js';
import { initSessionManager } from './persistence/SessionManager.js';
import { initAiPanel } from './ai/AiPanel.js';
import { initAccessibility } from './ui/Accessibility.js';
import { initI18n } from './i18n/index.js';
import { initRouter } from './router/Router.js';
import { initGitConnector } from './git/GitConnector.js';

// Remove loading indicator
const removeLoading = () => {
  const loadingEl = document.getElementById('loading');
  if (loadingEl) {
    loadingEl.remove();
  }
};

// Initialize the OS environment
async function initOS() {
  try {
    console.log('Initializing OS environment...');
    
    // Load configuration
    const config = await loadConfig();
    
    // Initialize core systems in dependency order
    await initI18n(config.language);
    await initTheme(config.theme);
    await initAccessibility();
    await initVirtualFS();
    await initSessionManager();
    
    // Initialize UI components
    const windowManager = await initWindowManager();
    const router = await initRouter();
    
    // Initialize navigation components
    await initTopNav();
    await initTaskbar();
    
    // Initialize app management
    await initAppLauncher(config.apps);
    
    // Initialize Git integration if enabled
    if (config.features.gitIntegration) {
      await initGitConnector(config.git);
    }
    
    // Initialize AI panel
    if (config.features.aiAssistant) {
      await initAiPanel(config.ai);
    }
    
    // Remove loading indicator
    removeLoading();
    
    console.log('OS environment initialized successfully');
    
    // Restore previous session if available
    if (config.restoreSession) {
      await restoreSession();
    }
    
  } catch (error) {
    console.error('Failed to initialize OS:', error);
    document.getElementById('app-root').innerHTML = `
      <div class="error-screen">
        <h1>Failed to start OS</h1>
        <p>${error.message}</p>
        <button onclick="location.reload()">Retry</button>
      </div>
    `;
  }
}

// Restore previous session
async function restoreSession() {
  // Implementation will be added later
  console.log('Restoring previous session...');
}

// Start the OS when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initOS);

// Export for testing
export { initOS };