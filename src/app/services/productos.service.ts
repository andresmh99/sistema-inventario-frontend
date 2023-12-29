import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IProducto, IProductos } from '../interfaces/IProductos/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  url = environment.URL;
  private POKE_MOCK_POSTMAN =
    'https://8be7b726-3361-4635-9173-7607c331f7a3.mock.pstmn.io/charizard';
  getCharizard() {
    return this.http.get(this.POKE_MOCK_POSTMAN);
  }

  obtenerProductos(page: number) {
    return this.http.get<IProductos>(`${this.url}/productos`, {
      params: { page: page },
      observe: 'response',
    });
  }
  crearProducto(data: any) {
    return this.http.post<IProducto>(`${this.url}/productos`, data, {
      observe: 'response',
    });
  }

  eliminarProducto(id: string) {
    return this.http.delete<IProducto>(`${this.url}/productos/${id}`, {
      observe: 'response',
    });
  }
  obtenerProductoPorId(id: string) {
    return this.http.get<IProducto>(`${this.url}/productos/${id}`, {
      observe: 'response',
    });
  }

  buscarProductos(word: string) {
    return this.http.get<IProductos>(`${this.url}/productos/buscar?s=${word}`, {
      observe: 'response',
    });
  }
  actualizarProducto(id: string, data: any) {
    return this.http.put<IProducto>(`${this.url}/productos/${id}`, data, {
      observe: 'response',
    });
  }

  /*actualizarStock(id: string, data: updateStock) {
    return this.http.put(
      `${this.url}/products/update/stock/${id}`,
      data,
    )
  }*/
  actualizarImagen(id: string, data: FormData) {
    return this.http.put(`${this.url}/productos/actualizarImagen/${id}`, data, {
      observe: 'response',
    });
  }
}
