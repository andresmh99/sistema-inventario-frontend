import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ProductoResponse } from '../../../interfaces/IProductos/producto';
import { ProductosService } from '../../../services/productos.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {
  constructor(private productosService: ProductosService) {}
  categoria = {
    id: 0,
    nombreCategoria: '',
    descripcion: '',
  };
  @Input() producto: ProductoResponse= {
    id: 0,
    nombreProducto: '',
    descripcion: '',
    precioVenta: 0,
    precioCompra: 0,
    sku: '',
    marca: '',
    stock: 0,
    imagen:'',
    categoria: this.categoria,
  };
  modal: boolean = false;
  url: string = environment.URL
  img: string = ''





  ngOnInit(): void {
    this.visualizarImg();
  }


  visibilidadModal() {
    this.modal = !this.modal
    if(this.modal){

    }
  }
  visualizarImg(){
    if(this.producto.imagen){
      this.img = this.url + '/' + this.producto.imagen
    }else{
      this.img = '../../../../assets/img/woocommerce-placeholder.png'
    }
  }
}
