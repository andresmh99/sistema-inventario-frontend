import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMontoVentaResponse } from '../interfaces/IMontoVentas/montoVentas';

@Injectable({
  providedIn: 'root'
})
export class MontoVentaService {

  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.URL;
  }

  crearMontoVenta(id: number, data: any) {
    return this.http.post<IMontoVentaResponse>(`${this.url}/montoventa/${id}`, data, {
      observe: 'response',
    });
  }
}
