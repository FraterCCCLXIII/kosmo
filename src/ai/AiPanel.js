/**
 * AI Panel
 * Integrated AI agent UI + executor
 */

// AI state
let aiConfig = null;
let aiContext = [];
let isProcessing = false;

/**
 * Initialize the AI panel
 * @param {Object} config - AI configuration
 * @returns {Object} AI panel API
 */
export async function initAiPanel(config = {}) {
  console.log('Initializing AI panel...');
  
  // Store configuration
  aiConfig = {
    model: config.model || 'default',
    systemPrompt: config.systemPrompt || 'You are an AI assistant in an operating system. Help the user with tasks.',
    features: {
      codeCompletion: true,
      commandSuggestions: true,
      contextAwareness: true,
      ...config.features,
    },
  };
  
  // Create AI panel element
  createAiPanelElement();
  
  // Return public API
  return {
    sendMessage,
    executeCommand,
    togglePanel,
    getContext,
    clearContext,
  };
}

/**
 * Create AI panel element
 */
async function createAiPanelElement() {
  // Check if panel already exists
  let panelEl = document.getElementById('ai-panel');
  if (panelEl) return;
  
  // Import WindowManager
  const { getWindowManager } = await import('../ui/WindowManager.js');
  const windowManager = await getWindowManager();
  
  // Define AI icon SVG
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
  </svg>`;
  
  // Create a data URL for the icon
  const iconDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg)}`;
  
  // Create window for AI panel
  const aiWindow = windowManager.createWindow({
    title: 'AI Assistant',
    width: 600,
    height: 500,
    x: window.innerWidth / 2 - 300,
    y: window.innerHeight / 2 - 250,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
    icon: iconDataUrl
  });
  
  // Get content element
  const contentEl = aiWindow.getContentElement();
  contentEl.style.display = 'flex';
  contentEl.style.flexDirection = 'column';
  contentEl.style.height = '100%';
  contentEl.style.overflow = 'hidden';
  
  // Create panel container
  panelEl = document.createElement('div');
  panelEl.id = 'ai-panel';
  panelEl.className = 'ai-panel';
  panelEl.style.display = 'flex';
  panelEl.style.flexDirection = 'column';
  panelEl.style.flex = '1';
  panelEl.style.overflow = 'hidden';
  
  // We don't need a header since the window already has one
  // Just add the panel directly to the content element
  
  // Create messages container
  const messagesEl = document.createElement('div');
  messagesEl.className = 'ai-panel-messages';
  messagesEl.style.flex = '1';
  messagesEl.style.overflowY = 'auto';
  messagesEl.style.padding = 'var(--spacing-md)';
  messagesEl.style.display = 'flex';
  messagesEl.style.flexDirection = 'column';
  messagesEl.style.gap = 'var(--spacing-md)';
  messagesEl.style.backgroundColor = 'var(--color-bg-secondary)';
  panelEl.appendChild(messagesEl);
  
  // Create input container
  const inputContainerEl = document.createElement('div');
  inputContainerEl.className = 'ai-panel-input-container';
  inputContainerEl.style.padding = 'var(--spacing-md)';
  inputContainerEl.style.borderTop = 'var(--border-width) solid var(--border-color)';
  inputContainerEl.style.display = 'flex';
  inputContainerEl.style.gap = 'var(--spacing-sm)';
  inputContainerEl.style.backgroundColor = 'var(--color-bg-primary)';
  
  // Create input field
  const inputEl = document.createElement('input');
  inputEl.className = 'ai-panel-input';
  inputEl.type = 'text';
  inputEl.placeholder = 'Ask me anything...';
  inputEl.style.flex = '1';
  inputEl.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  inputEl.style.border = 'var(--border-width) solid var(--border-color)';
  inputEl.style.borderRadius = 'var(--border-radius-md)';
  inputEl.style.backgroundColor = 'var(--color-bg-secondary)';
  inputEl.style.color = 'var(--color-text-primary)';
  inputEl.style.fontSize = 'var(--font-size-md)';
  
  // Add keydown handler for input
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const message = inputEl.value.trim();
      if (message) {
        sendMessage(message);
        inputEl.value = '';
      }
    }
  });
  
  inputContainerEl.appendChild(inputEl);
  
  // Create send button
  const sendButtonEl = document.createElement('button');
  sendButtonEl.className = 'ai-panel-send-button';
  sendButtonEl.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  sendButtonEl.style.backgroundColor = 'var(--color-accent)';
  sendButtonEl.style.color = 'white';
  sendButtonEl.style.border = 'none';
  sendButtonEl.style.borderRadius = 'var(--border-radius-md)';
  sendButtonEl.style.cursor = 'pointer';
  sendButtonEl.setAttribute('aria-label', 'Send message');
  
  // Add send icon (Heroicons)
  sendButtonEl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  `;
  
  // Add click handler for send button
  sendButtonEl.addEventListener('click', () => {
    const message = inputEl.value.trim();
    if (message) {
      sendMessage(message);
      inputEl.value = '';
    }
  });
  
  inputContainerEl.appendChild(sendButtonEl);
  panelEl.appendChild(inputContainerEl);
  
  // Add panel to window content
  contentEl.appendChild(panelEl);
  
  // Store window reference for toggling
  panelEl.dataset.windowId = aiWindow.id;
  
  // Add welcome message
  addMessage('ai', 'Hello! I\'m your AI assistant. How can I help you today?');
}

/**
 * Toggle AI panel visibility
 * @param {boolean} [show] - Force show/hide
 */
async function togglePanel(show) {
  const panelEl = document.getElementById('ai-panel');
  if (!panelEl) return;
  
  // Get window ID
  const windowId = panelEl.dataset.windowId;
  if (!windowId) return;
  
  // Import WindowManager
  const { getWindowManager } = await import('../ui/WindowManager.js');
  const windowManager = await getWindowManager();
  
  // Get window
  const aiWindow = windowManager.getWindow(windowId);
  if (!aiWindow) return;
  
  if (show === undefined) {
    // Toggle
    if (aiWindow.isMinimized()) {
      aiWindow.restore();
    } else if (aiWindow.isVisible()) {
      aiWindow.minimize();
    } else {
      aiWindow.show();
    }
  } else {
    // Force
    if (show) {
      if (aiWindow.isMinimized()) {
        aiWindow.restore();
      } else {
        aiWindow.show();
      }
      aiWindow.focus();
    } else {
      aiWindow.hide();
    }
  }
  
  // Focus input when showing
  if (show || show === undefined) {
    setTimeout(() => {
      const inputEl = document.querySelector('.ai-panel-input');
      if (inputEl) inputEl.focus();
    }, 100);
  }
}

/**
 * Send a message to the AI
 * @param {string} message - User message
 */
async function sendMessage(message) {
  if (isProcessing) return;
  
  // Add user message to UI
  addMessage('user', message);
  
  // Add message to context
  aiContext.push({ role: 'user', content: message });
  
  // Set processing state
  isProcessing = true;
  
  // Show typing indicator
  showTypingIndicator();
  
  try {
    // In a real implementation, this would call an AI API
    // For now, we'll simulate a response
    const response = await simulateAiResponse(message);
    
    // Remove typing indicator
    hideTypingIndicator();
    
    // Add AI response to UI
    addMessage('ai', response);
    
    // Add response to context
    aiContext.push({ role: 'assistant', content: response });
    
  } catch (error) {
    console.error('Error getting AI response:', error);
    
    // Remove typing indicator
    hideTypingIndicator();
    
    // Add error message
    addMessage('error', 'Sorry, I encountered an error. Please try again.');
  } finally {
    // Reset processing state
    isProcessing = false;
  }
}

/**
 * Execute a command via the AI
 * @param {string} command - Command to execute
 * @returns {Promise<string>} Command result
 */
async function executeCommand(command) {
  // Add command to context
  aiContext.push({ role: 'system', content: `User executed command: ${command}` });
  
  // In a real implementation, this would execute the command
  // For now, we'll simulate a response
  return `Executed command: ${command}`;
}

/**
 * Add a message to the UI
 * @param {string} role - Message role ('user', 'ai', 'error')
 * @param {string} content - Message content
 */
function addMessage(role, content) {
  const messagesEl = document.querySelector('.ai-panel-messages');
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `ai-message ai-message-${role}`;
  messageEl.style.maxWidth = '80%';
  messageEl.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  messageEl.style.borderRadius = 'var(--border-radius-md)';
  messageEl.style.wordBreak = 'break-word';
  
  // Style based on role
  if (role === 'user') {
    messageEl.style.alignSelf = 'flex-end';
    messageEl.style.backgroundColor = 'var(--color-accent)';
    messageEl.style.color = 'white';
  } else if (role === 'ai') {
    messageEl.style.alignSelf = 'flex-start';
    messageEl.style.backgroundColor = 'var(--color-bg-tertiary)';
    messageEl.style.color = 'var(--color-text-primary)';
  } else if (role === 'error') {
    messageEl.style.alignSelf = 'flex-start';
    messageEl.style.backgroundColor = 'var(--color-error)';
    messageEl.style.color = 'white';
  }
  
  // Set content
  messageEl.textContent = content;
  
  // Add to messages container
  messagesEl.appendChild(messageEl);
  
  // Scroll to bottom
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
  const messagesEl = document.querySelector('.ai-panel-messages');
  
  // Create typing indicator
  const indicatorEl = document.createElement('div');
  indicatorEl.className = 'ai-typing-indicator';
  indicatorEl.style.alignSelf = 'flex-start';
  indicatorEl.style.backgroundColor = 'var(--color-bg-tertiary)';
  indicatorEl.style.color = 'var(--color-text-primary)';
  indicatorEl.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  indicatorEl.style.borderRadius = 'var(--border-radius-md)';
  indicatorEl.style.display = 'flex';
  indicatorEl.style.gap = '4px';
  
  // Add dots
  for (let i = 0; i < 3; i++) {
    const dotEl = document.createElement('div');
    dotEl.className = 'ai-typing-dot';
    dotEl.style.width = '8px';
    dotEl.style.height = '8px';
    dotEl.style.borderRadius = '50%';
    dotEl.style.backgroundColor = 'var(--color-text-tertiary)';
    dotEl.style.animation = 'ai-typing-animation 1.4s infinite';
    dotEl.style.animationDelay = `${i * 0.2}s`;
    indicatorEl.appendChild(dotEl);
  }
  
  // Add animation keyframes
  if (!document.getElementById('ai-typing-animation')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'ai-typing-animation';
    styleEl.textContent = `
      @keyframes ai-typing-animation {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  // Add to messages container
  messagesEl.appendChild(indicatorEl);
  
  // Scroll to bottom
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
  const indicatorEl = document.querySelector('.ai-typing-indicator');
  if (indicatorEl) {
    indicatorEl.remove();
  }
}

