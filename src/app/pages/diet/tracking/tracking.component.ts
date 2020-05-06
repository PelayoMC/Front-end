import { Component, OnInit } from '@angular/core';
import { UsersService, RecipesService, DietService } from 'src/app/service/service.index';
import { Recipe } from 'src/app/models/recipe.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import * as data from '../diets.data';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html'
})
export class TrackingComponent implements OnInit {

  recetas: Recipe[] = [];
  data = data;
  diaActual = new Date().getDay() - 1;
  cargando = true;

  constructor(public userService: UsersService, public recipesService: RecipesService, public dietService: DietService) { }

  ngOnInit() {
    const search = [];
    this.dietService.obtenerDietaId(this.userService.usuario.value.dieta).subscribe(resp => {
      for (let i = this.diaActual; i < resp.dieta.length; i += 7) {
        search.push(resp.dieta[i]);
      }
      this.recipesService.buscarIds(search.map(el => el.receta)).subscribe(resp => {
        this.recetas = resp;
        this.cargando = false;
      });
    });
  }

  obtenerFecha() {
    const date = new Date();
    return date.getUTCDate() + '/' + (date.getUTCMonth() + 1);
  }

  obtenerFechaCompleta() {
    const date = new Date();
    return date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  }

  obtenerImagen(i: number) {
    return URL_SERVICIOS + '/imagen/recetas/' + this.recetas[i].imagen;
  }

}
