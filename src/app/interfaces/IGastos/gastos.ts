export interface IGastosRequest {
  idCaja:      number;
  monto:       number;
  comentarios: string;
}

export interface IGastos {
  ok:     boolean;
  msj:    string;
  gastos: Gasto[];
  gasto: Gasto
}

export interface Gasto {
  id:          number;
  idCaja:      number;
  monto:       number;
  comentarios: string;
  createdAt:   Date;
}
