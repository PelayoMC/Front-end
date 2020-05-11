import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, RecipesService, VotingService } from 'src/app/service/service.index';

@Component({
  selector: 'app-busqueda-card',
  templateUrl: './busqueda-card.component.html'
})
export class BusquedaCardComponent implements OnInit {

  @Input() receta: any = {};

  @Output() recetaSeleccionada: EventEmitter<number>;
  @Output() cargar: EventEmitter<number>;

  constructor( private router: Router, public userService: UsersService, public recipesService: RecipesService, public voteService: VotingService) {
    this.recetaSeleccionada = new EventEmitter();
    this.cargar = new EventEmitter();
   }

  ngOnInit() {
  }

  verReceta() {
    this.recetaSeleccionada.emit(this.receta._id);
  }

  label(nivel: string) {
    switch (nivel) {
      case 'Facil': return 'label label-success';
      case 'Medio': return 'label label-warning';
      case 'Dificil': return 'label label-danger';
    }
  }

}
