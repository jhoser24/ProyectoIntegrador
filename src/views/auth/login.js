export function initializeLogin() {
  const loginContent = `
    <div class="container">
      <div class="row justify-content-center min-vh-100 align-items-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <!-- Imagen de Login -->
                <div class="col-lg-6 d-none d-lg-block position-relative">
                  <div class="bg-login-image">
                    <img src="assets/images/warehouse-management.jpg" 
                         alt="Sistema de Gestión de Almacén"
                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';">
                  </div>
                </div>
                <!-- Formulario de Login -->
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">¡Bienvenido al SGA!</h1>
                      <p class="mb-4">Sistema de Gestión de Almacén</p>
                    </div>
                    <form class="user" id="loginForm">
                      <div class="form-group mb-3">
                        <input type="text" class="form-control form-control-user" id="username"
                          placeholder="Usuario">
                      </div>
                      <div class="form-group mb-3">
                        <input type="password" class="form-control form-control-user" id="password"
                          placeholder="Contraseña">
                      </div>
                      <div class="form-group mb-3">
                        <div class="custom-control custom-checkbox small">
                          <input type="checkbox" class="custom-control-input" id="rememberMe">
                          <label class="custom-control-label" for="rememberMe">Recordarme</label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary btn-user btn-block">
                        Iniciar Sesión
                      </button>
                    </form>
                    <hr>
                    <div class="text-center">
                      <a class="small" href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Ocultar la barra de navegación en la página de login
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.display = 'none';
  }

  document.getElementById('app').innerHTML = loginContent;
  
  // Estilos específicos para el login
  const loginStyles = document.createElement('style');
  loginStyles.textContent = `
    .bg-login-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background-color: #f8f9fc;
      min-height: 500px;
    }
    .bg-login-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    .form-control-user {
      border-radius: 10rem;
      padding: 1.5rem 1rem;
      font-size: 0.9rem;
    }
    .btn-user {
      border-radius: 10rem;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
    }
    .btn-user:hover {
      transform: translateY(-1px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    }
    .card {
      border: none;
      border-radius: 1rem;
      overflow: hidden;
    }
    .card-body {
      border-radius: 1rem;
    }
  `;
  document.head.appendChild(loginStyles);

  // Manejar el envío del formulario
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
      // Simular almacenamiento de sesión
      localStorage.setItem('isAuthenticated', 'true');
      // Redirigir al dashboard
      window.location.hash = '#/dashboard';
      // Mostrar la barra de navegación después del login
      if (navbar) {
        navbar.style.display = 'flex';
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });

  // Depurar la carga de la imagen
  const img = document.querySelector('.bg-login-image img');
  img.addEventListener('load', function() {
    console.log('Imagen cargada correctamente');
  });
  img.addEventListener('error', function() {
    console.log('Error al cargar la imagen. Ruta:', this.src);
  });
} 