import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { IClientes, Cliente } from '../../interfaces/IClientes/clientes';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RespuestaService } from '../../services/respuesta.service';
import { OpcionesComponent } from './opciones/opciones.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, OpcionesComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  constructor(
    private clientesService: ClientesService,
    private respuestaService: RespuestaService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes(this.paginaActual);
    this.obtenerRespuesta();
  }

  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  textoCliente: string = '';
  mensaje: string = '';
  colorAlerta: string = '';
  clientes: Cliente[] = [];

  obtenerClientes(page: number) {
    this.clientesService.obtenerClientes(page).subscribe((res) => {
      if (res.body && res.ok) {
        this.actualizarDatosClientes(res.body);
      }
    });
  }
  obtenerRespuesta() {
    this.respuestaService.obtenerRespuesta().subscribe((res) => {
      this.mensaje = res.mensaje;
      this.colorAlerta = res.colorAlerta;
    });
  }

  buscarCliente() {
    this.limpiarValores();
    this.clientesService
      .buscarCliente(this.textoCliente)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.body) {
          this.actualizarDatosClientes(res.body);
        }
      });
  }

  actualizarDatosClientes(res: IClientes) {
    this.clientes = res.clientes;
  }

  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.clientes = [];
  }

  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerClientes(this.paginaActual);
  }

  actualizarTabla() {
    this.obtenerClientes(this.paginaActual);
  }
  respuesta(res: any) {
    if (res.ok) {
      this.mensaje = res.msj;
      this.colorAlerta = 'green';
      this.obtenerClientes(this.paginaActual);
    } else {
      this.mensaje = res.msj;
      this.colorAlerta = 'yellow';
    }
  }
}
