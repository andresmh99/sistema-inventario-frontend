export interface IProveedor {
  ok: boolean;
  info: Info;
  msj: string;
  proveedores: Proveedor[];
}

export interface Info {
  count: number;
  pages: number;
}

export interface Proveedor {
  id: number;
  nombre: string;
  telefono: null | string;
  email: null | string;
  direccion: null | string;
  contacto: null | string;
  _count?: Count;
}

export interface Count {
  compras: number;
}
