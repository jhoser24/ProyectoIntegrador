export function initializePicking() {
  const pickingContent = `
    ${getCurrentContent()}

    <!-- Modal Nueva Operación -->
    <div class="modal fade" id="newPickingModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nueva Operación de Picking</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="newPickingForm">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Orden de Referencia</label>
                    <select class="form-control" id="orderReference" required>
                      <option value="">Seleccione orden...</option>
                      <option value="ORD-001">ORD-001 - Cliente A</option>
                      <option value="ORD-002">ORD-002 - Cliente B</option>
                      <option value="ORD-003">ORD-003 - Cliente C</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Operario Asignado</label>
                    <select class="form-control" id="assignedOperator" required>
                      <option value="">Seleccione operario...</option>
                      <option value="OP001">Juan Pérez</option>
                      <option value="OP002">María García</option>
                      <option value="OP003">Carlos López</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- Productos a Pickear -->
              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <span>Productos a Pickear</span>
                  <button type="button" class="btn btn-sm btn-primary" id="addPickingLine">
                    <i class="fas fa-plus"></i> Agregar Producto
                  </button>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table" id="pickingLinesTable">
                      <thead>
                        <tr>
                          <th>SKU</th>
                          <th>Cantidad</th>
                          <th>Ubicación Origen</th>
                          <th>Ubicación Destino</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Las líneas se agregarán dinámicamente -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Notas -->
              <div class="form-group">
                <label>Notas</label>
                <textarea class="form-control" rows="2" placeholder="Instrucciones especiales..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="createPicking">Crear Operación</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Picking por Lotes -->
    <div class="modal fade" id="batchPickingModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Picking por Lotes</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="batchPickingForm">
              <div class="form-group">
                <label>Zona de Picking</label>
                <select class="form-control" required>
                  <option value="">Seleccione zona...</option>
                  <option value="zona_a">Zona A</option>
                  <option value="zona_b">Zona B</option>
                  <option value="zona_c">Zona C</option>
                </select>
              </div>
              <div class="form-group">
                <label>Operario</label>
                <select class="form-control" required>
                  <option value="">Seleccione operario...</option>
                  <option value="OP001">Juan Pérez</option>
                  <option value="OP002">María García</option>
                  <option value="OP003">Carlos López</option>
                </select>
              </div>
              <div class="form-group">
                <label>Cantidad de Órdenes</label>
                <input type="number" class="form-control" min="1" max="10" value="5">
                <small class="form-text text-muted">Máximo 10 órdenes por lote</small>
              </div>
              <div class="form-group">
                <label>Prioridad Mínima</label>
                <select class="form-control">
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="createBatchPicking">Crear Lote</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ver Detalles -->
    <div class="modal fade" id="viewDetailsModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles de Operación</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Información General -->
            <div class="card mb-3">
              <div class="card-header">
                <h6 class="m-0 font-weight-bold text-primary">Información General</h6>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <p><strong>ID Operación:</strong> <span id="viewOpId"></span></p>
                    <p><strong>Estado:</strong> <span id="viewStatus"></span></p>
                    <p><strong>Fecha Creación:</strong> <span id="viewCreatedAt"></span></p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Operario:</strong> <span id="viewOperator"></span></p>
                    <p><strong>Orden Ref:</strong> <span id="viewOrderRef"></span></p>
                    <p><strong>Tiempo Estimado:</strong> <span id="viewEstTime"></span></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Historial de Movimientos -->
            <div class="card">
              <div class="card-header">
                <h6 class="m-0 font-weight-bold text-primary">Historial de Movimientos</h6>
              </div>
              <div class="card-body">
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-marker bg-primary"></div>
                    <div class="timeline-content">
                      <h6 class="timeline-title">Operación Creada</h6>
                      <p class="timeline-text">20/02/2024 10:30 - Sistema</p>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker bg-info"></div>
                    <div class="timeline-content">
                      <h6 class="timeline-title">Picking Iniciado</h6>
                      <p class="timeline-text">20/02/2024 10:35 - Juan Pérez</p>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker bg-warning"></div>
                    <div class="timeline-content">
                      <h6 class="timeline-title">Discrepancia Detectada</h6>
                      <p class="timeline-text">20/02/2024 10:40 - Sistema</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="printDetails">
              <i class="fas fa-print"></i> Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar Operación -->
    <div class="modal fade" id="editPickingModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Operación de Picking</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="editPickingForm">
              <!-- Aquí se llenará dinámicamente el formulario de edición -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="saveEditPicking">Guardar Cambios</button>
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
  appContainer.innerHTML = pickingContent;

  // Inicializar la tabla
  try {
    initializePickingTable();
  } catch (error) {
    console.error('Error al inicializar la tabla:', error);
  }
  fetchPickingOperations();
  
  // Inicializar eventos
  initializePickingEvents();
}

function initializePickingTable() {
  const table = $('#pickingTable');
  if (!table.length) {
    console.error('Error: No se encontró la tabla #pickingTable');
    return;
  }

  table.DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
    },
    order: [[0, 'desc']], // Ordenar por ID de operación descendente por defecto
    columnDefs: [
      {
        targets: -1, // Última columna (acciones)
        orderable: false,
        searchable: false
      }
    ]
  });
}

function initializePickingEvents() {
  const appContainer = document.querySelector('#app');
  if (!appContainer) return;

  // Delegar eventos SOLO dentro de la vista de picking
  appContainer.addEventListener('click', pickingClickHandler);

  // Eventos para los filtros
  const statusFilter = document.querySelector('#statusFilter');
  const operatorFilter = document.querySelector('#operatorFilter');
  if (statusFilter && operatorFilter) {
    statusFilter.addEventListener('change', applyFilters);
    operatorFilter.addEventListener('change', applyFilters);
    // Llenar dinámicamente el combo de operarios
    fetch('http://localhost:8080/api/operarios').then(r=>r.json()).then(ops => {
      operatorFilter.innerHTML = '<option value="">Todos los Operarios</option>' + ops.map(o => `<option value="${o.codigo} - ${o.nombre}">${o.codigo} - ${o.nombre}</option>`).join('');
    });
  }

  // Evento para agregar línea de picking
  const addPickingLineBtn = document.querySelector('#addPickingLine');
  if (addPickingLineBtn) {
    addPickingLineBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const tbody = document.querySelector('#pickingLinesTable tbody');
      if (!tbody) return;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>
          <select class="form-control" required>
            <option value="">Seleccione SKU...</option>
            <option value="SKU001">SKU001 - Producto A</option>
            <option value="SKU002">SKU002 - Producto B</option>
          </select>
        </td>
        <td><input type="number" class="form-control" min="1" required></td>
        <td>
          <select class="form-control" required>
            <option value="">Seleccione ubicación...</option>
            <option value="RACK-A1">RACK-A1</option>
            <option value="RACK-B1">RACK-B1</option>
          </select>
        </td>
        <td>
          <select class="form-control" required>
            <option value="">Seleccione destino...</option>
            <option value="STAGE-01">STAGE-01</option>
            <option value="STAGE-02">STAGE-02</option>
          </select>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm delete-line">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(newRow);
    });
  }

  // Evento para crear nueva operación de picking
  const createPickingBtn = document.querySelector('#createPicking');
  if (createPickingBtn) {
    createPickingBtn.addEventListener('click', async function() {
      const form = document.querySelector('#newPickingForm');
      if (!form) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const idOperacion = 'PICK-' + Math.floor(Math.random() * 10000);
      const estado = 'Pendiente';
      const operarioId = document.getElementById('assignedOperator').value;
      const ordenReferencia = document.getElementById('orderReference').value;
      const tiempoEstimado = '';
      if (!operarioId) {
        alert('Seleccione un operario');
        return;
      }
      // Recoger detalles
      const tbody = document.querySelector('#pickingLinesTable tbody');
      const rows = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];
      if (rows.length === 0) {
        alert('Agrega al menos un producto a pickear');
        return;
      }
      const detalles = rows.map(row => {
        const sku = row.querySelector('select') ? row.querySelector('select').value : '';
        const cantidad = row.querySelector('input[type="number"]') ? parseInt(row.querySelector('input[type="number"]').value, 10) : 0;
        const ubicacionOrigen = row.querySelectorAll('select')[1] ? row.querySelectorAll('select')[1].value : '';
        const ubicacionDestino = row.querySelectorAll('select')[2] ? row.querySelectorAll('select')[2].value : '';
        return { sku, cantidad, ubicacionOrigen, ubicacionDestino };
      });
      const op = {
        idOperacion,
        estado,
        operario: { id: parseInt(operarioId, 10) },
        detalles,
        ordenReferencia,
        tiempoEstimado
      };
      try {
        await createPickingOperation(op);
        $('#newPickingModal').modal('hide');
        form.reset();
        if (tbody) tbody.innerHTML = '';
      } catch (error) {
        alert('Error al registrar operación: ' + error.message);
      }
    });
  }

  // Evento para crear picking por lotes
  const createBatchPickingBtn = document.querySelector('#createBatchPicking');
  if (createBatchPickingBtn) {
    createBatchPickingBtn.addEventListener('click', function() {
      const form = document.querySelector('#batchPickingForm');
      if (!form) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Aquí iría la lógica para crear el lote
      alert('Lote de picking creado correctamente');
      $('#batchPickingModal').modal('hide');
      
      // Limpiar el formulario
      form.reset();
    });
  }

  // Evento para limpiar modales al cerrarlos
  $('.modal').on('hidden.bs.modal', function() {
    const form = this.querySelector('form');
    if (form) form.reset();
    
    const alerts = this.querySelectorAll('.alert');
    alerts.forEach(alert => alert.classList.add('d-none'));
  });
}

function pickingClickHandler(e) {
  // Eliminar línea de picking (en edición de modal)
  if (e.target.closest('.delete-line')) {
    e.target.closest('tr').remove();
    return;
  }
  // Eliminar operación (botón papelera en la tabla)
  if (e.target.closest('.btn-danger')) {
    const row = e.target.closest('tr');
    if (!row) return;
    const idOperacion = row.cells[0].textContent;
    if (!confirm('¿Seguro que deseas eliminar esta operación de picking?')) return;
    // Buscar el ID real en el backend
    fetch('http://localhost:8080/api/picking')
      .then(r => r.json())
      .then(data => {
        const op = data.find(o => o.idOperacion === idOperacion);
        if (op) deletePickingOperation(op.id);
      });
    return;
  }
  // Cambiar a estado Completado (check verde)
  if (e.target.closest('.btn-success')) {
    const row = e.target.closest('tr');
    if (!row) return;
    const idOperacion = row.cells[0].textContent;
    fetch('http://localhost:8080/api/picking')
      .then(r => r.json())
      .then(data => {
        const op = data.find(o => o.idOperacion === idOperacion);
        if (op) {
          op.estado = 'Completado';
          updatePickingOperation(op.id, op);
        }
      });
    return;
  }
  // Ver detalles
  if (e.target.closest('.btn-info')) {
    const viewBtn = e.target.closest('.btn-info');
    const row = viewBtn.closest('tr');
    if (!row) return;
    const opId = row.cells[0].textContent;
    // Buscar la operación en el backend por idOperacion
    fetch('http://localhost:8080/api/picking')
      .then(r => r.json())
      .then(async data => {
        const op = data.find(o => o.idOperacion === opId);
        if (!op) return;
        // Llenar datos generales
        const viewOpId = document.querySelector('#viewOpId');
        const viewStatus = document.querySelector('#viewStatus');
        const viewCreatedAt = document.querySelector('#viewCreatedAt');
        const viewOperator = document.querySelector('#viewOperator');
        const viewOrderRef = document.querySelector('#viewOrderRef');
        const viewEstTime = document.querySelector('#viewEstTime');
        if (viewOpId) viewOpId.textContent = op.idOperacion;
        if (viewStatus) viewStatus.textContent = op.estado;
        if (viewCreatedAt) viewCreatedAt.textContent = op.fechaCreacion || '-';
        if (viewOperator) viewOperator.textContent = op.operario ? (op.operario.codigo + ' - ' + op.operario.nombre) : '';
        if (viewOrderRef) viewOrderRef.textContent = op.ordenReferencia || '';
        if (viewEstTime) viewEstTime.textContent = op.tiempoEstimado || '';
        // Mostrar detalles de productos
        const detallesHtml = (op.detalles && op.detalles.length > 0)
          ? `<div class='table-responsive'><table class='table table-bordered table-sm'><thead><tr><th>SKU</th><th>Cantidad</th><th>Ubicación Origen</th><th>Ubicación Destino</th></tr></thead><tbody>` +
            op.detalles.map(d => `<tr><td>${d.sku ? d.sku : 'Sin SKU'}</td><td>${d.cantidad != null ? d.cantidad : 'Sin cantidad'}</td><td>${d.ubicacionOrigen ? d.ubicacionOrigen : 'Sin origen'}</td><td>${d.ubicacionDestino ? d.ubicacionDestino : 'Sin destino'}</td></tr>`).join('') +
            `</tbody></table></div>`
          : '<div class="text-muted">Sin productos registrados.</div>';
        // Insertar tabla de detalles en el modal
        const modalBody = document.querySelector('#viewDetailsModal .modal-body');
        if (modalBody) {
          // Mantener la info general y agregar los detalles debajo
          const infoGeneral = modalBody.querySelector('.card.mb-3');
          if (infoGeneral) {
            // Eliminar tabla anterior si existe
            const oldTable = modalBody.querySelector('.table-responsive');
            if (oldTable) oldTable.remove();
            infoGeneral.insertAdjacentHTML('afterend', detallesHtml);
          }
        }
        // --- Cargar historial de movimientos dinámico ---
        let movimientos = [];
        try {
          const movRes = await fetch(`http://localhost:8080/api/movimientos-picking/operacion/${op.id}`);
          if (movRes.ok) movimientos = await movRes.json();
        } catch {}
        // Renderizar historial
        const historialHtml = movimientos.length > 0
          ? `<div class="card"><div class="card-header"><h6 class="m-0 font-weight-bold text-primary">Historial de Movimientos</h6></div><div class="card-body"><ul class="list-unstyled mb-0">` +
            movimientos.map(mov => `<li class="mb-2"><strong>${mov.tipo || ''}</strong><br>${mov.fechaHora ? mov.fechaHora.replace('T', ' ').replace('Z','').replace('.000','') : ''} - ${mov.descripcion || ''}</li>`).join('') +
            `</ul></div></div>`
          : `<div class="card"><div class="card-header"><h6 class="m-0 font-weight-bold text-primary">Historial de Movimientos</h6></div><div class="card-body text-muted">Sin movimientos registrados.</div></div>`;
        // Reemplazar el historial en el modal
        const cards = modalBody ? modalBody.querySelectorAll('.card') : [];
        if (cards.length > 1) cards[1].outerHTML = historialHtml;
        $('#viewDetailsModal').modal('show');
      });
    return;
  }
  // Eliminar línea en edición, si existiera
  if (e.target.closest('.delete-edit-line')) {
    e.target.closest('tr').remove();
    return;
  }
}

