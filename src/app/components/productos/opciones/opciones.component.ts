import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos.service';
import { RespuestaBackend } from '../../../interfaces/respuesta-backend';
import { CategoriasService } from '../../../services/categorias.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ProductoResponse } from '../../../interfaces/IProductos/producto';
import { environment } from '../../../../environments/environment';
import { RespuestaService } from '../../../services/respuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.css',
})
export class OpcionesComponent {
  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private respuestaService: RespuestaService,
    private route: Router
  ) {}
  @Output() actualizarTabla: EventEmitter<void> = new EventEmitter<void>();
  @Input() id: string = '';
  categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
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

  url: string = environment.URL;
  img: string | ArrayBuffer = '';
  modalEliminar: boolean = false;
  modalEditar: boolean = false;
  mensaje: string = '';
  colorAlerta: string = '';
  categorias: any[] = [];
  file = new File([], '', { type: '' });
  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };

  ngOnInit(): void {
    this.obtenerCategorias();
    this.visualizarImg();
  }

  form = new FormGroup({
    id: new FormControl(''),
    nombreProducto: new FormControl(''),
    descripcion: new FormControl(''),
    precioVenta: new FormControl(''),
    precioCompra: new FormControl(''),
    sku: new FormControl(''),
    marca: new FormControl(''),
    stock: new FormControl(''),
    imagen: new FormControl(''),
    categoria: new FormControl(''),
  });

  visibilidadModalEliminar() {
    this.modalEliminar = !this.modalEliminar;
  }
  visibilidadModalEditar() {
    this.modalEditar = !this.modalEditar;
    if (!this.modalEditar) {
      this.form.reset();
      this.visualizarImg();
    }
  }

  eliminar() {
    this.modalEliminar = false;
    this.productosService.eliminarProducto(this.id).subscribe((res) => {
      this.respuesta.mensaje = res.msj;
      this.respuesta.colorAlerta = 'green';
      this.route.navigate(['/productos']).then(() => {
        this.actualizarTabla.emit();
        this.respuestaService.enviarRespuesta(this.respuesta);
      });
    });
  }
  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().subscribe((res: any) => {
      this.categorias = res.categorias;
    });
  }
  imgSeleccionada(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof reader.result === 'string') {
          this.img = reader.result;
        }
      };
      reader.readAsDataURL(this.file);
    }
  }
  editarProducto() {
    this.productosService
      .actualizarProducto(this.id, this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.ok === true) {
          this.actualizarTabla.emit();

          this.form.reset();
          this.modalEditar = false;
        }
      });
  }
  visualizarImg() {
    this.img = '';
    if (this.producto.imagen) {
      this.img = this.url + '/' + this.producto.imagen;
    } else {
      this.img = '../../../../assets/img/woocommerce-placeholder.png';
    }
  }
}
