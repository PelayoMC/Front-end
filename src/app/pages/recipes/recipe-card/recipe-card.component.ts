import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: []
})
export class RecipeCardComponent implements OnInit {

  @Input() receta: any = {};

  @Output() recetaSeleccionada: EventEmitter<number>;

  constructor( private router: Router ) {
    this.recetaSeleccionada = new EventEmitter();
   }

  ngOnInit() {
  }

  verReceta() {
    this.recetaSeleccionada.emit(this.receta._id);
  }

  // card border border-primary

  border() {
    console.log(this.receta.nivel);
    switch (this.receta.nivel) {
      case 'FACIL': return 'card border border-success';
      case 'MEDIO': return 'card border border-warning';
      case 'DIFICIL': return 'card border border-danger';
    }
  }


}
