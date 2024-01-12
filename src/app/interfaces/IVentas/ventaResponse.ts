import { Cliente } from '../IClientes/clientes';
import { ProductoResponse } from '../IProductos/producto';
import { Usuario } from '../IUsuarios/usuarios';

export interface IVentas {
  ok: boolean;
  info?: Info;
  msj: string;
  ventas: Venta[];
  venta: Venta;
  skip: number;
}

export interface Info {
  count: number;
  pages: number;
}

export interface Venta {
  id: number;
  montoTotal: number;
  estado: boolean;
  montoPendiente: number;
  fecha: Date;
  idUsuario: number;
  idCliente: number;
  detalleVentas: DetalleVenta[];
  montoVentas: MontoVenta[];
  cliente: Cliente;
  usuario: Usuario;
}

export interface DetalleVenta {
  id: number;
  cantidad: number;
  idVenta: number;
  idProducto: number;
  producto: ProductoResponse;
}

export interface MontoVenta {
  id: number;
  monto: number;
  idVenta: number;
  idMetodoPago: number;
  metodoPago: MetodoPago;
}

export interface MetodoPago {
  id: number;
  nombre: string;
}
