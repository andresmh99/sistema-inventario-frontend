import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import {
  IProductos,
  ProductoResponse,
} from '../../interfaces/IProductos/producto';
import { OpcionesComponent } from './opciones/opciones.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { DetallesComponent } from './detalles/detalles.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { RespuestaService } from '../../services/respuesta.service';

@Component({
  selector: 'app-productos',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    OpcionesComponent,
    AgregarProductoComponent,
    DetallesComponent,
    RouterModule,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  constructor(
    private productosService: ProductosService,
    private respuestaService: RespuestaService
  ) {}

  productos: ProductoResponse[] = [];
  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  numeroDeRegistros: number = 0;
  textoProducto: string = '';
  mensaje: string = '';
  colorAlerta: string = '';

  ngOnInit(): void {
    this.limpiarValores();
    this.obtenerRespuesta();
    this.obtenerProductos(this.paginaActual);
  }
  obtenerRespuesta() {
    this.respuestaService.obtenerRespuesta().subscribe((res) => {
      this.mensaje = res.mensaje;
      this.colorAlerta = res.colorAlerta;
    });
  }
  obtenerProductos(page: number) {
    this.productosService.obtenerProductos(page).subscribe((res) => {
      if(res.body){
        this.actualizarDatosProductos(res.body);
      }
    });
  }

  buscarProducto() {
    this.limpiarValores();
    this.productosService
      .buscarProductos(this.textoProducto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if(res.body){
          this.actualizarDatosProductos(res.body);
        }
      });
  }
  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerProductos(this.paginaActual);
  }
  actualizarTabla() {
    this.obtenerProductos(this.paginaActual);
  }
  actualizarDatosProductos(res: IProductos) {
    this.productos = res.productos;
    this.numeroPaginas = res.info.pages;
    this.totalRegistros = res.info.count;
  }
  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.productos = [];
  }
}
