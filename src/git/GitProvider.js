/**
 * Git Provider
 * Abstract Git interface (pull, push, branch, etc.)
 */

/**
 * Abstract Git provider class
 * @abstract
 */
export class GitProvider {
  /**
   * Create a new Git provider
   * @param {Object} options - Provider options
   */
  constructor(options = {}) {
    this.options = options;
    
    // Ensure this class is not instantiated directly
    if (this.constructor === GitProvider) {
      throw new Error('GitProvider is an abstract class and cannot be instantiated directly');
    }
  }
  
  /**
   * Initialize the provider
   * @abstract
   * @returns {Promise<boolean>} Success
   */
  async init() {
    throw new Error('Method not implemented');
  }
  
  /**
   * Clone a repository
   * @abstract
   * @param {string} url - Repository URL
   * @param {string} path - Local path
   * @param {Object} options - Clone options
   * @returns {Promise<Object>} Clone result
   */
  async clone(url, path, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Get repository status
   * @abstract
   * @returns {Promise<Object>} Repository status
   */
  async status() {
    throw new Error('Method not implemented');
  }
  
  /**
   * Stage files
   * @abstract
   * @param {Array|string} files - Files to stage
   * @returns {Promise<boolean>} Success
   */
  async add(files) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Commit changes
   * @abstract
   * @param {string} message - Commit message
   * @param {Object} options - Commit options
   * @returns {Promise<Object>} Commit result
   */
  async commit(message, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Push changes
   * @abstract
   * @param {string} remote - Remote name
   * @param {string} branch - Branch name
   * @param {Object} options - Push options
   * @returns {Promise<Object>} Push result
   */
  async push(remote = 'origin', branch = 'main', options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Pull changes
   * @abstract
   * @param {string} remote - Remote name
   * @param {string} branch - Branch name
   * @param {Object} options - Pull options
   * @returns {Promise<Object>} Pull result
   */
  async pull(remote = 'origin', branch = 'main', options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Create a branch
   * @abstract
   * @param {string} name - Branch name
   * @param {Object} options - Branch options
   * @returns {Promise<Object>} Branch result
   */
  async createBranch(name, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Switch to a branch
   * @abstract
   * @param {string} name - Branch name
   * @param {Object} options - Checkout options
   * @returns {Promise<boolean>} Success
   */
  async checkout(name, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Get branches
   * @abstract
   * @returns {Promise<Array>} Branches
   */
  async getBranches() {
    throw new Error('Method not implemented');
  }
  
  /**
   * Get current branch
   * @abstract
   * @returns {Promise<string>} Current branch
   */
  async getCurrentBranch() {
    throw new Error('Method not implemented');
  }
  
  /**
   * Get commit history
   * @abstract
   * @param {Object} options - Log options
   * @returns {Promise<Array>} Commits
   */
  async log(options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Get file diff
   * @abstract
   * @param {string} file - File path
   * @param {Object} options - Diff options
   * @returns {Promise<string>} Diff
   */
  async diff(file, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Merge branches
   * @abstract
   * @param {string} from - Source branch
   * @param {string} to - Target branch
   * @param {Object} options - Merge options
   * @returns {Promise<Object>} Merge result
   */
  async merge(from, to, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Resolve merge conflicts
   * @abstract
   * @param {Array} files - Files to resolve
   * @param {Object} options - Resolve options
   * @returns {Promise<boolean>} Success
   */
  async resolveConflicts(files, options = {}) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Get remotes
   * @abstract
   * @returns {Promise<Array>} Remotes
   */
  async getRemotes() {
    throw new Error('Method not implemented');
  }
  
  /**
   * Add a remote
   * @abstract
   * @param {string} name - Remote name
   * @param {string} url - Remote URL
   * @returns {Promise<boolean>} Success
   */
  async addRemote(name, url) {
    throw new Error('Method not implemented');
  }
  
  /**
   * Remove a remote
   * @abstract
   * @param {string} name - Remote name
   * @returns {Promise<boolean>} Success
   */
  async removeRemote(name) {
    throw new Error('Method not implemented');
  }
}