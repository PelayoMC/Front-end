import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalTagService {

  constructor() { }

  public visible: string = 'oculto';

  mostrarModal() {
    this.visible = '';
  }

  ocultarModal() {
    this.visible = 'oculto';
  }
}
