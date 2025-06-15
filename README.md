# Sistema de Gestión de Almacén

Sistema de gestión de almacén basado en la plantilla Adminator, diseñado para gestionar eficientemente las operaciones de almacén.

## Estructura del Proyecto

```
src/
├── assets/                 # Recursos estáticos
│   ├── css/               # Estilos CSS/SCSS
│   ├── js/                # Scripts JavaScript
│   ├── img/               # Imágenes
│   └── fonts/             # Fuentes
├── components/            # Componentes reutilizables
│   ├── shared/           # Componentes compartidos
│   └── layout/           # Componentes de diseño
├── views/                # Vistas principales
│   ├── dashboard/        # Panel de control
│   ├── inventory/        # Gestión de inventario
│   ├── orders/           # Gestión de órdenes
│   ├── returns/          # Gestión de devoluciones
│   └── reports/          # Reportes y análisis
├── utils/                # Utilidades y helpers
├── services/             # Servicios y APIs
├── store/                # Estado global
└── config/               # Configuraciones
```

## Módulos Principales

1. **Dashboard**
   - KPIs de almacén
   - Gráficos de rendimiento
   - Alertas y notificaciones

2. **Gestión de Inventario**
   - Control de stock
   - Ubicaciones y bins
   - Lotes y números de serie
   - Conteos cíclicos

3. **Gestión de Órdenes**
   - Recepción de mercancía
   - Picking y packing
   - Envíos y despachos

4. **Devoluciones (RMA)**
   - Procesamiento de devoluciones
   - Autorizaciones
   - Reintegración al inventario

5. **Reportes**
   - Niveles de stock
   - Rotación de inventario
   - Cumplimiento de pedidos

## Requisitos

- Node.js 14+
- NPM o Yarn
- Navegador moderno

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build
``` 