export interface IMontoVentaRequest {
  monto:        number;
  idMetodoPago: number;
}
export interface IMontoVentaResponse {
  ok:             boolean;
  msj:            string;
  montoPendiente: number;
}

