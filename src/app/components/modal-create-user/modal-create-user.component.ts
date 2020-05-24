import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalCreateUserService, SwalService } from '../../service/service.index';
import { UsersService } from '../../service/users/users.service';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html'
})
export class ModalCreateUserComponent implements OnInit {

  usuario: Usuario;
  selected: string;
  passEqual = true;

  @Output() created = new EventEmitter();

  constructor(public modalCreateUser: ModalCreateUserService, public userService: UsersService,
              public router: Router, public swal: SwalService) { }

  ngOnInit() {
    this.usuario = this.userService.usuario.value;
    this.selected = 'USER';
  }

  cerrarModal(form: NgForm) {
    this.limpiarModal(form);
    this.ocultarModal();
  }

  ocultarModal() {
    this.modalCreateUser.oculto = 'oculto';
  }

  limpiarModal(form: NgForm) {
    form.resetForm();
    form.form.setValue({nombre: '', email: '', password: '', password2: '', rol: 'USER'});
  }

  crearUsuario(form: NgForm) {
    if (form.form.valid) {
      const user = new Usuario(
        form.form.value.nombre,
        form.form.value.email,
        form.form.value.password,
        null,
        form.form.value.rol,
        false,
        null
      );
      this.userService.crearUsuario(user).subscribe((resp: any) => {
        this.swal.crearSwal('comun.alertas.exito.crearUsuario', 'success');
        this.ocultarModal();
        this.created.emit();
      }, err => this.cerrarModal(form));
    }
  }

  checkPass(form: NgForm) {
    if (form.form.value.password === form.form.value.password2) {
      this.passEqual = true;
    } else {
      this.passEqual = false;
    }
  }
}
