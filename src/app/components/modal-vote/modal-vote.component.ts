import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalVoteServiceService, VotingService } from 'src/app/service/service.index';
import { Votacion } from '../../models/votacion.model';

@Component({
  selector: 'app-modal-vote',
  templateUrl: './modal-vote.component.html',
  styles: [`
    .puntuacion {
      width: 100%;
    }
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
  `]
})
export class ModalVoteComponent implements OnInit {

  @Input() votacion: Votacion;
  @Output() created = new EventEmitter();
  puntuacion: number;

  constructor(public modalService: ModalVoteServiceService, public voteService: VotingService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.ocultarModal();
  }

  ocultarModal() {
    this.modalService.visible = 'oculto';
  }

  crearVotacion() {
    console.log(this.votacion);
    console.log(this.puntuacion);
  }

}
