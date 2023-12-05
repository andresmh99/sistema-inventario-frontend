import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { IAuth } from '../../interfaces/IAuth';
import { Route, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  token: string = '';
  dataError: string = '';
  mensaje: string = '';
  colorAlerta: string = '';

  form = new FormGroup({
    usuario: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ])
    ),
    password: new FormControl('', Validators.required),
  });

  login() {
    const data = {
      email: this.form.value.usuario,
      nombreUsuario: this.form.value.usuario,
      password: this.form.value.password,
    };

    if (this.form.valid) {
      this.loginService
        .iniciarSesion(data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.mensaje = error.error.msj;
            this.colorAlerta = 'yellow';
            let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

            return throwError(errorMessage);
          })
        )
        .subscribe((res) => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          localStorage.setItem('identity', JSON.stringify(res.usuario));
          this.router.navigate(['/productos']);
        });
    } else {
      this.mensaje = 'Todos los campos son requeridos';
      this.colorAlerta = 'yellow';
    }
  }
}
