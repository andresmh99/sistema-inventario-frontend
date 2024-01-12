import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MetodoPago } from '../../../interfaces/IVentas/ventaResponse';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RespuestaService } from '../../../services/respuesta.service';
import { MontoVentaService } from '../../../services/monto-venta.service';

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
  mensaje: string = '';
  colorAlerta: string = '';
  metodosPago: MetodoPago[] = [];

  form = new FormGroup({
    monto: new FormControl(0),
    idMetodoPago: new FormControl(0),
  });

  constructor(
    private metodoPagoService: MetodoPagoService,
    private respuestaService: RespuestaService,
    private montoVentaService: MontoVentaService
  ) {}

  ngOnInit(): void {
    this.obtenerRespuesta();
    this.obtenerMetodoDePago();
  }
  obtenerMetodoDePago() {
    this.metodoPagoService
      .obtenerMetodoPagos()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
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
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        this.mensaje = res.mensaje;
        this.colorAlerta = res.colorAlerta;
      });
  }

  agregarMontoVenta() {
    this.montoVentaService
      .crearMontoVenta(this.idVenta, this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          this.mensaje = error.error.msj;
          this.colorAlerta = 'yellow';
          let errorMessage = error.error.msj; // Mensaje predeterminado en caso de error desconocido

          return throwError(errorMessage);
        })
      )
      .subscribe((res) => {
        if (res.body) {
          this.mensaje = res.body.msj;
          this.colorAlerta = 'green';
        }
      });
  }
}
