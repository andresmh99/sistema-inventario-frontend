import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Caja } from '../../interfaces/ICaja/caja';
import { CajaService } from '../../services/caja.service';
import { RouterModule } from '@angular/router';
import { RespuestaService } from '../../services/respuesta.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cajas',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
  caja: any = {};

  paginaActual: number = 1;
  numeroPaginas: number = 0;
  totalRegistros: number = 0;
  modalDeposito: boolean = false;
  restanteCaja: number = 0;
  colorRestanteCaja: string = 'green';
  form = new FormGroup({
    idCaja: new FormControl(0),
    idCierreCaja: new FormControl(),
    montoDeposito: new FormControl(),
  });

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
        if (this.cajaActiva.length) {
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
  visualizarModalDeposito(caja: any) {
    this.modalDeposito = !this.modalDeposito;
    if (caja) {
      this.caja = caja;
      console.log(caja);
      this.form.patchValue({
        idCaja: this.caja.id,
        idCierreCaja: this.caja.cierreCaja.id,
      });
    }
  }
  deposito() {
    console.log(this.form.value);
    this.cajaService
      .ingresarDeposito(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.respuesta.mensaje = error.error.msj;
          this.respuesta.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.body) {
          this.respuesta.mensaje = res.body.msj;
          this.respuesta.colorAlerta = 'green';
          this.modalDeposito = false;
        }
      });
  }
  calcularRestanteCaja() {
    this.respuesta.mensaje = '';
    this.colorRestanteCaja = 'green';
    const deposito = this.form.value.montoDeposito;
    const montoCierre = this.caja.cierreCaja.montoCierre;
    this.restanteCaja = montoCierre - deposito;
    if (this.restanteCaja < 0) {
      this.respuesta.mensaje =
        'No es posible realizar un depósito con un valor superior al monto de cierre de caja.';
      this.respuesta.colorAlerta = 'red';
      this.colorRestanteCaja = 'red';
    } else if (this.restanteCaja === 0) {
      this.respuesta.mensaje =
        '¡Advertencia! Al proceder con esta acción, podrías dejar la caja con un monto de 0, lo cual podría complicar tu próximo periodo de ventas. Por favor, procede con precaución.';
      this.respuesta.colorAlerta = 'yellow';
      this.colorRestanteCaja = 'yellow';
    }
  }
}
