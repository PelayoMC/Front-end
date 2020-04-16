import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UsersService, RecipesService } from '../../../service/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: []
})
export class RecipeCardComponent implements OnInit {

  @Input() receta: any = {};

  @Output() recetaSeleccionada: EventEmitter<number>;
  @Output() recetaBorrada: EventEmitter<number>;

  constructor( private router: Router, public userService: UsersService, public recipesService: RecipesService) {
    this.recetaSeleccionada = new EventEmitter();
    this.recetaBorrada = new EventEmitter();
   }

  ngOnInit() {
  }

  verReceta() {
    this.recetaSeleccionada.emit(this.receta._id);
  }

  actualizarReceta(receta: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        _id: receta._id
      }
    };
    this.router.navigate(['/addRecipe'], navigationExtras);
  }

  borrarReceta(receta: any) {
    Swal.fire({
      title: '¿Borrar receta?',
      text: 'Está a punto de borrar la receta ' + receta.nombre,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.recipesService.borrarReceta(receta._id).subscribe(resp => {
          Swal.fire('Receta borrada', 'Receta borrada correctamente', 'success');
          this.recetaBorrada.emit(this.receta._id);
        });
      }
    });
  }


}
