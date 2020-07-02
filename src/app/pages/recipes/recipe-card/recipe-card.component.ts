import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UsersService, RecipesService, VotingService, SwalService } from '../../../service/service.index';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: []
})
export class RecipeCardComponent implements OnInit {

  @Input() receta: any = {};

  @Output() recetaSeleccionada: EventEmitter<number>;
  @Output() cargar: EventEmitter<number>;

  constructor(private router: Router, public userService: UsersService, public recipesService: RecipesService,
              public voteService: VotingService, public swal: SwalService) {
    this.recetaSeleccionada = new EventEmitter();
    this.cargar = new EventEmitter();
   }

  ngOnInit() {
  }

  verReceta() {
    this.recetaSeleccionada.emit(this.receta._id);
  }

  label(nombre: string) {
    switch (nombre) {
      case 'Desayuno': return 'label label-success';
      case 'Comida': return 'label label-info';
      case 'Merienda': return 'label label-warning';
      case 'Cena': return 'label label-danger';
    }
  }

  favorito(receta: any) {
    const us = this.userService.usuario.value;
    us.recetasFavoritas.push(receta._id);
    this.userService.modificarUsuario(us).subscribe(resp => {
      this.swal.crearSwal('comun.alertas.exito.añadirRecetaFav', 'success');
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
    this.swal.crearSwalBorrar('comun.alertas.borrado.receta',
    () => {
      this.recipesService.borrarReceta(receta._id).subscribe(resp => {
        this.voteService.borrarVotacion(receta._id).subscribe(resp => {
          this.userService.usuario.value.recetasFavoritas = this.userService.usuario.value.recetasFavoritas.filter(el => el !== receta._id);
          this.userService.modificarUsuario(this.userService.usuario.value).subscribe(resp => {
            this.swal.crearSwal('comun.alertas.exito.borrarReceta', 'success');
            this.cargar.emit(this.receta._id);
          });
        });
      });
    }, receta.nombre);
  }

}
