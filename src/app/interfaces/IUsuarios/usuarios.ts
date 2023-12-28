import { Rol } from "../IRoles/roles";

export interface IUsuario {
  ok:       boolean;
  info:     Info;
  msj: string;
  usuarios: Usuario[];
  skip?:     number;
}

export interface Info {
  count: number;
  pages: number;
}

export interface Usuario {
  id:            number;
  nombreUsuario: string;
  nombre:        string;
  apellido:      string;
  email:         string;
  createdAt?:     Date;
  updatedAt?:     Date;
  rolId:         number;
  rol:           Rol;
}


