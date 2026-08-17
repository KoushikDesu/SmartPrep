/**
 * SmartPrep — SPA Router
 * Clean hash-based routing with parameter extraction and route dispatch.
 */

class Router {
  constructor() {
    this.routes = [];
    this.currentPath = '/';
  }

  /**
   * Register a route handler
   * @param {string} path 
   * @param {Function} handler 
   * @param {Object} options 
   */
  addRoute(path, handler, options = {}) {
    this.routes.push({
      path,
      handler,
      options,
      regex: this._pathToRegex(path)
    });
  }

  _pathToRegex(path) {
    const pattern = path
      .replace(/\//g, '\\/')
      .replace(/:[^\s/]+/g, '([^\\/]+)');
    return new RegExp(`^${pattern}$`);
  }

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
   * Navigate to a hash route
   * @param {string} path 
   */
  navigate(path) {
    const target = path.startsWith('#') ? path : `#${path.startsWith('/') ? path : '/' + path}`;
    if (window.location.hash === target) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = target;
    }
  }

  /**
   * Get matching route and params
   */
  match(urlPath) {
    const cleanPath = urlPath.replace('#', '') || '/';
    const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    
    for (const route of this.routes) {
      if (normalized.match(route.regex)) {
        return {
          route,
          params: this._extractParams(route, normalized),
          path: normalized
        };
      }
    }
    return null;
  }
}

export const router = new Router();

export function navigateTo(path) {
  router.navigate(path);
}
