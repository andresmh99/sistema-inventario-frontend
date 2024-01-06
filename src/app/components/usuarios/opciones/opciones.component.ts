import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RolService } from '../../../services/rol.service';
import { IUsuario, Usuario } from '../../../interfaces/IUsuarios/usuarios';
import { Rol } from '../../../interfaces/IRoles/roles';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css',
})
export class OpcionesComponent {
  constructor(
    private usuarioService: UsuariosService,
    private rolService: RolService
  ) {}

  @Output()
  respuesta = new EventEmitter<HttpResponse<IUsuario>>();
  @Input() id: string = '';
  @Input() usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    email: '',
    rolId: 0,
    rol: {
      id: 0,
      nombreRol: '',
    },
  };
  modalEliminar: boolean = false;
  modalEditar: boolean = false;
  mensaje: string = '';
  colorAlerta: string = '';
  roles: Rol[] = [];

  ngOnInit(): void {
    this.obtenerRoles();
  }

  form = new FormGroup({
    nombreUsuario: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rolId: new FormControl(''),
  });

  obtenerRoles() {
    this.rolService.obtenerRoles().subscribe((res) => {
      this.roles = res.roles;
    });
  }

  visibilidadModalEliminar() {
    this.modalEliminar = !this.modalEliminar;
  }
  visibilidadModalEditar() {
    this.modalEditar = !this.modalEditar;
    if (!this.modalEditar) {
      this.form.reset();
    } else {
      this.form.patchValue({
        nombreUsuario: this.usuario.nombreUsuario,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
      });
    }
  }
  actualizarUsuario() {
    if (this.form.valid) {
      this.usuarioService
        .actualizarUsuario(this.id, this.form.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = error.error.msj;
            this.respuesta.emit(error.error);
            return throwError(errorMessage);
          })
        )
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
  }

  eliminarUsuario() {
    this.usuarioService
      .eliminarUsuario(this.id)
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
