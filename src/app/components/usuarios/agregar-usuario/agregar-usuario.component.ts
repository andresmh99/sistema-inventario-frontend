import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { RolService } from '../../../services/rol.service';
import { RespuestaBackend } from '../../../interfaces/respuesta-backend';
import { Usuario } from '../../../interfaces/IAuth';
import { Rol } from '../../../interfaces/IRoles/roles';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IUsuario } from '../../../interfaces/IUsuarios/usuarios';

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css',
})
export class AgregarUsuarioComponent {
  constructor(
    private usuarioService: UsuariosService,
    private rolService: RolService
  ) {}

  @Output()
  respuesta = new EventEmitter<HttpResponse<IUsuario>>();
  usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    email: '',
    rolId: {
      id: 0,
      nombreRol: '',
    },
  };
  mensaje: string = '';
  colorAlerta: string = '';
  roles: Rol[] = [];
  modal: boolean = false;

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

  crearUsuario() {
    this.usuarioService
      .crearUsuario(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.status === 200 && res.body) {
          this.respuesta.emit(res.body);
          this.form.reset();
          this.modal = false;
        }
      });
  }

  visibilidadModal() {
    this.modal = !this.modal;
    this.mensaje = '';
  }
}
