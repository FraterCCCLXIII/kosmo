/**
 * Sandbox
 * Injects and manages iframe context for secure app execution
 */

// Sandbox state
const sandboxes = new Map();
let nextSandboxId = 1;

/**
 * Create a new sandbox
 * @param {Object} options - Sandbox options
 * @returns {Object} Sandbox object
 */
export function createSandbox(options = {}) {
  const sandboxId = `sandbox-${nextSandboxId++}`;
  
  // Create sandbox container if it doesn't exist
  let sandboxContainer = document.getElementById('sandbox-container');
  if (!sandboxContainer) {
    sandboxContainer = document.createElement('div');
    sandboxContainer.id = 'sandbox-container';
    sandboxContainer.style.display = 'none';
    document.body.appendChild(sandboxContainer);
  }
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.id = sandboxId;
  iframe.sandbox = 'allow-scripts allow-same-origin';
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  
  // Add to container
  sandboxContainer.appendChild(iframe);
  
  // Create message channel for communication
  const channel = new MessageChannel();
  
  // Create sandbox object
  const sandbox = {
    id: sandboxId,
    iframe,
    channel,
    options,
    loaded: false,
    messageHandlers: new Map(),
  };
  
  // Store in sandboxes map
  sandboxes.set(sandboxId, sandbox);
  
  // Set up message handling
  channel.port1.onmessage = (event) => {
    handleSandboxMessage(sandbox, event.data);
  };
  
  // Load sandbox content
  loadSandboxContent(sandbox);
  
  // Return sandbox API
  return {
    id: sandboxId,
    postMessage: (message) => postToSandbox(sandbox, message),
    addEventListener: (type, handler) => addSandboxEventListener(sandbox, type, handler),
    removeEventListener: (type, handler) => removeSandboxEventListener(sandbox, type, handler),
    destroy: () => destroySandbox(sandbox),
    getIframe: () => iframe,
  };
}

/**
 * Load sandbox content
 * @param {Object} sandbox - Sandbox object
 */
function loadSandboxContent(sandbox) {
  // Set iframe src to sandbox HTML
  sandbox.iframe.src = '/src/sandbox/index.html';
  
  // Listen for load event
  sandbox.iframe.addEventListener('load', () => {
    // Mark as loaded
    sandbox.loaded = true;
    
    // Initialize sandbox
    initializeSandbox(sandbox);
  });
}

/**
 * Initialize sandbox
 * @param {Object} sandbox - Sandbox object
 */
function initializeSandbox(sandbox) {
  // Transfer message port to iframe
  sandbox.iframe.contentWindow.postMessage('init', '*', [sandbox.channel.port2]);
  
  // Send initialization data
  postToSandbox(sandbox, {
    type: 'initialize',
    options: sandbox.options,
  });
}

/**
 * Post a message to the sandbox
 * @param {Object} sandbox - Sandbox object
 * @param {Object} message - Message to post
 */
function postToSandbox(sandbox, message) {
  if (!sandbox.loaded) {
    // Queue message to be sent after initialization
    sandbox.iframe.addEventListener('load', () => {
      setTimeout(() => {
        sandbox.channel.port1.postMessage(message);
      }, 100);
    });
    return;
  }
  
  sandbox.channel.port1.postMessage(message);
}

/**
 * Handle a message from the sandbox
 * @param {Object} sandbox - Sandbox object
 * @param {Object} message - Message from sandbox
 */
function handleSandboxMessage(sandbox, message) {
  // Get message type
  const type = message.type;
  
  // Get handlers for this type
  const handlers = sandbox.messageHandlers.get(type) || [];
  
  // Call handlers
  handlers.forEach(handler => {
    try {
      handler(message);
    } catch (error) {
      console.error(`Error in sandbox message handler for type "${type}":`, error);
    }
  });
}

/**
 * Add a sandbox event listener
 * @param {Object} sandbox - Sandbox object
 * @param {string} type - Event type
 * @param {Function} handler - Event handler
 */
function addSandboxEventListener(sandbox, type, handler) {
  // Get handlers for this type
  let handlers = sandbox.messageHandlers.get(type);
  
  // Create handlers array if it doesn't exist
  if (!handlers) {
    handlers = [];
    sandbox.messageHandlers.set(type, handlers);
  }
  
  // Add handler
  handlers.push(handler);
}

/**
 * Remove a sandbox event listener
 * @param {Object} sandbox - Sandbox object
 * @param {string} type - Event type
 * @param {Function} handler - Event handler
 */
function removeSandboxEventListener(sandbox, type, handler) {
  // Get handlers for this type
  const handlers = sandbox.messageHandlers.get(type);
  
  // Return if no handlers
  if (!handlers) return;
  
  // Remove handler
  const index = handlers.indexOf(handler);
  if (index !== -1) {
    handlers.splice(index, 1);
  }
  
  // Remove empty handlers array
  if (handlers.length === 0) {
    sandbox.messageHandlers.delete(type);
  }
}

/**
 * Destroy a sandbox
 * @param {Object} sandbox - Sandbox object
 */
function destroySandbox(sandbox) {
  // Remove iframe
  sandbox.iframe.remove();
  
  // Close channel
  sandbox.channel.port1.close();
  
  // Remove from sandboxes map
  sandboxes.delete(sandbox.id);
}