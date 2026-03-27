import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-empleado-reporte',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './empleado-reporte.component.html',
  styleUrl: './empleado-reporte.component.css'
})
export class EmpleadoReporteComponent implements OnInit {
  empleados: Empleado[] = [];
  cargando: boolean = false;
  sortField: string = 'apellidos';
  sortDir: 'asc' | 'desc' = 'asc';
  sidebarAbierto: boolean = false;

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.cargando = true;
    this.empleadoService.reporte().subscribe({
      next: (data) => { this.empleados = data; this.cargando = false; },
      error: () => this.cargando = false
    });
  }

  ordenarPor(campo: string): void {
    if (this.sortField === campo) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = campo;
      this.sortDir = 'asc';
    }

    const camposNumericos = ['sueldo', 'estado', 'jornada_parcial', 'id_empleado'];

    this.empleados.sort((a: any, b: any) => {
      const valA = a[campo] ?? '';
      const valB = b[campo] ?? '';

      let cmp: number;

      if (camposNumericos.includes(campo)) {
        cmp = Number(valA) - Number(valB);
      } else {
        cmp = valA.toString().localeCompare(valB.toString(), 'es', { sensitivity: 'base' });
      }

      return this.sortDir === 'asc' ? cmp : -cmp;
    });
  }

  getSortIcon(campo: string): string {
    if (this.sortField !== campo) return '↕';
    return this.sortDir === 'asc' ? '↑' : '↓';
  }

  getEstadoLabel(estado: number): string {
    return estado === 1 ? 'VIGENTE' : 'RETIRADO';
  }

  toggleSidebar(): void { this.sidebarAbierto = !this.sidebarAbierto; }
  salir(): void { this.router.navigate(['/empleados']); }
}