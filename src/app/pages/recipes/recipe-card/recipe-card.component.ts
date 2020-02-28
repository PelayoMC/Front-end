import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: []
})
export class RecipeCardComponent implements OnInit {

  @Input() receta: any = {};
  @Input() id: number;

  @Output() recetaSeleccionada: EventEmitter<number>;

  constructor( private router: Router ) {
    this.recetaSeleccionada = new EventEmitter();
   }

  ngOnInit() {
  }

  verReceta(){
    this.recetaSeleccionada.emit(this.id);
  }


}