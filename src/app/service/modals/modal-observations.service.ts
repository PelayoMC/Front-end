import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalObservationsService {

  user: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(new Usuario());
  public oculto = 'oculto';
  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
  }

  mostrarModal(user: Usuario) {
    this.oculto = '';
    this.user.next(user);
  }
}
