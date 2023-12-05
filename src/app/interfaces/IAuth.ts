export interface IAuthResponse {
  ok: boolean
  msj: string
  token: string
  usuario: Usuario
}

export interface Usuario {
  id: number
  nombreUsuario: string
  nombre: string
  apellido: string
  email: string
  password?: string
  rolId: IRol
  createdAt?: Date
  updatedAt?: Date
}

export interface IRol {
  id: number,
  nombreRol: string
}


export interface  IAuth {
  nombreUsuario?: string
  email?: string
  password: string
}
