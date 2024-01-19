import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoResponse } from '../../../interfaces/IProductos/producto';
import { RespuestaService } from '../../../services/respuesta.service';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../interfaces/ICategorias/categorias';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css',
})
export class OpcionesComponent {
  constructor(
    private productosService: ProductosService,
    private respuestaService: RespuestaService,
    private route: Router
  ) {}
  @Output() actualizarTabla: EventEmitter<void> = new EventEmitter<void>();

  modalEliminar: boolean = false;

  mensaje: string = '';
  colorAlerta: string = '';
  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };

  categoria: Categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
    _count: {
      productos: 0,
    },
  };
  @Input() producto: ProductoResponse = {
    id: 0,
    nombreProducto: '',
    descripcion: '',
    precioVenta: 0,
    precioCompra: 0,
    sku: '',
    marca: '',
    stock: 0,
    imagen: '',
    categoria: this.categoria,
  };

  ngOnInit(): void {}

  visibilidadModalEliminar() {
    this.modalEliminar = !this.modalEliminar;
  }

  eliminar() {
    this.modalEliminar = false;
    this.productosService
      .eliminarProducto(this.producto.id)
      .subscribe((res) => {
        if (res.body) {
          this.respuesta.mensaje = res.body.msj;
          this.respuesta.colorAlerta = 'green';
        }
        this.route.navigate(['/productos']).then(() => {
          this.actualizarTabla.emit();
          this.respuestaService.enviarRespuesta(this.respuesta);
        });
      });
  }
}
