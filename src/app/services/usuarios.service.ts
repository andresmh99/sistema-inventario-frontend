import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUsuario } from '../interfaces/IUsuarios/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  url = environment.URL;

  obtenerUsuarios(page: number) {
    return this.http.get<IUsuario>(`${this.url}/usuarios`, {
      params: { page: page },
      observe: 'response',
    });
  }
  eliminarUsuario(id: string) {
    return this.http.delete<HttpResponse<any>>(`${this.url}/usuarios/${id}`, {
      observe: 'response',
    });
  }
  actualizarUsuario(id: string, data: any) {
    return this.http.put<HttpResponse<IUsuario>>(
      `${this.url}/usuarios/${id}`,
      data,
      { observe: 'response' }
    );
  }
  crearUsuario(data: any) {
    return this.http.post<HttpResponse<IUsuario>>(
      `${this.url}/usuarios`,
      data,
      { observe: 'response' }
    );
  }
  buscarUsuario(texto: string) {
    return this.http.get<IUsuario>(`${this.url}/usuarios/buscar?s=${texto}`, {
      observe: 'response',
    });
  }
}
