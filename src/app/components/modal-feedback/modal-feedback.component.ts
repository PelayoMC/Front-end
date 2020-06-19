import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService, DietService, ModalFeedbackService, SwalService } from 'src/app/service/service.index';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-modal-feedback',
  templateUrl: './modal-feedback.component.html'
})
export class ModalFeedbackComponent implements OnInit {

  feedback: string;
  @Input() dieta: any;
  @Output() created = new EventEmitter();

  constructor(public dietaService: DietService, public userService: UsersService,
              public modalService: ModalFeedbackService, public swal: SwalService) { }

  ngOnInit() {
  }

  hayComentarios() {
    return this.dieta ? this.dieta.dieta.filter(el => el.nombre != null).length > 0 : false;
  }

  cerrarModal(form: NgForm) {
    this.limpiarModal(form);
    this.ocultarModal();
  }

  ocultarModal() {
    this.modalService.oculto = 'oculto';
  }

  enviarFeedback(form: NgForm) {
    if (form.form.valid) {
      this.userService.obtenerUsuario(this.dieta.usuario).subscribe(resp => {
        resp.notificaciones.push({
          titulo: 'Respuesta recibida',
          mensaje: 'Se ha recibido una respuesta a los comentarios de la dieta'
        });
        this.enviarNotificacion(resp, form);
      });
    }
  }

  enviarNotificacion(usuario: any, form: NgForm) {
    this.userService.modificarUsuario(usuario).subscribe(resp => {
      this.feedback = form.form.value.comentario;
      this.dieta.feedback = this.feedback;
      this.dietaService.modificarFeedbackDieta(this.dieta).subscribe(resp => {
        this.cerrarModal(form);
        this.swal.crearSwal('comun.alertas.exito.feedback', 'success');
        this.created.emit();
      });
    });
  }

  limpiarModal(form: NgForm) {
    form.resetForm();
    form.form.setValue({comentario: ''});
  }

}
