export function initializeSupplyRules() {
  const supplyRulesContent = `
    <div class="container-fluid">
      <!-- Encabezado -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Reglas de Abastecimiento</h1>
        <div>
          <button class="btn btn-success mr-2" id="runPlannerBtn">
            <i class="fas fa-play"></i> Ejecutar Planificador
          </button>
          <button class="btn btn-primary" data-toggle="modal" data-target="#newRuleModal">
            <i class="fas fa-plus"></i> Nueva Regla
          </button>
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
                    Reglas Activas</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">45</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-clipboard-check fa-2x text-gray-300"></i>
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
                    Productos Cubiertos</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">128</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-boxes fa-2x text-gray-300"></i>
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
                    OCs Sugeridas</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">12</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-file-invoice fa-2x text-gray-300"></i>
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
                    Alertas Stock Bajo</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">5</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="card shadow mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <select class="form-control" id="categoryFilter">
                <option value="">Todas las Categorías</option>
                <option value="categoria_a">Categoría A</option>
                <option value="categoria_b">Categoría B</option>
                <option value="categoria_c">Categoría C</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-control" id="statusFilter">
                <option value="">Todos los Estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Buscar por SKU o descripción...">
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <button class="btn btn-outline-primary w-100" id="advancedFilterBtn">
                Filtros Avanzados
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de Reglas -->
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Reglas de Abastecimiento</h6>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-primary">
              <i class="fas fa-print"></i> Imprimir
            </button>
            <button class="btn btn-sm btn-outline-success">
              <i class="fas fa-file-excel"></i> Exportar
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="supplyRulesTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Descripción</th>
                  <th>Stock Mínimo</th>
                  <th>Stock Máximo</th>
                  <th>Lote Múltiplo</th>
                  <th>Plazo Entrega</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SKU001</td>
                  <td>Producto A</td>
                  <td>100</td>
                  <td>500</td>
                  <td>50</td>
                  <td>5 días</td>
                  <td><span class="badge badge-success">Activo</span></td>
                  <td>
                    <button class="btn btn-sm btn-info" title="Ver detalles">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" title="Editar">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" title="Desactivar">
                      <i class="fas fa-power-off"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>SKU002</td>
                  <td>Producto B</td>
                  <td>50</td>
                  <td>200</td>
                  <td>25</td>
                  <td>3 días</td>
                  <td><span class="badge badge-success">Activo</span></td>
                  <td>
                    <button class="btn btn-sm btn-info" title="Ver detalles">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" title="Editar">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" title="Desactivar">
                      <i class="fas fa-power-off"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>SKU003</td>
                  <td>Producto C</td>
                  <td>200</td>
                  <td>1000</td>
                  <td>100</td>
                  <td>7 días</td>
                  <td><span class="badge badge-secondary">Inactivo</span></td>
                  <td>
                    <button class="btn btn-sm btn-info" title="Ver detalles">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" title="Editar">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-success" title="Activar">
                      <i class="fas fa-power-off"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nueva Regla -->
    <div class="modal fade" id="newRuleModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nueva Regla de Abastecimiento</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="newRuleForm">
              <div class="form-group">
                <label>Producto</label>
                <select class="form-control" id="productSelect" required>
                  <option value="">Seleccione producto...</option>
                  <option value="SKU001">SKU001 - Producto A</option>
                  <option value="SKU002">SKU002 - Producto B</option>
                  <option value="SKU003">SKU003 - Producto C</option>
                </select>
              </div>
              <div class="form-group">
                <label>Stock Mínimo</label>
                <input type="number" class="form-control" required min="0">
              </div>
              <div class="form-group">
                <label>Stock Máximo</label>
                <input type="number" class="form-control" required min="0">
              </div>
              <div class="form-group">
                <label>Lote Múltiplo</label>
                <input type="number" class="form-control" required min="1">
                <small class="form-text text-muted">Cantidad mínima de compra</small>
              </div>
              <div class="form-group">
                <label>Plazo de Entrega (días)</label>
                <input type="number" class="form-control" required min="1">
              </div>
              <div class="form-group">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="activeSwitch" checked>
                  <label class="custom-control-label" for="activeSwitch">Regla Activa</label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="saveRule">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ejecutar Planificador -->
    <div class="modal fade" id="plannerModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ejecutar Planificador de Abastecimiento</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-info">
              <i class="fas fa-info-circle"></i>
              El planificador analizará el stock actual y generará sugerencias de órdenes de compra
              basadas en las reglas de abastecimiento configuradas.
            </div>
            
            <form id="plannerForm">
              <div class="form-group">
                <label>Horizonte de Planificación</label>
                <select class="form-control" required>
                  <option value="7">7 días</option>
                  <option value="15">15 días</option>
                  <option value="30" selected>30 días</option>
                  <option value="60">60 días</option>
                </select>
              </div>
              <div class="form-group">
                <label>Categorías a Incluir</label>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="catA" checked>
                  <label class="custom-control-label" for="catA">Categoría A</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="catB" checked>
                  <label class="custom-control-label" for="catB">Categoría B</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="catC" checked>
                  <label class="custom-control-label" for="catC">Categoría C</label>
                </div>
              </div>
              <div class="form-group">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="autoApprove">
                  <label class="custom-control-label" for="autoApprove">
                    Aprobar automáticamente órdenes sugeridas
                  </label>
                </div>
              </div>
            </form>

            <div class="progress d-none mb-3" id="plannerProgress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" 
                   role="progressbar" style="width: 0%"></div>
            </div>

            <div class="alert alert-success d-none" id="plannerResult">
              <h6 class="alert-heading">Resultados del Análisis:</h6>
              <ul class="mb-0">
                <li>Productos analizados: <span id="analyzedCount">0</span></li>
                <li>Órdenes sugeridas: <span id="suggestedCount">0</span></li>
                <li>Valor total estimado: <span id="totalValue">$0</span></li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="runPlanner">
              <i class="fas fa-play"></i> Ejecutar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insertar el contenido en el contenedor principal
  const appContainer = document.querySelector('#app');
  if (!appContainer) {
    console.error('Error: No se encontró el contenedor #app');
    return;
  }
  appContainer.innerHTML = supplyRulesContent;

  // Inicializar la tabla
  try {
    initializeSupplyRulesTable();
  } catch (error) {
    console.error('Error al inicializar la tabla:', error);
  }
  
  // Inicializar eventos
  initializeSupplyRulesEvents();
}

function initializeSupplyRulesTable() {
  const table = $('#supplyRulesTable');
  if (!table.length) {
    console.error('Error: No se encontró la tabla #supplyRulesTable');
    return;
  }

  table.DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
    },
    order: [[0, 'asc']], // Ordenar por SKU ascendente por defecto
    columnDefs: [
      {
        targets: -1, // Última columna (acciones)
        orderable: false,
        searchable: false
      }
    ]
  });
}

function initializeSupplyRulesEvents() {
  // Eventos para los filtros
  const categoryFilter = document.querySelector('#categoryFilter');
  const statusFilter = document.querySelector('#statusFilter');
  if (categoryFilter && statusFilter) {
    categoryFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
  }

  // Evento para guardar nueva regla
  const saveRuleBtn = document.querySelector('#saveRule');
  if (saveRuleBtn) {
    saveRuleBtn.addEventListener('click', function() {
      const form = document.querySelector('#newRuleForm');
      if (!form) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Aquí iría la lógica para guardar la regla
      alert('Regla de abastecimiento guardada correctamente');
      $('#newRuleModal').modal('hide');
      
      // Limpiar el formulario
      form.reset();
    });
  }

  // Evento para ejecutar planificador
  const runPlannerBtn = document.querySelector('#runPlannerBtn');
  if (runPlannerBtn) {
    runPlannerBtn.addEventListener('click', function() {
      $('#plannerModal').modal('show');
    });
  }

  // Evento para iniciar la ejecución del planificador
  const runPlanner = document.querySelector('#runPlanner');
  if (runPlanner) {
    runPlanner.addEventListener('click', function() {
      const progress = document.querySelector('#plannerProgress');
      const result = document.querySelector('#plannerResult');
      const progressBar = progress.querySelector('.progress-bar');
      
      // Mostrar barra de progreso
      progress.classList.remove('d-none');
      result.classList.add('d-none');
      
      // Simular progreso
      let width = 0;
      const interval = setInterval(() => {
        width += 10;
        progressBar.style.width = width + '%';
        
        if (width >= 100) {
          clearInterval(interval);
          
          // Mostrar resultados
          document.querySelector('#analyzedCount').textContent = '128';
          document.querySelector('#suggestedCount').textContent = '12';
          document.querySelector('#totalValue').textContent = '$45,750';
          result.classList.remove('d-none');
          
          // Habilitar botón de ejecutar
          runPlanner.disabled = false;
        }
      }, 200);
      
      // Deshabilitar botón mientras se ejecuta
      runPlanner.disabled = true;
    });
  }

  // Eventos para los botones de acción en la tabla
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;

    const row = target.closest('tr');
    if (!row) return;

    if (target.classList.contains('btn-info')) {
      // Ver detalles
      alert('Ver detalles de la regla');
    } else if (target.classList.contains('btn-primary')) {
      // Editar
      alert('Editar regla');
    } else if (target.classList.contains('btn-warning') || target.classList.contains('btn-success')) {
      // Cambiar estado
      const isActive = target.classList.contains('btn-warning');
      const newStatus = isActive ? 'inactivo' : 'activo';
      const statusCell = row.querySelector('td:nth-child(7)');
      
      if (statusCell) {
        statusCell.innerHTML = `<span class="badge badge-${isActive ? 'secondary' : 'success'}">${newStatus}</span>`;
        target.classList.toggle('btn-warning');
        target.classList.toggle('btn-success');
        target.title = isActive ? 'Activar' : 'Desactivar';
      }
    }
  });

  // Evento para limpiar modales al cerrarlos
  $('.modal').on('hidden.bs.modal', function() {
    const form = this.querySelector('form');
    if (form) form.reset();
    
    const progress = this.querySelector('#plannerProgress');
    if (progress) progress.classList.add('d-none');
    
    const result = this.querySelector('#plannerResult');
    if (result) result.classList.add('d-none');
  });
}

function applyFilters() {
  const table = $('#supplyRulesTable').DataTable();
  const categoryValue = document.querySelector('#categoryFilter').value;
  const statusValue = document.querySelector('#statusFilter').value;

  // Aplicar filtros
  table.columns(1).search(categoryValue).draw(); // Categoría
  table.columns(6).search(statusValue).draw(); // Estado
} 