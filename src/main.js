// Importar Bootstrap JS y CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';

// Importar estilos propios
import './assets/css/style.scss';

// Importar módulos
import { initializeDashboard } from './views/dashboard/dashboard.js';
import { initializeInventory } from './views/inventory/inventory.js';
import { initializeOrders } from './views/orders/orders.js';
import { initializeReturns } from './views/returns/returns.js';
import { initializeReports } from './views/reports/reports.js';
import { initializeLogin } from './views/auth/login.js';
import { initializePurchaseEntries } from './views/purchase-entries/purchase-entries.js';
import { initializePicking } from './views/picking/picking.js';
import { initializeSupplyRules } from './views/supply-rules/supply-rules.js';
import { initializeProductCard } from './views/product-card/product-card.js';
import { initializeSidebar } from './components/layout/sidebar.js';
import { Router } from './utils/router';

// Configuración de rutas
const routes = {
  '/': initializeLogin,
  '/login': initializeLogin,
  '/dashboard': initializeDashboard,
  '/inventory': initializeInventory,
  '/orders': initializeOrders,
  '/returns': initializeReturns,
  '/reports': initializeReports,
  '/purchase-entries': initializePurchaseEntries,
  '/picking': initializePicking,
  '/supply-rules': initializeSupplyRules,
  '/product-card': initializeProductCard
};

// Función para verificar autenticación
function checkAuth(path) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isLoginPage = path === '/' || path === '/login';

  if (!isAuthenticated && !isLoginPage) {
    window.location.hash = '#/login';
    return false;
  } else if (isAuthenticated && isLoginPage) {
    window.location.hash = '#/dashboard';
    return false;
  }
  return true;
}

// Router
function handleRoute() {
  const hash = window.location.hash.slice(1) || '/';
  if (!checkAuth(hash)) return;

  const isLoginPage = hash === '/' || hash === '/login';
  
  if (!isLoginPage && !document.querySelector('.sidebar-wrapper')) {
    initializeSidebar();
  }

  const route = routes[hash];
  if (route) {
    route();
  } else {
    window.location.hash = '#/';
  }
}

// Función para cerrar sesión
function handleLogout() {
  localStorage.removeItem('isAuthenticated');
  window.location.hash = '#/login';
}

// Crear el menú de navegación
const navigationContent = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#/">
        <i class="fas fa-warehouse me-2"></i>
        Sistema de Gestión de Almacén
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#/dashboard">
              <i class="fas fa-tachometer-alt me-1"></i>Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/inventory">
              <i class="fas fa-boxes me-1"></i>Inventario
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/orders">
              <i class="fas fa-clipboard-list me-1"></i>Órdenes
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/reports">
              <i class="fas fa-chart-bar me-1"></i>Reportes
            </a>
          </li>
        </ul>
        <!-- Menú de Usuario -->
        <div class="dropdown user-menu">
          <button class="btn btn-link dropdown-toggle nav-link" type="button" id="userDropdown" data-bs-toggle="dropdown">
            <i class="fas fa-user-circle me-1"></i>
            <span class="d-none d-md-inline">Administrador</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <a class="dropdown-item" href="#/profile">
                <i class="fas fa-user me-2"></i>Perfil
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#/settings">
                <i class="fas fa-cog me-2"></i>Configuración
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item text-danger" onclick="handleLogout()">
                <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
`;

// Estilos para el menú de usuario
const userMenuStyles = document.createElement('style');
userMenuStyles.textContent = `
  .user-menu .btn-link {
    color: #6c757d;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
  .user-menu .btn-link:hover {
    color: #343a40;
  }
  .dropdown-item i {
    width: 1rem;
    text-align: center;
  }
  .navbar-nav .nav-link i {
    width: 1.2rem;
    text-align: center;
  }
`;
document.head.appendChild(userMenuStyles);

// Hacer la función handleLogout global
window.handleLogout = handleLogout;

// Inicializar router
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  document.body.insertAdjacentHTML('afterbegin', navigationContent);
  handleRoute();
});
