import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCreateUserService {
  public oculto: string = 'oculto';
  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
  }

  mostrarModal() {
    this.oculto = '';
  }
}
