import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Provincia {
  id_provincia: number;
  nombre_provincia: string;
}

@Injectable({ providedIn: 'root' })
export class ProvinciaService {
  private apiUrl = 'http://localhost:3000/provincia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.apiUrl);
  }
}