import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { IAuthResponse } from '../interfaces/IAuth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  url = environment.URL;

  iniciarSesion(data: any) {
    return this.http.post<IAuthResponse>(`${this.url}/signin`, data, {
      observe: 'response',
    });
  }

  loggedIn(): Boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenInfo: any = jwtDecode(token);
      const currentDate = new Date().getTime() / 1000;
      if (tokenInfo.exp < currentDate) {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.router.navigate(['/']);
  }
}
