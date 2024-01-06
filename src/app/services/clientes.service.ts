import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IClientes } from '../interfaces/IClientes/clientes';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  url = environment.URL;

  obtenerClientes(page: number) {
    return this.http.get<IClientes>(`${this.url}/clientes`, {
      params: { page: page },
      observe: 'response',
    });
  }

  eliminarCliente(id: string) {
    return this.http.delete<HttpResponse<any>>(`${this.url}/clientes/${id}`, {
      observe: 'response',
    });
  }

  actualizarCliente(id: string, data: any) {
    return this.http.put<HttpResponse<IClientes>>(
      `${this.url}/clientes/${id}`,
      data,
      { observe: 'response' }
    );
  }

  crearCliente(data: any) {
    return this.http.post<IClientes>(
      `${this.url}/clientes`,
      data,
      { observe: 'response' }
    );
  }

  buscarCliente(texto: string) {
    return this.http.get<IClientes>(`${this.url}/clientes/buscar?s=${texto}`, {
      observe: 'response',
    });
  }
}
