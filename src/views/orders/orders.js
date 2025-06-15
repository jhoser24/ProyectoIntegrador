export function initializeOrders() {
  const ordersContent = `
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Gestión de Órdenes</h1>
        <div>
          <button class="btn btn-primary mr-2" data-toggle="modal" data-target="#newOrderModal">
            <i class="fas fa-plus"></i> Nueva Orden
          </button>
          <button class="btn btn-success" data-toggle="modal" data-target="#batchPickingModal">
            <i class="fas fa-boxes"></i> Picking por Lotes
          </button>
        </div>
      </div>

      <!-- KPIs de Órdenes -->
      <div class="row mb-4">
        <div class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-2 px-2">
                    Órdenes Pendientes</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">42</div>
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

        <div class="col-xl-3 col-md-6">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-info text-uppercase mb-2 px-2">
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
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-warning text-uppercase mb-2 px-2">
                    Órdenes Retrasadas</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">3</div>
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
                <option value="pendiente">Pendiente</option>
                <option value="en_picking">En Picking</option>
                <option value="en_packing">En Packing</option>
                <option value="listo">Listo para Envío</option>
                <option value="enviado">Enviado</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-control" id="priorityFilter">
                <option value="">Todas las Prioridades</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Buscar por Nº Orden o Cliente...">
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

      <!-- Tabla de Órdenes -->
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Lista de Órdenes</h6>
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
            <table class="table table-bordered" id="ordersTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Nº Orden</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ORD001</td>
                  <td>2024-03-15</td>
                  <td>Proveedor A</td>
                  <td>Laptop HP 15"</td>
                  <td>10</td>
                  <td>$8,500.00</td>
                  <td><span class="badge badge-warning text-dark">Pendiente</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Cancelar</button>
                  </td>
                </tr>
                <tr>
                  <td>ORD002</td>
                  <td>2024-03-14</td>
                  <td>Proveedor B</td>
                  <td>Monitor Dell 24"</td>
                  <td>15</td>
                  <td>$4,500.00</td>
                  <td><span class="badge badge-success text-white">Completada</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Cancelar</button>
                  </td>
                </tr>
                <tr>
                  <td>ORD003</td>
                  <td>2024-03-13</td>
                  <td>Proveedor C</td>
                  <td>Teclado Mecánico</td>
                  <td>30</td>
                  <td>$2,100.00</td>
                  <td><span class="badge badge-info text-white">En Proceso</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Cancelar</button>
                  </td>
                </tr>
                <tr>
                  <td>ORD004</td>
                  <td>2024-03-12</td>
                  <td>Proveedor A</td>
                  <td>Mouse Inalámbrico</td>
                  <td>50</td>
                  <td>$1,500.00</td>
                  <td><span class="badge badge-danger text-white">Cancelada</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Cancelar</button>
                  </td>
                </tr>
                <tr>
                  <td>ORD005</td>
                  <td>2024-03-11</td>
                  <td>Proveedor B</td>
                  <td>Impresora HP</td>
                  <td>8</td>
                  <td>$12,000.00</td>
                  <td><span class="badge badge-success text-white">Completada</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Cancelar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nueva Orden -->
    <div class="modal fade" id="newOrderModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nueva Orden</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="newOrderForm">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Cliente</label>
                    <select class="form-control" required>
                      <option value="">Seleccione cliente...</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Prioridad</label>
                    <select class="form-control" required>
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- Productos -->
              <div class="card mb-3">
                <div class="card-header">
                  Productos
                  <button type="button" class="btn btn-sm btn-primary float-right">
                    <i class="fas fa-plus"></i> Agregar Producto
                  </button>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>SKU</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Ubicación</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colspan="5" class="text-center">No hay productos agregados</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Notas -->
              <div class="form-group">
                <label>Notas</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Crear Orden</button>
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
                  <option value="a1">Zona A1</option>
                  <option value="a2">Zona A2</option>
                </select>
              </div>
              <div class="form-group">
                <label>Operario</label>
                <select class="form-control" required>
                  <option value="">Seleccione operario...</option>
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
            <button type="button" class="btn btn-primary">Iniciar Picking</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').innerHTML = ordersContent;
} 