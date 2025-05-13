/**
 * Virtual File System
 * In-memory file/folder management
 */

// File system state
let fileSystem = {
  root: {
    type: 'directory',
    name: 'root',
    children: {},
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  },
};

// Current working directory path
let currentPath = '/';

/**
 * Initialize the virtual file system
 * @returns {Object} Virtual file system API
 */
export async function initVirtualFS() {
  console.log('Initializing virtual file system...');
  
  // Try to load saved file system from localStorage
  try {
    const savedFS = localStorage.getItem('os-virtual-fs');
    if (savedFS) {
      fileSystem = JSON.parse(savedFS);
      console.log('Loaded file system from storage');
    } else {
      // Create default directories and files
      createDefaultFileSystem();
    }
  } catch (error) {
    console.error('Error loading file system:', error);
    // Create default directories and files
    createDefaultFileSystem();
  }
  
  // Set up periodic saving
  setInterval(saveFileSystem, 30000);
  
  // Return public API
  return {
    listDirectory,
    createDirectory,
    createFile,
    readFile,
    writeFile,
    appendFile,
    deleteFile,
    deleteDirectory,
    moveFile,
    copyFile,
    getFileInfo,
    changeDirectory,
    getCurrentDirectory,
    getAbsolutePath,
    exists,
    isDirectory,
    isFile,
    searchFiles,
  };
}

/**
 * Create default file system structure
 */
function createDefaultFileSystem() {
  console.log('Creating default file system structure');
  
  // Create home directory
  createDirectoryInternal('/home');
  
  // Create documents directory
  createDirectoryInternal('/home/documents');
  
  // Create sample text file
  createFileInternal('/home/documents/welcome.txt', 'Welcome to the AI-First OS!\n\nThis is a sample text file in your virtual file system.');
  
  // Create applications directory
  createDirectoryInternal('/applications');
  
  // Create system directory
  createDirectoryInternal('/system');
  
  // Create temp directory
  createDirectoryInternal('/temp');
}

/**
 * Save file system to localStorage
 */
function saveFileSystem() {
  try {
    localStorage.setItem('os-virtual-fs', JSON.stringify(fileSystem));
  } catch (error) {
    console.error('Error saving file system:', error);
  }
}

/**
 * Get node at path
 * @param {string} path - File or directory path
 * @returns {Object|null} Node or null if not found
 */
function getNodeAtPath(path) {
  // Normalize path
  const normalizedPath = normalizePath(path);
  
  // Handle root
  if (normalizedPath === '/') {
    return fileSystem.root;
  }
  
  // Split path into components
  const components = normalizedPath.split('/').filter(Boolean);
  
  // Start at root
  let current = fileSystem.root;
  
  // Traverse path
  for (const component of components) {
    if (!current.children[component]) {
      return null;
    }
    current = current.children[component];
  }
  
  return current;
}

/**
 * Get parent directory node and basename
 * @param {string} path - File or directory path
 * @returns {Object} Object with parent node and basename
 */
function getParentAndBasename(path) {
  // Normalize path
  const normalizedPath = normalizePath(path);
  
  // Split path into components
  const components = normalizedPath.split('/').filter(Boolean);
  
  // Get basename (last component)
  const basename = components.pop();
  
  // Handle root
  if (components.length === 0) {
    return { parent: fileSystem.root, basename };
  }
  
  // Get parent path
  const parentPath = '/' + components.join('/');
  
  // Get parent node
  const parent = getNodeAtPath(parentPath);
  
  return { parent, basename };
}

/**
 * Normalize path
 * @param {string} path - Path to normalize
 * @returns {string} Normalized path
 */
function normalizePath(path) {
  // Handle absolute paths
  if (path.startsWith('/')) {
    return path;
  }
  
  // Handle relative paths
  return joinPaths(currentPath, path);
}

/**
 * Join paths
 * @param {string} basePath - Base path
 * @param {string} relativePath - Relative path
 * @returns {string} Joined path
 */
function joinPaths(basePath, relativePath) {
  // Handle special cases
  if (relativePath === '.') {
    return basePath;
  }
  
  if (relativePath === '..') {
    const components = basePath.split('/').filter(Boolean);
    components.pop();
    return '/' + components.join('/');
  }
  
  if (relativePath.startsWith('./')) {
    relativePath = relativePath.slice(2);
  }
  
  // Handle multiple path components
  const components = [];
  
  // Add base path components
  components.push(...basePath.split('/').filter(Boolean));
  
  // Add relative path components
  for (const component of relativePath.split('/').filter(Boolean)) {
    if (component === '.') {
      continue;
    } else if (component === '..') {
      components.pop();
    } else {
      components.push(component);
    }
  }
  
  return '/' + components.join('/');
}

