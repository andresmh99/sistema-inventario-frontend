import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  public url:string;
  constructor(private http: HttpClient) {
    this.url = environment.URL
  }

  getCategories(){
    return this.http.get(`${this.url}/categoria`);
  }
  newCategory(data: any){
    return this.http.post(`${this.url}/categoria`, data );
  }
}
