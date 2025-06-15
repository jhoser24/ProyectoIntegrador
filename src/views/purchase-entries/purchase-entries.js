// Insertar modal de edición al cargar el archivo (solo una vez)
if (!document.getElementById('editPurchaseEntryModal')) {
  const editModalHtml = `
  <div class="modal fade" id="editPurchaseEntryModal" tabindex="-1" role="dialog" aria-labelledby="editPurchaseEntryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPurchaseEntryModalLabel">Editar Entrada de Compra</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="editPurchaseEntryForm">
            <div class="form-group">
              <label for="editOrderNumber">Número de Orden de Compra</label>
              <input type="text" class="form-control" id="editOrderNumber" required readonly>
            </div>
            <div class="form-group">
              <label for="editSupplier">Proveedor</label>
              <select class="form-control" id="editSupplier" required>
                <option value="Proveedor A">Proveedor A</option>
                <option value="Proveedor B">Proveedor B</option>
                <option value="Proveedor C">Proveedor C</option>
              </select>
            </div>
            <div class="form-group">
              <label for="editEstado">Estado</label>
              <select class="form-control" id="editEstado" required>
                <option value="Pendiente">Pendiente</option>
                <option value="En Validación">En Validación</option>
                <option value="Validado">Validado</option>
                <option value="Con Discrepancias">Con Discrepancias</option>
              </select>
            </div>
            <div class="form-group">
              <label>Líneas de Producto</label>
              <div class="table-responsive">
                <table class="table table-bordered" id="editProductLinesTable">
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Cantidad</th>
                      <th>Lote/Serie</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Las filas se llenarán dinámicamente -->
                  </tbody>
                </table>
              </div>
              <button type="button" class="btn btn-success btn-sm mt-2" id="editAddProductLine">
                <i class="fas fa-plus"></i> Agregar Línea
              </button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" id="saveEditEntry">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', editModalHtml);
}

export function initializePurchaseEntries() {
  const purchaseEntriesContent = `
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Entrada de Compra</h1>
        <div>
          <button class="btn btn-primary mr-2" data-toggle="modal" data-target="#newPurchaseEntryModal">
            <i class="fas fa-plus"></i> Nueva Entrada
          </button>
          <button class="btn btn-success" data-toggle="modal" data-target="#batchValidationModal">
            <i class="fas fa-boxes"></i> Validación por Lotes
          </button>
        </div>
      </div>

      <!-- KPIs de Entradas -->
      <div class="row mb-4">
        <div class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-2 px-2">
                    Entradas Pendientes</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2" id="kpi-entradas-pendientes">12</div>
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
                    Tiempo Promedio Validación</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2" id="kpi-tiempo-promedio">8 min</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-clock fa-2x text-gray-300"></i>
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
                    Precisión de Recepción</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2" id="kpi-precision-recepcion">98.5%</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-check-double fa-2x text-gray-300"></i>
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
                    Entradas con Discrepancias</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2" id="kpi-entradas-discrepancias">2</div>
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
                <option value="En Validación">En Validación</option>
                <option value="Validado">Validado</option>
                <option value="Con Discrepancias">Con Discrepancias</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-control" id="providerFilter">
                <option value="">Todos los Proveedores</option>
                <option value="Proveedor A">Proveedor A</option>
                <option value="Proveedor B">Proveedor B</option>
                <option value="Proveedor C">Proveedor C</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Buscar por OC o Proveedor...">
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

      <!-- Tabla de Entradas -->
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Entradas de Compra</h6>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-primary" id="printEntriesBtn">
              <i class="fas fa-print"></i> Imprimir
            </button>
            <button class="btn btn-sm btn-outline-success" id="exportEntriesBtn">
              <i class="fas fa-file-excel"></i> Exportar
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="purchaseEntriesTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>OC Origen</th>
                  <th>Proveedor</th>
                  <th>Fecha</th>
                  <th>Total SKUs</th>
                  <th>Estado</th>
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

    <!-- Modal Nueva Entrada -->
    <div class="modal fade" id="newPurchaseEntryModal" tabindex="-1" role="dialog" aria-labelledby="newPurchaseEntryModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newPurchaseEntryModalLabel">Nueva Entrada de Compra</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="purchaseEntryForm">
              <div class="form-group">
                <label for="orderNumber">Número de Orden de Compra</label>
                <input type="text" class="form-control" id="orderNumber" required>
              </div>
              <div class="form-group">
                <label for="supplier">Proveedor</label>
                <select class="form-control" id="supplier" required>
                  <option value="">Seleccione un proveedor</option>
                  <option value="proveedor_a">Proveedor A</option>
                  <option value="proveedor_b">Proveedor B</option>
                  <option value="proveedor_c">Proveedor C</option>
                </select>
              </div>
              <div class="form-group">
                <label>Líneas de Producto</label>
                <div class="table-responsive">
                  <table class="table table-bordered" id="productLinesTable">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Cantidad</th>
                        <th>Lote/Serie</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Las líneas se agregarán dinámicamente -->
                    </tbody>
                  </table>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="addProductLine">
                  <i class="fas fa-plus"></i> Agregar Línea
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="validateEntry">Validar Entrada</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Agregar modal de detalles al HTML principal -->
    <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="detailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="detailsModalLabel">Detalles de Entrada de Compra</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="detailsContent"></div>
          </div>
          <div class="modal-footer">
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
  appContainer.innerHTML = purchaseEntriesContent;

  // Asegurar que el modal de edición esté en el DOM
  if (!document.getElementById('editPurchaseEntryModal')) {
    const editModalHtml = `
      <div class="modal fade" id="editPurchaseEntryModal" tabindex="-1" role="dialog" aria-labelledby="editPurchaseEntryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPurchaseEntryModalLabel">Editar Entrada de Compra</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="editPurchaseEntryForm">
                <div class="form-group">
                  <label for="editOrderNumber">Número de Orden de Compra</label>
                  <input type="text" class="form-control" id="editOrderNumber" required readonly>
                </div>
                <div class="form-group">
                  <label for="editSupplier">Proveedor</label>
                  <select class="form-control" id="editSupplier" required>
                    <option value="Proveedor A">Proveedor A</option>
                    <option value="Proveedor B">Proveedor B</option>
                    <option value="Proveedor C">Proveedor C</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="editEstado">Estado</label>
                  <select class="form-control" id="editEstado" required>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Validación">En Validación</option>
                    <option value="Validado">Validado</option>
                    <option value="Con Discrepancias">Con Discrepancias</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Líneas de Producto</label>
                  <div class="table-responsive">
                    <table class="table table-bordered" id="editProductLinesTable">
                      <thead>
                        <tr>
                          <th>SKU</th>
                          <th>Cantidad</th>
                          <th>Lote/Serie</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- Las filas se llenarán dinámicamente -->
                      </tbody>
                    </table>
                  </div>
                  <button type="button" class="btn btn-success btn-sm mt-2" id="editAddProductLine">
                    <i class="fas fa-plus"></i> Agregar Línea
                  </button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" id="saveEditEntry">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', editModalHtml);
  }

  // Inicializar la tabla primero
  initializePurchaseEntriesTable();
  // Luego cargar los datos
  fetchPurchaseEntries();
  // Inicializar eventos
  initializePurchaseEntriesEvents();
  // Refrescar KPIs al cargar
  fetchKpis();

  // Agregar funcionalidad a los botones de imprimir y exportar
  setTimeout(() => {
    const printBtn = document.getElementById('printEntriesBtn');
    const exportBtn = document.getElementById('exportEntriesBtn');
    if (printBtn) {
      printBtn.onclick = function() {
        const tableHtml = document.getElementById('purchaseEntriesTable').outerHTML;
        const win = window.open('', '', 'width=900,height=700');
        win.document.write('<html><head><title>Imprimir Entradas de Compra</title>');
        win.document.write('<link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">');
        win.document.write('</head><body>');
        win.document.write('<h2>Entradas de Compra</h2>');
        win.document.write(tableHtml);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 500);
      };
    }
    if (exportBtn) {
      exportBtn.onclick = async function() {
        if (!window.XLSX) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
          document.head.appendChild(script);
          await new Promise(res => { script.onload = res; });
        }
        // Usar la API de DataTables para obtener todos los datos filtrados (todas las páginas)
        const table = $('#purchaseEntriesTable').DataTable();
        const data = table.rows({ search: 'applied' }).data().toArray();
        const headers = [
          'OC Origen', 'Proveedor', 'Fecha', 'Total SKUs', 'Estado'
        ];
        const rows = data.map(row => [
          row[0], // OC Origen
          row[1], // Proveedor
          row[2], // Fecha
          row[3], // Total SKUs
          $('<div>' + row[4] + '</div>').text().trim()
        ]);
        const wsData = [headers, ...rows];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Entradas');
        XLSX.writeFile(wb, 'entradas_compra.xlsx');
      };
    }
  }, 500);
}

async function fetchPurchaseEntries() {
  const table = $('#purchaseEntriesTable').DataTable();
  table.clear(); // Limpia la tabla manteniendo la paginación y el filtro

  try {
    const response = await fetch('http://localhost:8080/api/entradas-compra');
    if (!response.ok) throw new Error('Error al obtener datos');
    const data = await response.json();

    if (data.length === 0) {
      table.draw(false);
      return;
    }

    data.forEach(entry => {
      const isValidado = entry.estado && entry.estado.toLowerCase() === 'validado';
      table.row.add([
        entry.ocOrigen,
        entry.proveedor,
        entry.fecha,
        entry.totalSkus,
        renderStatusBadge(entry.estado),
        `
          <button class="btn btn-sm btn-info" title="Ver detalles">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-warning" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          ${!isValidado ? `<button class="btn btn-sm btn-success" title="Validar">
            <i class="fas fa-check"></i>
          </button>` : ''}
          <button class="btn btn-sm btn-danger" title="Rechazar">
            <i class="fas fa-times"></i>
          </button>
        `
      ]);
    });

    table.draw(false); // Redibuja manteniendo la página actual
    fetchKpis();
  } catch (error) {
    table.clear().draw();
    fetchKpis();
  }
}

