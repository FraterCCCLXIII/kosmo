/**
 * Router
 * Simple hash-based routing system
 */

// Router state
let routes = new Map();
let currentRoute = null;
let defaultRoute = null;

/**
 * Initialize the router
 * @param {Object} options - Router options
 * @returns {Object} Router API
 */
export async function initRouter(options = {}) {
  console.log('Initializing router...');
  
  // Set default options
  const defaultOptions = {
    useHash: true,
    defaultRoute: '/',
  };
  
  // Merge options
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Set default route
  defaultRoute = mergedOptions.defaultRoute;
  
  // Set up event listeners
  if (mergedOptions.useHash) {
    window.addEventListener('hashchange', handleHashChange);
  } else {
    window.addEventListener('popstate', handlePopState);
  }
  
  // Navigate to initial route
  navigateToInitialRoute(mergedOptions.useHash);
  
  // Return public API
  return {
    addRoute,
    removeRoute,
    navigate,
    getCurrentRoute,
    getRoutes,
  };
}

/**
 * Navigate to initial route
 * @param {boolean} useHash - Whether to use hash-based routing
 */
function navigateToInitialRoute(useHash) {
  if (useHash) {
    // Get route from hash
    const hash = window.location.hash.slice(1) || defaultRoute;
    handleRoute(hash);
  } else {
    // Get route from pathname
    const pathname = window.location.pathname || defaultRoute;
    handleRoute(pathname);
  }
}

/**
 * Handle hash change event
 */
function handleHashChange() {
  const hash = window.location.hash.slice(1) || defaultRoute;
  handleRoute(hash);
}

/**
 * Handle popstate event
 */
function handlePopState() {
  const pathname = window.location.pathname || defaultRoute;
  handleRoute(pathname);
}

/**
 * Handle route change
 * @param {string} path - Route path
 */
function handleRoute(path) {
  // Parse path and query parameters
  const [routePath, queryString] = path.split('?');
  
  // Parse query parameters
  const queryParams = {};
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  
  // Find matching route
  let matchedRoute = null;
  let routeParams = {};
  
  for (const [pattern, handler] of routes.entries()) {
    const params = matchRoute(routePath, pattern);
    if (params) {
      matchedRoute = handler;
      routeParams = params;
      break;
    }
  }
  
  // If no route matched, try default route
  if (!matchedRoute && defaultRoute && routePath !== defaultRoute) {
    return handleRoute(defaultRoute);
  }
  
  // If still no route matched, do nothing
  if (!matchedRoute) {
    console.warn(`No route found for path: ${routePath}`);
    return;
  }
  
  // Update current route
  currentRoute = {
    path: routePath,
    params: routeParams,
    query: queryParams,
    pattern: matchedRoute.pattern,
  };
  
  // Call route handler
  matchedRoute.handler(currentRoute);
  
  // Dispatch route change event
  window.dispatchEvent(new CustomEvent('routechange', { detail: currentRoute }));
}

/**
 * Match route pattern
 * @param {string} path - Route path
 * @param {string} pattern - Route pattern
 * @returns {Object|null} Route parameters or null if no match
 */
function matchRoute(path, pattern) {
  // Exact match
  if (path === pattern) {
    return {};
  }
  
  // Pattern with parameters
  const patternSegments = pattern.split('/').filter(Boolean);
  const pathSegments = path.split('/').filter(Boolean);
  
  // Different number of segments
  if (patternSegments.length !== pathSegments.length) {
    return null;
  }
  
  // Match segments
  const params = {};
  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i];
    const pathSegment = pathSegments[i];
    
    // Parameter segment
    if (patternSegment.startsWith(':')) {
      const paramName = patternSegment.slice(1);
      params[paramName] = pathSegment;
    }
    // Static segment
    else if (patternSegment !== pathSegment) {
      return null;
    }
  }
  
  return params;
}

/**
 * Add a route
 * @param {string} pattern - Route pattern
 * @param {Function} handler - Route handler
 * @returns {boolean} Success
 */
function addRoute(pattern, handler) {
  // Validate pattern
  if (typeof pattern !== 'string') {
    console.error('Route pattern must be a string');
    return false;
  }
  
  // Validate handler
  if (typeof handler !== 'function') {
    console.error('Route handler must be a function');
    return false;
  }
  
  // Normalize pattern
  const normalizedPattern = pattern.startsWith('/') ? pattern : `/${pattern}`;
  
  // Add route
  routes.set(normalizedPattern, { pattern: normalizedPattern, handler });
  
  return true;
}

/**
 * Remove a route
 * @param {string} pattern - Route pattern
 * @returns {boolean} Success
 */
function removeRoute(pattern) {
  // Normalize pattern
  const normalizedPattern = pattern.startsWith('/') ? pattern : `/${pattern}`;
  
  // Remove route
  return routes.delete(normalizedPattern);
}

/**
 * Navigate to a route
 * @param {string} path - Route path
 * @param {Object} options - Navigation options
 * @returns {boolean} Success
 */
function navigate(path, options = {}) {
  // Set default options
  const defaultOptions = {
    replace: false,
    query: {},
  };
  
  // Merge options
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Normalize path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Add query parameters
  let fullPath = normalizedPath;
  if (Object.keys(mergedOptions.query).length > 0) {
    const queryString = Object.entries(mergedOptions.query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    fullPath = `${normalizedPath}?${queryString}`;
  }
  
  // Update URL
  if (window.location.hash !== undefined) {
    // Hash-based routing
    const newHash = `#${fullPath}`;
    
    if (mergedOptions.replace) {
      window.location.replace(newHash);
    } else {
      window.location.hash = fullPath;
    }
  } else {
    // History API
    if (mergedOptions.replace) {
      window.history.replaceState(null, '', fullPath);
    } else {
      window.history.pushState(null, '', fullPath);
    }
    
    // Manually trigger route handling
    handleRoute(fullPath);
  }
  
  return true;
}

/**
 * Get the current route
 * @returns {Object|null} Current route
 */
function getCurrentRoute() {
  return currentRoute;
}

/**
 * Get all routes
 * @returns {Array} Array of route objects
 */
function getRoutes() {
  return Array.from(routes.entries()).map(([pattern, handler]) => ({
    pattern,
    handler,
  }));
}