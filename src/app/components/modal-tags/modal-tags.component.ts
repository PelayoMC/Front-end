import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalTagService, TagsService } from '../../service/service.index';
import { NgForm } from '@angular/forms';
import { Etiqueta } from '../../models/etiqueta.model';

@Component({
  selector: 'app-modal-tags',
  templateUrl: './modal-tags.component.html'
})
export class ModalTagsComponent implements OnInit {

  @Output() created = new EventEmitter();

  constructor(public modalService: ModalTagService, public tagService: TagsService) { }

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
      let tag = new Etiqueta(
        form.form.value.nombre
      );
      this.tagService.crearEtiqueta(tag).subscribe((resp: any) => {
        this.created.emit();
        this.limpiarModal(form);
        this.cerrarModal(form);
      }, err => this.cerrarModal(form));
    }
  }

  limpiarModal(form: NgForm) {
    form.resetForm();
    form.form.setValue({nombre: ''});
  }
}
