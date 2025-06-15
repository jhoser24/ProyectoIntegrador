export function initializeDashboard() {
  const dashboardContent = `
    <div class="container-fluid">
      <!-- Selector de Almacén -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Panel de Inventario</h1>
        <div class="d-flex align-items-center">
          <select class="form-control mr-2" id="warehouseSelector">
            <option value="all">Todos los almacenes</option>
            <option value="1">Almacén Central</option>
            <option value="2">Almacén Norte</option>
            <option value="3">Almacén Sur</option>
          </select>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="window.location.hash='#/inventory/count'">
              <i class="fas fa-clipboard-check mr-1"></i> Nuevo Conteo
            </button>
            <button class="btn btn-warning" onclick="window.location.hash='#/inventory/adjustment'">
              <i class="fas fa-balance-scale mr-1"></i> Nuevo Ajuste
            </button>
          </div>
        </div>
      </div>

      <!-- KPIs -->
      <div class="row mb-4">
        <div class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-2 px-2">
                    Recepciones Hoy</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">12</div>
                  <div class="small px-2">
                    <span class="text-success">
                      <i class="fas fa-arrow-up"></i> 3 más que ayer
                    </span>
                  </div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-truck-loading fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-warning text-uppercase mb-2 px-2">
                    Pickings Pendientes</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">28</div>
                  <div class="small px-2">
                    <span class="text-danger">
                      <i class="fas fa-arrow-up"></i> 5 más que ayer
                    </span>
                  </div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-people-carry fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-2 px-2">
                    Exactitud de Inventario</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">98.5%</div>
                  <div class="small px-2">
                    <span class="text-success">
                      <i class="fas fa-arrow-up"></i> +0.5% este mes
                    </span>
                  </div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-check-circle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-info text-uppercase mb-2 px-2">
                    Conteos Pendientes</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">3</div>
                  <div class="small px-2">
                    <span class="text-info">
                      Próximo: Zona A1
                    </span>
                  </div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráficos y Accesos Rápidos -->
      <div class="row">
        <!-- Gráfico Entradas vs Salidas -->
        <div class="col-xl-8 col-lg-7">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 font-weight-bold text-primary">Entradas vs Salidas</h6>
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary active">Día</button>
                <button class="btn btn-outline-primary">Semana</button>
                <button class="btn btn-outline-primary">Mes</button>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-area" style="height: 20rem;">
                <canvas id="movementsChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Accesos Rápidos -->
        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Accesos Rápidos</h6>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6 mb-3">
                  <a href="#/inventory/count" class="btn btn-block btn-outline-primary h-100 py-4">
                    <i class="fas fa-clipboard-check fa-2x mb-2"></i>
                    <br>Conteo Cíclico
                  </a>
                </div>
                <div class="col-6 mb-3">
                  <a href="#/inventory/adjustment" class="btn btn-block btn-outline-warning h-100 py-4">
                    <i class="fas fa-balance-scale fa-2x mb-2"></i>
                    <br>Ajuste Manual
                  </a>
                </div>
                <div class="col-6 mb-3">
                  <a href="#/reports/accuracy" class="btn btn-block btn-outline-success h-100 py-4">
                    <i class="fas fa-chart-line fa-2x mb-2"></i>
                    <br>Reporte Exactitud
                  </a>
                </div>
                <div class="col-6 mb-3">
                  <a href="#/inventory/locations" class="btn btn-block btn-outline-info h-100 py-4">
                    <i class="fas fa-map-marker-alt fa-2x mb-2"></i>
                    <br>Mapa Ubicaciones
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tablas de Resumen -->
      <div class="row">
        <!-- Últimas Recepciones -->
        <div class="col-xl-6 col-lg-6">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 font-weight-bold text-primary">Últimas Recepciones</h6>
              <a href="#/purchase-entries" class="btn btn-sm btn-primary">Ver Todas</a>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>OC</th>
                      <th>Proveedor</th>
                      <th>Estado</th>
                      <th>SKUs</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>OC-2024-042</td>
                      <td>Proveedor A</td>
                      <td><span class="badge badge-info">En Proceso</span></td>
                      <td>15</td>
                      <td>
                        <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                      </td>
                    </tr>
                    <tr>
                      <td>OC-2024-041</td>
                      <td>Proveedor B</td>
                      <td><span class="badge badge-warning">Pendiente</span></td>
                      <td>8</td>
                      <td>
                        <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Pickings Activos -->
        <div class="col-xl-6 col-lg-6">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 font-weight-bold text-primary">Pickings Activos</h6>
              <a href="#/picking" class="btn btn-sm btn-primary">Ver Todos</a>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Operario</th>
                      <th>Zona</th>
                      <th>Progreso</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PICK-2024-089</td>
                      <td>Juan Pérez</td>
                      <td>Zona A</td>
                      <td>
                        <div class="progress">
                          <div class="progress-bar bg-success" role="progressbar" style="width: 75%">75%</div>
                        </div>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                      </td>
                    </tr>
                    <tr>
                      <td>PICK-2024-088</td>
                      <td>María García</td>
                      <td>Zona B</td>
                      <td>
                        <div class="progress">
                          <div class="progress-bar bg-success" role="progressbar" style="width: 45%">45%</div>
                        </div>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').innerHTML = dashboardContent;

  // Inicializar los gráficos después de que el contenido esté en el DOM
  setTimeout(() => {
    initializeCharts();
  }, 100);
}

function initializeCharts() {
  // Gráfico de Entradas vs Salidas
  const movementsCtx = document.getElementById('movementsChart').getContext('2d');
  new Chart(movementsCtx, {
    type: 'line',
    data: {
      labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      datasets: [
        {
          label: 'Entradas',
          data: [5, 8, 12, 8, 6, 4, 9, 7, 6],
          borderColor: '#1cc88a',
          backgroundColor: 'rgba(28, 200, 138, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        },
        {
          label: 'Salidas',
          data: [3, 6, 9, 10, 8, 5, 7, 8, 4],
          borderColor: '#e74a3b',
          backgroundColor: 'rgba(231, 74, 59, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 5,
            padding: 10
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 9,
            padding: 10
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
} 