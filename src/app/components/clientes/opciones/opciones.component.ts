import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../../services/clientes.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IClientes, Cliente } from '../../../interfaces/IClientes/clientes';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css'
})
export class OpcionesComponent {
  constructor(private clienteService: ClientesService) {}

  @Output() respuesta = new EventEmitter<HttpResponse<IClientes>>();
  @Input() id: string = '';
  @Input() cliente: Cliente = {
    id: 0,
    run: '',
    nombre: '',
    telefono: '',
    email: '',
  };
  modalEliminar: boolean = false;
  modalEditar: boolean = false;
  mensaje: string = '';
  colorAlerta: string = '';

  form = new FormGroup({
    run: new FormControl(''),
    nombre: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
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
        run: this.cliente.run,
        nombre: this.cliente.nombre,
        telefono: this.cliente.telefono,
        email: this.cliente.email,
      });
    }
  }

  actualizarCliente() {
    this.clienteService
      .actualizarCliente(this.id, this.form.value)
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

  eliminarCliente() {
    this.clienteService
      .eliminarCliente(this.id)
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
