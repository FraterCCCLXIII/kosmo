/**
 * Terminal App
 * Command-line interface for the system
 */

// Import dependencies
import { createWindow } from '../../ui/WindowManager.js';
import { getVirtualFS } from '../../fs/VirtualFS.js';

// Define icon SVG paths
const ICONS = {
  terminal: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" /></svg>'
};

/**
 * Launch the terminal app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching terminal app...');
  
  // Create window
  const window = createWindow({
    title: 'Terminal',
    width: 800,
    height: 500,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
  });
  
  // Get virtual file system
  const fs = getVirtualFS();
  
  // Initialize terminal in window content
  await init({ container: window.content, fs });
  
  return window;
}

/**
 * Initialize the terminal app
 * @param {Object} params - App initialization parameters
 * @param {HTMLElement} params.container - Container element
 * @param {Object} params.fs - Virtual file system instance
 * @returns {Object} App API
 */
export async function init({ container, fs }) {
  console.log('Initializing terminal app...');
  
  // Terminal state
  let history = [];
  let historyIndex = -1;
  let currentDirectory = '/';
  let commandPrompt = '$ ';
  
  // Create app UI
  createAppUI(container);
  
  // Return public API
  return {
    getCurrentDirectory: () => currentDirectory,
    executeCommand: (command) => {
      const inputEl = document.querySelector('.terminal-input');
      if (inputEl) {
        inputEl.value = command;
        handleCommand(command);
      }
    },
  };
  
  /**
   * Create app UI
   * @param {HTMLElement} container - Container element
   */
  function createAppUI(container) {
    // Clear container
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.backgroundColor = 'var(--color-terminal-bg, #1e1e1e)';
    container.style.color = 'var(--color-terminal-text, #f0f0f0)';
    container.style.fontFamily = 'monospace';
    
    // Create output container
    const outputEl = document.createElement('div');
    outputEl.className = 'terminal-output';
    outputEl.style.flex = '1';
    outputEl.style.overflowY = 'auto';
    outputEl.style.padding = 'var(--spacing-md)';
    outputEl.style.whiteSpace = 'pre-wrap';
    outputEl.style.fontSize = 'var(--font-size-md)';
    outputEl.style.lineHeight = '1.5';
    container.appendChild(outputEl);
    
    // Add welcome message
    addOutput('Welcome to Kosmo OS Terminal');
    addOutput('Type "help" for a list of available commands.');
    addOutput('');
    
    // Create input container
    const inputContainerEl = document.createElement('div');
    inputContainerEl.className = 'terminal-input-container';
    inputContainerEl.style.display = 'flex';
    inputContainerEl.style.padding = 'var(--spacing-md)';
    inputContainerEl.style.borderTop = '1px solid var(--color-terminal-border, #444)';
    
    // Add prompt
    const promptEl = document.createElement('span');
    promptEl.className = 'terminal-prompt';
    promptEl.textContent = `${currentDirectory} ${commandPrompt}`;
    promptEl.style.marginRight = 'var(--spacing-sm)';
    promptEl.style.whiteSpace = 'nowrap';
    inputContainerEl.appendChild(promptEl);
    
    // Add input
    const inputEl = document.createElement('input');
    inputEl.className = 'terminal-input';
    inputEl.type = 'text';
    inputEl.style.flex = '1';
    inputEl.style.backgroundColor = 'transparent';
    inputEl.style.border = 'none';
    inputEl.style.outline = 'none';
    inputEl.style.color = 'inherit';
    inputEl.style.fontFamily = 'inherit';
    inputEl.style.fontSize = 'inherit';
    
    // Add event listeners
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = inputEl.value.trim();
        if (command) {
          handleCommand(command);
          inputEl.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateHistory(1);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        autocomplete();
      }
    });
    
    inputContainerEl.appendChild(inputEl);
    container.appendChild(inputContainerEl);
    
    // Focus input
    setTimeout(() => {
      inputEl.focus();
    }, 0);
  }
  
  /**
   * Add output to the terminal
   * @param {string} text - Output text
   * @param {string} [className] - Optional CSS class
   */
  function addOutput(text, className = '') {
    const outputEl = document.querySelector('.terminal-output');
    if (!outputEl) return;
    
    const lineEl = document.createElement('div');
    lineEl.textContent = text;
    if (className) {
      lineEl.className = className;
    }
    
    outputEl.appendChild(lineEl);
    outputEl.scrollTop = outputEl.scrollHeight;
  }
  
  /**
   * Handle command input
   * @param {string} command - Command string
   */
  async function handleCommand(command) {
    // Add command to history
    history.push(command);
    historyIndex = history.length;
    
    // Add command to output
    addOutput(`${currentDirectory} ${commandPrompt}${command}`);
    
    // Parse command
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Execute command
    try {
      switch (cmd) {
        case 'help':
          showHelp();
          break;
        case 'clear':
        case 'cls':
          clearTerminal();
          break;
        case 'ls':
        case 'dir':
          await listDirectory(args[0] || currentDirectory);
          break;
        case 'cd':
          await changeDirectory(args[0] || '/');
          break;
        case 'pwd':
          printWorkingDirectory();
          break;
        case 'mkdir':
          if (args[0]) {
            await makeDirectory(args[0]);
          } else {
            addOutput('Error: mkdir requires a directory name', 'terminal-error');
          }
          break;
        case 'touch':
        case 'new':
          if (args[0]) {
            await createFile(args[0], args[1] || '');
          } else {
            addOutput('Error: touch requires a file name', 'terminal-error');
          }
          break;
        case 'rm':
          if (args[0]) {
            await removeFile(args[0], args.includes('-r') || args.includes('-rf'));
          } else {
            addOutput('Error: rm requires a file or directory name', 'terminal-error');
          }
          break;
        case 'cat':
        case 'type':
          if (args[0]) {
            await catFile(args[0]);
          } else {
            addOutput('Error: cat requires a file name', 'terminal-error');
          }
          break;
        case 'echo':
          echo(args.join(' '));
          break;
        case 'date':
          showDate();
          break;
        case 'whoami':
          addOutput('guest');
          break;
        default:
          addOutput(`Command not found: ${cmd}`, 'terminal-error');
      }
    } catch (error) {
      addOutput(`Error: ${error.message}`, 'terminal-error');
    }
    
    // Update prompt
    updatePrompt();
  }
  
  /**
   * Update the command prompt
   */
  function updatePrompt() {
    const promptEl = document.querySelector('.terminal-prompt');
    if (promptEl) {
      promptEl.textContent = `${currentDirectory} ${commandPrompt}`;
    }
  }
  
  /**
   * Navigate command history
   * @param {number} direction - Direction to navigate (-1 for up, 1 for down)
   */
  function navigateHistory(direction) {
    if (history.length === 0) return;
    
    historyIndex += direction;
    
    // Clamp history index
    if (historyIndex < 0) {
      historyIndex = 0;
    } else if (historyIndex >= history.length) {
      historyIndex = history.length;
      
      // Clear input when reaching the end of history
      const inputEl = document.querySelector('.terminal-input');
      if (inputEl) {
        inputEl.value = '';
      }
      return;
    }
    
    // Set input value
    const inputEl = document.querySelector('.terminal-input');
    if (inputEl) {
      inputEl.value = history[historyIndex];
      
      // Move cursor to end
      setTimeout(() => {
        inputEl.selectionStart = inputEl.selectionEnd = inputEl.value.length;
      }, 0);
    }
  }
  
  /**
   * Autocomplete command or path
   */
  async function autocomplete() {
    const inputEl = document.querySelector('.terminal-input');
    if (!inputEl) return;
    
    const input = inputEl.value;
    const parts = input.split(' ');
    
    if (parts.length === 1) {
      // Autocomplete command
      const commands = [
        'help', 'clear', 'ls', 'dir', 'cd', 'pwd',
        'mkdir', 'touch', 'new', 'rm', 'cat', 'type',
        'echo', 'date', 'whoami'
      ];
      
      const matches = commands.filter(cmd => cmd.startsWith(parts[0]));
      
      if (matches.length === 1) {
        inputEl.value = matches[0];
      } else if (matches.length > 1) {
        addOutput('');
        addOutput(matches.join('  '));
        updatePrompt();
      }
    } else {
      // Autocomplete path
      try {
        const pathPart = parts[parts.length - 1];
        const dirPath = pathPart.includes('/')
          ? pathPart.substring(0, pathPart.lastIndexOf('/') + 1)
          : currentDirectory;
        
        const baseName = pathPart.includes('/')
          ? pathPart.substring(pathPart.lastIndexOf('/') + 1)
          : pathPart;
        
        const contents = await fs.readdir(dirPath);
        const matches = contents
          .filter(item => item.name.startsWith(baseName))
          .map(item => item.name + (item.isDirectory ? '/' : ''));
        
        if (matches.length === 1) {
          parts[parts.length - 1] = dirPath + matches[0];
          inputEl.value = parts.join(' ');
        } else if (matches.length > 1) {
          addOutput('');
          addOutput(matches.join('  '));
          updatePrompt();
        }
      } catch (error) {
        // Silently fail autocomplete
      }
    }
  }
  
  /**
   * Show help message
   */
  function showHelp() {
    addOutput('Available commands:');
    addOutput('  help                 Show this help message');
    addOutput('  clear, cls           Clear the terminal');
    addOutput('  ls, dir [path]       List directory contents');
    addOutput('  cd [path]            Change directory');
    addOutput('  pwd                  Print working directory');
    addOutput('  mkdir <dir>          Create a directory');
    addOutput('  touch, new <file>    Create a file');
    addOutput('  rm <path> [-r|-rf]   Remove a file or directory');
    addOutput('  cat, type <file>     Display file contents');
    addOutput('  echo <text>          Display text');
    addOutput('  date                 Show current date and time');
    addOutput('  whoami               Show current user');
  }
  
  /**
   * Clear the terminal
   */
  function clearTerminal() {
    const outputEl = document.querySelector('.terminal-output');
    if (outputEl) {
      outputEl.innerHTML = '';
    }
  }
  
  /**
   * List directory contents
   * @param {string} path - Directory path
   */
  async function listDirectory(path) {
    try {
      // Resolve path
      const resolvedPath = resolvePath(path);
      
      // Get directory contents
      const contents = await fs.readdir(resolvedPath);
      
      // Sort contents: directories first, then files
      const sortedContents = [...contents].sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
      
      // Display contents
      if (sortedContents.length === 0) {
        addOutput('Directory is empty');
      } else {
        sortedContents.forEach(item => {
          const itemType = item.isDirectory ? 'd' : '-';
          const itemSize = item.size || 0;
          const itemDate = new Date().toISOString().split('T')[0];
          addOutput(`${itemType}rw-r--r--  ${itemSize.toString().padStart(8)}  ${itemDate}  ${item.name}${item.isDirectory ? '/' : ''}`);
        });
      }
    } catch (error) {
      throw new Error(`Cannot access ${path}: ${error.message}`);
    }
  }
  
  /**
   * Change directory
   * @param {string} path - Directory path
   */
  async function changeDirectory(path) {
    try {
      // Resolve path
      const resolvedPath = resolvePath(path);
      
      // Check if directory exists
      const stat = await fs.stat(resolvedPath);
      
      if (!stat.isDirectory) {
        throw new Error(`Not a directory: ${resolvedPath}`);
      }
      
      // Update current directory
      currentDirectory = resolvedPath;
    } catch (error) {
      throw new Error(`Cannot change directory: ${error.message}`);
    }
  }
  
  /**
   * Print working directory
   */
  function printWorkingDirectory() {
    addOutput(currentDirectory);
  }
  
  /**
   * Make directory
   * @param {string} path - Directory path
   */
  async function makeDirectory(path) {
    try {
      // Resolve path
      const resolvedPath = resolvePath(path);
      
      // Create directory
      await fs.mkdir(resolvedPath);
      
      addOutput(`Created directory: ${resolvedPath}`);
    } catch (error) {
      throw new Error(`Cannot create directory: ${error.message}`);
    }
  }
  
  /**
   * Create file
   * @param {string} path - File path
   * @param {string} content - File content
   */
  async function createFile(path, content) {
    try {
      // Resolve path
      const resolvedPath = resolvePath(path);
      
      // Create file
      await fs.writeFile(resolvedPath, content);
      
      addOutput(`Created file: ${resolvedPath}`);
    } catch (error) {
      throw new Error(`Cannot create file: ${error.message}`);
    }
  }
  
  /**
   * Remove file or directory
   * @param {string} path - File or directory path
   * @param {boolean} recursive - Whether to remove recursively
   */
  async function removeFile(path, recursive) {
    try {
      // Resolve path
      const resolvedPath = resolvePath(path);
      
      // Check if path exists
      const stat = await fs.stat(resolvedPath);
      
      // Check if directory and recursive flag
      if (stat.isDirectory && !recursive) {
        throw new Error(`Cannot remove directory without -r flag: ${resolvedPath}`);
      }
      
      // Remove file or directory
      await fs.rm(resolvedPath, { recursive });
      
      addOutput(`Removed: ${resolvedPath}`);
    } catch (error) {
      throw new Error(`Cannot remove: ${error.message}`);
    }
  }
  
  /**
   * Display file contents
   * @param {string} path - File path
   */
  async function catFile(path) {
    try {
      // Resolve path
      const resolvedPath = resolvePath(path);
      
      // Check if file exists
      const stat = await fs.stat(resolvedPath);
      
      if (stat.isDirectory) {
        throw new Error(`Is a directory: ${resolvedPath}`);
      }
      
      // Read file
      const content = await fs.readFile(resolvedPath);
      
      // Display content
      addOutput(content);
    } catch (error) {
      throw new Error(`Cannot display file: ${error.message}`);
    }
  }
  
  /**
   * Echo text
   * @param {string} text - Text to echo
   */
  function echo(text) {
    addOutput(text);
  }
  
  /**
   * Show current date and time
   */
  function showDate() {
    const now = new Date();
    addOutput(now.toString());
  }
  
  /**
   * Resolve path
   * @param {string} path - Path to resolve
   * @returns {string} Resolved path
   */
  function resolvePath(path) {
    // Handle absolute paths
    if (path.startsWith('/')) {
      return normalizePath(path);
    }
    
    // Handle relative paths
    return normalizePath(`${currentDirectory}/${path}`);
  }
  
  /**
   * Normalize path
   * @param {string} path - Path to normalize
   * @returns {string} Normalized path
   */
  function normalizePath(path) {
    // Split path into segments
    const segments = path.split('/').filter(Boolean);
    const result = [];
    
    // Process segments
    for (const segment of segments) {
      if (segment === '.') {
        // Current directory, skip
        continue;
      } else if (segment === '..') {
        // Parent directory, pop last segment
        result.pop();
      } else {
        // Regular segment, push
        result.push(segment);
      }
    }
    
    // Join segments
    return `/${result.join('/')}`;
  }
}