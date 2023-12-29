import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IRol } from '../interfaces/IRoles/roles';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.URL;
  }

  obtenerRoles() {
    return this.http.get<IRol>(`${this.url}/rol`);
  }
}
