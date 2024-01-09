import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../interfaces/IUsuarios/usuarios';
import { RouterModule } from '@angular/router';
import { BtnMenuComponent } from './btn-menu/btn-menu.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, BtnMenuComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(public loginService: LoginService) {}

  usuario: Usuario = {
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
  ngOnInit(): void {
    this.obtenerPerfil();
  }
  obtenerPerfil() {
    const perfil = localStorage.getItem('identity');
    if (perfil) {
      this.usuario = JSON.parse(perfil);
    }
  }
}
