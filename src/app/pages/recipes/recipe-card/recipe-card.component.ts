import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UsersService, RecipesService, VotingService } from '../../../service/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: []
})
export class RecipeCardComponent implements OnInit {

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

  favorito(receta: any) {
    const us = this.userService.usuario.value;
    us.recetasFavoritas.push(receta._id);
    this.userService.modificarUsuario(us).subscribe(resp => {
      Swal.fire('Receta añadida', 'Receta añadida a favoritos correctamente', 'success');
      this.cargar.emit(this.receta._id);
    });
  }

  noFavorite() {
    return !this.userService.usuario.value.recetasFavoritas.includes(this.receta._id);
  }

  actualizarReceta(receta: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        _id: receta._id
      }
    };
    this.router.navigate(['/modRecipe'], navigationExtras);
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
          this.voteService.borrarVotacion(receta._id).subscribe(resp => {
            Swal.fire('Receta borrada', 'Receta borrada correctamente', 'success');
            this.cargar.emit(this.receta._id);
          });
        });
      }
    });
  }


}
