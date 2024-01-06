import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';
import { RespuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-nuevo-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-proveedor.component.html',
  styleUrl: './nuevo-proveedor.component.css'
})
export class NuevoProveedorComponent {

  constructor(
    private proveedoresService: ProveedoresService,
    private respuestaService: RespuestaService,
    private router: Router
  ) {}

  form = new FormGroup({
    nombre: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    direccion: new FormControl(''),
    contacto: new FormControl(''),
  });

  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };

  crearProveedor() {
    if (this.form.valid) {
      this.proveedoresService
        .crearProveedor(this.form.value)
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
              this.router.navigate(['/proveedores']).then(() => {
                this.respuestaService.enviarRespuesta(this.respuesta);
              });
            }
          }
        });
    }
  }

}
