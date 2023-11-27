import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../services/categorias.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ICategoria } from '../../interfaces/IProductos/producto';
import { RespuestaBackend } from '../../interfaces/respuesta-backend';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  constructor(private categoriasService: CategoriasService) {}

  @Output() respuesta = new EventEmitter<RespuestaBackend>();

  ngOnInit(): void {}

  mensaje: string = '';
  colorAlerta: string = '';
  modal: boolean = false;
  categoria: ICategoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
  };

  form = new FormGroup({
    nombreCategoria: new FormControl(''),
    descripcion: new FormControl(''),
  });

  visibilidadModal() {
    this.modal = !this.modal;
    this.mensaje ='';
  }

  crearCategoria() {
    this.categoriasService
      .newCategory(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        }))
      .subscribe((res: any) => {
        if (res.ok) {
          this.categoria = res.categoria;
          this.respuesta.emit(res);
          this.form.reset();
          this.modal = false;
        }
        this.mensaje = res.msj;
      });
  }
}
