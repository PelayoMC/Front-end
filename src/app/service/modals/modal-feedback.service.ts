import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalFeedbackService {

  public oculto = 'oculto';
  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
  }

  mostrarModal() {
    this.oculto = '';
  }
}
