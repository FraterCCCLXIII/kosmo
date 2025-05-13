/**
 * Git Connector
 * Interface for connecting GitProvider with UI
 */

import { GitHubProvider } from './GitHubProvider.js';
import { FakeGitProvider } from './FakeGitProvider.js';

// Git provider instance
let gitProvider = null;

/**
 * Initialize the Git connector
 * @param {Object} config - Git configuration
 * @returns {Object} Git connector API
 */
export async function initGitConnector(config = {}) {
  console.log('Initializing Git connector...');
  
  // Set default config
  const defaultConfig = {
    provider: 'fake', // 'github', 'gitlab', 'fake'
    token: null,
    username: null,
    email: null,
    defaultBranch: 'main',
    autoCommit: false,
  };
  
  // Merge config
  const mergedConfig = { ...defaultConfig, ...config };
  
  // Create provider based on config
  gitProvider = createProvider(mergedConfig);
  
  // Initialize provider
  await gitProvider.init();
  
  // Return public API
  return {
    getProvider,
    setProvider,
    clone,
    status,
    add,
    commit,
    push,
    pull,
    createBranch,
    checkout,
    getBranches,
    getCurrentBranch,
    log,
    diff,
    merge,
    resolveConflicts,
    getRemotes,
    addRemote,
    removeRemote,
    showGitOperationWindow,
  };
}

/**
 * Create a Git provider
 * @param {Object} config - Git configuration
 * @returns {Object} Git provider
 */
function createProvider(config) {
  switch (config.provider) {
    case 'github':
      return new GitHubProvider({
        token: config.token,
        username: config.username,
        email: config.email,
      });
    
    case 'fake':
    default:
      return new FakeGitProvider();
  }
}

/**
 * Get the current Git provider
 * @returns {Object} Git provider
 */
function getProvider() {
  return gitProvider;
}

/**
 * Set the Git provider
 * @param {Object} provider - Git provider
 * @returns {boolean} Success
 */
function setProvider(provider) {
  if (!provider) {
    return false;
  }
  
  gitProvider = provider;
  return true;
}

/**
 * Clone a repository
 * @param {string} url - Repository URL
 * @param {string} path - Local path
 * @param {Object} options - Clone options
 * @returns {Promise<Object>} Clone result
 */
async function clone(url, path, options = {}) {
  return gitProvider.clone(url, path, options);
}

/**
 * Get repository status
 * @returns {Promise<Object>} Repository status
 */
async function status() {
  return gitProvider.status();
}

/**
 * Stage files
 * @param {Array|string} files - Files to stage
 * @returns {Promise<boolean>} Success
 */
async function add(files) {
  return gitProvider.add(files);
}

/**
 * Commit changes
 * @param {string} message - Commit message
 * @param {Object} options - Commit options
 * @returns {Promise<Object>} Commit result
 */
async function commit(message, options = {}) {
  return gitProvider.commit(message, options);
}

/**
 * Push changes
 * @param {string} remote - Remote name
 * @param {string} branch - Branch name
 * @param {Object} options - Push options
 * @returns {Promise<Object>} Push result
 */
async function push(remote = 'origin', branch = 'main', options = {}) {
  return gitProvider.push(remote, branch, options);
}

/**
 * Pull changes
 * @param {string} remote - Remote name
 * @param {string} branch - Branch name
 * @param {Object} options - Pull options
 * @returns {Promise<Object>} Pull result
 */
async function pull(remote = 'origin', branch = 'main', options = {}) {
  return gitProvider.pull(remote, branch, options);
}

/**
 * Create a branch
 * @param {string} name - Branch name
 * @param {Object} options - Branch options
 * @returns {Promise<Object>} Branch result
 */
async function createBranch(name, options = {}) {
  return gitProvider.createBranch(name, options);
}

/**
 * Switch to a branch
 * @param {string} name - Branch name
 * @param {Object} options - Checkout options
 * @returns {Promise<boolean>} Success
 */
async function checkout(name, options = {}) {
  return gitProvider.checkout(name, options);
}

/**
 * Get branches
 * @returns {Promise<Array>} Branches
 */
async function getBranches() {
  return gitProvider.getBranches();
}

/**
 * Get current branch
 * @returns {Promise<string>} Current branch
 */
async function getCurrentBranch() {
  return gitProvider.getCurrentBranch();
}

/**
 * Get commit history
 * @param {Object} options - Log options
 * @returns {Promise<Array>} Commits
 */
async function log(options = {}) {
  return gitProvider.log(options);
}

/**
 * Get file diff
 * @param {string} file - File path
 * @param {Object} options - Diff options
 * @returns {Promise<string>} Diff
 */
async function diff(file, options = {}) {
  return gitProvider.diff(file, options);
}