function renderStatusBadge(estado) {
  switch (estado.toLowerCase()) {
    case 'pendiente':
      return '<span class="badge badge-warning">Pendiente</span>';
    case 'validado':
      return '<span class="badge badge-success">Validado</span>';
    case 'en validación':
      return '<span class="badge badge-info">En Validación</span>';
    case 'con discrepancias':
      return '<span class="badge badge-danger">Con Discrepancias</span>';
    default:
      return `<span class="badge badge-secondary">${estado}</span>`;
  }
}

function initializePurchaseEntriesTable() {
  const table = $('#purchaseEntriesTable');
  if (!table.length) {
    console.error('Error: No se encontró la tabla #purchaseEntriesTable');
    return;
  }

  // Si ya está inicializado, no lo vuelvas a inicializar
  if ($.fn.DataTable.isDataTable('#purchaseEntriesTable')) {
    return;
  }

  $('#purchaseEntriesTable').DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
    },
    order: [[2, 'desc']], // Ordenar por fecha descendente por defecto
    columnDefs: [
      {
        targets: -1, // Última columna (acciones)
        orderable: false,
        searchable: false
      }
    ]
  });
}

function initializePurchaseEntriesEvents() {
  const appContainer = document.querySelector('#app');
  if (!appContainer) return;

  // Delegar eventos SOLO dentro de la vista de entradas
  appContainer.addEventListener('click', purchaseEntriesClickHandler);

  // Delegación de eventos para los botones de acción en el tbody de la tabla
  const tbody = document.querySelector('#purchaseEntriesTable tbody');
  if (tbody) {
    tbody.addEventListener('click', async function(e) {
      const row = e.target.closest('tr');
      if (!row) return;
      const oc = row.children[0].textContent;

      // Ver detalles
      if (e.target.closest('.btn-info')) {
        const data = await fetch('http://localhost:8080/api/entradas-compra').then(r=>r.json());
        const entrada = data.find(e => e.ocOrigen === oc);
        if (!entrada) return alert('No se encontró la entrada');
        renderDetailsModal(entrada);
        return;
      }

      // Editar
      if (e.target.closest('.btn-warning')) {
        // Precargar datos en el modal de edición
        const data = await fetch('http://localhost:8080/api/entradas-compra').then(r=>r.json());
        const entrada = data.find(e => e.ocOrigen === oc);
        if (!entrada) return alert('No se encontró la entrada');
        const orderInput = document.getElementById('editOrderNumber');
        const supplierInput = document.getElementById('editSupplier');
        const estadoInput = document.getElementById('editEstado');
        if (orderInput) orderInput.value = entrada.ocOrigen;
        // Seleccionar el proveedor correcto
        if (supplierInput) {
          Array.from(supplierInput.options).forEach(opt => {
            opt.selected = (opt.value.trim().toLowerCase() === entrada.proveedor.trim().toLowerCase());
          });
        }
        if (estadoInput) {
          Array.from(estadoInput.options).forEach(opt => {
            opt.selected = (opt.value.trim().toLowerCase() === entrada.estado.trim().toLowerCase());
          });
        }
        const tbodyEdit = document.querySelector('#editProductLinesTable tbody');
        if (tbodyEdit) tbodyEdit.innerHTML = '';
        if (entrada.detalles && entrada.detalles.length > 0 && tbodyEdit) {
          if (productosCache.length === 0) await fetchProductos();
          entrada.detalles.forEach(det => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
              <td>${renderSkuSelect(det.sku)}</td>
              <td><input type="number" class="form-control" name="quantity" min="1" value="${det.cantidad || ''}" required></td>
              <td><input type="text" class="form-control" name="lot" value="${det.loteSerie || ''}" required></td>
              <td>
                <button type="button" class="btn btn-danger btn-sm delete-edit-line">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            `;
            tbodyEdit.appendChild(newRow);
          });
        }
        $('#editPurchaseEntryModal').modal('show');
        initializeEditProductLinesEvents();
        // Asegurar que ambos botones cierren el modal
        document.querySelectorAll('#editPurchaseEntryModal .close, #editPurchaseEntryModal .btn-secondary').forEach(btn => {
          btn.onclick = () => $('#editPurchaseEntryModal').modal('hide');
        });
        return;
      }

      // Validar
      if (e.target.closest('.btn-success')) {
        const data = await fetch('http://localhost:8080/api/entradas-compra').then(r=>r.json());
        const entrada = data.find(e => e.ocOrigen === oc);
        if (!entrada) return alert('No se encontró la entrada');
        entrada.estado = 'Validado';
        await fetch(`http://localhost:8080/api/entradas-compra/${entrada.id}`, {
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(entrada)
        });
        await fetchPurchaseEntries();
        return;
      }

      // Rechazar
      if (e.target.closest('.btn-danger')) {
        const data = await fetch('http://localhost:8080/api/entradas-compra').then(r=>r.json());
        const entrada = data.find(e => e.ocOrigen === oc);
        if (!entrada) return alert('No se encontró la entrada');
        showDeleteConfirmationModal(entrada, async () => {
          await fetch(`http://localhost:8080/api/entradas-compra/${entrada.id}`, {method:'DELETE'});
          await fetchPurchaseEntries();
        });
        return;
      }
    });
  }

  // Evento para agregar línea de producto
  const addProductLineBtn = document.querySelector('#addProductLine');
  if (addProductLineBtn) {
    addProductLineBtn.addEventListener('click', async function() {
      const tbody = document.querySelector('#productLinesTable tbody');
      if (!tbody) return;
      if (productosCache.length === 0) await fetchProductos();
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${renderSkuSelect()}</td>
        <td><input type="number" class="form-control" name="quantity" min="1" required></td>
        <td><input type="text" class="form-control" name="lot" required></td>
        <td>
          <button type="button" class="btn btn-danger btn-sm delete-line">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(newRow);
    });
  }

  // Evento para validar entrada (modal de registro)
  const validateEntryBtn = document.querySelector('#validateEntry');
  if (validateEntryBtn) {
    validateEntryBtn.addEventListener('click', async function() {
      const form = document.querySelector('#purchaseEntryForm');
      if (!form) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Obtener datos del formulario
      const ocOrigen = document.getElementById('orderNumber').value;
      let proveedor = document.getElementById('supplier').value;
      if (proveedor.startsWith('proveedor_')) {
        proveedor = 'Proveedor ' + proveedor.charAt(proveedor.length - 1).toUpperCase();
      }
      const fecha = new Date().toISOString().slice(0, 10); // Fecha actual
      const productRows = document.querySelectorAll('#productLinesTable tbody tr');
      const detalles = Array.from(productRows).map(row => {
        const sku = row.querySelector('select.sku-select') ? row.querySelector('select.sku-select').value : '';
        const cantidad = parseInt(row.querySelector('input[name="quantity"]').value, 10);
        const loteSerie = row.querySelector('input[name="lot"]').value;
        return { sku, cantidad, loteSerie };
      });
      const totalSkus = detalles.length;
      const estado = 'Pendiente';
      const nuevaEntrada = {
        ocOrigen,
        proveedor,
        fecha,
        totalSkus,
        estado,
        detalles
      };
      try {
        const response = await fetch('http://localhost:8080/api/entradas-compra', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevaEntrada)
        });
        if (!response.ok) throw new Error('Error al registrar la entrada');
        await fetchPurchaseEntries();
      $('#newPurchaseEntryModal').modal('hide');
      form.reset();
      const tbody = document.querySelector('#productLinesTable tbody');
      if (tbody) tbody.innerHTML = '';
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }

  // Evento para guardar cambios en edición
  const saveBtn = document.getElementById('saveEditEntry');
  if (saveBtn) {
    saveBtn.onclick = async function() {
      const form = document.getElementById('editPurchaseEntryForm');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const ocOrigen = document.getElementById('editOrderNumber').value;
      let proveedor = document.getElementById('editSupplier').value;
      if (proveedor.startsWith('proveedor_')) {
        proveedor = 'Proveedor ' + proveedor.charAt(proveedor.length - 1).toUpperCase();
      }
      const estado = document.getElementById('editEstado').value;
      const productRows = document.querySelectorAll('#editProductLinesTable tbody tr');
      const detalles = Array.from(productRows).map(row => {
        const sku = row.querySelector('select.sku-select') ? row.querySelector('select.sku-select').value : '';
        const cantidad = parseInt(row.querySelector('input[name="quantity"]').value, 10);
        const loteSerie = row.querySelector('input[name="lot"]').value;
        return { sku, cantidad, loteSerie };
      });
      const totalSkus = detalles.length;
      const data = await fetch('http://localhost:8080/api/entradas-compra').then(r=>r.json());
      const entrada = data.find(e => e.ocOrigen === ocOrigen);
      if (!entrada) return alert('No se encontró la entrada');
      const actualizada = {
        id: entrada.id,
        ocOrigen,
        proveedor,
        fecha: entrada.fecha,
        totalSkus,
        estado,
        detalles
      };
      await fetch(`http://localhost:8080/api/entradas-compra/${entrada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actualizada)
      });
      $('#editPurchaseEntryModal').modal('hide');
      await fetchPurchaseEntries();
    };
  }

  // Filtros de estado y proveedor
  const statusFilter = document.querySelector('#statusFilter');
  const providerFilter = document.querySelector('#providerFilter');
  if (statusFilter) statusFilter.addEventListener('change', applyFilters);
  if (providerFilter) providerFilter.addEventListener('change', applyFilters);

  // Filtro de búsqueda personalizada (input de texto)
  const searchInput = document.querySelector('.input-group input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const table = $('#purchaseEntriesTable').DataTable();
      table.search(this.value).draw();
    });
  }

  // Filtros personalizados para DataTables (Estado y Proveedor)
  if (!$.fn.dataTable.ext.search._customFiltersAdded) {
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
      const statusFilter = document.querySelector('#statusFilter');
      const providerFilter = document.querySelector('#providerFilter');
      // Estado
      const selectedStatus = statusFilter ? statusFilter.value : '';
      const estado = $('<div>' + data[4] + '</div>').text().trim(); // Extrae texto plano del badge
      // Proveedor
      const selectedProvider = providerFilter ? providerFilter.value : '';
      const proveedor = data[1].trim();
      // Lógica de filtro
      const statusOk = !selectedStatus || selectedStatus === '' || selectedStatus === estado;
      const providerOk = !selectedProvider || selectedProvider === '' || selectedProvider === proveedor;
      return statusOk && providerOk;
    });
    $.fn.dataTable.ext.search._customFiltersAdded = true;
  }
}

function purchaseEntriesClickHandler(e) {
  // Eliminar línea de producto
  if (e.target.closest('.delete-line')) {
    e.target.closest('tr').remove();
    return;
  }
  // Eliminar línea en edición
  if (e.target.closest('.delete-edit-line')) {
    e.target.closest('tr').remove();
    return;
  }
}

function applyFilters() {
  const table = $('#purchaseEntriesTable').DataTable();
  table.draw();
}

function renderDetailsModal(entrada) {
  let html = `<div class='mb-3'><strong>OC Origen:</strong> ${entrada.ocOrigen}</div>`;
  html += `<div class='mb-3'><strong>Proveedor:</strong> ${entrada.proveedor}</div>`;
  html += `<div class='mb-3'><strong>Fecha:</strong> ${entrada.fecha}</div>`;
  html += `<div class='mb-3'><strong>Total SKUs:</strong> ${entrada.totalSkus}</div>`;
  html += `<div class='mb-3'><strong>Estado:</strong> ${renderStatusBadge(entrada.estado)}</div>`;
  if (entrada.detalles && entrada.detalles.length > 0) {
    html += `<div class='mb-2'><strong>Líneas de Producto:</strong></div>`;
    html += `<div class='table-responsive'><table class='table table-bordered table-sm'><thead><tr><th>SKU</th><th>Cantidad</th><th>Lote/Serie</th></tr></thead><tbody>`;
    entrada.detalles.forEach(det => {
      html += `<tr><td>${det.sku ? det.sku : ''}</td><td>${det.cantidad != null ? det.cantidad : ''}</td><td>${det.loteSerie ? det.loteSerie : ''}</td></tr>`;
    });
    html += `</tbody></table></div>`;
  } else {
    html += `<div class='text-muted'>Sin líneas de producto.</div>`;
  }
  document.getElementById('detailsContent').innerHTML = html;
  // Cierre seguro del modal
  $('#detailsModal').modal('show');
  // Forzar cierre con botón y X
  document.querySelectorAll('#detailsModal .close, #detailsModal .btn-secondary').forEach(btn => {
    btn.onclick = () => $('#detailsModal').modal('hide');
  });
}

// Función para actualizar los KPIs desde el backend
async function fetchKpis() {
  try {
    const response = await fetch('http://localhost:8080/api/entradas-compra/kpis');
    if (!response.ok) throw new Error('Error al obtener KPIs');
    const kpis = await response.json();
    // Actualizar los KPIs en el DOM
    const pendientes = document.querySelector('#kpi-entradas-pendientes');
    const tiempo = document.querySelector('#kpi-tiempo-promedio');
    const precision = document.querySelector('#kpi-precision-recepcion');
    const discrepancias = document.querySelector('#kpi-entradas-discrepancias');
    if (pendientes) pendientes.textContent = kpis.entradasPendientes;
    if (tiempo) tiempo.textContent = kpis.tiempoPromedioValidacion + ' min';
    if (precision) precision.textContent = kpis.precisionRecepcion + '%';
    if (discrepancias) discrepancias.textContent = kpis.entradasConDiscrepancias;
  } catch (error) {
    console.error('Error al actualizar KPIs:', error);
  }
}

// --- Modal de confirmación de eliminación ---
function showDeleteConfirmationModal(entrada, onConfirm) {
  // Elimina cualquier modal previo
  const oldModal = document.getElementById('deleteConfirmationModal');
  if (oldModal) oldModal.remove();
  const html = `
    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirmar Eliminación</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar la siguiente entrada?</p>
            <ul class="list-group mb-3">
              <li class="list-group-item"><strong>OC Origen:</strong> ${entrada.ocOrigen}</li>
              <li class="list-group-item"><strong>Proveedor:</strong> ${entrada.proveedor}</li>
              <li class="list-group-item"><strong>Fecha:</strong> ${entrada.fecha}</li>
              <li class="list-group-item"><strong>Estado:</strong> ${entrada.estado}</li>
            </ul>
            <div class="alert alert-warning mb-0"><i class="fas fa-exclamation-triangle"></i> Esta acción no se puede deshacer.</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Eliminar</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  $('#deleteConfirmationModal').modal('show');
  document.getElementById('confirmDeleteBtn').onclick = () => {
    $('#deleteConfirmationModal').modal('hide');
    setTimeout(() => {
      if (onConfirm) onConfirm();
      document.getElementById('deleteConfirmationModal').remove();
    }, 300);
  };
  // Cierre seguro
  document.querySelectorAll('#deleteConfirmationModal .close, #deleteConfirmationModal .btn-secondary').forEach(btn => {
    btn.onclick = () => $('#deleteConfirmationModal').modal('hide');
  });
}

// Inicializar eventos para agregar y eliminar líneas en el modal de edición
function initializeEditProductLinesEvents() {
  // Agregar línea
  const addLineBtn = document.getElementById('editAddProductLine');
  if (addLineBtn) {
    addLineBtn.onclick = async function() {
      const tbody = document.querySelector('#editProductLinesTable tbody');
      if (!tbody) return;
      if (productosCache.length === 0) await fetchProductos();
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${renderSkuSelect()}</td>
        <td><input type="number" class="form-control" name="quantity" min="1" required></td>
        <td><input type="text" class="form-control" name="lot" required></td>
        <td>
          <button type="button" class="btn btn-danger btn-sm delete-edit-line">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(newRow);
    };
  }
  // Eliminar línea (delegación de eventos)
  const tbody = document.querySelector('#editProductLinesTable tbody');
  if (tbody) {
    tbody.addEventListener('click', function(e) {
      if (e.target.closest('.delete-edit-line')) {
        e.target.closest('tr').remove();
      }
    });
  }
}

// --- Obtener productos para combos SKU ---
let productosCache = [];
async function fetchProductos() {
  if (productosCache.length > 0) return productosCache;
  const res = await fetch('http://localhost:8080/api/productos');
  productosCache = await res.json();
  return productosCache;
}
function renderSkuSelect(selectedSku = '') {
  return `<select class="form-control sku-select" required><option value="">Seleccione SKU...</option>${productosCache.map(p => `<option value="${p.nombre}" ${selectedSku===p.nombre?'selected':''}>${p.nombre} - ${p.descripcion||''}</option>`).join('')}</select>`;
} 