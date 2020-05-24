import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalCommentDietService, SwalService } from '../../service/service.index';
import { NgForm } from '@angular/forms';
import { DietService } from '../../service/diet/diet.service';

@Component({
  selector: 'app-modal-comment-diet',
  templateUrl: './modal-comment-diet.component.html'
})
export class ModalCommentDietComponent implements OnInit {

  constructor(public dietService: DietService, public modalService: ModalCommentDietService, public swal: SwalService) { }

  ngOnInit() {
  }

  cerrarModal(form: NgForm) {
    this.limpiarModal(form);
    this.ocultarModal();
  }

  ocultarModal() {
    this.modalService.ocultarModal();
  }

  crearComment(form: NgForm) {
    if (form.form.valid) {
      this.modalService.dieta.dieta[this.modalService.index].comentario = form.form.value.comentario;
      console.log(this.modalService.dieta);
      this.dietService.modificarDieta(this.modalService.dieta).subscribe(resp => {
        this.limpiarModal(form);
        this.cerrarModal(form);
        this.swal.crearSwal('comun.alertas.exito.comentario', 'success');
      }, err => this.cerrarModal(form));
    }
  }

  limpiarModal(form: NgForm) {
    form.resetForm();
    form.form.setValue({comentario: ''});
  }

}
