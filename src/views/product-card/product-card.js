export function initializeProductCard() {
  const productCardContent = `
    <div class="container-fluid">
      <!-- Encabezado -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Ficha de Producto</h1>
        <div>
          <button class="btn btn-success mr-2" id="addSerialBtn">
            <i class="fas fa-plus"></i> Registrar Serie
          </button>
          <button class="btn btn-primary" id="saveProductBtn">
            <i class="fas fa-save"></i> Guardar Cambios
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
                    Series Activas</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">24</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-barcode fa-2x text-gray-300"></i>
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
                    Stock Disponible</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">18</div>
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
                    Movimientos Mes</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">45</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-exchange-alt fa-2x text-gray-300"></i>
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
                    Valor Total</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">$12,450</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pestañas -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link active" href="#general" data-toggle="tab">General</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#inventory" data-toggle="tab">Inventario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#accounting" data-toggle="tab">Contabilidad</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#serials" data-toggle="tab">Series</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <!-- Pestaña General -->
            <div class="tab-pane fade show active" id="general">
              <form id="generalForm">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>SKU</label>
                      <input type="text" class="form-control" value="PRD-001" readonly>
                    </div>
                    <div class="form-group">
                      <label>Nombre del Producto</label>
                      <input type="text" class="form-control" value="Laptop ThinkPad X1">
                    </div>
                    <div class="form-group">
                      <label>Categoría</label>
                      <select class="form-control">
                        <option>Electrónicos</option>
                        <option>Computadoras</option>
                        <option>Accesorios</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Descripción</label>
                      <textarea class="form-control" rows="3">Laptop empresarial de alto rendimiento</textarea>
                    </div>
                    <div class="form-group">
                      <label>Seguimiento</label>
                      <select class="form-control" id="trackingType">
                        <option value="serial">Por número de serie</option>
                        <option value="batch">Por lote</option>
                        <option value="none">Sin seguimiento</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="activeProduct" checked>
                        <label class="custom-control-label" for="activeProduct">Producto Activo</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <!-- Pestaña Inventario -->
            <div class="tab-pane fade" id="inventory">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Stock Mínimo</label>
                    <input type="number" class="form-control" value="5">
                  </div>
                  <div class="form-group">
                    <label>Stock Máximo</label>
                    <input type="number" class="form-control" value="30">
                  </div>
                  <div class="form-group">
                    <label>Ubicación Principal</label>
                    <select class="form-control">
                      <option>RACK-A1</option>
                      <option>RACK-B2</option>
                      <option>RACK-C3</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Tiempo de Reposición (días)</label>
                    <input type="number" class="form-control" value="7">
                  </div>
                  <div class="form-group">
                    <label>Unidad de Medida</label>
                    <select class="form-control">
                      <option>Unidad</option>
                      <option>Caja</option>
                      <option>Pallet</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Política de Reabastecimiento</label>
                    <select class="form-control">
                      <option>Manual</option>
                      <option>Automático</option>
                      <option>Bajo Demanda</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pestaña Contabilidad -->
            <div class="tab-pane fade" id="accounting">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Precio de Compra</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                      </div>
                      <input type="number" class="form-control" value="850">
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Precio de Venta</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                      </div>
                      <input type="number" class="form-control" value="1200">
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Impuesto</label>
                    <select class="form-control">
                      <option>IVA 16%</option>
                      <option>IVA 0%</option>
                      <option>Exento</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Cuenta Contable</label>
                    <input type="text" class="form-control" value="1150-001">
                  </div>
                  <div class="form-group">
                    <label>Centro de Costo</label>
                    <select class="form-control">
                      <option>Ventas</option>
                      <option>Almacén</option>
                      <option>Distribución</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Método de Costeo</label>
                    <select class="form-control">
                      <option>FIFO</option>
                      <option>LIFO</option>
                      <option>Promedio</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pestaña Series -->
            <div class="tab-pane fade" id="serials">
              <div class="table-responsive">
                <table class="table table-bordered" id="serialsTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Número de Serie</th>
                      <th>Estado</th>
                      <th>Ubicación</th>
                      <th>Fecha Registro</th>
                      <th>Último Movimiento</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>SN001-2024</td>
                      <td><span class="badge badge-success">Disponible</span></td>
                      <td>RACK-A1</td>
                      <td>15/02/2024</td>
                      <td>Entrada de compra</td>
                      <td>
                        <button class="btn btn-sm btn-info" title="Ver historial">
                          <i class="fas fa-history"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" title="Reubicar">
                          <i class="fas fa-map-marker-alt"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>SN002-2024</td>
                      <td><span class="badge badge-warning">En Tránsito</span></td>
                      <td>STAGE-01</td>
                      <td>16/02/2024</td>
                      <td>Picking en proceso</td>
                      <td>
                        <button class="btn btn-sm btn-info" title="Ver historial">
                          <i class="fas fa-history"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" title="Reubicar">
                          <i class="fas fa-map-marker-alt"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>SN003-2024</td>
                      <td><span class="badge badge-danger">Vendido</span></td>
                      <td>--</td>
                      <td>17/02/2024</td>
                      <td>Venta completada</td>
                      <td>
                        <button class="btn btn-sm btn-info" title="Ver historial">
                          <i class="fas fa-history"></i>
                        </button>
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

    <!-- Modal Registrar Serie -->
    <div class="modal fade" id="addSerialModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registrar Nueva Serie</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="serialForm">
              <div class="form-group">
                <label>Número de Serie</label>
                <input type="text" class="form-control" required>
                <small class="form-text text-muted">Escanee o ingrese el número de serie</small>
              </div>
              <div class="form-group">
                <label>Ubicación</label>
                <select class="form-control" required>
                  <option value="">Seleccione ubicación...</option>
                  <option value="RACK-A1">RACK-A1</option>
                  <option value="RACK-B2">RACK-B2</option>
                  <option value="RACK-C3">RACK-C3</option>
                </select>
              </div>
              <div class="form-group">
                <label>Notas</label>
                <textarea class="form-control" rows="2"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="saveSerial">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Historial de Serie -->
    <div class="modal fade" id="historyModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Historial de Serie</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker bg-success"></div>
                <div class="timeline-content">
                  <h6 class="timeline-title">Entrada de Compra</h6>
                  <p class="timeline-text">15/02/2024 10:30 - Recepción inicial</p>
                  <small>Usuario: Juan Pérez</small>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker bg-info"></div>
                <div class="timeline-content">
                  <h6 class="timeline-title">Control de Calidad</h6>
                  <p class="timeline-text">15/02/2024 11:45 - Aprobado</p>
                  <small>Usuario: María García</small>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker bg-warning"></div>
                <div class="timeline-content">
                  <h6 class="timeline-title">Reubicación</h6>
                  <p class="timeline-text">16/02/2024 09:15 - RACK-A1 → STAGE-01</p>
                  <small>Usuario: Carlos López</small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="printHistory">
              <i class="fas fa-print"></i> Imprimir
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
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
  appContainer.innerHTML = productCardContent;

  // Inicializar la tabla
  try {
    initializeSerialsTable();
  } catch (error) {
    console.error('Error al inicializar la tabla:', error);
  }
  
  // Inicializar eventos
  initializeProductCardEvents();
}

function initializeSerialsTable() {
  const table = $('#serialsTable');
  if (!table.length) {
    console.error('Error: No se encontró la tabla #serialsTable');
    return;
  }

  table.DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
    },
    order: [[3, 'desc']], // Ordenar por fecha de registro descendente
    columnDefs: [
      {
        targets: -1, // Última columna (acciones)
        orderable: false,
        searchable: false
      }
    ]
  });
}

function initializeProductCardEvents() {
  // Evento para registrar nueva serie
  const addSerialBtn = document.querySelector('#addSerialBtn');
  if (addSerialBtn) {
    addSerialBtn.addEventListener('click', function() {
      $('#addSerialModal').modal('show');
    });
  }

  // Evento para guardar nueva serie
  const saveSerialBtn = document.querySelector('#saveSerial');
  if (saveSerialBtn) {
    saveSerialBtn.addEventListener('click', function() {
      const form = document.querySelector('#serialForm');
      if (!form) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Aquí iría la lógica para guardar la serie
      alert('Serie registrada correctamente');
      $('#addSerialModal').modal('hide');
      
      // Limpiar el formulario
      form.reset();
    });
  }

  // Evento para guardar cambios del producto
  const saveProductBtn = document.querySelector('#saveProductBtn');
  if (saveProductBtn) {
    saveProductBtn.addEventListener('click', function() {
      // Aquí iría la lógica para guardar los cambios
      alert('Cambios guardados correctamente');
    });
  }

  // Eventos para los botones de acción en la tabla
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;

    if (target.classList.contains('btn-info')) {
      // Ver historial
      $('#historyModal').modal('show');
    } else if (target.classList.contains('btn-warning')) {
      // Reubicar
      alert('Función de reubicación');
    }
  });

  // Evento para el tipo de seguimiento
  const trackingType = document.querySelector('#trackingType');
  if (trackingType) {
    trackingType.addEventListener('change', function() {
      const serialsTab = document.querySelector('a[href="#serials"]');
      if (this.value === 'serial') {
        serialsTab.classList.remove('disabled');
      } else {
        serialsTab.classList.add('disabled');
      }
    });
  }

  // Evento para limpiar modales al cerrarlos
  $('.modal').on('hidden.bs.modal', function() {
    const form = this.querySelector('form');
    if (form) form.reset();
  });
} 