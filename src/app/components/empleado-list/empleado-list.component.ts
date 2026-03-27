import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService, Empleado, PaginatedResult } from '../../services/empleado.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.css'
})
export class EmpleadoListComponent implements OnInit {
  empleados: Empleado[] = [];
  nombre: string = '';
  codigo: string = '';
  cargando: boolean = false;
  sidebarAbierto: boolean = false;

  // Paginación
  paginaActual: number = 1;
  totalPaginas: number = 1;
  total: number = 0;
  limit: number = 20;

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(resetPagina: boolean = true): void {
    if (resetPagina) this.paginaActual = 1;
    this.cargando = true;
    this.empleadoService.getAll(this.nombre, this.codigo, this.paginaActual, this.limit).subscribe({
      next: (res: PaginatedResult) => {
        this.empleados = res.data;
        this.total = res.total;
        this.totalPaginas = res.totalPages;
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  irPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    this.buscar(false);
  }

  getPaginas(): number[] {
    const paginas: number[] = [];
    const inicio = Math.max(1, this.paginaActual - 2);
    const fin = Math.min(this.totalPaginas, this.paginaActual + 2);
    for (let i = inicio; i <= fin; i++) paginas.push(i);
    return paginas;
  }

  seleccionar(empleado: Empleado): void {
    this.router.navigate(['/empleados/editar', empleado.id_empleado]);
  }

  nuevo(): void { this.router.navigate(['/empleados/nuevo']); }
  reporte(): void { this.router.navigate(['/empleados/reporte']); }
  salir(): void { this.router.navigate(['/empleados']); }
  getEstadoLabel(estado: number): string { return estado === 1 ? 'VIGENTE' : 'RETIRADO'; }
  toggleSidebar(): void { this.sidebarAbierto = !this.sidebarAbierto; }
}