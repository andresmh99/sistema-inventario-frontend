import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { RespuestaFrontend } from '../interfaces/IRespuesta';

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  constructor() {}

  respuesta = {
    mensaje: '',
    colorAlerta: '',
  };

  private respuestaSubject = new BehaviorSubject<RespuestaFrontend>(this.respuesta);

  enviarRespuesta(respuesta: RespuestaFrontend) {
    this.respuestaSubject.next(respuesta);
  }

  obtenerRespuesta() {
    return this.respuestaSubject.asObservable();
  }
}
