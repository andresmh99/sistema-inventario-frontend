import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IProveedor } from '../interfaces/IProveedores/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  constructor(private http: HttpClient) {}

  url = environment.URL;

  obtenerProveedores(page: number) {
    return this.http.get<IProveedor>(`${this.url}/proveedor`, {
      params: { page: page },
      observe: 'response',
    });
  }

  eliminarProveedor(id: string) {
    return this.http.delete<HttpResponse<any>>(`${this.url}/proveedor/${id}`, {
      observe: 'response',
    });
  }

  actualizarProveedor(id: string, data: any) {
    return this.http.put<HttpResponse<IProveedor>>(
      `${this.url}/proveedor/${id}`,
      data,
      { observe: 'response' }
    );
  }

  crearProveedor(data: any) {
    return this.http.post<IProveedor>(
      `${this.url}/proveedor`,
      data,
      { observe: 'response' }
    );
  }

  buscarProveedor(texto: string) {
    return this.http.get<IProveedor>(`${this.url}/proveedor/buscar?s=${texto}`, {
      observe: 'response',
    });
  }
}

