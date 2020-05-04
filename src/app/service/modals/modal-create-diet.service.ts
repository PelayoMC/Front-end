import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCreateDietService {
  public oculto = 'oculto';
  public i: number;
  public j: number;
  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.i = 0;
    this.j = 0;
  }

  mostrarModal(i: number, j: number) {
    this.oculto = '';
    this.i = i;
    this.j = j;
  }
}