function applyFilters() {
  const table = $('#pickingTable').DataTable();
  const statusValue = document.querySelector('#statusFilter').value || '';
  const operatorValue = document.querySelector('#operatorFilter').value || '';
  table.column(3).search(statusValue, true, false);
  table.column(2).search(operatorValue, true, false);
  table.draw();
}

// Función auxiliar para obtener el contenido actual
function getCurrentContent() {
  return `
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Picking con Código de Barras</h1>
        <div>
          <button class="btn btn-primary mr-2" data-toggle="modal" data-target="#newPickingModal">
            <i class="fas fa-barcode"></i> Nueva Operación
          </button>
          <button class="btn btn-success" data-toggle="modal" data-target="#batchPickingModal">
            <i class="fas fa-boxes"></i> Picking por Lotes
          </button>
        </div>
      </div>

      <!-- KPIs de Picking -->
      <div class="row mb-4">
        <div class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-2 px-2">
                    Operaciones Pendientes</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">15</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
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
                    Precisión de Picking</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">99.2%</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-check-double fa-2x text-gray-300"></i>
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
                    Tiempo Promedio</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">5 min</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-clock fa-2x text-gray-300"></i>
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
                    Con Discrepancias</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">2</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-exclamation-circle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros y Búsqueda -->
      <div class="card shadow mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <select class="form-control" id="statusFilter">
                <option value="">Todos los Estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
                <option value="Con Discrepancias">Con Discrepancias</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-control" id="operatorFilter">
                <option value="">Todos los Operarios</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Buscar por SKU o Ubicación...">
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

      <!-- Tabla de Operaciones -->
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Operaciones de Picking</h6>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-primary" id="printPickingBtn">
              <i class="fas fa-print"></i> Imprimir
            </button>
            <button class="btn btn-sm btn-outline-success" id="exportPickingBtn">
              <i class="fas fa-file-excel"></i> Exportar
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="pickingTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>ID Operación</th>
                  <th>Productos</th>
                  <th>Operario</th>
                  <th>Estado</th>
                  <th>Orden de Referencia</th>
                  <th>Tiempo Estimado</th>
                  <th>Fecha de Creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <!-- Las filas se llenarán dinámicamente -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Escaneo -->
    <div class="modal fade" id="scanModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Escanear Código de Barras</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Ubicación Origen</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" id="locationScan" placeholder="Escanee la ubicación...">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    <i class="fas fa-camera"></i>
                  </button>
                </div>
              </div>
              <div id="locationFeedback" class="valid-feedback">
                Ubicación correcta
              </div>
            </div>
            <div class="form-group">
              <label>SKU</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" id="skuScan" placeholder="Escanee el SKU...">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    <i class="fas fa-camera"></i>
                  </button>
                </div>
              </div>
              <div id="skuFeedback" class="valid-feedback">
                SKU correcto
              </div>
            </div>
            <div class="form-group">
              <label>Cantidad</label>
              <input type="number" class="form-control" id="quantityScan" min="1">
            </div>
            <div class="alert alert-warning d-none" id="discrepancyAlert" role="alert">
              <i class="fas fa-exclamation-triangle"></i>
              ¡Atención! Se ha detectado una discrepancia.
              <ul class="mb-0">
                <li>Cantidad esperada: <span id="expectedQuantity">10</span></li>
                <li>Cantidad escaneada: <span id="scannedQuantity">8</span></li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="confirmScan">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- FUNCIONES DE INTEGRACIÓN BACKEND ---

// Cargar operaciones de picking y llenar la tabla
async function fetchPickingOperations() {
  const table = $('#pickingTable').DataTable();
  table.clear();
  try {
    const response = await fetch('http://localhost:8080/api/picking');
    if (!response.ok) throw new Error('Error al obtener operaciones');
    const data = await response.json();
    data.forEach(op => {
      const isCompletado = (op.estado || '').toLowerCase() === 'completado';
      const detallesStr = (op.detalles && op.detalles.length > 0)
        ? op.detalles.map(d => `${d.sku ? d.sku : 'Sin SKU'} (${d.cantidad != null ? d.cantidad : 'Sin cantidad'})`).join('<br>')
        : 'Sin detalles';
      table.row.add([
        op.idOperacion,
        detallesStr,
        op.operario ? (op.operario.codigo + ' - ' + op.operario.nombre) : '',
        renderPickingStatusBadge(op.estado),
        op.ordenReferencia || '',
        op.tiempoEstimado || '',
        op.fechaCreacion ? (op.fechaCreacion.replace('T', ' ').substring(0, 16)) : '',
        `
          <button class="btn btn-sm btn-primary" title="Escanear" data-toggle="modal" data-target="#scanModal">
            <i class="fas fa-barcode"></i>
          </button>
          <button class="btn btn-sm btn-info" title="Ver detalles">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-warning" title="Editar" data-toggle="modal" data-target="#editPickingModal">
            <i class="fas fa-edit"></i>
          </button>
          ${!isCompletado ? `<button class="btn btn-sm btn-success" title="Aplicar"><i class="fas fa-check"></i></button>` : ''}
          ${!isCompletado ? `<button class="btn btn-sm btn-danger" title="Eliminar"><i class="fas fa-trash"></i></button>` : ''}
        `
      ]);
    });
    table.draw(false);
    fetchPickingKpis();
  } catch (error) {
    table.clear().draw();
    fetchPickingKpis();
  }
}

// Renderizar badge de estado
function renderPickingStatusBadge(estado) {
  switch ((estado || '').toLowerCase()) {
    case 'pendiente':
      return '<span class="badge badge-warning">Pendiente</span>';
    case 'en proceso':
      return '<span class="badge badge-info">En Proceso</span>';
    case 'completado':
      return '<span class="badge badge-success">Completado</span>';
    case 'con discrepancias':
      return '<span class="badge badge-danger">Con Discrepancias</span>';
    default:
      return `<span class="badge badge-secondary">${estado}</span>`;
  }
}

// KPIs de picking
async function fetchPickingKpis() {
  try {
    const response = await fetch('http://localhost:8080/api/picking/kpis');
    if (!response.ok) throw new Error('Error al obtener KPIs');
    const kpis = await response.json();
    const pendientes = document.querySelector('.card .h5.mb-0.font-weight-bold.text-gray-800.px-2');
    const precision = document.querySelectorAll('.card .h5.mb-0.font-weight-bold.text-gray-800.px-2')[1];
    const tiempo = document.querySelectorAll('.card .h5.mb-0.font-weight-bold.text-gray-800.px-2')[2];
    const discrepancias = document.querySelectorAll('.card .h5.mb-0.font-weight-bold.text-gray-800.px-2')[3];
    if (pendientes) pendientes.textContent = kpis.operacionesPendientes;
    if (precision) precision.textContent = kpis.precisionPicking + '%';
    if (tiempo) tiempo.textContent = kpis.tiempoPromedio + ' min';
    if (discrepancias) discrepancias.textContent = kpis.operacionesConDiscrepancias;
  } catch (error) {
    // Silenciar error
  }
}

// Crear operación de picking
async function createPickingOperation(op) {
  const response = await fetch('http://localhost:8080/api/picking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(op)
  });
  if (!response.ok) throw new Error('Error al crear operación');
  await fetchPickingOperations();
}

// Actualizar operación de picking
async function updatePickingOperation(id, op) {
  const response = await fetch(`http://localhost:8080/api/picking/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(op)
  });
  if (!response.ok) throw new Error('Error al actualizar operación');
  await fetchPickingOperations();
}

