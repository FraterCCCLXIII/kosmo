/**
 * Text Editor App
 * A simple text editor application
 */

import { getWindowManager } from '../../ui/WindowManager.js';

// Text editor state
let currentFile = null;
let content = '';
let isModified = false;

/**
 * Launch the text editor app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching text editor app...');
  
  // Get window manager instance
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Text Editor',
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
  });
  
  // Initialize text editor in window content
  initTextEditor(window.content);
  
  return window;
}

/**
 * Initialize the text editor app
 * @param {Object} container - Container element
 * @returns {Object} Text editor app API
 */
export function initTextEditor(container) {
  console.log('Initializing text editor app...');
  
  // Create text editor UI
  createTextEditorUI(container);
  
  // Return public API
  return {
    getContent,
    setContent,
    loadFile,
    saveFile,
    isModified: () => isModified,
  };
}

/**
 * Create text editor UI
 * @param {HTMLElement} container - Container element
 */
function createTextEditorUI(container) {
  // Create editor container
  const editorEl = document.createElement('div');
  editorEl.className = 'text-editor';
  editorEl.style.display = 'flex';
  editorEl.style.flexDirection = 'column';
  editorEl.style.width = '100%';
  editorEl.style.height = '100%';
  editorEl.style.backgroundColor = 'var(--color-bg-primary)';
  
  // Create toolbar
  const toolbarEl = document.createElement('div');
  toolbarEl.className = 'text-editor-toolbar';
  toolbarEl.style.display = 'flex';
  toolbarEl.style.alignItems = 'center';
  toolbarEl.style.padding = 'var(--spacing-sm)';
  toolbarEl.style.borderBottom = '1px solid var(--border-color)';
  toolbarEl.style.backgroundColor = 'var(--color-bg-secondary)';
  editorEl.appendChild(toolbarEl);
  
  // Create toolbar buttons
  const buttons = [
    { text: 'New', icon: '📄', action: 'new' },
    { text: 'Open', icon: '📂', action: 'open' },
    { text: 'Save', icon: '💾', action: 'save' },
    { separator: true },
    { text: 'Bold', icon: '𝐁', action: 'bold' },
    { text: 'Italic', icon: '𝐼', action: 'italic' },
    { text: 'Underline', icon: '̲U̲', action: 'underline' },
  ];
  
  buttons.forEach(button => {
    if (button.separator) {
      const separatorEl = document.createElement('div');
      separatorEl.className = 'toolbar-separator';
      separatorEl.style.width = '1px';
      separatorEl.style.height = '24px';
      separatorEl.style.backgroundColor = 'var(--border-color)';
      separatorEl.style.margin = '0 var(--spacing-sm)';
      toolbarEl.appendChild(separatorEl);
      return;
    }
    
    const buttonEl = document.createElement('button');
    buttonEl.className = `toolbar-button toolbar-button-${button.action}`;
    buttonEl.title = button.text;
    buttonEl.style.display = 'flex';
    buttonEl.style.alignItems = 'center';
    buttonEl.style.justifyContent = 'center';
    buttonEl.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
    buttonEl.style.marginRight = 'var(--spacing-xs)';
    buttonEl.style.backgroundColor = 'transparent';
    buttonEl.style.border = 'none';
    buttonEl.style.borderRadius = 'var(--border-radius-sm)';
    buttonEl.style.cursor = 'pointer';
    buttonEl.style.transition = 'background-color 0.2s';
    
    // Add icon
    const iconEl = document.createElement('span');
    iconEl.className = 'toolbar-button-icon';
    iconEl.textContent = button.icon;
    iconEl.style.marginRight = button.text ? 'var(--spacing-xs)' : '0';
    buttonEl.appendChild(iconEl);
    
    // Add text if provided
    if (button.text && ['new', 'open', 'save'].includes(button.action)) {
      const textEl = document.createElement('span');
      textEl.className = 'toolbar-button-text';
      textEl.textContent = button.text;
      buttonEl.appendChild(textEl);
    }
    
    // Add hover effect
    buttonEl.addEventListener('mouseenter', () => {
      buttonEl.style.backgroundColor = 'var(--color-bg-tertiary)';
    });
    
    buttonEl.addEventListener('mouseleave', () => {
      buttonEl.style.backgroundColor = 'transparent';
    });
    
    // Add click handler
    buttonEl.addEventListener('click', () => {
      handleToolbarAction(button.action, textareaEl);
    });
    
    toolbarEl.appendChild(buttonEl);
  });
  
  // Create status bar
  const statusBarEl = document.createElement('div');
  statusBarEl.className = 'text-editor-status-bar';
  statusBarEl.style.display = 'flex';
  statusBarEl.style.alignItems = 'center';
  statusBarEl.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
  statusBarEl.style.borderTop = '1px solid var(--border-color)';
  statusBarEl.style.backgroundColor = 'var(--color-bg-secondary)';
  statusBarEl.style.fontSize = 'var(--font-size-sm)';
  statusBarEl.style.color = 'var(--color-text-secondary)';
  
  // Add file info
  const fileInfoEl = document.createElement('div');
  fileInfoEl.className = 'status-file-info';
  fileInfoEl.textContent = 'Untitled';
  fileInfoEl.style.marginRight = 'auto';
  statusBarEl.appendChild(fileInfoEl);
  
  // Add modification indicator
  const modifiedEl = document.createElement('div');
  modifiedEl.className = 'status-modified';
  modifiedEl.style.display = 'none';
  modifiedEl.style.marginRight = 'var(--spacing-sm)';
  statusBarEl.appendChild(modifiedEl);
  
  // Add character count
  const charCountEl = document.createElement('div');
  charCountEl.className = 'status-char-count';
  charCountEl.textContent = '0 characters';
  statusBarEl.appendChild(charCountEl);
  
  // Create editor content area
  const contentEl = document.createElement('div');
  contentEl.className = 'text-editor-content';
  contentEl.style.flex = '1';
  contentEl.style.position = 'relative';
  contentEl.style.overflow = 'hidden';
  editorEl.appendChild(contentEl);
  
  // Create textarea
  const textareaEl = document.createElement('textarea');
  textareaEl.className = 'text-editor-textarea';
  textareaEl.style.width = '100%';
  textareaEl.style.height = '100%';
  textareaEl.style.padding = 'var(--spacing-md)';
  textareaEl.style.border = 'none';
  textareaEl.style.resize = 'none';
  textareaEl.style.outline = 'none';
  textareaEl.style.backgroundColor = 'var(--color-bg-primary)';
  textareaEl.style.color = 'var(--color-text-primary)';
  textareaEl.style.fontFamily = 'monospace';
  textareaEl.style.fontSize = 'var(--font-size-md)';
  textareaEl.style.lineHeight = '1.5';
  contentEl.appendChild(textareaEl);
  
  // Add textarea event listeners
  textareaEl.addEventListener('input', () => {
    // Update content
    content = textareaEl.value;
    
    // Update character count
    charCountEl.textContent = `${content.length} characters`;
    
    // Update modified state
    if (!isModified) {
      isModified = true;
      modifiedEl.textContent = '●';
      modifiedEl.style.display = 'block';
      modifiedEl.style.color = 'var(--color-accent)';
    }
  });
  
  // Add keyboard shortcuts
  textareaEl.addEventListener('keydown', (event) => {
    // Save: Ctrl+S
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      handleToolbarAction('save', textareaEl);
    }
    // New: Ctrl+N
    else if (event.ctrlKey && event.key === 'n') {
      event.preventDefault();
      handleToolbarAction('new', textareaEl);
    }
    // Open: Ctrl+O
    else if (event.ctrlKey && event.key === 'o') {
      event.preventDefault();
      handleToolbarAction('open', textareaEl);
    }
    // Bold: Ctrl+B
    else if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();
      handleToolbarAction('bold', textareaEl);
    }
    // Italic: Ctrl+I
    else if (event.ctrlKey && event.key === 'i') {
      event.preventDefault();
      handleToolbarAction('italic', textareaEl);
    }
    // Underline: Ctrl+U
    else if (event.ctrlKey && event.key === 'u') {
      event.preventDefault();
      handleToolbarAction('underline', textareaEl);
    }
  });
  
  // Add status bar
  editorEl.appendChild(statusBarEl);
  
  // Add to container
  container.appendChild(editorEl);
}

