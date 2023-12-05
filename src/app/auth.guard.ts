import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router:Router){

  }
  canActivate():boolean{
    if(this.LoginService.loggedIn()){
      return true;
    }

    this.router.navigate(['/']);
    return false;

  }

}
