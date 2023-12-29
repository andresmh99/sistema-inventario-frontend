import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../services/categorias.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RespuestaBackend } from '../../interfaces/respuesta-backend';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Categoria } from '../../interfaces/ICategorias/categorias';
import { OpcionesComponent } from './opciones/opciones.component';
import { NuevaCategoriaComponent } from './nueva-categoria/nueva-categoria.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OpcionesComponent,
    NuevaCategoriaComponent,
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  constructor(private categoriasService: CategoriasService) {}

  @Output() respuesta = new EventEmitter<RespuestaBackend>();

  categorias: Categoria[] = [];
  mensaje: string = '';
  colorAlerta: string = '';
  modal: boolean = false;
  textoCategoria: string = '';
  categoria: Categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
    _count: {
      productos: 0,
    },
  };

  form = new FormGroup({
    nombreCategoria: new FormControl(''),
    descripcion: new FormControl(''),
  });

  ngOnInit(): void {
    this.obtenerCategorias();
  }
  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().subscribe((res) => {
      this.categorias = res.categorias;
      // Filtrar las categorías excluyendo la categoría sin categoría (id = 1)
      const categoriasFiltradas = this.categorias.filter(
        (categoria) => categoria.id !== 1
      );

      // Obtener la categoría sin categoría (id = 1)
      const categoriaPredeterminada = this.categorias.find(
        (categoria) => categoria.id === 1
      );

      if (categoriaPredeterminada) {
        // Ordenar las categorías y agregar la categoría sin categoría al principio del arreglo
        this.categorias = [categoriaPredeterminada, ...categoriasFiltradas];
      }
    });
  }
  buscarCategoria() {
    this.limpiarValores();
    this.categoriasService
      .buscarCategoria(this.textoCategoria)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        this.categorias = res.categorias;
      });
  }
  actualizarTabla(res: any) {
    if (res.ok) {
      this.mensaje = res.msj;
      this.colorAlerta = 'green';
      this.obtenerCategorias();
    } else {
      this.mensaje = res.msj;
      this.colorAlerta = 'yellow';
    }
  }
  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.categorias = [];
  }
}
