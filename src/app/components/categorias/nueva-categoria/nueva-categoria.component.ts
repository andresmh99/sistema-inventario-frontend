import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Categoria } from '../../../interfaces/ICategorias/categorias';

@Component({
  selector: 'app-nueva-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva-categoria.component.html',
  styleUrl: './nueva-categoria.component.css'
})
export class NuevaCategoriaComponent {

  constructor(private categoriasService: CategoriasService) {}

  @Output() respuesta: EventEmitter<void> = new EventEmitter<void>();
  mensaje: string = '';
  colorAlerta: string = '';
  categoria: Categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
  };

  form = new FormGroup({
    nombreCategoria: new FormControl(''),
    descripcion: new FormControl(''),
  });

  crearCategoria() {
    this.categoriasService
      .crearCategoria(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.respuesta.emit(error.error);
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {
          this.categoria = res.categoria;
          this.respuesta.emit(res);
          this.form.reset();
        } else {
          this.respuesta.emit(res);
        }
      });
  }
}
