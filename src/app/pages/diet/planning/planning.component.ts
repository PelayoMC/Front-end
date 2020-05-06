import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, RecipesService, DietService } from '../../../service/service.index';
import { Recipe } from 'src/app/models/recipe.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import * as data from '../diets.data';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {

  recetas: Recipe[];
  data = data;
  cargando = true;

  constructor(public userService: UsersService, public recipesService: RecipesService, public dietService: DietService, public router: Router) { }

  ngOnInit() {
    this.dietService.obtenerDietaId(this.userService.usuario.value.dieta).subscribe(resp => {
      this.recipesService.buscarIds(resp.dieta.map(el => el.receta)).subscribe(resp => {
        this.recetas = resp;
        this.cargando = false;
      });
    });
  }

  obtenerImagen(i: number, j: number) {
    return URL_SERVICIOS + '/imagen/recetas/' + this.recetas[(i * 7) + j].imagen;
  }

  verReceta(i: number, j: number) {
    this.router.navigate(['/recipe', this.recetas[(i * 7) + j]._id]);
  }

}
