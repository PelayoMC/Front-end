import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadImageService } from '../../service/upload/upload-image.service';
import { ModalUploadService } from '../../service/modal-upload/modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html'
})
export class ModalUploadComponent implements OnInit {
  imgUpload: any;
  imgTemp: string;


  constructor(public carga: UploadImageService, public modalService: ModalUploadService) { }

  ngOnInit() {
  }

  upload() {
    this.carga.subirArchivo(this.imgUpload, this.modalService.tipo, this.modalService.id)
    .then( resp => {
      this.modalService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch( err => {
      console.log('ERROR');
    });
  }

  cerrarModal() {
    this.imgUpload = null;
    this.imgTemp = null;
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
    reader.onloadend = () => this.imgTemp = reader.result.toString();
  }

}
