import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { RolService } from '../../../services/rol.service';
import { Usuario } from '../../../interfaces/IAuth';
import { Rol } from '../../../interfaces/IRoles/roles';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse} from '@angular/common/http';
import { RespuestaService } from '../../../services/respuesta.service';
import { Router } from '@angular/router';

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
    private rolService: RolService,
    private respuestaService: RespuestaService,
    private route: Router
  ) {}

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
  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };
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

  crearUsuario() {
    this.usuarioService
      .crearUsuario(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.respuesta.mensaje = error.error.msj;
          this.respuesta.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.status === 200 && res.body) {
          if (res.body.ok) {
            this.respuesta.mensaje = res.body.msj;
            this.respuesta.colorAlerta = 'green';
            this.form.reset();
            this.route.navigate(['/usuarios']).then(() => {
              this.respuestaService.enviarRespuesta(this.respuesta);
            });
          }
        }
      });
  }
}
