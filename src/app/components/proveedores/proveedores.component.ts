import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresService } from '../../services/proveedores.service';
import { IProveedor, Proveedor } from '../../interfaces/IProveedores/proveedor';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OpcionesComponent } from './opciones/opciones.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, OpcionesComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css',
})
export class ProveedoresComponent {
  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.obtenerProveedores(this.paginaActual);
  }

  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  textoProveedor: string = '';
  mensaje: string = '';
  colorAlerta: string = '';
  proveedores: Proveedor[] = [];

  obtenerProveedores(page: number) {
    this.proveedoresService.obtenerProveedores(page).subscribe((res) => {
      if (res.body && res.ok) {
        this.actualizarDatosProductos(res.body);
      }
    });
  }
  buscarProveedor() {
    this.limpiarValores();
    this.proveedoresService
      .buscarProveedor(this.textoProveedor)
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
          this.actualizarDatosProductos(res.body);
        }
      });
  }
  actualizarDatosProductos(res: IProveedor) {
    this.proveedores = res.proveedores;
    // Filtrar las categorías excluyendo la categoría sin categoría (id = 1)
    const proveedoresFiltrados = this.proveedores.filter(
      (proveedor) => proveedor.id !== 1
    );

    // Obtener la categoría sin categoría (id = 1)
    const proveedorPredeterminada = this.proveedores.find(
      (proveedor) => proveedor.id === 1
    );

    if (proveedorPredeterminada) {
      // Ordenar las categorías y agregar la categoría sin categoría al principio del arreglo
      this.proveedores = [proveedorPredeterminada, ...proveedoresFiltrados];
    }
    this.numeroPaginas = res.info.pages;
    this.totalRegistros = res.info.count;
  }
  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.proveedores = [];
  }
  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerProveedores(this.paginaActual);
  }
  actualizarTabla() {
    this.obtenerProveedores(this.paginaActual);
  }
  respuesta(res: any) {
    if (res.ok) {
      this.mensaje = res.msj;
      this.colorAlerta = 'green';
      this.obtenerProveedores(this.paginaActual);
    } else {
      this.mensaje = res.msj;
      this.colorAlerta = 'yellow';
    }
  }
}