/**
 * Merge branches
 * @param {string} from - Source branch
 * @param {string} to - Target branch
 * @param {Object} options - Merge options
 * @returns {Promise<Object>} Merge result
 */
async function merge(from, to, options = {}) {
  return gitProvider.merge(from, to, options);
}

/**
 * Resolve merge conflicts
 * @param {Array} files - Files to resolve
 * @param {Object} options - Resolve options
 * @returns {Promise<boolean>} Success
 */
async function resolveConflicts(files, options = {}) {
  return gitProvider.resolveConflicts(files, options);
}

/**
 * Get remotes
 * @returns {Promise<Array>} Remotes
 */
async function getRemotes() {
  return gitProvider.getRemotes();
}

/**
 * Add a remote
 * @param {string} name - Remote name
 * @param {string} url - Remote URL
 * @returns {Promise<boolean>} Success
 */
async function addRemote(name, url) {
  return gitProvider.addRemote(name, url);
}

/**
 * Remove a remote
 * @param {string} name - Remote name
 * @returns {Promise<boolean>} Success
 */
async function removeRemote(name) {
  return gitProvider.removeRemote(name);
}

/**
 * Show Git operation window
 * @param {string} operation - Git operation
 * @param {Object} options - Window options
 * @returns {Promise<Object>} Window object
 */
async function showGitOperationWindow(operation, options = {}) {
  // Import WindowManager
  const { initWindowManager } = await import('../ui/WindowManager.js');
  const windowManager = await initWindowManager();
  
  // Create window content based on operation
  let content = '';
  let title = '';
  
  switch (operation) {
    case 'clone':
      title = 'Clone Repository';
      content = createCloneContent();
      break;
    
    case 'commit':
      title = 'Commit Changes';
      content = await createCommitContent();
      break;
    
    case 'push':
      title = 'Push Changes';
      content = await createPushContent();
      break;
    
    case 'pull':
      title = 'Pull Changes';
      content = await createPullContent();
      break;
    
    case 'branch':
      title = 'Branch Management';
      content = await createBranchContent();
      break;
    
    case 'merge':
      title = 'Merge Branches';
      content = await createMergeContent();
      break;
    
    default:
      title = 'Git Operations';
      content = createDefaultContent();
  }
  
  // Create window
  const window = windowManager.createWindow({
    title,
    width: 600,
    height: 400,
    content,
    ...options,
  });
  
  return window;
}

/**
 * Create clone window content
 * @returns {string} HTML content
 */
function createCloneContent() {
  return `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <h2>Clone Repository</h2>
      
      <div style="margin-bottom: 15px;">
        <label for="repo-url" style="display: block; margin-bottom: 5px;">Repository URL:</label>
        <input type="text" id="repo-url" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);" placeholder="https://github.com/username/repo.git">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="local-path" style="display: block; margin-bottom: 5px;">Local Path:</label>
        <input type="text" id="local-path" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);" placeholder="/path/to/local/repo">
      </div>
      
      <div style="margin-top: auto; display: flex; justify-content: flex-end; gap: 10px;">
        <button id="cancel-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer;">Cancel</button>
        <button id="clone-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-accent); color: white; cursor: pointer;">Clone</button>
      </div>
    </div>
  `;
}

/**
 * Create commit window content
 * @returns {Promise<string>} HTML content
 */
async function createCommitContent() {
  // Get repository status
  const statusResult = await status();
  
  // Create file list
  let fileList = '';
  
  if (statusResult.staged && statusResult.staged.length > 0) {
    fileList += '<h3>Staged Changes</h3><ul>';
    statusResult.staged.forEach(file => {
      fileList += `<li><label><input type="checkbox" checked disabled> ${file}</label></li>`;
    });
    fileList += '</ul>';
  }
  
  if (statusResult.unstaged && statusResult.unstaged.length > 0) {
    fileList += '<h3>Unstaged Changes</h3><ul>';
    statusResult.unstaged.forEach(file => {
      fileList += `<li><label><input type="checkbox" data-file="${file}"> ${file}</label></li>`;
    });
    fileList += '</ul>';
  }
  
  if (statusResult.untracked && statusResult.untracked.length > 0) {
    fileList += '<h3>Untracked Files</h3><ul>';
    statusResult.untracked.forEach(file => {
      fileList += `<li><label><input type="checkbox" data-file="${file}"> ${file}</label></li>`;
    });
    fileList += '</ul>';
  }
  
  if (!fileList) {
    fileList = '<p>No changes to commit.</p>';
  }
  
  return `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <h2>Commit Changes</h2>
      
      <div style="margin-bottom: 15px; flex: 1; overflow-y: auto;">
        ${fileList}
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="commit-message" style="display: block; margin-bottom: 5px;">Commit Message:</label>
        <textarea id="commit-message" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); resize: vertical; min-height: 80px;" placeholder="Enter commit message"></textarea>
      </div>
      
      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button id="cancel-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer;">Cancel</button>
        <button id="stage-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-bg-tertiary); color: var(--color-text-primary); cursor: pointer;">Stage Selected</button>
        <button id="commit-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-accent); color: white; cursor: pointer;">Commit</button>
      </div>
    </div>
  `;
}

