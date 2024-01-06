export interface IClientes {
  ok:       boolean;
  msj:      string;
  clientes: Cliente[];
}

export interface Cliente {
  id:       number;
  run:      string;
  nombre:   string;
  telefono: string;
  email:    string;
}
