import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IVentas } from '../interfaces/IVentas/ventaResponse';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.URL;
  }

  obtenerVentas(page: number) {
    return this.http.get<IVentas>(`${this.url}/ventas`, {
      params: { page: page },
      observe: 'response',
    });
  }
  crearVenta(data: any) {
    return this.http.post<IVentas>(`${this.url}/ventas`, data, {
      observe: 'response',
    });
  }
  eliminarVentaPendientePorPagar(id: string) {
    return this.http.delete(`${this.url}/ventas/${id}`, {
      observe: 'response',
    });
  }
  buscarVenta(word: string) {
    return this.http.get<IVentas>(`${this.url}/ventas/buscar?s=${word}`, {
      observe: 'response',
    });
  }
}
