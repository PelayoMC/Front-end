import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalTermsConditionsService {

  constructor() { }

  public visible = 'oculto';

  mostrarModal() {
    this.visible = '';
  }

  ocultarModal() {
    this.visible = 'oculto';
  }
}