/**
 * Handle toolbar action
 * @param {string} action - Action to handle
 * @param {HTMLTextAreaElement} textareaEl - Textarea element
 */
async function handleToolbarAction(action, textareaEl) {
  switch (action) {
    case 'new':
      if (isModified) {
        // In a real implementation, this would show a confirmation dialog
        const confirmed = confirm('You have unsaved changes. Do you want to discard them?');
        if (!confirmed) return;
      }
      
      // Clear content
      content = '';
      textareaEl.value = '';
      currentFile = null;
      isModified = false;
      
      // Update status bar
      const fileInfoEl = document.querySelector('.status-file-info');
      if (fileInfoEl) fileInfoEl.textContent = 'Untitled';
      
      const modifiedEl = document.querySelector('.status-modified');
      if (modifiedEl) modifiedEl.style.display = 'none';
      
      const charCountEl = document.querySelector('.status-char-count');
      if (charCountEl) charCountEl.textContent = '0 characters';
      break;
    
    case 'open':
      // In a real implementation, this would show a file picker
      // For now, we'll simulate opening a file
      try {
        // Import VirtualFS
        const { initVirtualFS } = await import('../../fs/VirtualFS.js');
        const virtualFS = await initVirtualFS();
        
        // Show file picker (simulated)
        const fileName = prompt('Enter file name to open:');
        if (!fileName) return;
        
        // Check if file exists
        const fileExists = await virtualFS.exists(fileName);
        if (!fileExists) {
          alert(`File "${fileName}" does not exist.`);
          return;
        }
        
        // Load file
        const fileContent = await virtualFS.readFile(fileName);
        
        // Update content
        content = fileContent;
        textareaEl.value = content;
        currentFile = fileName;
        isModified = false;
        
        // Update status bar
        const fileInfoEl = document.querySelector('.status-file-info');
        if (fileInfoEl) fileInfoEl.textContent = fileName;
        
        const modifiedEl = document.querySelector('.status-modified');
        if (modifiedEl) modifiedEl.style.display = 'none';
        
        const charCountEl = document.querySelector('.status-char-count');
        if (charCountEl) charCountEl.textContent = `${content.length} characters`;
      } catch (error) {
        console.error('Error opening file:', error);
        alert('Failed to open file.');
      }
      break;
    
    case 'save':
      try {
        // Import VirtualFS
        const { initVirtualFS } = await import('../../fs/VirtualFS.js');
        const virtualFS = await initVirtualFS();
        
        // Get file name if not already set
        let fileName = currentFile;
        if (!fileName) {
          fileName = prompt('Enter file name to save:');
          if (!fileName) return;
          currentFile = fileName;
        }
        
        // Save file
        await virtualFS.writeFile(fileName, content);
        
        // Update status
        isModified = false;
        
        // Update status bar
        const fileInfoEl = document.querySelector('.status-file-info');
        if (fileInfoEl) fileInfoEl.textContent = fileName;
        
        const modifiedEl = document.querySelector('.status-modified');
        if (modifiedEl) modifiedEl.style.display = 'none';
        
        alert(`File "${fileName}" saved successfully.`);
      } catch (error) {
        console.error('Error saving file:', error);
        alert('Failed to save file.');
      }
      break;
    
    case 'bold':
      insertFormatting(textareaEl, '**', '**');
      break;
    
    case 'italic':
      insertFormatting(textareaEl, '_', '_');
      break;
    
    case 'underline':
      insertFormatting(textareaEl, '<u>', '</u>');
      break;
  }
}