/**
 * Simulate AI response (for demo purposes)
 * @param {string} message - User message
 * @returns {Promise<string>} AI response
 */
async function simulateAiResponse(message) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simple response logic
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else if (lowerMessage.includes('help')) {
    return 'I can help you with various tasks in this OS. You can ask me to open apps, find files, answer questions, or provide suggestions.';
  } else if (lowerMessage.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  } else if (lowerMessage.includes('weather')) {
    return 'I don\'t have access to real-time weather data in this demo. In a real implementation, I could fetch weather information for you.';
  } else if (lowerMessage.includes('open') || lowerMessage.includes('launch')) {
    const apps = ['calculator', 'text editor', 'browser', 'todo list'];
    for (const app of apps) {
      if (lowerMessage.includes(app)) {
        return `I'll open the ${app} app for you.`;
      }
    }
    return 'Which app would you like me to open?';
  } else if (lowerMessage.includes('thank')) {
    return 'You\'re welcome! Is there anything else I can help you with?';
  } else {
    return 'I understand you\'re asking about "' + message + '". In a real implementation, I would provide a helpful response based on your query.';
  }
}

/**
 * Get the current AI context
 * @returns {Array} AI context
 */
function getContext() {
  return [...aiContext];
}

/**
 * Clear the AI context
 */
function clearContext() {
  aiContext = [];
}

/**
 * Launch the AI Panel app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching AI Panel app...');
  
  // Initialize AI panel if not already initialized
  if (!aiConfig) {
    await initAiPanel();
  }
  
  // Show the panel
  await togglePanel(true);
  
  // Return the window
  const { getWindowManager } = await import('../ui/WindowManager.js');
  const windowManager = await getWindowManager();
  return windowManager.getWindow('ai-panel');
}