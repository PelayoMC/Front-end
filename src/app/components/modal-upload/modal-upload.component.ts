import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadImageService } from '../../service/upload/upload-image.service';
import { ModalUploadService } from '../../service/modals/modal-upload.service';
import { Usuario } from '../../models/usuario.model';
import { UsersService } from '../../service/users/users.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html'
})
export class ModalUploadComponent implements OnInit {
  imgUpload: any;
  imgTemp: string;

  constructor(public carga: UploadImageService, public modalService: ModalUploadService, public userService: UsersService) { }

  ngOnInit() {
  }

  upload() {
    this.carga.subirArchivo(this.imgUpload, this.modalService.tipo, this.modalService.id)
    .then( (resp: any) => {
      if (this.modalService.tipo === 'usuarios') {
        this.userService.usuario.imagen = JSON.parse(resp).usuario.imagen;
        this.userService.guardarStorage(this.modalService.id, this.userService.token, this.userService.usuario);
        Swal.fire('Imagen actualizada', this.userService.usuario.email, 'success');
      }
      this.modalService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch( err => {
      console.log('ERROR');
    });
  }

  cerrarModal() {
    this.imgUpload = null;
    this.modalService.img = null;
    this.modalService.ocultarModal();
  }

  chooseImage(archivo) {
    if (!archivo) {
      this.imgUpload = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error');
      this.imgUpload = null;
      return;
    }
    this.imgUpload = archivo;

    let reader = new FileReader();
    let url = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.modalService.img = reader.result.toString();
  }

}
