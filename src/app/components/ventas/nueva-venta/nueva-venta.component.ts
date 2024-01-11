import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Usuario } from '../../../interfaces/IUsuarios/usuarios';
import { ClientesService } from '../../../services/clientes.service';
import { RespuestaService } from '../../../services/respuesta.service';
import { Cliente } from '../../../interfaces/IClientes/clientes';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductosService } from '../../../services/productos.service';
import {
  Producto,
  ProductoResponse,
} from '../../../interfaces/IProductos/producto';
import { IVentasRequest } from '../../../interfaces/IVentas/ventaRequest';
import { detalleBoleta } from '../../../interfaces/IVentas/boleta';
import { VentaService } from '../../../services/venta.service';

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.css',
})
export class NuevaVentaComponent {
  constructor(
    private clientesService: ClientesService,
    private productosService: ProductosService,
    private ventaService: VentaService
  ) {}

  usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    email: '',
    rolId: 0,
    rol: {
      id: 0,
      nombreRol: '',
    },
  };
  cliente: Cliente = {
    id: 0,
    run: '',
    nombre: '',
    email: '',
    telefono: '',
  };
  producto: ProductoResponse = {
    id: 0,
    nombreProducto: '',
    descripcion: '',
    precioVenta: 0,
    precioCompra: 0,
    sku: '',
    marca: '',
    stock: 0,
    imagen: '',
    categoria: {
      id: 0,
      nombreCategoria: '',
      descripcion: '',
      _count: {
        productos: 0,
      },
    },
  };

  venta: IVentasRequest = {
    idCliente: 0,
    idUsuario: 0,
    detallesVenta: [],
  };

  detalleBoleta: detalleBoleta[] = [];
  tiempo: Date = new Date();
  mensaje: string = '';
  colorAlerta: string = '';
  textoCliente: string = '';
  textoProducto: string = '';
  cantidad: number = 0;
  totalVenta: number = 0;

  clientes: Cliente[] = [];
  productos: ProductoResponse[] = [];

  form = new FormGroup({
    nombreCategoria: new FormControl(''),
    descripcion: new FormControl(''),
  });
  ngOnInit(): void {
    this.obtenerPerfil();
  }
  obtenerPerfil() {
    const perfil = localStorage.getItem('identity');
    if (perfil) {
      this.usuario = JSON.parse(perfil);
      this.venta.idUsuario = this.usuario.id;
    }
  }

  buscarCliente() {
    this.limpiarValores();
    this.clientesService
      .buscarCliente(this.textoCliente)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.body) {
          this.clientes = res.body.clientes;
        }
      });
  }
  buscarProducto() {
    this.limpiarValores();
    this.productosService
      .buscarProductos(this.textoProducto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.body) {
          this.productos = res.body.productos;
        }
      });
  }

  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.clientes = [];
  }

  agregarCliente(input: Cliente) {
    this.cliente = input;
    this.venta.idCliente = input.id;
  }
  agregarProducto(input: ProductoResponse, cantidad: number) {
    this.detalleBoleta.push({
      idProducto: input.id,
      nombreProducto: input.nombreProducto,
      cantidad: cantidad,
      precioVenta: input.precioVenta,
    });
    this.colorAlerta = 'green';
    this.mensaje = 'Producto agregado'
    this.calcularTotal();
    this.venta.detallesVenta.push({ idProducto: input.id, cantidad: cantidad });
  }

  calcularTotal() {
    for (let i = 0; i < this.detalleBoleta.length; i++) {
      const element = this.detalleBoleta[i];
      let subtotal = element.cantidad * element.precioVenta;
      this.totalVenta = this.totalVenta + subtotal;
    }
  }
  eliminarProductoBoleta(i: number) {
    this.detalleBoleta.splice(i, 1);
    this.venta.detallesVenta.splice(i, 1);
    this.totalVenta = 0; // resetear la variable del total antes de volver a calcular
    this.calcularTotal();
    this.colorAlerta = 'red';
    this.mensaje = 'Producto Eliminado';
  }

  crearVenta() {
    this.ventaService
      .crearVenta(this.venta)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.body && res.status === 201) {
          this.colorAlerta = 'green';
          this.mensaje = res.body.msj;
        } else {
          this.colorAlerta = 'red';
          this.mensaje = 'Ha ocurrido un problema';
        }
      });
  }
}
