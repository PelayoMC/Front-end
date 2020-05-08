import { Injectable } from '@angular/core';
import { Dieta } from '../../models/dieta.model';

@Injectable({
  providedIn: 'root'
})
export class ModalCommentDietService {

  public oculto = 'oculto';
  public dieta: Dieta;
  public index: number;

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.dieta = null;
    this.index = 0;
  }

  mostrarModal(dieta: Dieta, index: number) {
    this.oculto = '';
    this.dieta = dieta;
    this.index = index;
  }
}
