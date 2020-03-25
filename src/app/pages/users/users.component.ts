import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsersService } from '../../service/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../service/modal-upload/modal-upload.service';
import { ModalCreateUserService } from '../../service/modal-upload/modal-create-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = true;
  from: number = 0;
  total: number = 0;

  constructor(public usuariosService: UsersService, public modalService: ModalUploadService, public modalUser: ModalCreateUserService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalService.notificacion.subscribe(resp => { this.cargarUsuarios(); });
  }

  mostrarModal(id: string, tipo: string) {
    if (tipo === 'upload') {
      this.modalService.mostrarModal('usuarios', id);
    } else if (tipo === 'user') {
      this.modalUser.mostrarModal();
    }
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.from).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let value = this.from + valor;
    console.log(value);
    if (value >= this.total || value < 0) {
      return;
    }
    this.from = value;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (termino.length < 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuariosService.buscarUsuarios(termino).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      }
    );
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuariosService.usuario._id) {
      Swal.fire('No se puede borrar el usuario', 'No puede borrarse a sí mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: 'Está a punto de borrar el usuario ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuariosService.borrarUsuario(usuario._id).subscribe((resp: any) => {
          if (resp.nombre === usuario.nombre) {
            Swal.fire(
              'Usuario borrado',
              'El usuario ha sido borrado correctamente',
              'success'
            );
            this.cargarUsuarios();
          } else {
            Swal.fire(
              'Usuario no borrado',
              'El usuario no se ha podido borrar correctamente',
              'error'
            );
          }
        })
      }
    });
  }

  actualizarUsuario(usuario: Usuario) {
    this.usuariosService.modificarUsuario(usuario).subscribe();
  }

}
