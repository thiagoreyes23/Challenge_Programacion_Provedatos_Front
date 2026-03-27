import { Routes } from '@angular/router';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { EmpleadoReporteComponent } from './components/empleado-reporte/empleado-reporte.component';

export const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadoListComponent },
  { path: 'empleados/nuevo', component: EmpleadoFormComponent },
  { path: 'empleados/editar/:id', component: EmpleadoFormComponent },
  { path: 'empleados/reporte', component: EmpleadoReporteComponent },
];