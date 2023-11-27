import { ProductoResponse } from "./IProductos/producto";

export interface RespuestaBackend {
  ok: boolean;
  msj: string;
  producto?: ProductoResponse[] |  ProductoResponse;
}
