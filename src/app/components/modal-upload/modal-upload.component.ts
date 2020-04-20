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

  constructor(public carga: UploadImageService, public modalService: ModalUploadService, public userService: UsersService) { }

  ngOnInit() {
  }

  upload() {
    this.carga.subirArchivo(this.imgUpload, this.modalService.tipo, this.modalService.id)
    .then( (resp: any) => {
      Swal.fire('Imagen actualizada', 'La imagen se ha actualizado con éxito', 'success');
      this.modalService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch( err => {
      this.cerrarModal();
      Swal.fire('Imagen no actualizada', 'Error al actualizar la imagen', 'error');
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