// Eliminar operación de picking
async function deletePickingOperation(id) {
  const response = await fetch(`http://localhost:8080/api/picking/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar operación');
  await fetchPickingOperations();
}

// --- CARGA DINÁMICA DE COMBOS EN MODAL DE PICKING ---

// Llenar combo de Orden de Referencia al abrir el modal
$(document).on('show.bs.modal', '#newPickingModal', async function() {
  const orderSelect = document.getElementById('orderReference');
  if (!orderSelect) return;
  orderSelect.innerHTML = '<option value="">Seleccione orden...</option>';
  try {
    const res = await fetch('http://localhost:8080/api/entradas-compra/validadas');
    const data = await res.json();
    data.forEach(e => {
      orderSelect.innerHTML += `<option value="${e.ocOrigen}">${e.ocOrigen} - ${e.proveedor}</option>`;
    });
  } catch {}
});

// Llenar combo de SKU según la orden seleccionada
$(document).on('change', '#orderReference', async function() {
  const oc = this.value;
  const tbody = document.querySelector('#pickingLinesTable tbody');
  if (!tbody) return;
  const rows = tbody.querySelectorAll('tr');
  if (!oc) {
    rows.forEach(row => {
      const skuSelect = row.querySelector('select');
      if (skuSelect) skuSelect.innerHTML = '<option value="">Seleccione SKU...</option>';
    });
    return;
  }
  try {
    const res = await fetch(`http://localhost:8080/api/entradas-compra/skus/${encodeURIComponent(oc)}`);
    const skus = await res.json();
    rows.forEach(row => {
      const skuSelect = row.querySelector('select');
      if (skuSelect) {
        skuSelect.innerHTML = '<option value="">Seleccione SKU...</option>' + skus.map(skuObj => `<option value="${skuObj.sku}">${skuObj.sku} - ${skuObj.descripcion}</option>`).join('');
      }
    });
  } catch {}
});

