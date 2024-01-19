import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICajaResponse } from '../interfaces/ICaja/caja';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.URL;
  }

  obtenerCaja(page: number) {
    return this.http.get<ICajaResponse>(`${this.url}/caja`, {
      params: { page: page },
      observe: 'response',
    });
  }
  obtenerCajaActiva() {
    return this.http.get<ICajaResponse>(`${this.url}/cajaActiva`, {
      observe: 'response',
    });
  }
  crearCaja(data: any) {
    return this.http.post<ICajaResponse>(`${this.url}/caja`, data, {
      observe: 'response',
    });
  }
  cerrarCaja(data: any) {
    return this.http.post<ICajaResponse>(`${this.url}/cierrecaja`, data, {
      observe: 'response',
    });
  }
  buscarCaja(word: string) {
    return this.http.get<ICajaResponse>(`${this.url}/caja/buscar?s=${word}`, {
      observe: 'response',
    });
  }
}
