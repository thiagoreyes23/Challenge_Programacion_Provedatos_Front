import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  id_empleado?: number;
  codigo?: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  email?: string;
  fecha_nacimiento?: string;
  id_provincia_personal?: number;
  observaciones_personales?: string;
  foto?: string;
  fecha_ingreso?: string;
  cargo?: string;
  departamento?: string;
  id_provincia_laboral?: number;
  sueldo?: number;
  jornada_parcial?: number;
  observaciones_laborales?: string;
  estado?: number;
  provincia_personal?: any;
  provincia_laboral?: any;
}

export interface PaginatedResult {
  data: Empleado[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/empleado';

  constructor(private http: HttpClient) {}

  getAll(nombre?: string, codigo?: string, page: number = 1, limit: number = 20): Observable<PaginatedResult> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (codigo) params = params.set('codigo', codigo);
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    return this.http.get<PaginatedResult>(this.apiUrl, { params });
  }

  getOne(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  update(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  reporte(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/reporte`);
  }
}