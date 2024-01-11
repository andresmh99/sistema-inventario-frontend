export interface IBoleta {
  idUsuario: number;
  nombreUsuario: string;
  idCliente: number;
  nombreCliente: string;
  detalleBoleta: detalleBoleta[];
}

export interface detalleBoleta {
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioVenta: number;
}
