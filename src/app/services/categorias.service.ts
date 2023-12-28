import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICategoria } from '../interfaces/ICategorias/categorias';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  public url:string;
  constructor(private http: HttpClient) {
    this.url = environment.URL
  }

  obtenerCategorias(){
    return this.http.get<ICategoria>(`${this.url}/categoria`);
  }
  crearCategoria(data: any){
    return this.http.post(`${this.url}/categoria`, data );
  }
  eliminarCategoria(id: string){
    return this.http.delete(`${this.url}/categoria/${id}` );
  }
  buscarCategoria(word: string) {
    return this.http.get<ICategoria>(`${this.url}/categoria/buscar?s=${word}`)
  }
}
