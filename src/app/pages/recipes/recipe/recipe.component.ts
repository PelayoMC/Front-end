import { Component, OnInit } from '@angular/core';
import { RecipesService, IngredientsService } from '../../../service/service.index';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: []
})
export class RecipeComponent implements OnInit {

  receta: Recipe = new Recipe();
  sustituibles: string[] = [];
  isDataAvailable: boolean;

  constructor( private activatedRoute: ActivatedRoute , private recipesService: RecipesService, public ingsService: IngredientsService) {
    this.activatedRoute.params.subscribe(params => {
      this.recipesService.getRecipe(params['id']).subscribe((resp) => {
        Object.assign(this.receta, resp[0]);
        this.ingsService.getSustituibles(this.receta.ingredientes.map(el => el.ingredienteSustituible)).subscribe((resp: any) => {
          this.sustituibles = resp.map(el => {
            if (el != null) {
              return el.nombre;
            } else {
              return null;
            }
          });
        });
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

}
