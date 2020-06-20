import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService, RecipesService, DietService } from '../../../service/service.index';
import { Recipe } from 'src/app/models/recipe.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import * as data from '../diets.data';
import { nombresComidas } from '../diets.data';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {

  recetas: Recipe[];
  data = data;
  cargando = true;

  constructor(private activatedRoute: ActivatedRoute, public userService: UsersService, public recipesService: RecipesService, public dietService: DietService, public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id;
      params['id'] ? id = params['id'] : id = this.userService.usuario.value.dieta;
      this.dietService.obtenerDietaId(id).subscribe(resp => {
        console.log(resp);
        this.recipesService.buscarIds(resp.dieta.map(el => el.receta)).subscribe(resp => {
          this.recetas = resp;
          this.cargando = false;
        });
      });
    });
  }

  hasNull(array: any[]) {
    return array.some(el => el == null);
  }

  obtenerImagen(i: number, j: number) {
    return URL_SERVICIOS + '/imagen/recetas/' + this.recetas[(i * 7) + j].imagen;
  }

  verReceta(i: number, j: number) {
    this.router.navigate(['/recipe', this.recetas[(i * 7) + j]._id]);
  }

  totalCalorias(k: number) {
    let calculo = 0;
    for (let i = k; i < this.recetas.length; i += 7) {
      if (this.recetas[i].calorias.unidades === 'Caloria/s') {
        calculo += this.recetas[i].calorias.cantidad / 1000;
      } else {
        calculo += this.recetas[i].calorias.cantidad;
      }
    }
    return this.redondear(calculo);
  }

  redondear(numero: number) {
    return Math.round((numero + Number.EPSILON) * 100) / 100;
  }

}