/**
 * Create push window content
 * @returns {Promise<string>} HTML content
 */
async function createPushContent() {
  // Get remotes and branches
  const [remotes, branches, currentBranch] = await Promise.all([
    getRemotes(),
    getBranches(),
    getCurrentBranch(),
  ]);
  
  // Create remote options
  let remoteOptions = '';
  remotes.forEach(remote => {
    remoteOptions += `<option value="${remote.name}">${remote.name} (${remote.url})</option>`;
  });
  
  if (!remoteOptions) {
    remoteOptions = '<option value="">No remotes found</option>';
  }
  
  // Create branch options
  let branchOptions = '';
  branches.forEach(branch => {
    branchOptions += `<option value="${branch.name}" ${branch.name === currentBranch ? 'selected' : ''}>${branch.name}</option>`;
  });
  
  if (!branchOptions) {
    branchOptions = '<option value="">No branches found</option>';
  }
  
  return `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <h2>Push Changes</h2>
      
      <div style="margin-bottom: 15px;">
        <label for="remote" style="display: block; margin-bottom: 5px;">Remote:</label>
        <select id="remote" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
          ${remoteOptions}
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="branch" style="display: block; margin-bottom: 5px;">Branch:</label>
        <select id="branch" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
          ${branchOptions}
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: flex; align-items: center; gap: 5px;">
          <input type="checkbox" id="force-push">
          <span>Force push</span>
        </label>
        <p style="margin-top: 5px; color: var(--color-text-tertiary); font-size: var(--font-size-sm);">Warning: Force pushing can overwrite remote changes. Use with caution.</p>
      </div>
      
      <div style="margin-top: auto; display: flex; justify-content: flex-end; gap: 10px;">
        <button id="cancel-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer;">Cancel</button>
        <button id="push-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-accent); color: white; cursor: pointer;">Push</button>
      </div>
    </div>
  `;
}

/**
 * Create pull window content
 * @returns {Promise<string>} HTML content
 */
async function createPullContent() {
  // Get remotes and branches
  const [remotes, branches, currentBranch] = await Promise.all([
    getRemotes(),
    getBranches(),
    getCurrentBranch(),
  ]);
  
  // Create remote options
  let remoteOptions = '';
  remotes.forEach(remote => {
    remoteOptions += `<option value="${remote.name}">${remote.name} (${remote.url})</option>`;
  });
  
  if (!remoteOptions) {
    remoteOptions = '<option value="">No remotes found</option>';
  }
  
  // Create branch options
  let branchOptions = '';
  branches.forEach(branch => {
    branchOptions += `<option value="${branch.name}" ${branch.name === currentBranch ? 'selected' : ''}>${branch.name}</option>`;
  });
  
  if (!branchOptions) {
    branchOptions = '<option value="">No branches found</option>';
  }
  
  return `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <h2>Pull Changes</h2>
      
      <div style="margin-bottom: 15px;">
        <label for="remote" style="display: block; margin-bottom: 5px;">Remote:</label>
        <select id="remote" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
          ${remoteOptions}
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="branch" style="display: block; margin-bottom: 5px;">Branch:</label>
        <select id="branch" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
          ${branchOptions}
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: flex; align-items: center; gap: 5px;">
          <input type="checkbox" id="rebase">
          <span>Rebase instead of merge</span>
        </label>
      </div>
      
      <div style="margin-top: auto; display: flex; justify-content: flex-end; gap: 10px;">
        <button id="cancel-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer;">Cancel</button>
        <button id="pull-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-accent); color: white; cursor: pointer;">Pull</button>
      </div>
    </div>
  `;
}

/**
 * Create branch window content
 * @returns {Promise<string>} HTML content
 */
