export interface IDepositos {
  ok:       boolean;
  msj:      string;
  deposito: Deposito;
}

export interface Deposito {
  id:            number;
  idCaja:        number;
  idCierreCaja:  number;
  montoDeposito: number;
  restanteCaja:  number;
  cierreCaja:    CierreCaja;
  caja:          Caja;
}

export interface Caja {
  id:           number;
  fecha:        Date;
  idUsuario:    number;
  estado:       boolean;
  montoInicial: number;
  montoActual:  number;
}

export interface CierreCaja {
  id:          number;
  fecha:       Date;
  montoCierre: number;
  diferencia:  number;
  comentarios: null;
  idCaja:      number;
}
