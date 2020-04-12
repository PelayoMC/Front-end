import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsersService } from '../../service/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../service/modals/modal-upload.service';
import { ModalCreateUserService } from '../../service/modals/modal-create-user.service';
import { UsuarioDecorator } from '../../models/decorators/user-decorator.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  usuarios: UsuarioDecorator[] = [];
  cargando: boolean = true;
  from: number = 0;
  total: number = 0;

  constructor(public usuariosService: UsersService, public modalService: ModalUploadService, public modalUser: ModalCreateUserService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalService.notificacion.subscribe(resp => { this.cargarUsuarios(); });
  }

  mostrarModal(id: string, tipo: string, img: string, usuario: Usuario) {
    if (tipo === 'upload') {
      if (usuario.email === this.usuariosService.usuario.value.email) {
        Swal.fire('Error', 'Cambie su imagen desde su perfil de usuario', 'error');
      } else {
        this.modalService.mostrarModal('usuarios', id, img);
      }
    } else if (tipo === 'user') {
      this.modalUser.mostrarModal();
    }
  }

  cargarUsuarios() {
    this.cargando = true;
    if (this.busqueda.nativeElement.value.length === 0) {
      this.usuariosService.cargarUsuarios(this.from).subscribe((resp: any) => {
        const arr = resp.usuarios;
        const arr2: UsuarioDecorator[] = [];
        for (let i = 0; i < arr.length; i++) {
          arr2[i] = new UsuarioDecorator(arr[i], false);
        }
        this.usuarios = arr2;
        this.total = resp.total;
        this.cargando = false;
        this.busqueda.nativeElement.select();
      });
    } else {
      this.buscarUsuarios(this.busqueda.nativeElement.value);
    }
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (termino.length < 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.from = 0;
    this.usuariosService.buscarUsuarios(termino, this.from).subscribe(
      (resp: any) => {
        const arr: Usuario[] = resp.coleccion;
        const arr2: UsuarioDecorator[] = [];
        for (let i = 0; i < arr.length; i++) {
          arr2[i] = new UsuarioDecorator(arr[i], false);
        }
        this.usuarios = arr2;
        this.total = resp.total;
        this.cargando = false;
        console.log(this.total);
      }
    );
  }

  usuarioPropio(us: Usuario) {
    return 'us.email === usuariosService.usuario.value.email';
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuariosService.usuario.value._id) {
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
    if (usuario._id === this.usuariosService.usuario.value._id) {
      Swal.fire('No se puede actualizar el usuario', 'Esta acción no está permitida para sí mismo', 'error');
      return;
    }
    this.usuariosService.modificarUsuario(usuario).subscribe(resp => {
      this.cargarUsuarios();
    });
  }

}
