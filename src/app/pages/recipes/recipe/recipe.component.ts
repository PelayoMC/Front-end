import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from '../../../service/recipes/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: []
})
export class RecipeComponent implements OnInit {

  receta: Recipe;
  isDataAvailable: boolean;

  constructor( private activated_route: ActivatedRoute , private recipes_service: RecipesService) {
    this.activated_route.params.subscribe(params => {
      this.recipes_service.getRecipe(params['id']).subscribe((resp) => {
        this.receta = new Recipe(resp[0].nombre, resp[0].descripcion, resp[0].nivel, resp[0].imagen, resp[0].ingredientes, resp[0].calorias, resp[0].pasos, resp[0]._id);
      });
    });
  }

  ngOnInit() {
  }

}
