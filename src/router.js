import { getCurrentProfile } from './lib/auth.js';

class Router {
  constructor() {
    this.routes = [];
    this.currentPath = null;
    this.root = null;
    
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  /**
   * Adds a route to the router
   * @param {string} path Pattern (e.g. '/categories', '/category/:slug')
   * @param {Function} handler Function that renders the page
   * @param {Object} options Route options (requiresAuth, roles)
   */
  addRoute(path, handler, options = { requiresAuth: false, roles: null }) {
    this.routes.push({
      path,
      handler,
      options,
      regex: this._pathToRegex(path)
    });
  }

  /**
   * Converts a path string with parameters to a RegExp
   * @param {string} path 
   * @returns {RegExp}
   */
  _pathToRegex(path) {
    const pattern = path
      .replace(/\//g, '\\/')
      .replace(/:[^\s/]+/g, '([^\\/]+)');
    return new RegExp(`^${pattern}$`);
  }

  /**
   * Extracts parameters from a matched route
   * @param {Object} route 
   * @param {string} urlPath 
   * @returns {Object}
   */
  _extractParams(route, urlPath) {
    const paramNames = (route.path.match(/:[^\s/]+/g) || []).map(p => p.slice(1));
    const match = urlPath.match(route.regex);
    const params = {};
    
    if (match && paramNames.length) {
      paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
      });
    }
    return params;
  }

  /**
   * Initializes the router
   */
  init() {
    this.handleRoute();
  }

  /**
   * Programmatically navigate to a path
   * @param {string} path 
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Handles route change logic
   */
  async handleRoute() {
    const rawPath = window.location.hash.slice(1) || '/';
    const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    
    this.currentPath = path;

    const route = this.routes.find(r => path.match(r.regex));
    
    if (!route) {
      console.error(`Route not found for path: ${path}`);
      this.navigate('/');
      return;
    }

    if (route.options.requiresAuth) {
      try {
        const profile = await getCurrentProfile();
        
        if (!profile) {
          this.navigate('/login');
          return;
        }

        if (route.options.roles && route.options.roles.length > 0) {
          if (!route.options.roles.includes(profile.role)) {
            console.warn(`User role ${profile.role} not authorized for ${path}`);
            if (profile.role === 'admin') this.navigate('/admin');
            else if (profile.role === 'teacher') this.navigate('/teacher');
            else this.navigate('/categories');
            return;
          }
        }
      } catch (err) {
        console.error('Auth check error during routing:', err);
        this.navigate('/login');
        return;
      }
    }

    const params = this._extractParams(route, path);
    await route.handler(params);
  }
}

export const router = new Router();

/**
 * Helper to navigate to a specific path
 * @param {string} path 
 */
export function navigateTo(path) {
  router.navigate(path);
}
