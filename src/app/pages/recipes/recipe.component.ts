import { Component, OnInit } from '@angular/core';
import { RecipesService, Recipe } from '../../service/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: []
})
export class RecipeComponent implements OnInit {

  recipe: any = {};
  constructor(private recipes_service: RecipesService) { }

  ngOnInit() {
    this.recipe = this.recipes_service.recipes[0];
  }

}
