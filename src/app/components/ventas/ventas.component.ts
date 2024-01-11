import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta.service';
import { IVentas, Venta } from '../../interfaces/IVentas/ventaResponse';
import { RouterLink } from '@angular/router';
import { ProductoResponse } from '../../interfaces/IProductos/producto';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent {
  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.obtenerVentas(this.paginaActual);
  }

  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  textoVenta: string = '';
  mensaje: string = '';
  colorAlerta: string = '';
  ventas: Venta[] = [];

  obtenerVentas(page: number) {
    this.ventaService.obtenerVentas(page).subscribe((res) => {
      if (res.body && res.ok) {
        this.actualizarDatosVentas(res.body);
      }
    });
  }

  buscarVenta() {
    // Lógica para buscar una venta similar al método buscarCliente del componente Clientes
  }

  actualizarDatosVentas(res: IVentas) {
    this.ventas = res.ventas;
    if (res.info) {
      this.totalRegistros = res.info.count;
      this.numeroPaginas = res.info.pages;
    }
  }

  limpiarValores() {
    this.mensaje = '';
    this.colorAlerta = '';
    this.ventas = [];
  }

  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerVentas(this.paginaActual);
  }

  actualizarTabla() {
    this.obtenerVentas(this.paginaActual);
  }
}
