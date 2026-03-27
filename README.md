# Empleados Frontend — Angular

Interfaz de usuario construida con Angular 19 y Bootstrap 4.

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js     | v20.x          |
| npm         | v10.x          |
| Angular CLI | v19.x          |

> El backend debe estar corriendo en `http://localhost:3000` antes de iniciar el frontend.

## Instalación

1. Ingresa a la carpeta del frontend:
```bash
   cd empleados-frontend
```

2. Instala las dependencias:
```bash
   npm install
```

3. Inicia la aplicación:
```bash
   ng serve
```

La aplicación corre en: `http://localhost:4200`

## Dependencias principales

| Paquete | Versión | Para qué se usa |
|---------|---------|-----------------|
| @angular/core | ^19.x | Framework principal |
| @angular/router | ^19.x | Navegación entre páginas |
| @angular/common/http | ^19.x | Llamadas HTTP al backend |
| @angular/forms | ^19.x | Formularios reactivos |
| bootstrap | ^4.6.x | Estilos y componentes UI |
| jquery | ^3.x | Requerido por Bootstrap 4 |
| popper.js | ^1.x | Requerido por Bootstrap 4 |

## Estructura del proyecto
```
src/app/
├── components/
│   ├── empleado-list/      ← Listado principal con paginación
│   ├── empleado-form/      ← Crear y editar empleado (stepper)
│   ├── empleado-reporte/   ← Reporte general ordenable
│   └── sidebar/            ← Sidebar reutilizable
├── services/
│   ├── empleado.service.ts ← Llamadas API empleados
│   └── provincia.service.ts← Llamadas API provincias
├── app.routes.ts           ← Rutas de la aplicación
└── app.config.ts           ← Configuración global
```

## Rutas de la aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| / | EmpleadoList | Redirige al listado |
| /empleados | EmpleadoList | Listado con búsqueda y paginación |
| /empleados/nuevo | EmpleadoForm | Crear nuevo empleado |
| /empleados/editar/:id | EmpleadoForm | Editar empleado existente |
| /empleados/reporte | EmpleadoReporte | Reporte general |
