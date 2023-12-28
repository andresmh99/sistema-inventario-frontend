export interface ICategoria {
  ok:         boolean;
  categorias: Categoria[];
}

export interface Categoria {
  id:              number;
  nombreCategoria: string;
  descripcion:     string;
  createdAt?: Date;
  updatedAt?: Date;
}
