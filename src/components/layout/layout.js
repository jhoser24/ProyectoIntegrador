import { createSidebar } from './sidebar';

export function initializeLayout() {
  const layout = `
    <div id="app">
      <!-- ### $Sidebar ### -->
      <div class='sidebar'>
        <div class="sidebar-inner">
          <!-- ### $Sidebar Header ### -->
          <div class="sidebar-logo">
            <div class="peers ai-c fxw-nw">
              <div class="peer peer-greed">
                <a class="sidebar-link td-n" href="index.html">
                  <div class="peers ai-c fxw-nw">
                    <div class="peer">
                      <div class="logo">
                        <img src="/assets/images/logo.png" alt="">
                      </div>
                    </div>
                    <div class="peer peer-greed">
                      <h5 class="lh-1 mB-0 logo-text">Almacén</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="peer">
                <div class="mobile-toggle sidebar-toggle">
                  <a href="" class="td-n">
                    <i class="ti-arrow-circle-left"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- ### $Sidebar Menu ### -->
          <ul class="sidebar-menu scrollable pos-r">
            <li class="nav-item mT-30 active">
              <a class="sidebar-link" href="#" data-route="dashboard">
                <span class="icon-holder">
                  <i class="c-blue-500 ti-home"></i>
                </span>
                <span class="title">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="sidebar-link" href="#" data-route="productos">
                <span class="icon-holder">
                  <i class="c-brown-500 ti-package"></i>
                </span>
                <span class="title">Productos</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="sidebar-link" href="#" data-route="categorias">
                <span class="icon-holder">
                  <i class="c-blue-500 ti-tag"></i>
                </span>
                <span class="title">Categorías</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="sidebar-link" href="#" data-route="proveedores">
                <span class="icon-holder">
                  <i class="c-deep-purple-500 ti-truck"></i>
                </span>
                <span class="title">Proveedores</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="sidebar-link" href="#" data-route="usuarios">
                <span class="icon-holder">
                  <i class="c-deep-orange-500 ti-user"></i>
                </span>
                <span class="title">Usuarios</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="sidebar-link" href="#" data-route="reportes">
                <span class="icon-holder">
                  <i class="c-pink-500 ti-bar-chart"></i> 
                </span>
                <span class="title">Reportes</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- ### $App Screen Content ### -->
      <div class="page-container">
        <!-- ### $Topbar ### -->
        <div class="header navbar">
          <div class="header-container">
            <ul class="nav-left">
              <li>
                <a id='sidebar-toggle' class="sidebar-toggle" href="javascript:void(0);">
                  <i class="ti-menu"></i>
                </a>
              </li>
              <li class="search-box">
                <a class="search-toggle no-pdd-right" href="javascript:void(0);">
                  <i class="search-icon ti-search pdd-right-10"></i>
                  <i class="search-icon-close ti-close pdd-right-10"></i>
                </a>
              </li>
              <li class="search-input">
                <input class="form-control" type="text" placeholder="Buscar...">
              </li>
            </ul>
            <ul class="nav-right">
              <li class="notifications dropdown">
                <span class="counter bgc-red">3</span>
                <a href="" class="dropdown-toggle no-after" data-bs-toggle="dropdown">
                  <i class="ti-bell"></i>
                </a>
              </li>
              <li class="notifications dropdown">
                <span class="counter bgc-blue">3</span>
                <a href="" class="dropdown-toggle no-after" data-bs-toggle="dropdown">
                  <i class="ti-email"></i>
                </a>
              </li>
              <li class="dropdown">
                <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-bs-toggle="dropdown">
                  <div class="peer mR-10">
                    <img class="w-2r bdrs-50p" src="/assets/images/profile.jpg" alt="">
                  </div>
                  <div class="peer">
                    <span class="fsz-sm c-grey-900">John Doe</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- ### $App Screen Content ### -->
        <main class='main-content bgc-grey-100'>
          <div id='mainContent'>
            <div class="row gap-20 masonry pos-r">
              <div class="masonry-sizer col-md-6"></div>
              <div class="masonry-item w-100">
                <div class="row gap-20">
                  <!-- Inventario Card -->
                  <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                      <div class="layer w-100 mB-10">
                        <h6 class="lh-1">INVENTARIO TOTAL</h6>
                      </div>
                      <div class="layer w-100">
                        <div class="peers ai-sb fxw-nw">
                          <div class="peer peer-greed">
                             <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-blue-50 c-blue-500">1,259</span>
                          </div>
                          <div class="peer">
                            <span class="text-success"><i class="ti-arrow-up"></i> +5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Órdenes Card -->
                  <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                      <div class="layer w-100 mB-10">
                        <h6 class="lh-1">ÓRDENES PENDIENTES</h6>
                      </div>
                      <div class="layer w-100">
                        <div class="peers ai-sb fxw-nw">
                          <div class="peer peer-greed">
                            <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">42</span>
                          </div>
                          <div class="peer">
                            <span class="text-danger"><i class="ti-arrow-down"></i> -2%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Devoluciones Card -->
                  <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                      <div class="layer w-100 mB-10">
                        <h6 class="lh-1">DEVOLUCIONES</h6>
                      </div>
                      <div class="layer w-100">
                        <div class="peers ai-sb fxw-nw">
                           <div class="peer peer-greed">
                            <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-orange-50 c-orange-500">15</span>
                          </div>
                          <div class="peer">
                             <span class="text-success"><i class="ti-arrow-up"></i> +8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Alertas Card -->
                  <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                      <div class="layer w-100 mB-10">
                        <h6 class="lh-1">ALERTAS</h6>
                      </div>
                      <div class="layer w-100">
                        <div class="peers ai-sb fxw-nw">
                          <div class="peer peer-greed">
                            <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-red-50 c-red-500">7</span>
                          </div>
                           <div class="peer">
                            <span class="text-success"><i class="ti-arrow-up"></i> +0%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- New Row for Table and List -->
              <div class="masonry-item col-md-6">
                <!-- Sales Report Table -->
                <div class="bd bgc-white">
                  <div class="layers">
                    <div class="layer w-100 pX-20 pT-20">
                      <h6 class="lh-1">Reporte de Ventas Recientes</h6>
                    </div>
                    <div class="layer w-100 p-20">
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="bdwT-0">Producto</th>
                            <th class="bdwT-0">Estado</th>
                            <th class="bdwT-0">Fecha</th>
                            <th class="bdwT-0">Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="fw-600">Producto A</td>
                            <td><span class="badge bgc-green-50 c-green-500 p-10 lh-0 tt-c badge-pill">Entregado</span></td>
                            <td>Nov 18</td>
                            <td><span class="text-success">$12.00</span></td>
                          </tr>
                          <tr>
                            <td class="fw-600">Producto B</td>
                            <td><span class="badge bgc-yellow-50 c-yellow-500 p-10 lh-0 tt-c badge-pill">Pendiente</span></td>
                            <td>Nov 19</td>
                            <td><span class="text-warning">$34.00</span></td>
                          </tr>
                          <tr>
                            <td class="fw-600">Producto C</td>
                            <td><span class="badge bgc-red-50 c-red-500 p-10 lh-0 tt-c badge-pill">Cancelado</span></td>
                            <td>Nov 20</td>
                            <td><span class="text-danger">$45.00</span></td>
                          </tr>
                          <tr>
                            <td class="fw-600">Producto D</td>
                            <td><span class="badge bgc-blue-50 c-blue-500 p-10 lh-0 tt-c badge-pill">Enviado</span></td>
                            <td>Nov 21</td>
                            <td><span class="text-info">$65.00</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="ta-c bdT w-100 p-10">
                    <a href="#">Ver todas las ventas</a>
                  </div>
                </div>
              </div>

              <div class="masonry-item col-md-6">
                <!-- Todo List -->
                <div class="layers bd bgc-white p-20">
                  <div class="layer w-100 mB-10">
                    <h6 class="lh-1">Lista de Tareas</h6>
                  </div>
                  <div class="layer w-100">
                    <ul class="list-task list-group" data-role="tasklist">
                      <li class="list-group-item bdw-0" data-role="task">
                        <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                          <input type="checkbox" id="inputCall1" name="inputCheckboxesCall" class="peer">
                          <label for="inputCall1" class="peers peer-greed js-label">
                            <span class="peer peer-greed">Llamar a proveedor X</span>
                          </label>
                        </div>
                      </li>
                      <li class="list-group-item bdw-0" data-role="task">
                        <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                          <input type="checkbox" id="inputCall2" name="inputCheckboxesCall" class="peer">
                          <label for="inputCall2" class="peers peer-greed js-label">
                            <span class="peer peer-greed">Revisar inventario bajo</span>
                            <span class="peer"><span class="badge badge-pill fl-r badge-danger lh-0 p-10">Urgente</span></span>
                          </label>
                        </div>
                      </li>
                      <li class="list-group-item bdw-0" data-role="task">
                        <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                          <input type="checkbox" id="inputCall3" name="inputCheckboxesCall" class="peer">
                          <label for="inputCall3" class="peers peer-greed js-label">
                            <span class="peer peer-greed">Preparar reporte mensual</span>
                          </label>
                        </div>
                      </li>
                      <li class="list-group-item bdw-0" data-role="task">
                        <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                          <input type="checkbox" id="inputCall4" name="inputCheckboxesCall" class="peer">
                          <label for="inputCall4" class="peers peer-greed js-label">
                            <span class="peer peer-greed">Confirmar recepción de pedido #123</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        <!-- ### $Footer ### -->
        <footer class="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
          <span>Copyright © 2024 Diseñado por <a href="https://colorlib.com" target='_blank' title="Colorlib">Colorlib</a>. Todos los derechos reservados.</span>
        </footer>
      </div>
    </div>
  `;

  document.body.innerHTML = layout;
  
  // Initialize sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.sidebar').classList.toggle('is-collapsed');
    });
  }

  return {
    setPageTitle: (title) => {
      // For Adminator layout, page title might be handled differently or not needed
      // console.log("Set page title: ", title);
    },
    setContent: (content) => {
      // For Adminator layout, content needs to be placed inside #mainContent
      const mainContainer = document.getElementById('mainContent');
      if(mainContainer) {
        mainContainer.innerHTML = content; // Or append/modify as needed
      } else {
        console.error("#mainContent element not found in layout.");
      }
    }
  };
} 