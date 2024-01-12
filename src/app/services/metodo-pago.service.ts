import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMetodoPago } from '../interfaces/IMetodoPago/metodoPago';

@Injectable({
  providedIn: 'root',
})
export class MetodoPagoService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.URL;
  }

  obtenerMetodoPagos() {
    return this.http.get<IMetodoPago>(`${this.url}/metodopago`, {
      observe: 'response',
    });
  }
}
