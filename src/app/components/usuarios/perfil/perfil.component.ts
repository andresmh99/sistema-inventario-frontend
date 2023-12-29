import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../interfaces/IUsuarios/usuarios';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor() {}

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
