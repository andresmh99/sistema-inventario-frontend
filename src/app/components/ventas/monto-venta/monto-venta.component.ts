import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MetodoPago } from '../../../interfaces/IVentas/ventaResponse';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RespuestaService } from '../../../services/respuesta.service';
import { MontoVentaService } from '../../../services/monto-venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monto-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './monto-venta.component.html',
  styleUrl: './monto-venta.component.css',
})
export class MontoVentaComponent {
  @Input() modalMontoVenta: boolean = false;
  @Input() idVenta: number = 0;
  @Input() montoPendiente: number = 0;
  metodosPago: MetodoPago[] = [];
  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };

  form = new FormGroup({
    monto: new FormControl(0),
    idMetodoPago: new FormControl(0),
  });

  constructor(
    private metodoPagoService: MetodoPagoService,
    private respuestaService: RespuestaService,
    private montoVentaService: MontoVentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.limpiarValores();
    this.obtenerRespuesta();
    this.obtenerMetodoDePago();
  }
  visibilidadModalMontoVenta() {
    this.modalMontoVenta = !this.modalMontoVenta;
    this.router.navigate(['ventas'])
  }
  obtenerMetodoDePago() {
    this.metodoPagoService
      .obtenerMetodoPagos()
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
          this.metodosPago = res.body.metodosPago;
        }
      });
  }
  obtenerRespuesta() {
    this.respuestaService
      .obtenerRespuesta()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.respuesta.mensaje = error.error.msj;
          this.respuesta.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        this.respuesta.mensaje = res.mensaje;
        this.respuesta.colorAlerta = res.colorAlerta;
      });
  }

  agregarMontoVenta() {
    this.montoVentaService
      .crearMontoVenta(this.idVenta, this.form.value)
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
          this.montoPendiente = res.body.montoPendiente;
          this.respuesta.mensaje = res.body.msj;
          this.respuesta.colorAlerta = 'green';
          if (this.montoPendiente == undefined) {
            this.modalMontoVenta = false;
            this.router.navigate(['/ventas']).then(() => {
              this.respuestaService.enviarRespuesta(this.respuesta);
            });
          }
        }
      });
  }

  limpiarValores() {
    this.respuesta.mensaje = '';
    this.respuesta.colorAlerta = '';
  }
}
