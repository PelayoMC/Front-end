import { Component, OnInit } from '@angular/core';
import { ModalTermsConditionsService } from '../../service/service.index';

@Component({
  selector: 'app-modal-terms-conditions',
  templateUrl: './modal-terms-conditions.component.html'
})
export class ModalTermsConditionsComponent implements OnInit {

  constructor(public modalService: ModalTermsConditionsService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalService.visible = 'oculto';
  }

  ocultarModal() {
    this.modalService.visible = 'oculto';
  }

}