async function createBranchContent() {
  // Get branches and current branch
  const [branches, currentBranch] = await Promise.all([
    getBranches(),
    getCurrentBranch(),
  ]);
  
  // Create branch list
  let branchList = '';
  
  if (branches && branches.length > 0) {
    branchList += '<ul style="list-style: none; padding: 0; margin: 0;">';
    branches.forEach(branch => {
      branchList += `
        <li style="padding: 8px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
          <span>${branch.name} ${branch.current ? '<span style="color: var(--color-accent); font-weight: bold;">(current)</span>' : ''}</span>
          <div>
            ${!branch.current ? `<button class="checkout-btn" data-branch="${branch.name}" style="padding: 4px 8px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-bg-tertiary); cursor: pointer; margin-right: 5px;">Checkout</button>` : ''}
            <button class="merge-btn" data-branch="${branch.name}" style="padding: 4px 8px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-bg-tertiary); cursor: pointer;">Merge</button>
          </div>
        </li>
      `;
    });
    branchList += '</ul>';
  } else {
    branchList = '<p>No branches found.</p>';
  }
  
  return `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <h2>Branch Management</h2>
      
      <div style="margin-bottom: 15px;">
        <h3>Create New Branch</h3>
        <div style="display: flex; gap: 10px;">
          <input type="text" id="new-branch-name" style="flex: 1; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);" placeholder="New branch name">
          <button id="create-branch-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-accent); color: white; cursor: pointer;">Create</button>
        </div>
      </div>
      
      <div style="flex: 1; overflow-y: auto; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm);">
        <h3 style="padding: 10px; margin: 0; background-color: var(--color-bg-secondary); border-bottom: 1px solid var(--border-color);">Branches</h3>
        ${branchList}
      </div>
      
      <div style="margin-top: 15px; display: flex; justify-content: flex-end;">
        <button id="close-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer;">Close</button>
      </div>
    </div>
  `;
}

/**
 * Create merge window content
 * @returns {Promise<string>} HTML content
 */
async function createMergeContent() {
  // Get branches and current branch
  const [branches, currentBranch] = await Promise.all([
    getBranches(),
    getCurrentBranch(),
  ]);
  
  // Create source branch options
  let sourceBranchOptions = '';
  branches.forEach(branch => {
    if (branch.name !== currentBranch) {
      sourceBranchOptions += `<option value="${branch.name}">${branch.name}</option>`;
    }
  });
  
  if (!sourceBranchOptions) {
    sourceBranchOptions = '<option value="">No other branches found</option>';
  }
  
  return `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <h2>Merge Branches</h2>
      
      <div style="margin-bottom: 15px;">
        <p>Current branch: <strong>${currentBranch}</strong></p>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="source-branch" style="display: block; margin-bottom: 5px;">Source Branch:</label>
        <select id="source-branch" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
          ${sourceBranchOptions}
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: flex; align-items: center; gap: 5px;">
          <input type="checkbox" id="squash">
          <span>Squash commits</span>
        </label>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="merge-message" style="display: block; margin-bottom: 5px;">Merge Message:</label>
        <textarea id="merge-message" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); resize: vertical; min-height: 80px;" placeholder="Enter merge message"></textarea>
      </div>
      
      <div style="margin-top: auto; display: flex; justify-content: flex-end; gap: 10px;">
        <button id="cancel-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer;">Cancel</button>
        <button id="merge-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: none; background-color: var(--color-accent); color: white; cursor: pointer;">Merge</button>
      </div>
    </div>
  `;
}

/**
 * Create default Git operations content
 * @returns {string} HTML content
 */
function createDefaultContent() {
  return `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <h2>Git Operations</h2>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
        <button class="git-op-btn" data-op="clone" style="padding: 15px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer; text-align: left;">
          <h3 style="margin: 0 0 5px 0;">Clone</h3>
          <p style="margin: 0; color: var(--color-text-secondary);">Clone a repository from a remote source</p>
        </button>
        
        <button class="git-op-btn" data-op="commit" style="padding: 15px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer; text-align: left;">
          <h3 style="margin: 0 0 5px 0;">Commit</h3>
          <p style="margin: 0; color: var(--color-text-secondary);">Commit changes to the repository</p>
        </button>
        
        <button class="git-op-btn" data-op="push" style="padding: 15px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer; text-align: left;">
          <h3 style="margin: 0 0 5px 0;">Push</h3>
          <p style="margin: 0; color: var(--color-text-secondary);">Push commits to a remote repository</p>
        </button>
        
        <button class="git-op-btn" data-op="pull" style="padding: 15px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer; text-align: left;">
          <h3 style="margin: 0 0 5px 0;">Pull</h3>
          <p style="margin: 0; color: var(--color-text-secondary);">Pull changes from a remote repository</p>
        </button>
        
        <button class="git-op-btn" data-op="branch" style="padding: 15px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer; text-align: left;">
          <h3 style="margin: 0 0 5px 0;">Branch</h3>
          <p style="margin: 0; color: var(--color-text-secondary);">Create and manage branches</p>
        </button>
        
        <button class="git-op-btn" data-op="merge" style="padding: 15px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer; text-align: left;">
          <h3 style="margin: 0 0 5px 0;">Merge</h3>
          <p style="margin: 0; color: var(--color-text-secondary);">Merge branches together</p>
        </button>
      </div>
      
      <div style="margin-top: auto; display: flex; justify-content: flex-end;">
        <button id="close-btn" style="padding: 8px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background-color: var(--color-bg-secondary); cursor: pointer;">Close</button>
      </div>
    </div>
  `;
}