/**
 * Insert formatting around selected text
 * @param {HTMLTextAreaElement} textareaEl - Textarea element
 * @param {string} prefix - Formatting prefix
 * @param {string} suffix - Formatting suffix
 */
function insertFormatting(textareaEl, prefix, suffix) {
  const start = textareaEl.selectionStart;
  const end = textareaEl.selectionEnd;
  const selectedText = textareaEl.value.substring(start, end);
  
  // Insert formatting
  const formattedText = prefix + selectedText + suffix;
  textareaEl.setRangeText(formattedText, start, end, 'select');
  
  // Update content
  content = textareaEl.value;
  
  // Update modified state
  isModified = true;
  
  // Update status bar
  const modifiedEl = document.querySelector('.status-modified');
  if (modifiedEl) {
    modifiedEl.textContent = '●';
    modifiedEl.style.display = 'block';
    modifiedEl.style.color = 'var(--color-accent)';
  }
  
  const charCountEl = document.querySelector('.status-char-count');
  if (charCountEl) charCountEl.textContent = `${content.length} characters`;
  
  // Focus textarea
  textareaEl.focus();
}

/**
 * Get content
 * @returns {string} Content
 */
function getContent() {
  return content;
}

/**
 * Set content
 * @param {string} newContent - Content to set
 */
