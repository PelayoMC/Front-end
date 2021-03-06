import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalVoteServiceService, VotingService, UsersService, RecipesService } from 'src/app/service/service.index';
import { Votacion } from '../../models/votacion.model';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';

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

  constructor(public modalService: ModalVoteServiceService, public voteService: VotingService, public userService: UsersService, public recipeService: RecipesService, public router: Router) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.ocultarModal();
  }

  ocultarModal() {
    this.modalService.visible = 'oculto';
  }

  modificarVotacion() {
    this.recipeService.getRecipe(this.votacion.receta).subscribe((resp: Recipe) => {
      this.votacion.total += 1;
      this.votacion.puntos = this.votacion.puntos + this.puntuacion;
      this.votacion.usuarios.push(this.userService.usuario.value._id);
      resp[0].puntuacion = this.redondear(this.votacion.puntos / this.votacion.total);
      this.recipeService.puntuarReceta(resp[0]).subscribe(resp => {
        this.crearVotacion();
      });
    });
  }

  crearVotacion() {
    this.voteService.modificarVotacion(this.votacion).subscribe(resp => {
      this.puntuacion = 0;
      this.cerrarModal();
      this.router.navigate(['recipes']);
    });
  }

  redondear(numero: number) {
    return Math.round((numero + Number.EPSILON) * 100) / 100;
  }

}
