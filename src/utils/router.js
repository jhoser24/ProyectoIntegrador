export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;

    // Manejar cambios en el hash
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Manejar la carga inicial
    window.addEventListener('load', () => this.handleRoute());
  }

  handleRoute() {
    const hash = window.location.hash || '#/';
    const route = this.routes[hash] || this.routes['#/'];
    
    if (this.currentRoute !== route) {
      this.currentRoute = route;
      route();
    }
  }
} 