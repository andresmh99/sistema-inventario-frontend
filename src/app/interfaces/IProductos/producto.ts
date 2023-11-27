
export interface IProductos {
  ok: boolean
  msj:string
  info:Info
  productos: ProductoResponse[]
}
export interface IProducto {
  ok: boolean
  msj:string
  producto: ProductoResponse
}

export interface Producto {
  id: number
  nombreProducto: string
  descripcion: string
  sku: string
  precioVenta: number
  precioCompra: number
  marca: string
  stock: number
  imagen?: File
  categoria: ICategoria
}
export interface ProductoResponse {
  id: number
  nombreProducto: string
  descripcion: string
  sku: string
  precioVenta: number
  precioCompra: number
  marca: string
  stock: number
  imagen: string
  categoria: ICategoria
}
export interface ICategoria {
  id: number
  nombreCategoria: string
  descripcion: string
  createdAt?: Date
  updatedAt?: Date
}
export interface Info {
  count: number
  pages: number
}
