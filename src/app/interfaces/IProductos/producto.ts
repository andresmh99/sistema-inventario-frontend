import { Categoria} from "../ICategorias/categorias";

export interface IProductos {
  ok: boolean;
  msj: string;
  info: Info;
  productos: ProductoResponse[];
}
export interface IProducto {
  ok: boolean;
  msj: string;
  producto: ProductoResponse;
}

export interface Producto {
  id: number;
  nombreProducto: string;
  descripcion: string;
  sku: string;
  precioVenta: number;
  precioCompra: number;
  marca: string;
  stock: number;
  imagen?: File;
  categoria: Categoria;
}
export interface ProductoResponse {
  id: number;
  nombreProducto: string;
  descripcion: string;
  sku: string;
  precioVenta: number;
  precioCompra: number;
  marca: string;
  stock: number;
  imagen: string;
  categoria: Categoria;
  public_image_id?: string,
  secure_image_url?: string,
}
export interface Info {
  count: number;
  pages: number;
}
