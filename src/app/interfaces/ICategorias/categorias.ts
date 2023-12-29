export interface ICategoria {
  ok:         boolean;
  categorias: Categoria[];
}
export interface Categoria {
  id:              number;
  nombreCategoria: string;
  descripcion:     string;
  _count:          Count;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Count {
  productos: number;
}
