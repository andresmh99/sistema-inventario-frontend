import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresService } from '../../../services/proveedores.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  IProveedor,
  Proveedor,
} from '../../../interfaces/IProveedores/proveedor';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css',
})
export class OpcionesComponent {
  constructor(private proveedorService: ProveedoresService) {}

  @Output() respuesta = new EventEmitter<HttpResponse<IProveedor>>();
  @Input() id: string = '';
  @Input() proveedor: Proveedor = {
    id: 0,
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    contacto: '',
  };
  modalEliminar: boolean = false;
  modalEditar: boolean = false;
  mensaje: string = '';
  colorAlerta: string = '';

  ngOnInit(): void {}

  form = new FormGroup({
    nombre: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    direccion: new FormControl(''),
    contacto: new FormControl(''),
  });

  visibilidadModalEliminar() {
    this.modalEliminar = !this.modalEliminar;
  }

  visibilidadModalEditar() {
    this.modalEditar = !this.modalEditar;
    if (!this.modalEditar) {
      this.form.reset();
    } else {
      this.form.patchValue({
        nombre: this.proveedor.nombre,
        telefono: this.proveedor.telefono,
        email: this.proveedor.email,
        direccion: this.proveedor.direccion,
        contacto: this.proveedor.contacto,
      });
    }
  }

  actualizarProveedor() {
    this.proveedorService
      .actualizarProveedor(this.id, this.form.value)
      .subscribe((res) => {
        if (res.status === 200 && res.body) {
          this.respuesta.emit(res.body);
          this.modalEditar = false;
        } else {
          this.mensaje = 'El registro no ha sido actualizado';
          this.colorAlerta = 'yellow';
        }
      });
  }

  eliminarProveedor() {
    this.proveedorService
      .eliminarProveedor(this.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.modalEliminar = false;
          let errorMessage = error.error.msj;
          this.respuesta.emit(error.error);
          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.status === 200 && res.body) {
          this.respuesta.emit(res.body);
          this.modalEliminar = false;
        } else {
          this.mensaje = 'El registro no ha sido eliminado';
          this.colorAlerta = 'yellow';
        }
      });
  }
}
