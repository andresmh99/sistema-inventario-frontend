import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { routes } from './app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router: Router) {}
  canActivate(): boolean {
    const isAuthenticated = this.LoginService.loggedIn();

    // Redirigir a las rutas correspondientes
    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
