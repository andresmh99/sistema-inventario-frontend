import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { ProductoResponse } from '../../interfaces/IProductos/producto';
import { OpcionesComponent } from './opciones/opciones.component';
import { RespuestaBackend } from '../../interfaces/respuesta-backend';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { DetallesComponent } from './detalles/detalles.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OpcionesComponent,
    AgregarProductoComponent,
    DetallesComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerProductos(this.paginaActual);
    this.getCharizard()
  }

  productos: ProductoResponse[] = [];
  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  numeroDeRegistros: number = 0;
  textoProducto: string = '';
  mensaje: string = '';
  colorAlerta: string = '';

  getCharizard() {
		this.productosService.getCharizard().subscribe((res)=>{
      console.log(res);
    })
	}

  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerProductos(this.paginaActual);
  }
  obtenerProductos(page: number) {
    this.productosService.obtenerProductos(page).subscribe((res) => {
      this.productos = res.productos;
      this.numeroPaginas = res.info.pages;
      this.totalRegistros = res.info.count;
    });
  }

  buscarProducto() {
    this.productos = [];
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
        this.productos = res.productos;
        this.mensaje = '';
        this.colorAlerta = '';
      });
  }

  respuesta(res: RespuestaBackend) {
    if (res.ok) {
      this.mensaje = res.msj;
      this.colorAlerta = 'green';
      this.obtenerProductos(this.paginaActual);
    } else {
      this.mensaje = 'Ha ocurrido un Error';
      this.colorAlerta = 'yellow';
    }
  }
}
