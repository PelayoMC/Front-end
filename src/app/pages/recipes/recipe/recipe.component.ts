import { Component, OnInit } from '@angular/core';
import { Recipe, RecipesService } from '../../../service/recipes/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: []
})
export class RecipeComponent implements OnInit {

  receta: Recipe;

  constructor( private activated_route: ActivatedRoute , private recipes_service: RecipesService) { 
    this.activated_route.params.subscribe(params => {
      this.receta = this.recipes_service.getRecipe(params['id']);
    });
  }

  ngOnInit() {
  }

}
