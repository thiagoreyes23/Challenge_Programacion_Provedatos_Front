import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
import { ProvinciaService, Provincia } from '../../services/provincia.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './empleado-form.component.html',
  styleUrl: './empleado-form.component.css'
})
export class EmpleadoFormComponent implements OnInit {
  step: number = 1;
  esEdicion: boolean = false;
  id: number | null = null;
  cargando: boolean = false;
  guardando: boolean = false;
  guardadoExitoso: boolean = false;
  provincias: Provincia[] = [];
  mensajeError: string = '';
  errores: any = {};
  sidebarAbierto: boolean = false;
  fechaMaxNacimiento: string = '';

  empleado: Empleado = {
    nombres: '', apellidos: '', cedula: '', email: '',
    fecha_nacimiento: '', id_provincia_personal: undefined,
    observaciones_personales: '', foto: '', fecha_ingreso: '',
    cargo: '', departamento: '', id_provincia_laboral: undefined,
    sueldo: undefined, jornada_parcial: 0,
    observaciones_laborales: '', estado: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private provinciaService: ProvinciaService,
    private http: HttpClient,
  ) {
    // Fecha máxima: hoy - 18 años
    const hoy = new Date();
    hoy.setFullYear(hoy.getFullYear() - 18);
    this.fechaMaxNacimiento = hoy.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.provinciaService.getAll().subscribe(p => this.provincias = p);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.id = +id;
      this.cargando = true;
      this.empleadoService.getOne(this.id).subscribe({
        next: (data) => { this.empleado = data; this.cargando = false; },
        error: () => { this.cargando = false; this.mostrarError('Error al cargar el empleado'); }
      });
    }
  }

  validarStep1(): boolean {
    this.errores = {};
    if (!this.empleado.nombres?.trim())
      this.errores.nombres = 'El nombre es requerido';
    if (!this.empleado.apellidos?.trim())
      this.errores.apellidos = 'El apellido es requerido';
    if (!this.empleado.cedula?.trim()) {
      this.errores.cedula = 'La cédula es requerida';
    } else if (!this.validarCedula(this.empleado.cedula)) {
      this.errores.cedula = 'Cédula ecuatoriana no válida';
    }
    if (this.empleado.email && !this.validarEmail(this.empleado.email))
      this.errores.email = 'El formato del email no es válido';
    if (this.empleado.fecha_nacimiento && !this.validarMayorEdad(this.empleado.fecha_nacimiento))
      this.errores.fecha_nacimiento = 'El empleado debe ser mayor de 18 años';
    return Object.keys(this.errores).length === 0;
  }

  validarStep2(): boolean {
    this.errores = {};
    if (!this.empleado.fecha_ingreso?.trim())
      this.errores.fecha_ingreso = 'La fecha de ingreso es requerida';
    if (!this.empleado.cargo?.trim())
      this.errores.cargo = 'El cargo es requerido';
    if (this.empleado.sueldo !== undefined && this.empleado.sueldo < 0)
      this.errores.sueldo = 'El sueldo no puede ser negativo';
    return Object.keys(this.errores).length === 0;
  }

  validarCedula(cedula: string): boolean {
    if (cedula.length !== 10 || isNaN(Number(cedula))) return false;
    const provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let digito = parseInt(cedula[i]);
      if (i % 2 === 0) { digito *= 2; if (digito > 9) digito -= 9; }
      suma += digito;
    }
    return ((10 - (suma % 10)) % 10) === parseInt(cedula[9]);
  }

  validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validarMayorEdad(fecha: string): boolean {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      return edad - 1 >= 18;
    }
    return edad >= 18;
  }

  mostrarError(msg: string): void {
    this.mensajeError = msg;
    setTimeout(() => this.mensajeError = '', 6000);
  }

  continuar(): void {
    if (this.validarStep1()) {
      this.mensajeError = '';
      this.errores = {};
      this.step = 2;
    }
  }

  guardar(): void {
    if (!this.validarStep2()) return;

    this.guardando = true;
    this.mensajeError = '';

    const op = this.esEdicion && this.id
      ? this.empleadoService.update(this.id, this.empleado)
      : this.empleadoService.create(this.empleado);

    op.subscribe({
      next: () => {
        this.guardando = false;
        this.guardadoExitoso = true;
        setTimeout(() => { this.router.navigate(['/empleados']); }, 1800);
      },
      error: (err) => {
        this.guardando = false;
        const errores = err?.error?.message;
        if (Array.isArray(errores)) {
          this.mostrarError(this.traducirErrores(errores));
        } else {
          this.mostrarError('Ocurrió un error al guardar. Verifique los datos e intente nuevamente.');
        }
      }
    });
  }

  traducirErrores(errores: string[]): string {
    const traducciones: {[key: string]: string} = {
      'fecha_ingreso must be a valid ISO 8601 date string': 'La fecha de ingreso no es válida.',
      'fecha_nacimiento must be a valid ISO 8601 date string': 'La fecha de nacimiento no es válida.',
      'email must be an email': 'El email no tiene un formato válido.',
      'cedula must be longer than or equal to 10 characters': 'La cédula debe tener 10 dígitos.',
      'nombres must be longer than or equal to 1 characters': 'El nombre es requerido.',
      'apellidos must be longer than or equal to 1 characters': 'El apellido es requerido.',
      'sueldo must be a number': 'El sueldo debe ser un número válido.',
    };
    const mensajes = errores.map(e => {
      for (const key of Object.keys(traducciones)) {
        if (e.includes(key) || e === key) return traducciones[key];
      }
      return null;
    }).filter(Boolean);
    return mensajes.length > 0
      ? mensajes.join(' | ')
      : 'Verifique que todos los campos obligatorios estén completos.';
  }

  onFotoChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    this.http.post<{url: string}>('http://localhost:3000/foto/upload', formData).subscribe({
      next: (res) => { this.empleado.foto = res.url; },
      error: () => { this.mostrarError('Error al subir la imagen'); }
    });
  }

  toggleSidebar(): void { this.sidebarAbierto = !this.sidebarAbierto; }
  reporte(): void { this.router.navigate(['/empleados/reporte']); }
  salir(): void { this.router.navigate(['/empleados']); }
}