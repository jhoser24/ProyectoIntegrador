export function initializeReports() {
  const reportsContent = `
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Reportes y Análisis</h1>
        <div>
          <button class="btn btn-success mr-2">
            <i class="fas fa-file-excel"></i> Exportar a Excel
          </button>
          <button class="btn btn-danger">
            <i class="fas fa-file-pdf"></i> Exportar a PDF
          </button>
        </div>
      </div>

      <!-- KPIs Principales -->
      <div class="row mb-4">
        <div class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-2 px-2">
                    Rotación de Inventario</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">4.5x</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-sync fa-2x text-gray-300"></i>
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
                    Tasa de Cumplimiento</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">98.5%</div>
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
                    Precisión de Inventario</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">99.2%</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-percentage fa-2x text-gray-300"></i>
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
                    Tiempo Promedio de Picking</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">15 min</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-clock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros de Fecha -->
      <div class="card shadow mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label>Período</label>
                <select class="form-control" id="periodFilter">
                  <option value="today">Hoy</option>
                  <option value="week">Esta Semana</option>
                  <option value="month" selected>Este Mes</option>
                  <option value="quarter">Este Trimestre</option>
                  <option value="year">Este Año</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>Desde</label>
                <input type="date" class="form-control">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>Hasta</label>
                <input type="date" class="form-control">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>&nbsp;</label>
                <button class="btn btn-primary btn-block">
                  <i class="fas fa-sync"></i> Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráficos y Análisis -->
      <div class="row">
        <!-- Niveles de Stock -->
        <div class="col-xl-6 col-lg-6">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 font-weight-bold text-primary">Niveles de Stock</h6>
              <div class="dropdown">
                <button class="btn btn-sm btn-link dropdown-toggle" type="button" data-toggle="dropdown">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#">Ver Detalles</a>
                  <a class="dropdown-item" href="#">Exportar Datos</a>
                  <a class="dropdown-item" href="#">Configurar Alertas</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-area" style="height: 20rem;">
                <canvas id="stockLevelsChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Órdenes por Estado -->
        <div class="col-xl-6 col-lg-6">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 font-weight-bold text-primary">Órdenes por Estado</h6>
              <div class="dropdown">
                <button class="btn btn-sm btn-link dropdown-toggle" type="button" data-toggle="dropdown">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#">Ver Detalles</a>
                  <a class="dropdown-item" href="#">Exportar Datos</a>
                  <a class="dropdown-item" href="#">Configurar Alertas</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-pie" style="height: 20rem;">
                <canvas id="orderStatusChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reportes Detallados -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Reportes Disponibles</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Nombre del Reporte</th>
                  <th>Descripción</th>
                  <th>Última Actualización</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rotación de Inventario</td>
                  <td>Análisis ABC de productos</td>
                  <td>2024-03-15 10:30</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Ver</button>
                    <button class="btn btn-success btn-sm">Exportar</button>
                  </td>
                </tr>
                <tr>
                  <td>Cumplimiento de Pedidos</td>
                  <td>Eficiencia en tiempos de entrega</td>
                  <td>2024-03-15 09:45</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Ver</button>
                    <button class="btn btn-success btn-sm">Exportar</button>
                  </td>
                </tr>
                <tr>
                  <td>Análisis de Devoluciones</td>
                  <td>Tendencias y causas de devoluciones</td>
                  <td>2024-03-14 16:20</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Ver</button>
                    <button class="btn btn-success btn-sm">Exportar</button>
                  </td>
                </tr>
                <tr>
                  <td>Productividad de Picking</td>
                  <td>Rendimiento por operario y zona</td>
                  <td>2024-03-14 15:00</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Ver</button>
                    <button class="btn btn-success btn-sm">Exportar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').innerHTML = reportsContent;

  // Inicializar los gráficos después de que el contenido esté en el DOM
  setTimeout(() => {
    initializeCharts();
  }, 100);
}

function initializeCharts() {
  // Niveles de Stock
  const stockCtx = document.getElementById('stockLevelsChart').getContext('2d');
  new Chart(stockCtx, {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Nivel de Stock',
        data: [1200, 1350, 1250, 1420, 1550, 1350],
        borderColor: '#4e73df',
        backgroundColor: 'rgba(78, 115, 223, 0.05)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
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
          beginAtZero: false,
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
            maxTicksLimit: 7,
            padding: 10
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  // Órdenes por Estado
  const orderCtx = document.getElementById('orderStatusChart').getContext('2d');
  new Chart(orderCtx, {
    type: 'doughnut',
    data: {
      labels: ['Pendientes', 'En Proceso', 'Completadas', 'Canceladas'],
      datasets: [{
        data: [42, 15, 120, 5],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#e74a3b'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f4b619'],
        hoverBorderColor: "rgba(234, 236, 244, 1)"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20
          }
        }
      }
    }
  });
} 