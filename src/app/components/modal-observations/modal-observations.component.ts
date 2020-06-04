import { Component, OnInit } from '@angular/core';
import { UsersService, ModalObservationsService } from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-observations',
  templateUrl: './modal-observations.component.html'
})
export class ModalObservationsComponent implements OnInit {

  usuario: Usuario;
  constructor(public modalService: ModalObservationsService, public userService: UsersService) { }

  ngOnInit() {
    this.modalService.user.subscribe(resp => {
      if (resp) {
        this.usuario = resp;
        console.log(this.usuario)
      }
    });
  }

  cerrarModal() {
    this.ocultarModal();
  }

  ocultarModal() {
    this.modalService.oculto = 'oculto';
  }

}
