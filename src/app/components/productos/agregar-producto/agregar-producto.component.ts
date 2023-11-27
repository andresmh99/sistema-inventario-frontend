import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../interfaces/IProductos/producto';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { RespuestaBackend } from '../../../interfaces/respuesta-backend';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriasComponent } from '../../categorias/categorias.component';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriasComponent,
  ],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css',
})
export class AgregarProductoComponent {
  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService
  ) {}
  @Output()
  respuesta = new EventEmitter<RespuestaBackend>();

  file = new File([], '', { type: '' });
  categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
  };
  producto: Producto = {
    id: 0,
    nombreProducto: '',
    descripcion: '',
    precioVenta: 0,
    precioCompra: 0,
    sku: '',
    marca: '',
    stock: 0,
    imagen: new File([], '', { type: '' }),
    categoria: this.categoria,
  };

  categorias: any[] = [];
  mensaje: string = '';
  colorAlerta: string = '';
  modal: boolean = false;
  vistaPreviaImg: string | ArrayBuffer =
    '../../../../assets/img/woocommerce-placeholder.png';

  ngOnInit(): void {
    this.obtenerCategorias();
  }
  obtenerCategorias() {
    this.categoriasService.getCategories().subscribe((res: any) => {
      this.categorias = res.categorias;
    });
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

  crearProducto() {
    this.productosService
      .crearProducto(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res: any) => {
        if (res.ok === true) {
          this.respuesta.emit(res);
          this.form.reset();
          this.modal = false;
        }
      });
  }

  visibilidadModal() {
    this.modal = !this.modal;
    this.mensaje ='';
  }

  imgSeleccionada(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof reader.result === 'string') {
          this.vistaPreviaImg = reader.result;
        }
      };
      reader.readAsDataURL(this.file);
    }
  }
  respuestaCategoria(res: any) {
    if (res.ok) {
      this.colorAlerta = 'green';
      this.mensaje = res.msj;
      this.obtenerCategorias();
    } else {
      this.mensaje = 'Ha ocurrido un Error';
      this.colorAlerta = 'yellow';
    }
  }
}
