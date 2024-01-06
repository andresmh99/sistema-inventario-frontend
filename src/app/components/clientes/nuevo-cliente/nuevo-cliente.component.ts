import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '../../../interfaces/IClientes/clientes';
import { RespuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoClienteComponent {
  constructor(
    private clientesService: ClientesService,
    private respuestaService: RespuestaService,
    private router: Router
  ) {}

  form = new FormGroup({
    run: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '/^(d{1,2}.d{3}.d{3}[-][0-9kK]{1}|^d{1,2}.d{3}.d{3})*$/'
        ),
      ])
    ),
    nombre: new FormControl('', Validators.min(3)),
    email: new FormControl('', Validators.compose([Validators.email])),
    telefono: new FormControl(''),
  });

  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };

  crearCliente() {
    if (this.form.valid) {
      this.clientesService
        .crearCliente(this.form.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.respuesta.mensaje = error.error.msj;
            this.respuesta.colorAlerta = 'yellow';
            let errorMessage = error.error.msj;

            return throwError(errorMessage);
          })
        )
        .subscribe((res) => {
          if (res.status === 200 && res.body) {
            if (res.body.ok) {
              this.respuesta.mensaje = res.body.msj;
              this.respuesta.colorAlerta = 'green';
              this.form.reset();
              this.router.navigate(['/clientes']).then(() => {
                this.respuestaService.enviarRespuesta(this.respuesta);
              });
            }
          }
        });
    }
  }
}
