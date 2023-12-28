import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, from, throwError } from 'rxjs';
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
  textoError = {
    usuario: '',
    password: '',
  };

  form = new FormGroup({
    usuario: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
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
          this.router.navigate(['/dasboard']);
        });
    } else {
      this.mensaje = 'Todos los campos son requeridos';
      this.colorAlerta = 'yellow';
    }
  }

  visualizarPassword() {
    let inputPassword: HTMLInputElement = document.getElementById(
      'password'
    ) as HTMLInputElement;
    let iconoPassword: HTMLInputElement = document.getElementById(
      'iconoPassword'
    ) as HTMLInputElement;
    if (inputPassword && iconoPassword) {
      if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        iconoPassword.classList.remove('bi-eye');
        iconoPassword.classList.add('bi-eye-slash');
      } else if (inputPassword.type === 'text') {
        inputPassword.type = 'password';
        iconoPassword.classList.remove('bi-eye-slash');
        iconoPassword.classList.add('bi-eye');
      }
    }
  }
  inputAlterado(input: string) {
    const inputColor: HTMLInputElement = document.getElementById(
      input
    ) as HTMLInputElement;
    const temaOscuro = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const control = this.form.get(input);

    let color: string = 'gray';
    let modo: string = '';

    if (temaOscuro) {
      modo = 'dark:';
    }
    if (!control) {
      return false;
    }

    inputColor.classList.remove(`${modo}border-red-300`);
    inputColor.classList.add(`${modo}border-${color}-300`);

    if (control.invalid && control.touched) {
      if (input === 'usuario') {
        color = 'red';
        inputColor.classList.remove(`${modo}border-gray-300`);
        inputColor.classList.add(`${modo}border-${color}-300`);
        this.textoError.usuario = 'El correo electrónico es inválido';
        return true;
      } else if (input === 'password') {
        color = 'red';
        inputColor.classList.remove(`${modo}border-gray-300`);
        inputColor.classList.add(`${modo}border-${color}-300`);
        this.textoError.password =
          'La contraseña ingresada debe tener al menos 6 caracteres';
        return true;
      }
    }
    return false;
  }
}