function setContent(newContent) {
  content = newContent;
  
  // Update textarea if it exists
  const textareaEl = document.querySelector('.text-editor-textarea');
  if (textareaEl) {
    textareaEl.value = content;
    
    // Update character count
    const charCountEl = document.querySelector('.status-char-count');
    if (charCountEl) charCountEl.textContent = `${content.length} characters`;
  }
}

/**
 * Load file
 * @param {string} fileName - File name
 * @returns {Promise<boolean>} Success
 */
async function loadFile(fileName) {
  try {
    // Import VirtualFS
    const { initVirtualFS } = await import('../../fs/VirtualFS.js');
    const virtualFS = await initVirtualFS();
    
    // Check if file exists
    const fileExists = await virtualFS.exists(fileName);
    if (!fileExists) {
      console.error(`File "${fileName}" does not exist.`);
      return false;
    }
    
    // Load file
    const fileContent = await virtualFS.readFile(fileName);
    
    // Update content
    setContent(fileContent);
    currentFile = fileName;
    isModified = false;
    
    // Update status bar
    const fileInfoEl = document.querySelector('.status-file-info');
    if (fileInfoEl) fileInfoEl.textContent = fileName;
    
    const modifiedEl = document.querySelector('.status-modified');
    if (modifiedEl) modifiedEl.style.display = 'none';
    
    return true;
  } catch (error) {
    console.error('Error loading file:', error);
    return false;
  }
}

/**
 * Save file
 * @param {string} [fileName] - File name (optional)
 * @returns {Promise<boolean>} Success
 */
async function saveFile(fileName) {
  try {
    // Import VirtualFS
    const { initVirtualFS } = await import('../../fs/VirtualFS.js');
    const virtualFS = await initVirtualFS();
    
    // Use provided file name or current file
    const targetFile = fileName || currentFile;
    
    // Get file name if not provided
    if (!targetFile) {
      console.error('No file name provided.');
      return false;
    }
    
    // Save file
    await virtualFS.writeFile(targetFile, content);
    
    // Update status
    currentFile = targetFile;
    isModified = false;
    
    // Update status bar
    const fileInfoEl = document.querySelector('.status-file-info');
    if (fileInfoEl) fileInfoEl.textContent = targetFile;
    
    const modifiedEl = document.querySelector('.status-modified');
    if (modifiedEl) modifiedEl.style.display = 'none';
    
    return true;
  } catch (error) {
    console.error('Error saving file:', error);
    return false;
  }
}