// Al agregar línea de producto, si ya hay orden seleccionada, cargar SKUs
$(document).on('click', '#addPickingLine', async function() {
  const orderSelect = document.getElementById('orderReference');
  const oc = orderSelect ? orderSelect.value : '';
  setTimeout(async () => {
    if (oc) {
      const tbody = document.querySelector('#pickingLinesTable tbody');
      const lastRow = tbody ? tbody.lastElementChild : null;
      if (lastRow) {
        try {
          const res = await fetch(`http://localhost:8080/api/entradas-compra/skus/${encodeURIComponent(oc)}`);
          const skus = await res.json();
          const skuSelect = lastRow.querySelector('select');
          if (skuSelect) {
            skuSelect.innerHTML = '<option value="">Seleccione SKU...</option>' + skus.map(skuObj => `<option value="${skuObj.sku}">${skuObj.sku} - ${skuObj.descripcion}</option>`).join('');
          }
        } catch {}
      }
    }
  }, 100);
});

// Llenar combo de operarios al abrir el modal
$(document).on('show.bs.modal', '#newPickingModal', async function() {
  const operatorSelect = document.getElementById('assignedOperator');
  if (!operatorSelect) return;
  operatorSelect.innerHTML = '<option value="">Seleccione operario...</option>';
  try {
    const res = await fetch('http://localhost:8080/api/operarios');
    const data = await res.json();
    data.forEach(o => {
      operatorSelect.innerHTML += `<option value="${o.id}">${o.codigo} - ${o.nombre}</option>`;
    });
  } catch {}
});

