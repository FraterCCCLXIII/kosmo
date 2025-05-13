/**
 * Fake Git Provider
 * Stub for testing/mock environments
 */

import { GitProvider } from './GitProvider.js';

/**
 * Fake Git provider class for testing
 * @extends GitProvider
 */
export class FakeGitProvider extends GitProvider {
  /**
   * Create a new Fake Git provider
   * @param {Object} options - Provider options
   */
  constructor(options = {}) {
    // Set default options
    const defaultOptions = {
      delay: 500, // Simulate network delay
      shouldFail: false, // Whether operations should fail
      failureRate: 0.1, // Probability of failure (0-1)
    };
    
    // Merge options
    super({ ...defaultOptions, ...options });
    
    // Fake repository state
    this.repository = {
      branches: [
        { name: 'main', current: true },
        { name: 'develop', current: false },
      ],
      remotes: [
        { name: 'origin', url: 'https://github.com/fake/repo.git' },
      ],
      commits: [
        {
          id: 'abc1234',
          message: 'Initial commit',
          author: 'user1',
          date: '2023-01-01T00:00:00Z',
        },
      ],
      files: {
        'README.md': '# Fake Repository\n\nThis is a fake repository for testing.',
        'index.html': '<!DOCTYPE html>\n<html>\n<head>\n  <title>Fake Repository</title>\n</head>\n<body>\n  <h1>Fake Repository</h1>\n</body>\n</html>',
        'src/main.js': 'console.log("Hello, world!");',
      },
      staged: [],
      unstaged: [],
      untracked: [],
    };
  }
  
