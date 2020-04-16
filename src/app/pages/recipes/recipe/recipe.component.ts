import { Component, OnInit } from '@angular/core';
import { RecipesService, IngredientsService } from '../../../service/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: []
})
export class RecipeComponent implements OnInit {

  receta: Recipe = new Recipe();
  sustituibles: string[] = [];
  isDataAvailable: boolean;

  constructor( private activatedRoute: ActivatedRoute , private recipesService: RecipesService, public ingsService: IngredientsService, public router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.recipesService.getRecipe(params['id']).subscribe((resp) => {
        if (resp.length === 0) {
          Swal.fire('Error', 'Error al cargar la receta', 'error');
          this.router.navigate(['recipes']);
        } else {
        Object.assign(this.receta, resp[0]);
        console.log(this.receta.ingredientes.map(el => el.ingredienteSustituible));
        this.ingsService.getSustituibles(this.receta.ingredientes.map(el => el.ingredienteSustituible)).subscribe((resp: any) => {
          console.log(resp);
          this.sustituibles = resp.map(el => {
            if (el != null) {
              return el.nombre;
            } else {
              return null;
            }
          });
        });
        }
      });
    });
  }

  ngOnInit() {
  }

  color(ing: any) {
    if (ing.tipo === 'Principal') {
      return 'text-danger';
    }
    return 'text-info';
  }

  noUnidades(ing: any) {
    if (ing && (ing.unidades === 'Al gusto' || ing.unidades === 'Sin unidades')) {
      return true;
    }
    return false;
  }

  classTipo(receta: any) {
    switch (receta.tipoRe) {
      case 'Desayuno' :
        return 'label label-warning';
      case 'Desayuno' :
        return 'label label-success';
      case 'Desayuno' :
        return 'label label-info';
      case 'Desayuno' :
        return 'label label-danger';
    }
  }

}
