export function initializeInventory() {
  const inventoryContent = `
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Gestión de Inventario</h1>
        <div>
          <button class="btn btn-primary mr-2" data-toggle="modal" data-target="#newProductModal">
            <i class="fas fa-plus"></i> Nuevo Producto
          </button>
          <button class="btn btn-success" data-toggle="modal" data-target="#cycleCountModal">
            <i class="fas fa-clipboard-check"></i> Conteo Cíclico
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
                    Productos Activos</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">234</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-box fa-2x text-gray-300"></i>
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
                    Valor del Inventario</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">$123,456</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                    Productos Bajo Mínimo</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">12</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
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
                    Exactitud de Inventario</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800 px-2">98.5%</div>
                </div>
                <div class="col-auto pr-3">
                  <i class="fas fa-check-circle fa-2x text-gray-300"></i>
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
              <select class="form-control" id="categoryFilter">
                <option value="">Todas las Categorías</option>
                <option value="computadoras">Computadoras</option>
                <option value="perifericos">Periféricos</option>
                <option value="componentes">Componentes</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-control" id="locationFilter">
                <option value="">Todas las Ubicaciones</option>
                <option value="a1">Almacén A1</option>
                <option value="a2">Almacén A2</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Buscar por SKU o nombre...">
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

      <!-- Tabla de Productos -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Lista de Productos</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="productsTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Ubicación</th>
                  <th>Stock Mínimo</th>
                  <th>Stock Máximo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SKU001</td>
                  <td>Laptop HP 15"</td>
                  <td>Electrónica</td>
                  <td>5</td>
                  <td>Almacén A1</td>
                  <td>10</td>
                  <td>50</td>
                  <td><span class="badge badge-danger text-white">Crítico</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>SKU002</td>
                  <td>Monitor Dell 24"</td>
                  <td>Electrónica</td>
                  <td>8</td>
                  <td>Almacén A2</td>
                  <td>15</td>
                  <td>40</td>
                  <td><span class="badge badge-warning text-dark">Bajo</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>SKU003</td>
                  <td>Teclado Mecánico</td>
                  <td>Electrónica</td>
                  <td>25</td>
                  <td>Almacén A1</td>
                  <td>20</td>
                  <td>60</td>
                  <td><span class="badge badge-success text-white">Normal</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>SKU004</td>
                  <td>Mouse Inalámbrico</td>
                  <td>Electrónica</td>
                  <td>45</td>
                  <td>Almacén A2</td>
                  <td>30</td>
                  <td>100</td>
                  <td><span class="badge badge-success text-white">Normal</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>SKU005</td>
                  <td>Impresora HP</td>
                  <td>Electrónica</td>
                  <td>12</td>
                  <td>Almacén A1</td>
                  <td>15</td>
                  <td>35</td>
                  <td><span class="badge badge-warning text-dark">Bajo</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-info btn-sm">Ver</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nuevo Producto -->
    <div class="modal fade" id="newProductModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nuevo Producto</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="newProductForm">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>SKU</label>
                    <input type="text" class="form-control" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" required>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Categoría</label>
                    <select class="form-control" required>
                      <option value="">Seleccione...</option>
                      <option value="electronica">Electrónica</option>
                      <option value="ropa">Ropa</option>
                      <option value="alimentos">Alimentos</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Ubicación</label>
                    <select class="form-control" required>
                      <option value="">Seleccione...</option>
                      <option value="a1">Almacén A1</option>
                      <option value="a2">Almacén A2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Stock Inicial</label>
                    <input type="number" class="form-control" required>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Stock Mínimo</label>
                    <input type="number" class="form-control" required>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Stock Máximo</label>
                    <input type="number" class="form-control" required>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Descripción</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Conteo Cíclico -->
    <div class="modal fade" id="cycleCountModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Iniciar Conteo Cíclico</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="cycleCountForm">
              <div class="form-group">
                <label>Ubicación</label>
                <select class="form-control" required>
                  <option value="">Seleccione ubicación...</option>
                  <option value="a1">Almacén A1</option>
                  <option value="a2">Almacén A2</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tipo de Conteo</label>
                <select class="form-control" required>
                  <option value="completo">Conteo Completo</option>
                  <option value="parcial">Conteo Parcial</option>
                  <option value="aleatorio">Conteo Aleatorio</option>
                </select>
              </div>
              <div class="form-group">
                <label>Responsable</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="form-group">
                <label>Observaciones</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Iniciar Conteo</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').innerHTML = inventoryContent;
} 