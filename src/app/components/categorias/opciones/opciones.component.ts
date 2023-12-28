import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../../services/categorias.service';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Categoria } from '../../../interfaces/ICategorias/categorias';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css',
})
export class OpcionesComponent {
  constructor(private categoriasService: CategoriasService) {}
  @Output() actualizarTabla: EventEmitter<void> = new EventEmitter<void>();
  @Input() id: string = '';
  @Input() categoria: Categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
  };

  url: string = environment.URL;
  modalEliminar: boolean = false;
  modalEditar: boolean = false;
  mensaje: string = '';
  colorAlerta: string = '';
  categorias: any[] = [];

  ngOnInit(): void {
    this.limpiarValores();
    this.obtenerCategorias();
  }

  visibilidadModalEliminar() {
    this.modalEliminar = !this.modalEliminar;
  }

  eliminar() {
    this.modalEliminar = false;
    this.categoriasService
      .eliminarCategoria(this.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.actualizarTabla.emit(error.error);
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {
          this.mensaje = res.msj;
          this.colorAlerta = 'green';
          this.actualizarTabla.emit(res);
        }
      });
  }
  editar() {}
  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().subscribe((res: any) => {
      this.actualizarDatosCategorias(res);
    });
  }
  actualizarDatosCategorias(res: any) {
    this.categorias = res.categorias;
  }
  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.categorias = [];
  }

  /* editarProducto() {
    this.productosService
      .actualizarProducto(this.id, this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.ok === true) {
          this.actualizarTabla.emit();

          this.form.reset();
          this.modalEditar = false;
        }
      });
  }*/
}
