import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { RespuestaService } from '../../../services/respuesta.service';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../interfaces/ICategorias/categorias';
import { ProductoResponse } from '../../../interfaces/IProductos/producto';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriasComponent } from '../../categorias/categorias.component';
import { NuevaCategoriaComponent } from '../../categorias/nueva-categoria/nueva-categoria.component';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NuevaCategoriaComponent],
  templateUrl: './actualizar-producto.component.html',
  styleUrl: './actualizar-producto.component.css',
})
export class ActualizarProductoComponent {
  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private respuestaService: RespuestaService,
    private router: Router
  ) {}
  categoria: Categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
    _count: {
      productos: 0,
    },
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
    categoria: this.categoria,
    secure_image_url: '',
  };
  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };

  id: number = 0;
  url: string = environment.URL;
  img: string | ArrayBuffer = '';
  nuevaCategoria: boolean = false;
  categorias: Categoria[] = [];
  file = new File([], '', { type: '' });

  form = new FormGroup({
    id: new FormControl(),
    nombreProducto: new FormControl(),
    descripcion: new FormControl(),
    precioVenta: new FormControl(0),
    precioCompra: new FormControl(0),
    sku: new FormControl(),
    marca: new FormControl(),
    stock: new FormControl(0),
    imagen: new FormControl(),
    idCategoria: new FormControl(0),
  });

  ngOnInit(): void {
    this.obtenerParametrosUrl();
    this.obtenerCategorias();
    this.obtenerProductoPorId();
    this.visualizarImg();
  }
  obtenerParametrosUrl() {
    const url = this.router.parseUrl(this.router.url);
    this.id = parseInt(url.queryParams['id']);
  }

  obtenerProductoPorId() {
    this.productosService.obtenerProductoPorId(this.id).subscribe((res) => {
      if (res.body) {
        this.producto = res.body.producto;
        this.visualizarImg();
        this.actualizarFormulario();
      }
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

  actualizarProducto() {
    const form: any = document.getElementById('form');
    const submitter = document.getElementById('btnSubmit');
    if (form) {
      const formData = new FormData(form, submitter);
      this.productosService
        .actualizarProducto(this.id, formData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.respuesta.colorAlerta = 'yellow';
            this.respuesta.mensaje = error.error.msj;
            let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido
            return throwError(errorMessage);
          })
        )
        .subscribe((res) => {
          if (res.body) {
            this.form.reset();
            this.respuesta.colorAlerta = 'green';
            this.respuesta.mensaje = res.body?.msj;
            this.respuestaService.enviarRespuesta(this.respuesta);
            this.router.navigate(['/productos']);
          }
        });
    }
  }
  visualizarImg() {
    this.img = '';
    if (this.producto.secure_image_url) {
      this.img = this.producto.secure_image_url;
    } else {
      this.img = '../../../../assets/img/woocommerce-placeholder.png';
    }
  }
  actualizarFormulario() {
    this.form.patchValue({
      nombreProducto: this.producto.nombreProducto,
      precioVenta: this.producto.precioVenta || 0,
      precioCompra: this.producto.precioCompra || 0,
      sku: this.producto.sku,
      marca: this.producto.marca,
      stock: this.producto.stock || 0,
      idCategoria: this.producto.categoria.id || 0,
    });
  }
  respuestaCategoria(res: any) {
    if (res.ok) {
      this.respuesta.colorAlerta = 'green';
      this.respuesta.mensaje = res.msj;
      this.obtenerCategorias();
    } else {
      this.respuesta.mensaje = 'Ha ocurrido un Error';
      this.respuesta.colorAlerta = 'yellow';
    }
  }
  mostrarNuevaCategoria() {
    this.nuevaCategoria = !this.nuevaCategoria;
  }
  actualizarTablaCategorias(res: any) {
    if (res.ok) {
      this.respuesta.colorAlerta = 'green';
      this.respuesta.mensaje = res.msj;
      this.categoria = res.categoria;
      this.obtenerCategorias();
      this.mostrarNuevaCategoria();
    }
  }
}
