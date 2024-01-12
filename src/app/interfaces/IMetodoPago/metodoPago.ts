export interface IMetodoPago {
  ok:          boolean;
  msj:         string;
  metodosPago: MetodoPago[];
}

export interface MetodoPago {
  id:     number;
  nombre: string;
}