  /**
   * Simulate an operation with potential failure
   * @param {Function} operation - Operation to simulate
   * @returns {Promise<*>} Operation result
   */
  async simulateOperation(operation) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, this.options.delay));
    
    // Check if operation should fail
    if (this.options.shouldFail || Math.random() < this.options.failureRate) {
      throw new Error('Operation failed (simulated)');
    }
    
    // Execute operation
    return operation();
  }
  
  /**
   * Initialize the provider
   * @returns {Promise<boolean>} Success
   */
  async init() {
    console.log('Initializing Fake Git provider...');
    
    try {
      return await this.simulateOperation(() => {
        console.log('Fake Git provider initialized');
        return true;
      });
    } catch (error) {
      console.error('Error initializing Fake Git provider:', error);
      return false;
    }
  }
  
  /**
   * Clone a repository
   * @param {string} url - Repository URL
   * @param {string} path - Local path
   * @param {Object} options - Clone options
   * @returns {Promise<Object>} Clone result
   */
  async clone(url, path, options = {}) {
    console.log(`Cloning repository ${url} to ${path}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Parse repository owner and name from URL
        const match = url.match(/github\.com[\/:]([^\/]+)\/([^\/\.]+)(?:\.git)?$/);
        if (!match) {
          throw new Error(`Invalid repository URL: ${url}`);
        }
        
        const [, owner, name] = match;
        
        console.log(`Repository ${owner}/${name} cloned to ${path}`);
        
        return {
          success: true,
          repository: {
            owner,
            name,
            path,
          },
        };
      });
    } catch (error) {
      console.error('Error cloning repository:', error);
      
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  /**
   * Get repository status
   * @returns {Promise<Object>} Repository status
   */
  async status() {
    console.log('Getting repository status...');
    
    try {
      return await this.simulateOperation(() => {
        const currentBranch = this.repository.branches.find(b => b.current);
        
        return {
          branch: currentBranch ? currentBranch.name : 'unknown',
          ahead: 0,
          behind: 0,
          staged: [...this.repository.staged],
          unstaged: [...this.repository.unstaged],
          untracked: [...this.repository.untracked],
        };
      });
    } catch (error) {
      console.error('Error getting repository status:', error);
      
      return {
        error: error.message,
      };
    }
  }
  
  /**
   * Stage files
   * @param {Array|string} files - Files to stage
   * @returns {Promise<boolean>} Success
   */
  async add(files) {
    const fileList = Array.isArray(files) ? files : [files];
    console.log(`Staging files: ${fileList.join(', ')}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Move files from unstaged to staged
        fileList.forEach(file => {
          const index = this.repository.unstaged.indexOf(file);
          if (index !== -1) {
            this.repository.unstaged.splice(index, 1);
            this.repository.staged.push(file);
          }
          
          // Move files from untracked to staged
          const untrackIndex = this.repository.untracked.indexOf(file);
          if (untrackIndex !== -1) {
            this.repository.untracked.splice(untrackIndex, 1);
            this.repository.staged.push(file);
          }
        });
        
        return true;
      });
    } catch (error) {
      console.error('Error staging files:', error);
      return false;
    }
  }
  
  /**
   * Commit changes
   * @param {string} message - Commit message
   * @param {Object} options - Commit options
   * @returns {Promise<Object>} Commit result
   */
  async commit(message, options = {}) {
    console.log(`Committing changes with message: ${message}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Create commit
        const commitId = Math.random().toString(36).substring(2, 10);
        const commit = {
          id: commitId,
          message,
          author: options.author || 'fake-user',
          date: new Date().toISOString(),
        };
        
        // Add commit to history
        this.repository.commits.unshift(commit);
        
        // Clear staged files
        this.repository.staged = [];
        
        return {
          success: true,
          commit,
        };
      });
    } catch (error) {
      console.error('Error committing changes:', error);
      
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  /**
   * Push changes
   * @param {string} remote - Remote name
   * @param {string} branch - Branch name
   * @param {Object} options - Push options
   * @returns {Promise<Object>} Push result
   */
  async push(remote = 'origin', branch = 'main', options = {}) {
    console.log(`Pushing changes to ${remote}/${branch}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Check if remote exists
        const remoteExists = this.repository.remotes.some(r => r.name === remote);
        if (!remoteExists) {
          throw new Error(`Remote ${remote} not found`);
        }
        
        // Check if branch exists
        const branchExists = this.repository.branches.some(b => b.name === branch);
        if (!branchExists) {
          throw new Error(`Branch ${branch} not found`);
        }
        
        return {
          success: true,
          remote,
          branch,
        };
      });
    } catch (error) {
      console.error('Error pushing changes:', error);
      
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  /**
   * Pull changes
   * @param {string} remote - Remote name
   * @param {string} branch - Branch name
   * @param {Object} options - Pull options
   * @returns {Promise<Object>} Pull result
   */
  async pull(remote = 'origin', branch = 'main', options = {}) {
    console.log(`Pulling changes from ${remote}/${branch}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Check if remote exists
        const remoteExists = this.repository.remotes.some(r => r.name === remote);
        if (!remoteExists) {
          throw new Error(`Remote ${remote} not found`);
        }
        
        // Check if branch exists
        const branchExists = this.repository.branches.some(b => b.name === branch);
        if (!branchExists) {
          throw new Error(`Branch ${branch} not found`);
        }
        
        // Simulate new commits
        const newCommit = {
          id: Math.random().toString(36).substring(2, 10),
          message: 'Remote change (simulated)',
          author: 'remote-user',
          date: new Date().toISOString(),
        };
        
        this.repository.commits.unshift(newCommit);
        
        return {
          success: true,
          remote,
          branch,
          changes: [newCommit],
        };
      });
    } catch (error) {
      console.error('Error pulling changes:', error);
      
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  /**
   * Create a branch
   * @param {string} name - Branch name
   * @param {Object} options - Branch options
   * @returns {Promise<Object>} Branch result
   */
  async createBranch(name, options = {}) {
    console.log(`Creating branch ${name}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Check if branch already exists
        const branchExists = this.repository.branches.some(b => b.name === name);
        if (branchExists) {
          throw new Error(`Branch ${name} already exists`);
        }
        
        // Create branch
        const branch = {
          name,
          current: options.checkout === true,
        };
        
        // Update current branch if checking out
        if (options.checkout === true) {
          this.repository.branches.forEach(b => {
            b.current = false;
          });
        }
        
        // Add branch
        this.repository.branches.push(branch);
        
        return {
          success: true,
          branch: name,
        };
      });
    } catch (error) {
      console.error('Error creating branch:', error);
      
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  /**
   * Switch to a branch
   * @param {string} name - Branch name
   * @param {Object} options - Checkout options
   * @returns {Promise<boolean>} Success
   */
  async checkout(name, options = {}) {
    console.log(`Switching to branch ${name}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Find branch
        const branch = this.repository.branches.find(b => b.name === name);
        if (!branch) {
          // Create branch if requested
          if (options.create === true) {
            this.repository.branches.push({
              name,
              current: true,
            });
            
            // Update current branch
            this.repository.branches.forEach(b => {
              if (b.name !== name) {
                b.current = false;
              }
            });
            
            return true;
          }
          
          throw new Error(`Branch ${name} not found`);
        }
        
        // Update current branch
        this.repository.branches.forEach(b => {
          b.current = b.name === name;
        });
        
        return true;
      });
    } catch (error) {
      console.error('Error switching to branch:', error);
      return false;
    }
  }
  
  /**
   * Get branches
   * @returns {Promise<Array>} Branches
   */
  async getBranches() {
    console.log('Getting branches...');
    
    try {
      return await this.simulateOperation(() => {
        return [...this.repository.branches];
      });
    } catch (error) {
      console.error('Error getting branches:', error);
      return [];
    }
  }
  
  /**
   * Get current branch
   * @returns {Promise<string>} Current branch
   */
  async getCurrentBranch() {
    console.log('Getting current branch...');
    
    try {
      return await this.simulateOperation(() => {
        const currentBranch = this.repository.branches.find(b => b.current);
        return currentBranch ? currentBranch.name : null;
      });
    } catch (error) {
      console.error('Error getting current branch:', error);
      return null;
    }
  }
  
  /**
   * Get commit history
   * @param {Object} options - Log options
   * @returns {Promise<Array>} Commits
   */
  async log(options = {}) {
    console.log('Getting commit history...');
    
    try {
      return await this.simulateOperation(() => {
        // Apply limit if specified
        if (options.limit && options.limit > 0) {
          return this.repository.commits.slice(0, options.limit);
        }
        
        return [...this.repository.commits];
      });
    } catch (error) {
      console.error('Error getting commit history:', error);
      return [];
    }
  }
  
  /**
   * Get file diff
   * @param {string} file - File path
   * @param {Object} options - Diff options
   * @returns {Promise<string>} Diff
   */
  async diff(file, options = {}) {
    console.log(`Getting diff for file ${file}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Check if file exists
        if (!this.repository.files[file]) {
          throw new Error(`File ${file} not found`);
        }
        
        // Generate fake diff
        return `
diff --git a/${file} b/${file}
index 1234567..abcdefg 100644
--- a/${file}
+++ b/${file}
@@ -1,5 +1,5 @@
 Line 1
-Line 2
+Line 2 modified
 Line 3
 Line 4
 Line 5
        `.trim();
      });
    } catch (error) {
      console.error('Error getting file diff:', error);
      return '';
    }
  }
  
  /**
   * Merge branches
   * @param {string} from - Source branch
   * @param {string} to - Target branch
   * @param {Object} options - Merge options
   * @returns {Promise<Object>} Merge result
   */
  async merge(from, to, options = {}) {
    console.log(`Merging branch ${from} into ${to}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Check if source branch exists
        const sourceBranch = this.repository.branches.find(b => b.name === from);
        if (!sourceBranch) {
          throw new Error(`Source branch ${from} not found`);
        }
        
        // Check if target branch exists
        const targetBranch = this.repository.branches.find(b => b.name === to);
        if (!targetBranch) {
          throw new Error(`Target branch ${to} not found`);
        }
        
        // Simulate merge commit
        const mergeCommit = {
          id: Math.random().toString(36).substring(2, 10),
          message: `Merge branch '${from}' into ${to}`,
          author: options.author || 'fake-user',
          date: new Date().toISOString(),
        };
        
        this.repository.commits.unshift(mergeCommit);
        
        return {
          success: true,
          from,
          to,
          commit: mergeCommit,
          conflicts: [],
        };
      });
    } catch (error) {
      console.error('Error merging branches:', error);
      
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  /**
   * Resolve merge conflicts
   * @param {Array} files - Files to resolve
   * @param {Object} options - Resolve options
   * @returns {Promise<boolean>} Success
   */
  async resolveConflicts(files, options = {}) {
    console.log(`Resolving conflicts in files: ${files.join(', ')}...`);
    
    try {
      return await this.simulateOperation(() => {
        return true;
      });
    } catch (error) {
      console.error('Error resolving conflicts:', error);
      return false;
    }
  }
  
  /**
   * Get remotes
   * @returns {Promise<Array>} Remotes
   */
  async getRemotes() {
    console.log('Getting remotes...');
    
    try {
      return await this.simulateOperation(() => {
        return [...this.repository.remotes];
      });
    } catch (error) {
      console.error('Error getting remotes:', error);
      return [];
    }
  }
  
  /**
   * Add a remote
   * @param {string} name - Remote name
   * @param {string} url - Remote URL
   * @returns {Promise<boolean>} Success
   */
  async addRemote(name, url) {
    console.log(`Adding remote ${name} with URL ${url}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Check if remote already exists
        const remoteExists = this.repository.remotes.some(r => r.name === name);
        if (remoteExists) {
          throw new Error(`Remote ${name} already exists`);
        }
        
        // Add remote
        this.repository.remotes.push({ name, url });
        
        return true;
      });
    } catch (error) {
      console.error('Error adding remote:', error);
      return false;
    }
  }
  
  /**
   * Remove a remote
   * @param {string} name - Remote name
   * @returns {Promise<boolean>} Success
   */
  async removeRemote(name) {
    console.log(`Removing remote ${name}...`);
    
    try {
      return await this.simulateOperation(() => {
        // Check if remote exists
        const index = this.repository.remotes.findIndex(r => r.name === name);
        if (index === -1) {
          throw new Error(`Remote ${name} not found`);
        }
        
        // Remove remote
        this.repository.remotes.splice(index, 1);
        
        return true;
      });
    } catch (error) {
      console.error('Error removing remote:', error);
      return false;
    }
  }
}