// Agregar estructura básica del modal de edición al HTML principal si no existe
if (!document.getElementById('editPickingModal')) {
  const editModal = document.createElement('div');
  editModal.innerHTML = `
    <div class="modal fade" id="editPickingModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Operación de Picking</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="editPickingForm">
              <!-- Aquí se llenará dinámicamente el formulario de edición -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="saveEditPicking">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(editModal);
}

// --- LÓGICA DE EDICIÓN DE PICKING ---
$(document).on('click', '.btn-warning[title="Editar"]', async function() {
  const row = $(this).closest('tr')[0];
  if (!row) return;
  const opId = row.cells[0].textContent;
  // Buscar la operación en el backend por idOperacion
  const data = await fetch('http://localhost:8080/api/picking').then(r=>r.json());
  const op = data.find(o => o.idOperacion === opId);
  if (!op) return;
  // Obtener órdenes de referencia y operarios
  const ordenes = await fetch('http://localhost:8080/api/entradas-compra/validadas').then(r=>r.json());
  const operarios = await fetch('http://localhost:8080/api/operarios').then(r=>r.json());
  // Cabecera
  let formHtml = `<div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label>Orden de Referencia</label>
        <select class="form-control" id="editOrderReference" required>
          <option value="">Seleccione orden...</option>
          ${ordenes.map(e => `<option value="${e.ocOrigen}" ${op.ordenReferencia===e.ocOrigen?'selected':''}>${e.ocOrigen} - ${e.proveedor}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label>Operario Asignado</label>
        <select class="form-control" id="editAssignedOperator" required>
          <option value="">Seleccione operario...</option>
          ${operarios.map(o => `<option value="${o.id}" ${op.operario && o.id===op.operario.id?'selected':''}>${o.codigo} - ${o.nombre}</option>`).join('')}
        </select>
      </div>
    </div>
  </div>`;
  // Detalles (se llenan después)
  formHtml += `<div class="card mb-3">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>Productos a Pickear</span>
      <button type="button" class="btn btn-sm btn-primary" id="addEditPickingLine">
        <i class="fas fa-plus"></i> Agregar Producto
      </button>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table" id="editPickingLinesTable">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Cantidad</th>
              <th>Ubicación Origen</th>
              <th>Ubicación Destino</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>`;
  // Estado y tiempo estimado
  formHtml += `<div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label>Estado</label>
        <select class="form-control" id="editEstado" required>
          <option value="Pendiente" ${op.estado==='Pendiente'?'selected':''}>Pendiente</option>
          <option value="En Proceso" ${op.estado==='En Proceso'?'selected':''}>En Proceso</option>
          <option value="Completado" ${op.estado==='Completado'?'selected':''}>Completado</option>
          <option value="Con Discrepancias" ${op.estado==='Con Discrepancias'?'selected':''}>Con Discrepancias</option>
        </select>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label>Tiempo Estimado</label>
        <input type="text" class="form-control" id="editTiempoEstimado" value="${op.tiempoEstimado||''}" readonly>
      </div>
    </div>
  </div>`;
  $('#editPickingForm').html(formHtml);
  // Llenar detalles con selects dependientes
  async function fillEditLines(oc) {
    const tbody = document.querySelector('#editPickingLinesTable tbody');
    tbody.innerHTML = '';
    let skus = [];
    if (oc) {
      skus = await fetch(`http://localhost:8080/api/entradas-compra/skus/${encodeURIComponent(oc)}`).then(r=>r.json());
    }
    // Valores fijos de ubicaciones
    const ubicacionesOrigen = ["RACK-A1", "RACK-B1"];
    const ubicacionesDestino = ["STAGE-01", "STAGE-02"];
    // Si hay detalles en la operación, mostrarlos, si no, una fila vacía
    if (op.detalles && op.detalles.length > 0) {
      op.detalles.forEach(det => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><select class="form-control" required><option value="">Seleccione SKU...</option>${skus.map(skuObj => `<option value="${skuObj.sku}" ${det.sku===skuObj.sku?'selected':''}>${skuObj.sku} - ${skuObj.descripcion}</option>`).join('')}</select></td>
          <td><input type="number" class="form-control" min="1" value="${det.cantidad||''}" required></td>
          <td><select class="form-control" required><option value="">Seleccione ubicación origen...</option>${ubicacionesOrigen.map(u => `<option value="${u}" ${det.ubicacionOrigen===u?'selected':''}>${u}</option>`).join('')}</select></td>
          <td><select class="form-control" required><option value="">Seleccione ubicación destino...</option>${ubicacionesDestino.map(u => `<option value="${u}" ${det.ubicacionDestino===u?'selected':''}>${u}</option>`).join('')}</select></td>
          <td><button type="button" class="btn btn-danger btn-sm delete-edit-line"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><select class="form-control" required><option value="">Seleccione SKU...</option>${skus.map(skuObj => `<option value="${skuObj.sku}">${skuObj.sku} - ${skuObj.descripcion}</option>`).join('')}</select></td>
        <td><input type="number" class="form-control" min="1" required></td>
        <td><select class="form-control" required><option value="">Seleccione ubicación origen...</option>${ubicacionesOrigen.map(u => `<option value="${u}">${u}</option>`).join('')}</select></td>
        <td><select class="form-control" required><option value="">Seleccione ubicación destino...</option>${ubicacionesDestino.map(u => `<option value="${u}">${u}</option>`).join('')}</select></td>
        <td><button type="button" class="btn btn-danger btn-sm delete-edit-line"><i class="fas fa-trash"></i></button></td>
      `;
      tbody.appendChild(tr);
    }
  }
  await fillEditLines(op.ordenReferencia);
  // Al cambiar la orden de referencia, recargar los SKUs de los productos
  $('#editOrderReference').off('change').on('change', async function() {
    await fillEditLines(this.value);
  });
  // Evento para agregar línea de producto en edición
  $(document).off('click', '#addEditPickingLine').on('click', '#addEditPickingLine', async function() {
    const oc = document.getElementById('editOrderReference').value;
    let skus = [];
    if (oc) {
      skus = await fetch(`http://localhost:8080/api/entradas-compra/skus/${encodeURIComponent(oc)}`).then(r=>r.json());
    }
    const ubicacionesOrigen = ["RACK-A1", "RACK-B1"];
    const ubicacionesDestino = ["STAGE-01", "STAGE-02"];
    const tbody = document.querySelector('#editPickingLinesTable tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><select class="form-control" required><option value="">Seleccione SKU...</option>${skus.map(skuObj => `<option value="${skuObj.sku}">${skuObj.sku} - ${skuObj.descripcion}</option>`).join('')}</select></td>
      <td><input type="number" class="form-control" min="1" required></td>
      <td><select class="form-control" required><option value="">Seleccione ubicación origen...</option>${ubicacionesOrigen.map(u => `<option value="${u}">${u}</option>`).join('')}</select></td>
      <td><select class="form-control" required><option value="">Seleccione ubicación destino...</option>${ubicacionesDestino.map(u => `<option value="${u}">${u}</option>`).join('')}</select></td>
      <td><button type="button" class="btn btn-danger btn-sm delete-edit-line"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
  });
  // Evento para eliminar línea en edición
  $(document).off('click', '.delete-edit-line').on('click', '.delete-edit-line', function() {
    $(this).closest('tr').remove();
  });
  // Guardar cambios
  $('#saveEditPicking').off('click').on('click', async function() {
    const form = document.getElementById('editPickingForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const ordenReferencia = document.getElementById('editOrderReference').value;
    const operarioId = document.getElementById('editAssignedOperator').value;
    const estado = document.getElementById('editEstado').value;
    // Recoger detalles
    const tbody = document.querySelector('#editPickingLinesTable tbody');
    const rows = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];
    if (rows.length === 0) {
      alert('Agrega al menos un producto a pickear');
      return;
    }
    const detalles = rows.map(row => {
      const sku = row.querySelector('select') ? row.querySelector('select').value : '';
      const cantidad = row.querySelector('input[type="number"]') ? parseInt(row.querySelector('input[type="number"]').value, 10) : 0;
      const ubicacionOrigen = row.querySelectorAll('select')[1] ? row.querySelectorAll('select')[1].value : '';
      const ubicacionDestino = row.querySelectorAll('select')[2] ? row.querySelectorAll('select')[2].value : '';
      return { sku, cantidad, ubicacionOrigen, ubicacionDestino };
    });
    // Calcular tiempo estimado
    const tiempoEstimado = detalles.length > 0 ? (detalles.length * 2) + ' min' : '-';
    // Construir objeto para actualizar
    const actualizada = {
      id: op.id,
      idOperacion: op.idOperacion,
      estado,
      operario: { id: parseInt(operarioId, 10) },
      detalles,
      ordenReferencia,
      tiempoEstimado
    };
    await fetch(`http://localhost:8080/api/picking/${op.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizada)
    });
    $('#editPickingModal').modal('hide');
    $('.modal-backdrop').remove();
    await fetchPickingOperations();
  });
  $('#editPickingModal').modal('show');
});
// --- FIN LÓGICA DE EDICIÓN ---

// --- ARREGLO BOTÓN CANCELAR EN MODAL DE DETALLES ---
$(document).on('click', '#viewDetailsModal .btn-secondary, #viewDetailsModal .close', function() {
  $('#viewDetailsModal').modal('hide');
});

// --- Modal de confirmación de eliminación para Picking ---
function showDeletePickingConfirmationModal(op, onConfirm) {
  // Elimina cualquier modal previo
  const oldModal = document.getElementById('deletePickingConfirmationModal');
  if (oldModal) oldModal.remove();
  const html = `
    <div class="modal fade" id="deletePickingConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="deletePickingConfirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deletePickingConfirmationModalLabel">Confirmar Eliminación</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar la siguiente operación de picking?</p>
            <ul class="list-group mb-3">
              <li class="list-group-item"><strong>ID Operación:</strong> ${op.idOperacion}</li>
              <li class="list-group-item"><strong>Operario:</strong> ${op.operario ? (op.operario.codigo + ' - ' + op.operario.nombre) : ''}</li>
              <li class="list-group-item"><strong>Orden de Referencia:</strong> ${op.ordenReferencia || ''}</li>
              <li class="list-group-item"><strong>Estado:</strong> ${op.estado}</li>
              <li class="list-group-item"><strong>Fecha de Creación:</strong> ${op.fechaCreacion ? op.fechaCreacion.replace('T', ' ').substring(0, 16) : '-'}</li>
            </ul>
            <div class="alert alert-warning mb-0"><i class="fas fa-exclamation-triangle"></i> Esta acción no se puede deshacer.</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="confirmDeletePickingBtn">Eliminar</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  $('#deletePickingConfirmationModal').modal('show');
  document.getElementById('confirmDeletePickingBtn').onclick = () => {
    $('#deletePickingConfirmationModal').modal('hide');
    setTimeout(() => {
      if (onConfirm) onConfirm();
      document.getElementById('deletePickingConfirmationModal').remove();
    }, 300);
  };
  // Cierre seguro
  document.querySelectorAll('#deletePickingConfirmationModal .close, #deletePickingConfirmationModal .btn-secondary').forEach(btn => {
    btn.onclick = () => $('#deletePickingConfirmationModal').modal('hide');
  });
}

// Reemplazar lógica de borrado por modal de confirmación
$(document).off('click', '.btn-danger[title="Eliminar"]').on('click', '.btn-danger[title="Eliminar"]', async function() {
  const row = $(this).closest('tr')[0];
  if (!row) return;
  const idOperacion = row.cells[0].textContent;
  const data = await fetch('http://localhost:8080/api/picking').then(r=>r.json());
  const op = data.find(o => o.idOperacion === idOperacion);
  if (!op) return;
  // Solo mostrar el modal bonito, sin alert ni confirm previos
  showDeletePickingConfirmationModal(op, async () => {
    await fetch(`http://localhost:8080/api/picking/${op.id}`, { method: 'DELETE' });
    await fetchPickingOperations();
  });
});

// --- Ocultar el input de búsqueda nativo de DataTables ---
(function() {
  const style = document.createElement('style');
  style.innerHTML = '.dataTables_filter { display: none !important; }';
  document.head.appendChild(style);
})();

// --- Filtro de búsqueda global robusto y único ---
(function() {
  function connectCustomSearch() {
    const searchInput = document.querySelector('.input-group input[type="text"]');
    const searchBtn = document.querySelector('.input-group-append .btn');
    if (searchInput) {
      const doSearch = function() {
        const table = $('#pickingTable').DataTable();
        table.search(searchInput.value).draw();
      };
      searchInput.removeEventListener('input', doSearch);
      searchInput.removeEventListener('keypress', doSearch);
      searchInput.addEventListener('input', doSearch);
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') doSearch();
      });
      if (searchBtn) {
        searchBtn.onclick = doSearch;
      }
    }
  }
  // Conectar después de inicializar la tabla
  setTimeout(connectCustomSearch, 600);
})();

// --- Botón de imprimir robusto ---
setTimeout(() => {
  const printBtn = document.getElementById('printPickingBtn');
  if (printBtn) {
    printBtn.onclick = function() {
      try {
        const table = $('#pickingTable').DataTable();
        const data = table.rows({ search: 'applied' }).data().toArray();
        const headers = [
          'ID Operación', 'Productos', 'Operario', 'Estado', 'Orden de Referencia', 'Tiempo Estimado', 'Fecha de Creación'
        ];
        let html = '<table border="1" style="border-collapse:collapse;width:100%"><thead><tr>';
        headers.forEach(h => { html += `<th>${h}</th>`; });
        html += '</tr></thead><tbody>';
        if (data.length === 0) {
          html += '<tr><td colspan="7" style="text-align:center">Sin datos para imprimir</td></tr>';
        } else {
          data.forEach(row => {
            html += '<tr>';
            for (let i = 0; i < 7; i++) {
              html += `<td>${i === 3 ? $('<div>' + row[i] + '</div>').text().trim() : row[i]}</td>`;
            }
            html += '</tr>';
          });
        }
        html += '</tbody></table>';
        const win = window.open('', '', 'width=900,height=700');
        win.document.write('<html><head><title>Imprimir Picking</title>');
        win.document.write('<style>body{font-family:sans-serif;}table{font-size:14px;}th,td{padding:6px 10px;}</style>');
        win.document.write('</head><body>');
        win.document.write('<h2>Operaciones de Picking</h2>');
        win.document.write(html);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 500);
      } catch (e) {
        alert('Error al imprimir: ' + e.message);
      }
    };
  }
}, 500);

// En el setTimeout de los botones, usa:
const exportBtn = document.getElementById('exportPickingBtn');
if (exportBtn) {
  exportBtn.onclick = async function() {
    if (!window.XLSX) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      document.head.appendChild(script);
      await new Promise(res => { script.onload = res; });
    }
    const table = $('#pickingTable').DataTable();
    const data = table.rows({ search: 'applied' }).data().toArray();
    const headers = [
      'ID Operación', 'Productos', 'Operario', 'Estado', 'Orden de Referencia', 'Tiempo Estimado', 'Fecha de Creación'
    ];
    const rows = data.map(row => [
      row[0], // ID Operación
      row[1], // Productos
      row[2], // Operario
      $('<div>' + row[3] + '</div>').text().trim(), // Estado
      row[4], // Orden de Referencia
      row[5], // Tiempo Estimado
      row[6]  // Fecha de Creación
    ]);
    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Picking');
    XLSX.writeFile(wb, 'operaciones_picking.xlsx');
  };
} 