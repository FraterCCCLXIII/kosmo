/**
 * File Browser App
 * Browse and manage files in the virtual file system
 */

// Import dependencies
import { getWindowManager } from '../../ui/WindowManager.js';
import { getVirtualFS } from '../../fs/VirtualFS.js';

// Define icon SVG paths
const ICONS = {
  folder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" /></svg>',
  document: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" /><path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" /></svg>',
  arrowUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" clip-rule="evenodd" /></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" /></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" /></svg>'
};

/**
 * Launch the file browser app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching file browser app...');
  
  // Create window
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'File Browser',
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
  });
  
  // Get virtual file system
  const fs = getVirtualFS();
  
  // Initialize file browser in window content
  await init({ container: window.content, fs });
  
  return window;
}

/**
 * Initialize the file browser app
 * @param {Object} params - App initialization parameters
 * @param {HTMLElement} params.container - Container element
 * @param {Object} params.fs - Virtual file system instance
 * @returns {Object} App API
 */
export async function init({ container, fs }) {
  console.log('Initializing file browser app...');
  
  // Current directory state
  let currentPath = '/';
  let selectedItems = new Set();
  
  // Create app UI
  createAppUI(container);
  
  // Load initial directory
  await loadDirectory(currentPath);
  
  // Return public API
  return {
    getCurrentPath: () => currentPath,
    navigateTo: async (path) => {
      currentPath = path;
      await loadDirectory(path);
    },
    refresh: async () => {
      await loadDirectory(currentPath);
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
    
    // Create toolbar
    const toolbarEl = document.createElement('div');
    toolbarEl.className = 'file-browser-toolbar';
    toolbarEl.style.display = 'flex';
    toolbarEl.style.alignItems = 'center';
    toolbarEl.style.padding = 'var(--spacing-sm)';
    toolbarEl.style.gap = 'var(--spacing-sm)';
    toolbarEl.style.borderBottom = 'var(--border-width) solid var(--border-color)';
    
    // Add navigation button
    const backBtn = document.createElement('button');
    backBtn.className = 'file-browser-back-btn';
    backBtn.innerHTML = ICONS.arrowUp;
    backBtn.title = 'Go up';
    backBtn.style.display = 'flex';
    backBtn.style.alignItems = 'center';
    backBtn.style.justifyContent = 'center';
    backBtn.style.width = '32px';
    backBtn.style.height = '32px';
    backBtn.style.borderRadius = 'var(--border-radius-sm)';
    backBtn.style.border = 'none';
    backBtn.style.backgroundColor = 'transparent';
    backBtn.style.cursor = 'pointer';
    backBtn.addEventListener('click', () => {
      const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
      navigateTo(parentPath);
    });
    toolbarEl.appendChild(backBtn);
    
    // Add path input
    const pathInputEl = document.createElement('input');
    pathInputEl.className = 'file-browser-path-input';
    pathInputEl.type = 'text';
    pathInputEl.value = currentPath;
    pathInputEl.style.flex = '1';
    pathInputEl.style.padding = 'var(--spacing-sm)';
    pathInputEl.style.borderRadius = 'var(--border-radius-sm)';
    pathInputEl.style.border = 'var(--border-width) solid var(--border-color)';
    pathInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        navigateTo(pathInputEl.value);
      }
    });
    toolbarEl.appendChild(pathInputEl);
    
    // Add new folder button
    const newFolderBtn = document.createElement('button');
    newFolderBtn.className = 'file-browser-new-folder-btn';
    // Create SVG from React icon
    const newFolderBtnSvg = PlusIcon({
      width: 24,
      height: 24,
      className: 'plus-icon'
    }).props.children;
    newFolderBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${newFolderBtnSvg}</svg>`;
    newFolderBtn.title = 'New folder';
    newFolderBtn.style.display = 'flex';
    newFolderBtn.style.alignItems = 'center';
    newFolderBtn.style.justifyContent = 'center';
    newFolderBtn.style.width = '32px';
    newFolderBtn.style.height = '32px';
    newFolderBtn.style.borderRadius = 'var(--border-radius-sm)';
    newFolderBtn.style.border = 'none';
    newFolderBtn.style.backgroundColor = 'transparent';
    newFolderBtn.style.cursor = 'pointer';
    newFolderBtn.addEventListener('click', () => {
      createNewFolder();
    });
    toolbarEl.appendChild(newFolderBtn);
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'file-browser-delete-btn';
    // Create SVG from React icon
    const deleteBtnSvg = TrashIcon({
      width: 24,
      height: 24,
      className: 'trash-icon'
    }).props.children;
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${deleteBtnSvg}</svg>`;
    deleteBtn.title = 'Delete selected';
    deleteBtn.style.display = 'flex';
    deleteBtn.style.alignItems = 'center';
    deleteBtn.style.justifyContent = 'center';
    deleteBtn.style.width = '32px';
    deleteBtn.style.height = '32px';
    deleteBtn.style.borderRadius = 'var(--border-radius-sm)';
    deleteBtn.style.border = 'none';
    deleteBtn.style.backgroundColor = 'transparent';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.addEventListener('click', () => {
      deleteSelected();
    });
    toolbarEl.appendChild(deleteBtn);
    
    container.appendChild(toolbarEl);
    
    // Create files container
    const filesEl = document.createElement('div');
    filesEl.className = 'file-browser-files';
    filesEl.style.flex = '1';
    filesEl.style.overflowY = 'auto';
    filesEl.style.padding = 'var(--spacing-md)';
    filesEl.style.display = 'grid';
    filesEl.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))';
    filesEl.style.gap = 'var(--spacing-md)';
    filesEl.style.alignContent = 'start';
    container.appendChild(filesEl);
    
    // Create status bar
    const statusEl = document.createElement('div');
    statusEl.className = 'file-browser-status';
    statusEl.style.padding = 'var(--spacing-sm) var(--spacing-md)';
    statusEl.style.borderTop = 'var(--border-width) solid var(--border-color)';
    statusEl.style.fontSize = 'var(--font-size-sm)';
    statusEl.style.color = 'var(--color-text-secondary)';
    container.appendChild(statusEl);
  }
  
  /**
   * Load directory contents
   * @param {string} path - Directory path
   */
  async function loadDirectory(path) {
    try {
      // Update UI
      const pathInputEl = document.querySelector('.file-browser-path-input');
      if (pathInputEl) {
        pathInputEl.value = path;
      }
      
      // Clear selection
      selectedItems.clear();
      
      // Get directory contents
      const contents = await fs.readdir(path);
      
      // Update files container
      const filesEl = document.querySelector('.file-browser-files');
      if (filesEl) {
        filesEl.innerHTML = '';
        
        // Sort contents: directories first, then files
        const sortedContents = [...contents].sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });
        
        // Add items
        sortedContents.forEach((item) => {
          const itemEl = createFileItem(item);
          filesEl.appendChild(itemEl);
        });
      }
      
      // Update status bar
      const statusEl = document.querySelector('.file-browser-status');
      if (statusEl) {
        const fileCount = contents.filter(item => !item.isDirectory).length;
        const dirCount = contents.filter(item => item.isDirectory).length;
        statusEl.textContent = `${dirCount} folder${dirCount !== 1 ? 's' : ''}, ${fileCount} file${fileCount !== 1 ? 's' : ''}`;
      }
    } catch (error) {
      console.error('Error loading directory:', error);
    }
  }
  
  /**
   * Create file item element
   * @param {Object} item - File item
   * @returns {HTMLElement} File item element
   */
  function createFileItem(item) {
    const itemEl = document.createElement('div');
    itemEl.className = 'file-browser-item';
    itemEl.dataset.path = item.path;
    itemEl.style.display = 'flex';
    itemEl.style.flexDirection = 'column';
    itemEl.style.alignItems = 'center';
    itemEl.style.padding = 'var(--spacing-sm)';
    itemEl.style.borderRadius = 'var(--border-radius-sm)';
    itemEl.style.cursor = 'pointer';
    itemEl.style.userSelect = 'none';
    
    // Add icon
    const iconEl = document.createElement('div');
    iconEl.className = 'file-browser-item-icon';
    iconEl.style.width = '48px';
    iconEl.style.height = '48px';
    iconEl.style.display = 'flex';
    iconEl.style.alignItems = 'center';
    iconEl.style.justifyContent = 'center';
    iconEl.style.marginBottom = 'var(--spacing-sm)';
    iconEl.style.color = item.isDirectory ? 'var(--color-folder)' : 'var(--color-file)';
    
    // Use SVG icon
    iconEl.innerHTML = item.isDirectory ? ICONS.folder : ICONS.document;
    iconEl.querySelector('svg').style.width = '32px';
    iconEl.querySelector('svg').style.height = '32px';
    itemEl.appendChild(iconEl);
    
    // Add name
    const nameEl = document.createElement('div');
    nameEl.className = 'file-browser-item-name';
    nameEl.textContent = item.name;
    nameEl.style.fontSize = 'var(--font-size-sm)';
    nameEl.style.textAlign = 'center';
    nameEl.style.wordBreak = 'break-word';
    nameEl.style.width = '100%';
    itemEl.appendChild(nameEl);
    
    // Add event listeners
    itemEl.addEventListener('click', (e) => {
      // Handle selection
      if (e.ctrlKey || e.metaKey) {
        // Toggle selection
        if (selectedItems.has(item.path)) {
          selectedItems.delete(item.path);
          itemEl.style.backgroundColor = '';
        } else {
          selectedItems.add(item.path);
          itemEl.style.backgroundColor = 'var(--color-selection)';
        }
      } else {
        // Clear selection
        document.querySelectorAll('.file-browser-item').forEach(el => {
          el.style.backgroundColor = '';
        });
        selectedItems.clear();
        
        // Select this item
        selectedItems.add(item.path);
        itemEl.style.backgroundColor = 'var(--color-selection)';
      }
    });
    
    itemEl.addEventListener('dblclick', () => {
      if (item.isDirectory) {
        // Navigate to directory
        navigateTo(item.path);
      } else {
        // Open file
        openFile(item);
      }
    });
    
    return itemEl;
  }
  
  /**
   * Navigate to a directory
   * @param {string} path - Directory path
   */
  async function navigateTo(path) {
    currentPath = path;
    await loadDirectory(path);
  }
  
  /**
   * Open a file
   * @param {Object} file - File object
   */
  async function openFile(file) {
    console.log('Opening file:', file.path);
    // This would be implemented based on file type
    // For now, just log the file path
  }
  
  /**
   * Create a new folder
   */
  async function createNewFolder() {
    const folderName = prompt('Enter folder name:');
    if (!folderName) return;
    
    try {
      const path = `${currentPath}/${folderName}`.replace(/\/\//g, '/');
      await fs.mkdir(path);
      await loadDirectory(currentPath);
    } catch (error) {
      console.error('Error creating folder:', error);
      alert(`Error creating folder: ${error.message}`);
    }
  }
  
  /**
   * Delete selected items
   */
  async function deleteSelected() {
    if (selectedItems.size === 0) return;
    
    const confirm = window.confirm(`Delete ${selectedItems.size} item(s)?`);
    if (!confirm) return;
    
    try {
      for (const path of selectedItems) {
        await fs.rm(path, { recursive: true });
      }
      await loadDirectory(currentPath);
    } catch (error) {
      console.error('Error deleting items:', error);
      alert(`Error deleting items: ${error.message}`);
    }
  }
}