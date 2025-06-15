export function initializeReturns() {
  const returnsContent = `
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Gestión de Devoluciones</h1>
        <div>
          <button class="btn btn-primary mr-2" data-toggle="modal" data-target="#newReturnModal">
            <i class="fas fa-plus"></i> Nueva Devolución
          </button>
          <button class="btn btn-success">
            <i class="fas fa-file-excel"></i> Exportar
          </button>
        </div>
      </div>

      <!-- KPIs de Devoluciones -->
      <div class="row mb-4">
        <div class="col-xl-3 col-md-6">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-2 px-2">
                    Devoluciones Pendientes</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">15</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-undo fa-2x text-gray-300"></i>
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
                    Tasa de Aprobación</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">85%</div>
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
                    Tiempo Promedio de Proceso</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">2.5 días</div>
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
                    Costo Total Devoluciones</div>
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

      <!-- Filtros y Búsqueda -->
      <div class="card shadow mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <select class="form-control" id="statusFilter">
                <option value="">Todos los Estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Rechazada</option>
                <option value="procesada">Procesada</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-control" id="reasonFilter">
                <option value="">Todos los Motivos</option>
                <option value="defecto">Defecto de Fábrica</option>
                <option value="daño">Daño en Transporte</option>
                <option value="equivocado">Producto Equivocado</option>
                <option value="insatisfaccion">Insatisfacción</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Buscar por Nº Devolución o Cliente...">
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

      <!-- Tabla de Devoluciones -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Lista de Devoluciones</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="returnsTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Nº Devolución</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DEV001</td>
                  <td>2024-03-15</td>
                  <td>Proveedor A</td>
                  <td>Laptop HP 15"</td>
                  <td>Defecto de Fábrica</td>
                  <td><span class="badge badge-warning text-dark">Pendiente</span></td>
                  <td>$850.00</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-success btn-sm">Aprobar</button>
                  </td>
                </tr>
                <tr>
                  <td>DEV002</td>
                  <td>2024-03-14</td>
                  <td>Proveedor B</td>
                  <td>Monitor Dell 24"</td>
                  <td>Daño en Transporte</td>
                  <td><span class="badge badge-success text-white">Aprobada</span></td>
                  <td>$450.00</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Cancelar</button>
                  </td>
                </tr>
                <tr>
                  <td>DEV003</td>
                  <td>2024-03-13</td>
                  <td>Proveedor C</td>
                  <td>Teclado Mecánico</td>
                  <td>Producto Equivocado</td>
                  <td><span class="badge badge-info text-white">En Proceso</span></td>
                  <td>$210.00</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-success btn-sm">Aprobar</button>
                  </td>
                </tr>
                <tr>
                  <td>DEV004</td>
                  <td>2024-03-12</td>
                  <td>Proveedor A</td>
                  <td>Mouse Inalámbrico</td>
                  <td>Insatisfacción</td>
                  <td><span class="badge badge-danger text-white">Rechazada</span></td>
                  <td>$150.00</td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Cancelar</button>
                  </td>
                </tr>
                <tr>
                  <td>DEV005</td>
                  <td>2024-03-11</td>
                  <td>Proveedor B</td>
                  <td>Impresora HP</td>
                  <td>Defecto de Fábrica</td>
                  <td><span class="badge badge-success text-white">Aprobada</span></td>
                  <td>$1,200.00</td>
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

    <!-- Modal Nueva Devolución -->
    <div class="modal fade" id="newReturnModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nueva Devolución</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="newReturnForm">
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
                    <label>Orden Original</label>
                    <select class="form-control" required>
                      <option value="">Seleccione orden...</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Motivo de Devolución</label>
                    <select class="form-control" required>
                      <option value="">Seleccione motivo...</option>
                      <option value="defecto">Defecto de Fábrica</option>
                      <option value="danado">Dañado en Transporte</option>
                      <option value="equivocado">Producto Equivocado</option>
                      <option value="insatisfecho">Cliente Insatisfecho</option>
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

              <!-- Productos a Devolver -->
              <div class="card mb-3">
                <div class="card-header">
                  Productos a Devolver
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
                          <th>Estado</th>
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
                <label>Descripción del Problema</label>
                <textarea class="form-control" rows="3" required></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Crear RMA</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Inspección de Calidad -->
    <div class="modal fade" id="qualityInspectionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Inspección de Calidad</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="qualityInspectionForm">
              <div class="form-group">
                <label>N° RMA</label>
                <select class="form-control" required>
                  <option value="">Seleccione RMA...</option>
                </select>
              </div>
              <div class="form-group">
                <label>Inspector</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="form-group">
                <label>Resultado</label>
                <select class="form-control" required>
                  <option value="">Seleccione resultado...</option>
                  <option value="aprobado">Aprobado - Reintegrar a Stock</option>
                  <option value="reparacion">Requiere Reparación</option>
                  <option value="descarte">Descarte</option>
                </select>
              </div>
              <div class="form-group">
                <label>Observaciones</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Guardar Inspección</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').innerHTML = returnsContent;
} 