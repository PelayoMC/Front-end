import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadImageService } from '../../service/upload/upload-image.service';
import { ModalUploadService } from '../../service/modals/modal-upload.service';
import { Usuario } from '../../models/usuario.model';
import { UsersService } from '../../service/users/users.service';
import { SwalService } from 'src/app/service/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html'
})
export class ModalUploadComponent implements OnInit {
  imgUpload: any;

  constructor(public carga: UploadImageService, public modalService: ModalUploadService,
              public userService: UsersService, public swal: SwalService) { }

  ngOnInit() {
  }

  upload() {
    this.carga.subirArchivo(this.imgUpload, this.modalService.tipo, this.modalService.id)
    .then( (resp: any) => {
      this.swal.crearSwal('comun.alertas.exito.cambiarImagen', 'success');
      this.modalService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch( err => {
      this.cerrarModal();
      this.swal.crearSwal('comun.alertas.errores.cambiarImagen', 'error');
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
      this.swal.crearSwal('comun.alertas.errores.noImagen', 'error');
      this.imgUpload = null;
      return;
    }
    this.imgUpload = archivo;

    let reader = new FileReader();
    let url = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.modalService.img = reader.result.toString();
  }

}
