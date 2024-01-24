import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaService } from '../../../services/caja.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaService } from '../../../services/respuesta.service';
import { Usuario } from '../../../interfaces/IUsuarios/usuarios';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface Denominacion {
  nombre: string;
  valor: number;
}
@Component({
  selector: 'app-cierre-caja',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cierre-caja.component.html',
  styleUrl: './cierre-caja.component.css',
})
export class CierreCajaComponent {
  constructor(
    private cajaService: CajaService,
    private router: Router,
    private respuestaService: RespuestaService
  ) {}

  ngOnInit(): void {
    this.obtenerParametrosUrl();
  }

  montoActual: number = 0;
  idCaja: number = 0;
  respuesta = {
    mensaje: '',
    colorAlerta: 'yellow',
  };
  usuario: Usuario = {
    id: 0,
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    email: '',
    rolId: 0,
    rol: {
      id: 0,
      nombreRol: '',
    },
  };
  cantidadBilletes: { [key: string]: number } = {};
  total: number = 0;

  form = new FormGroup({
    idCaja: new FormControl(0),
    montoCierre: new FormControl(),
    comentarios: new FormControl(),
  });

  denominaciones: Denominacion[] = [
    { nombre: '$20.000', valor: 20000 },
    { nombre: '$10', valor: 10 },
    { nombre: '$10.000', valor: 10000 },
    { nombre: '$50', valor: 50 },
    { nombre: '$5.000', valor: 5000 },
    { nombre: '$100', valor: 100 },
    { nombre: '$2.000', valor: 2000 },
    { nombre: '$500', valor: 500 },
    { nombre: '$1.000', valor: 1000 },
  ];

  obtenerParametrosUrl() {
    const url = this.router.parseUrl(this.router.url);
    this.idCaja = url.queryParams['id'];
    this.montoActual = url.queryParams['mactual'];
  }

  calcularTotal() {
    this.total = 0;
    for (const denominacion of this.denominaciones) {
      const cantidad = this.cantidadBilletes[denominacion.nombre] || 0;
      this.total += cantidad * denominacion.valor;
    }
  }
  limpiarInputs() {
    this.cantidadBilletes = {}; // Reinicia el objeto a un objeto vacío
    this.total = 0; // Reinicia el total a cero
  }

  cerrarCaja() {

    this.form.value.idCaja = Number(this.idCaja);
    this.form.value.montoCierre = this.total
    console.log(this.form.value.montoCierre);
    this.cajaService
      .cerrarCaja(this.form.value)
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
          this.respuesta.colorAlerta = 'green';
          this.respuesta.mensaje = res.body.msj;
          this.router.navigate(['/cajas']).then(() => {
            this.respuestaService.enviarRespuesta(this.respuesta);
          });
        }
      });
  }
}
