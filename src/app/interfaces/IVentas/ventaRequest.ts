export interface IVentasRequest {
  idCaja: number;
  idUsuario:     number;
  idCliente:     number;
  detallesVenta: DetallesVenta[];
}

export interface DetallesVenta {
  cantidad:   number;
  idProducto: number;
}
