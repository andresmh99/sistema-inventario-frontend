import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import {  Usuario } from '../../interfaces/IUsuarios/usuarios';
import { OpcionesComponent } from './opciones/opciones.component';
import { HttpErrorResponse, } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RespuestaService } from '../../services/respuesta.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    OpcionesComponent,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  constructor(
    private usuariosService: UsuariosService,
    private respuestaService: RespuestaService
  ) {}

  usuarios: Usuario[] = [];
  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  numeroDeRegistros: number = 0;
  textoUsuario: string = '';
  mensaje: string = '';
  colorAlerta: string = '';

  ngOnInit(): void {
    this.obtenerUsuarios(this.paginaActual);
    this.obtenerRespuesta();
  }
  obtenerRespuesta() {
    this.respuestaService.obtenerRespuesta().subscribe((res) => {
      this.mensaje = res.mensaje;
      this.colorAlerta = res.colorAlerta;
    });
  }

  obtenerUsuarios(page: number) {
    this.usuariosService.obtenerUsuarios(page).subscribe((res) => {
      if (res.status === 200 && res.body) {
        this.usuarios = res.body.usuarios;
        this.numeroPaginas = res.body.info?.pages || 0;
        this.totalRegistros = res.body.info?.count || 0;
      }
    });
  }
  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerUsuarios(this.paginaActual);
  }
  respuesta(res: any) {
    if (res.ok) {
      this.mensaje = res.msj;
      this.colorAlerta = 'green';
      this.obtenerUsuarios(this.paginaActual);
    } else {
      this.mensaje = 'Ha ocurrido un Error';
      this.colorAlerta = 'yellow';
    }
  }

  buscarUsuario() {
    this.usuarios = [];
    this.usuariosService
      .buscarUsuario(this.textoUsuario)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        console.log(res);
        if (res.body) {
          this.usuarios = res.body.usuarios;
        }
        this.mensaje = '';
        this.colorAlerta = '';
      });
  }
}
