import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Caja } from '../../interfaces/ICaja/caja';
import { CajaService } from '../../services/caja.service';
import { RouterModule } from '@angular/router';
import { RespuestaService } from '../../services/respuesta.service';

@Component({
  selector: 'app-cajas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cajas.component.html',
  styleUrl: './cajas.component.css',
})
export class CajasComponent {
  cajas: Caja[] = [];
  cajasCerradas: Caja[] = [];
  cajaActiva: Caja[] = [];
  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };
  idCaja: number = 0;

  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;

  constructor(
    private cajaService: CajaService,
    private respuestaService: RespuestaService
  ) {}

  ngOnInit(): void {
    this.limpiarValores();
    this.obtenerCaja(this.paginaActual);
    this.obtenerRespuesta();
  }
  obtenerRespuesta() {
    this.respuestaService.obtenerRespuesta().subscribe((res) => {
      this.respuesta.mensaje = res.mensaje;
      this.respuesta.colorAlerta = res.colorAlerta;
    });
  }

  obtenerCaja(page: number) {
    this.cajaService.obtenerCaja(page).subscribe((res) => {
      if (res.body) {
        this.cajas = res.body.cajas;
        this.cajaActiva = this.cajas.filter((caja) => caja.estado === true);
        this.cajasCerradas = this.cajas.filter((caja) => caja.estado === false);
        if(this.cajaActiva.length){
          this.idCaja = this.cajaActiva[0].id;
        }
      }
    });
  }
  limpiarValores() {
    this.respuesta.mensaje = '';
    this.respuesta.colorAlerta = '';
    this.cajas = [];
  }
  cambiarPagina(page: number) {
    this.paginaActual = page;
    this.obtenerCaja(this.paginaActual);
  }
}