/**
 * List directory contents
 * @param {string} path - Directory path
 * @returns {Array} Array of file and directory objects
 */
function listDirectory(path = currentPath) {
  // Get directory node
  const dirNode = getNodeAtPath(path);
  
  // Check if directory exists
  if (!dirNode) {
    throw new Error(`Directory not found: ${path}`);
  }
  
  // Check if node is a directory
  if (dirNode.type !== 'directory') {
    throw new Error(`Not a directory: ${path}`);
  }
  
  // Get directory contents
  return Object.values(dirNode.children).map(node => ({
    name: node.name,
    type: node.type,
    size: node.type === 'file' ? node.content.length : null,
    createdAt: node.createdAt,
    modifiedAt: node.modifiedAt,
  }));
}

/**
 * Create a directory
 * @param {string} path - Directory path
 * @returns {boolean} Success
 */
function createDirectory(path) {
  return createDirectoryInternal(path);
}

/**
 * Internal function to create a directory
 * @param {string} path - Directory path
 * @returns {boolean} Success
 */
function createDirectoryInternal(path) {
  // Get parent directory and basename
  const { parent, basename } = getParentAndBasename(path);
  
  // Check if parent exists
  if (!parent) {
    throw new Error(`Parent directory not found: ${path}`);
  }
  
  // Check if parent is a directory
  if (parent.type !== 'directory') {
    throw new Error(`Parent is not a directory: ${path}`);
  }
  
  // Check if directory already exists
  if (parent.children[basename]) {
    throw new Error(`Path already exists: ${path}`);
  }
  
  // Create directory
  parent.children[basename] = {
    type: 'directory',
    name: basename,
    children: {},
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };
  
  // Update parent modified time
  parent.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Create a file
 * @param {string} path - File path
 * @param {string} content - File content
 * @returns {boolean} Success
 */
function createFile(path, content = '') {
  return createFileInternal(path, content);
}

/**
 * Internal function to create a file
 * @param {string} path - File path
 * @param {string} content - File content
 * @returns {boolean} Success
 */
function createFileInternal(path, content = '') {
  // Get parent directory and basename
  const { parent, basename } = getParentAndBasename(path);
  
  // Check if parent exists
  if (!parent) {
    throw new Error(`Parent directory not found: ${path}`);
  }
  
  // Check if parent is a directory
  if (parent.type !== 'directory') {
    throw new Error(`Parent is not a directory: ${path}`);
  }
  
  // Check if file already exists
  if (parent.children[basename]) {
    throw new Error(`Path already exists: ${path}`);
  }
  
  // Create file
  parent.children[basename] = {
    type: 'file',
    name: basename,
    content: content,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };
  
  // Update parent modified time
  parent.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Read a file
 * @param {string} path - File path
 * @returns {string} File content
 */
function readFile(path) {
  // Get file node
  const fileNode = getNodeAtPath(path);
  
  // Check if file exists
  if (!fileNode) {
    throw new Error(`File not found: ${path}`);
  }
  
  // Check if node is a file
  if (fileNode.type !== 'file') {
    throw new Error(`Not a file: ${path}`);
  }
  
  // Return file content
  return fileNode.content;
}

/**
 * Write to a file (overwrite)
 * @param {string} path - File path
 * @param {string} content - File content
 * @returns {boolean} Success
 */
function writeFile(path, content) {
  // Get file node
  const fileNode = getNodeAtPath(path);
  
  // If file doesn't exist, create it
  if (!fileNode) {
    return createFile(path, content);
  }
  
  // Check if node is a file
  if (fileNode.type !== 'file') {
    throw new Error(`Not a file: ${path}`);
  }
  
  // Update file content
  fileNode.content = content;
  fileNode.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Append to a file
 * @param {string} path - File path
 * @param {string} content - Content to append
 * @returns {boolean} Success
 */
function appendFile(path, content) {
  // Get file node
  const fileNode = getNodeAtPath(path);
  
  // If file doesn't exist, create it
  if (!fileNode) {
    return createFile(path, content);
  }
  
  // Check if node is a file
  if (fileNode.type !== 'file') {
    throw new Error(`Not a file: ${path}`);
  }
  
  // Append to file content
  fileNode.content += content;
  fileNode.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Delete a file
 * @param {string} path - File path
 * @returns {boolean} Success
 */
function deleteFile(path) {
  // Get parent directory and basename
  const { parent, basename } = getParentAndBasename(path);
  
  // Check if parent exists
  if (!parent) {
    throw new Error(`Parent directory not found: ${path}`);
  }
  
  // Check if file exists
  if (!parent.children[basename]) {
    throw new Error(`File not found: ${path}`);
  }
  
  // Check if node is a file
  if (parent.children[basename].type !== 'file') {
    throw new Error(`Not a file: ${path}`);
  }
  
  // Delete file
  delete parent.children[basename];
  
  // Update parent modified time
  parent.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Delete a directory
 * @param {string} path - Directory path
 * @param {boolean} recursive - Whether to delete recursively
 * @returns {boolean} Success
 */
function deleteDirectory(path, recursive = false) {
  // Get parent directory and basename
  const { parent, basename } = getParentAndBasename(path);
  
  // Check if parent exists
  if (!parent) {
    throw new Error(`Parent directory not found: ${path}`);
  }
  
  // Check if directory exists
  if (!parent.children[basename]) {
    throw new Error(`Directory not found: ${path}`);
  }
  
  // Check if node is a directory
  if (parent.children[basename].type !== 'directory') {
    throw new Error(`Not a directory: ${path}`);
  }
  
  // Check if directory is empty or recursive is true
  const dirNode = parent.children[basename];
  if (Object.keys(dirNode.children).length > 0 && !recursive) {
    throw new Error(`Directory not empty: ${path}`);
  }
  
  // Delete directory
  delete parent.children[basename];
  
  // Update parent modified time
  parent.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Move a file or directory
 * @param {string} sourcePath - Source path
 * @param {string} destPath - Destination path
 * @returns {boolean} Success
 */
function moveFile(sourcePath, destPath) {
  // Get source node
  const sourceNode = getNodeAtPath(sourcePath);
  
  // Check if source exists
  if (!sourceNode) {
    throw new Error(`Source not found: ${sourcePath}`);
  }
  
  // Get destination parent and basename
  const { parent: destParent, basename: destBasename } = getParentAndBasename(destPath);
  
  // Check if destination parent exists
  if (!destParent) {
    throw new Error(`Destination parent directory not found: ${destPath}`);
  }
  
  // Check if destination parent is a directory
  if (destParent.type !== 'directory') {
    throw new Error(`Destination parent is not a directory: ${destPath}`);
  }
  
  // Check if destination already exists
  if (destParent.children[destBasename]) {
    throw new Error(`Destination already exists: ${destPath}`);
  }
  
  // Get source parent and basename
  const { parent: sourceParent, basename: sourceBasename } = getParentAndBasename(sourcePath);
  
  // Move node
  destParent.children[destBasename] = sourceNode;
  destParent.children[destBasename].name = destBasename;
  delete sourceParent.children[sourceBasename];
  
  // Update modified times
  destParent.modifiedAt = Date.now();
  sourceParent.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Copy a file or directory
 * @param {string} sourcePath - Source path
 * @param {string} destPath - Destination path
 * @param {boolean} recursive - Whether to copy recursively
 * @returns {boolean} Success
 */
function copyFile(sourcePath, destPath, recursive = true) {
  // Get source node
  const sourceNode = getNodeAtPath(sourcePath);
  
  // Check if source exists
  if (!sourceNode) {
    throw new Error(`Source not found: ${sourcePath}`);
  }
  
  // Get destination parent and basename
  const { parent: destParent, basename: destBasename } = getParentAndBasename(destPath);
  
  // Check if destination parent exists
  if (!destParent) {
    throw new Error(`Destination parent directory not found: ${destPath}`);
  }
  
  // Check if destination parent is a directory
  if (destParent.type !== 'directory') {
    throw new Error(`Destination parent is not a directory: ${destPath}`);
  }
  
  // Check if destination already exists
  if (destParent.children[destBasename]) {
    throw new Error(`Destination already exists: ${destPath}`);
  }
  
  // Copy node
  if (sourceNode.type === 'file') {
    // Copy file
    destParent.children[destBasename] = {
      type: 'file',
      name: destBasename,
      content: sourceNode.content,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    };
  } else if (sourceNode.type === 'directory') {
    // Copy directory
    destParent.children[destBasename] = {
      type: 'directory',
      name: destBasename,
      children: {},
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    };
    
    // Copy children recursively if requested
    if (recursive) {
      for (const [childName, childNode] of Object.entries(sourceNode.children)) {
        const childSourcePath = joinPaths(sourcePath, childName);
        const childDestPath = joinPaths(destPath, childName);
        copyFile(childSourcePath, childDestPath, recursive);
      }
    }
  }
  
  // Update destination parent modified time
  destParent.modifiedAt = Date.now();
  
  // Save file system
  saveFileSystem();
  
  return true;
}

/**
 * Get file or directory info
 * @param {string} path - File or directory path
 * @returns {Object} File or directory info
 */
function getFileInfo(path) {
  // Get node
  const node = getNodeAtPath(path);
  
  // Check if node exists
  if (!node) {
    throw new Error(`Path not found: ${path}`);
  }
  
  // Return node info
  return {
    name: node.name,
    type: node.type,
    size: node.type === 'file' ? node.content.length : null,
    createdAt: node.createdAt,
    modifiedAt: node.modifiedAt,
    isDirectory: node.type === 'directory',
    isFile: node.type === 'file',
    children: node.type === 'directory' ? Object.keys(node.children) : null,
  };
}

/**
 * Change current directory
 * @param {string} path - Directory path
 * @returns {string} New current directory
 */
function changeDirectory(path) {
  // Normalize path
  const normalizedPath = normalizePath(path);
  
  // Get directory node
  const dirNode = getNodeAtPath(normalizedPath);
  
  // Check if directory exists
  if (!dirNode) {
    throw new Error(`Directory not found: ${normalizedPath}`);
  }
  
  // Check if node is a directory
  if (dirNode.type !== 'directory') {
    throw new Error(`Not a directory: ${normalizedPath}`);
  }
  
  // Update current path
  currentPath = normalizedPath;
  
  return currentPath;
}

/**
 * Get current directory
 * @returns {string} Current directory
 */
function getCurrentDirectory() {
  return currentPath;
}

/**
 * Get absolute path
 * @param {string} path - Relative or absolute path
 * @returns {string} Absolute path
 */
function getAbsolutePath(path) {
  return normalizePath(path);
}

/**
 * Check if path exists
 * @param {string} path - File or directory path
 * @returns {boolean} Whether path exists
 */
function exists(path) {
  return getNodeAtPath(path) !== null;
}

/**
 * Check if path is a directory
 * @param {string} path - File or directory path
 * @returns {boolean} Whether path is a directory
 */
function isDirectory(path) {
  const node = getNodeAtPath(path);
  return node !== null && node.type === 'directory';
}

/**
 * Check if path is a file
 * @param {string} path - File or directory path
 * @returns {boolean} Whether path is a file
 */
function isFile(path) {
  const node = getNodeAtPath(path);
  return node !== null && node.type === 'file';
}

/**
 * Search for files and directories
 * @param {string} query - Search query
 * @param {string} path - Directory to search in
 * @param {boolean} recursive - Whether to search recursively
 * @returns {Array} Array of matching paths
 */
function searchFiles(query, path = '/', recursive = true) {
  const results = [];
  
  // Get directory node
  const dirNode = getNodeAtPath(path);
  
  // Check if directory exists
  if (!dirNode) {
    throw new Error(`Directory not found: ${path}`);
  }
  
  // Check if node is a directory
  if (dirNode.type !== 'directory') {
    throw new Error(`Not a directory: ${path}`);
  }
  
  // Search in current directory
  for (const [childName, childNode] of Object.entries(dirNode.children)) {
    const childPath = joinPaths(path, childName);
    
    // Check if name matches query
    if (childName.toLowerCase().includes(query.toLowerCase())) {
      results.push(childPath);
    }
    
    // If child is a directory and recursive is true, search in child
    if (childNode.type === 'directory' && recursive) {
      results.push(...searchFiles(query, childPath, recursive));
    }
    
    // If child is a file, check if content matches query
    if (childNode.type === 'file' && childNode.content.toLowerCase().includes(query.toLowerCase())) {
      if (!results.includes(childPath)) {
        results.push(childPath);
      }
    }
  }
  
  return results;
}