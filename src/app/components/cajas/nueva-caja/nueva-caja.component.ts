import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaService } from '../../../services/caja.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../interfaces/IUsuarios/usuarios';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router} from '@angular/router';
import { RespuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-nueva-caja',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva-caja.component.html',
  styleUrl: './nueva-caja.component.css',
})
export class NuevaCajaComponent {
  constructor(
    private cajaService: CajaService,
    private router: Router,
    private respuestaService: RespuestaService
  ) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };
  usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    email: '',
    rolId: 0,
    rol: {
      id: 0,
      nombreRol: '',
    },
  };
  form = new FormGroup({
    idUsuario: new FormControl(0),
    montoInicial: new FormControl(''),
    comentarios: new FormControl(),
  });

  iniciarCaja() {
    this.form.value.idUsuario = this.usuario.id;
    this.cajaService
      .crearCaja(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.respuesta.mensaje = error.error.msj;
          this.respuesta.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.body) {
          this.respuesta.colorAlerta = 'green';
          this.respuesta.mensaje = res.body.msj;
          this.router.navigate(['/cajas']).then(() => {
            this.respuestaService.enviarRespuesta(this.respuesta);
          });
        }
      });
  }
  obtenerPerfil() {
    const perfil = localStorage.getItem('identity');
    if (perfil) {
      this.usuario = JSON.parse(perfil);
    }
  }
}
