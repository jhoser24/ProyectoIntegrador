export function initializeSidebar() {
  const sidebarContent = `
    <div class="sidebar-wrapper">
      <!-- Sidebar -->
      <nav id="sidebar" class="sidebar">
        <div class="sidebar-header">
          <i class="fas fa-warehouse sidebar-logo"></i>
          <div class="brand-text">
            <div class="system-name">Sistema de</div>
            <div class="system-type">Gestión de Almacén</div>
          </div>
        </div>

        <ul class="list-unstyled components">
          <li>
            <a href="#/dashboard" class="nav-link" data-route="dashboard">
              <i class="fas fa-tachometer-alt"></i>
              <span class="nav-text">Panel de Inventario</span>
            </a>
          </li>
          <li>
            <a href="#/purchase-entries" class="nav-link" data-route="purchase-entries">
              <i class="fas fa-truck-loading"></i>
              <span class="nav-text">Entrada de Compra</span>
            </a>
          </li>
          <li>
            <a href="#/picking" class="nav-link" data-route="picking">
              <i class="fas fa-barcode"></i>
              <span class="nav-text">Picking</span>
            </a>
          </li>
          <li>
            <a href="#/supply-rules" class="nav-link" data-route="supply-rules">
              <i class="fas fa-sync"></i>
              <span class="nav-text">Reglas de Abastecimiento</span>
            </a>
          </li>
          <li>
            <a href="#/product-card" class="nav-link" data-route="product-card">
              <i class="fas fa-box"></i>
              <span class="nav-text">Ficha de Producto</span>
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div class="user-info">
            <i class="fas fa-user-circle user-icon"></i>
            <div class="user-details">
              <span class="user-name">Administrador</span>
            </div>
          </div>
          <button onclick="handleLogout()" class="btn btn-logout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="btn-text">Cerrar Sesión</span>
          </button>
        </div>
      </nav>

      <!-- Toggle Button -->
      <button type="button" id="sidebarCollapse" class="btn btn-toggle">
        <i class="fas fa-chevron-left"></i>
      </button>

      <!-- Contenido Principal -->
      <div id="content" class="content">
        <div id="app"></div>
      </div>
    </div>
  `;

  // Insertar el contenido del sidebar
  document.body.innerHTML = sidebarContent;

  // Estilos para el sidebar
  const sidebarStyles = document.createElement('style');
  sidebarStyles.textContent = `
    .sidebar-wrapper {
      display: flex;
      width: 100%;
      min-height: 100vh;
    }

    .sidebar {
      width: 250px;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 999;
      background: #2c3e50;
      color: #fff;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
    }

    .sidebar.collapsed {
      width: 60px;
    }

    .sidebar.collapsed .brand-text,
    .sidebar.collapsed .nav-text,
    .sidebar.collapsed .user-details,
    .sidebar.collapsed .btn-text {
      display: none;
    }

    .sidebar.collapsed .sidebar-header {
      padding: 15px;
      justify-content: center;
    }

    .sidebar.collapsed .nav-link {
      justify-content: center;
      padding: 15px;
    }

    .sidebar.collapsed .user-info {
      justify-content: center;
    }

    .sidebar-header {
      padding: 15px 20px;
      background: #243342;
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 70px;
    }

    .sidebar-logo {
      font-size: 2rem;
      color: #3498db;
      min-width: 35px;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .system-name {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .system-type {
      font-size: 1.1rem;
      font-weight: 500;
    }

    .components {
      padding: 20px 0;
      flex-grow: 1;
    }

    .components li {
      position: relative;
    }

    .components .nav-link {
      padding: 12px 20px;
      color: #fff;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s;
    }

    .components .nav-link:hover {
      background: #34495e;
      color: #fff;
    }

    .components .nav-link.active {
      background: #3498db;
    }

    .components .nav-link i {
      width: 20px;
      text-align: center;
      font-size: 1.1rem;
    }

    .sidebar-footer {
      padding: 20px;
      background: #243342;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .user-icon {
      font-size: 2rem;
      color: #fff;
      min-width: 32px;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 500;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    .btn-logout {
      width: 100%;
      padding: 10px;
      color: #fff;
      background: #e74c3c;
      border: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s;
    }

    .btn-logout:hover {
      background: #c0392b;
    }

    .content {
      width: calc(100% - 250px);
      margin-left: 250px;
      padding: 20px;
      min-height: 100vh;
      transition: all 0.3s;
    }

    .content.expanded {
      width: calc(100% - 60px);
      margin-left: 60px;
    }

    .btn-toggle {
      position: fixed;
      left: 250px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
      width: 25px;
      height: 40px;
      background: #2c3e50;
      color: #fff;
      border: none;
      border-radius: 0 5px 5px 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }

    .btn-toggle:hover {
      background: #34495e;
      color: #fff;
    }

    .sidebar.collapsed + #sidebarCollapse {
      left: 60px;
    }

    .sidebar.collapsed + #sidebarCollapse i {
      transform: rotate(180deg);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        margin-left: -250px;
      }
      
      .sidebar.active {
        margin-left: 0;
      }
      
      .content {
        width: 100%;
        margin-left: 0;
      }
      
      .content.active {
        width: calc(100% - 250px);
        margin-left: 250px;
      }

      .btn-toggle {
        display: none;
      }
    }
  `;
  document.head.appendChild(sidebarStyles);

  // Funcionalidad para colapsar el sidebar
  const sidebarCollapse = document.getElementById('sidebarCollapse');
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');

  sidebarCollapse.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
  });

  // Marcar el enlace activo
  function setActiveLink() {
    const currentHash = window.location.hash.slice(1) || '/dashboard';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      const route = link.getAttribute('data-route');
      if (currentHash.includes(route)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Actualizar enlace activo cuando cambie la ruta
  window.addEventListener('hashchange', setActiveLink);
  setActiveLink();
} 