import { Injectable, EventEmitter } from '@angular/core';
import { ImagePipe } from '../../pipes/image.pipe';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public img: string;
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();
  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
    this.img = null;
  }

  mostrarModal(tipo: string, id: string, img: string) {
    this.id = id;
    this.tipo = tipo;
    this.oculto = '';
    this.img = new ImagePipe().transform(img);
  }
}
