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
import { Router, RouterModule } from '@angular/router';
import { RespuestaService } from '../../../services/respuesta.service';
import { NuevaCategoriaComponent } from '../../categorias/nueva-categoria/nueva-categoria.component';
import { Categoria } from '../../../interfaces/ICategorias/categorias';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriasComponent,
    RouterModule,
    NuevaCategoriaComponent,
  ],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css',
})
export class AgregarProductoComponent {
  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private respuestaService: RespuestaService,
    private route: Router
  ) {}

  file = new File([], '', { type: '' });
  categoria: Categoria = {
    id: 0,
    nombreCategoria: 'Seleccione Categoria',
    descripcion: '',
    _count: {
      productos: 0,
    },
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
  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };
  nuevaCategoria: boolean = false;
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
    this.categoriasService.obtenerCategorias().subscribe((res: any) => {
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
      .subscribe((res) => {
        if (res.ok === true) {
          this.form.reset();
          this.route.navigate(['/productos']).then(() => {
            this.respuesta.mensaje = res.msj;
            this.respuesta.colorAlerta = 'green';
            this.respuestaService.enviarRespuesta(this.respuesta);
          });
        }
      });
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
  mostrarNuevaCategoria() {
    this.nuevaCategoria = !this.nuevaCategoria;
  }
  actualizarTabla(res: any) {
    if (res.ok) {
      this.colorAlerta = 'green';
      this.mensaje = res.msj;
      this.categoria = res.categoria;
      this.obtenerCategorias();
      this.mostrarNuevaCategoria();
    }
  }
}
