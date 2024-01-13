import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta.service';
import { IVentas, Venta } from '../../interfaces/IVentas/ventaResponse';
import { RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MontoVentaComponent } from './monto-venta/monto-venta.component';
import { RespuestaService } from '../../services/respuesta.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterModule, MontoVentaComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent {
  constructor(private ventaService: VentaService, private respuestaService: RespuestaService) {}

  ngOnInit(): void {
    this.limpiarValores();
    this.obtenerVentas(this.paginaActual);
    this.obtenerRespuesta();
  }

  venta: any = {};

  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  textoVenta: string = '';
  mensaje: string = '';
  colorAlerta: string = '';
  modalMontoVenta: boolean = false;
  modalEliminar: boolean = false;
  ventasNoPagadas: Venta[] = [];
  ventasPagadas: Venta[] = [];
  ventas: Venta[] = [];

  obtenerVentas(page: number) {
    this.ventaService.obtenerVentas(page).subscribe((res) => {
      if (res.body && res.ok) {
        this.actualizarDatosVentas(res.body);
      }
    });
  }
  obtenerRespuesta() {
    this.respuestaService.obtenerRespuesta().subscribe((res) => {
      this.mensaje = res.mensaje;
      this.colorAlerta = res.colorAlerta;
    });
  }

  buscarVenta() {
    // Lógica para buscar una venta similar al método buscarCliente del componente Clientes
  }

  actualizarDatosVentas(res: IVentas) {
    this.ventas = res.ventas;
    this.ventasNoPagadas = this.ventas.filter((venta) => venta.estado == false);
    this.ventasPagadas = this.ventas.filter((venta) => venta.estado == true);
    if (res.info) {
      this.totalRegistros = res.info.count;
      this.numeroPaginas = res.info.pages;
    }
  }
  eliminarVenta(id: number) {
    this.modalEliminar = false;
    this.ventaService
      .eliminarVentaPendientePorPagar(id)
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
          this.obtenerVentas(this.paginaActual);
          this.colorAlerta = 'green';
          this.mensaje = res.body.msj;
        }
      });
  }
  pagarVenta(){

  }

  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.ventasNoPagadas = [];
    this.ventasPagadas = [];
  }

  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerVentas(this.paginaActual);
  }

  actualizarTabla() {
    this.obtenerVentas(this.paginaActual);
  }
  visibilidadModalEliminar(venta: any) {
    this.venta = venta;
    this.modalEliminar = !this.modalEliminar;
  }
  visibilidadModalMontoVenta(venta: any) {
    this.venta = venta;
    this.modalMontoVenta = !this.modalMontoVenta;
  }
}
