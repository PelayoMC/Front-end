import { Component, OnInit } from '@angular/core';
import { ModalCreateUserService } from '../../service/service.index';
import { UsersService } from '../../service/users/users.service';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html'
})
export class ModalCreateUserComponent implements OnInit {

  usuario: Usuario;
  selected: string;

  constructor(public modalCreateUser: ModalCreateUserService, public userService: UsersService) { }

  ngOnInit() {
    this.usuario = this.userService.usuario;
    this.selected = 'USER';
  }

  cerrarModal(form: NgForm) {
    form.resetForm();
    form.form.setValue({nombre: '', email: '', password: '', password2: '', rol: 'USER'});
    this.modalCreateUser.oculto = 'oculto';
  }

  crearUsuario(form: any) {
    console.log(form.form.value);
  }
}
