import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(
    private loginService: LoginService,
  ) {}

  addTokenheader(req: HttpRequest<unknown>,){

   return req.clone({
      headers: req.headers.set(
        'auth-token',
        `${this.loginService.obtenerToken()}`
      ),
    });
  }
}
