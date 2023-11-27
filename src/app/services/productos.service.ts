import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { RespuestaBackend } from '../interfaces/respuesta-backend'
import { IProducto, IProductos } from '../interfaces/IProductos/producto'

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  url = environment.URL

  obtenerProductos(page: number) {
    return this.http.get<IProductos>(`${this.url}/productos`, {
      params: { page: page },
    })
  }
  crearProducto(data: any) {
    return this.http.post<IProducto>(`${this.url}/productos`, data)
  }

  eliminarProducto(id: string) {
    return this.http.delete(`${this.url}/productos/${id}`)
  }
  obtenerProductoPorId(id: string) {
    return this.http.get<IProducto>(`${this.url}/productos/${id}`)
  }

  buscarProductos(word: string) {
    return this.http.get<IProductos>(`${this.url}/productos/buscar?s=${word}`)
  }
  actualizarProducto(id: string, data: any) {
    return this.http.put<IProducto>(`${this.url}/productos/${id}`, data)
  }

  /*actualizarStock(id: string, data: updateStock) {
    return this.http.put(
      `${this.url}/products/update/stock/${id}`,
      data,
    )
  }*/
  actualizarImagen(id: string, data: FormData) {
    return this.http.put(
      `${this.url}/productos/actualizarImagen/${id}`,
      data,
    )
  }
}
