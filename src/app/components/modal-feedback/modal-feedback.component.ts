import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalShowService, DietService } from 'src/app/service/service.index';
import { Dieta } from '../../models/dieta.model';

@Component({
  selector: 'app-modal-feedback',
  templateUrl: './modal-feedback.component.html'
})
export class ModalFeedbackComponent implements OnInit {

  feedback: string;
  @Input() dieta: Dieta;

  constructor(public modalService: ModalShowService, public dietaService: DietService) { }

  ngOnInit() {
  }

  cerrarModal(form: NgForm) {
    this.limpiarModal(form);
    this.ocultarModal();
  }

  ocultarModal() {
    this.modalService.visible = 'oculto';
  }

  crearTag(form: NgForm) {
    if (form.form.valid) {
      console.log(this.feedback);
      // this.tagService.crearEtiqueta(tag).subscribe((resp: any) => {
      //   this.created.emit();
      //   this.limpiarModal(form);
      //   this.cerrarModal(form);
      // }, err => this.cerrarModal(form));
    }
  }

  limpiarModal(form: NgForm) {
    form.resetForm();
    form.form.setValue({comentario: ''});
  }

}
