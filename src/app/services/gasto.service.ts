import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IGastos } from '../interfaces/IGastos/gastos';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.URL;
  }

  obtenerGastos(page: number) {
    return this.http.get<IGastos>(`${this.url}/gastos`, {
      params: { page: page },
      observe: 'response',
    });
  }
  obtenerGastoPorId(id: number) {
    return this.http.get<IGastos>(`${this.url}/gastos/${id}`, {
      observe: 'response',
    });
  }

  crearGasto(data: any) {
    return this.http.post<IGastos>(`${this.url}/gastos`, data, {
      observe: 'response',
    });
  }

}
