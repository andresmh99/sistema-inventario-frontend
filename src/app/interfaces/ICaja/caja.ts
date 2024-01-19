export interface ICajaRequest {
  idUsuario: number;
  montoInicial: number;
}
export interface ICajaResponse {
  ok: boolean;
  msj: string;
  cajas: Caja[];
  caja: Caja
}

export interface Caja {
  id: number;
  fecha: Date;
  idUsuario: number;
  estado: boolean;
  montoInicial: number;
  montoActual: number;
  usuario: Usuario;
  ventas: Venta[];
  cierreCaja: CierreCaja | null;
  deposito: Deposito | null;
  _count: Count;
}

export interface Count {
  ventas: number;
}

export interface CierreCaja {
  id: number;
  fecha: Date;
  montoCierre: number;
  diferencia: number;
  comentarios: null;
  idCaja: number;
}

export interface Deposito {
  id: number;
  idCaja: number;
  idCierreCaja: number;
  montoDeposito: number;
  restanteCaja: number;
}

export interface Usuario {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  rol: Rol;
}

export interface Rol {
  id: number;
  nombreRol: string;
}

export interface Venta {
  id: number;
  montoTotal: number;
  estado: boolean;
  montoPendiente: number;
  fecha: Date;
  idUsuario: number;
  idCliente: number;
  idCaja: number;
}
