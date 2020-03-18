import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/service/recipes/recipes.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: []
})
export class RecipesComponent implements OnInit {

  recetas: Recipe[] = [];

  constructor(private recipesService: RecipesService, private router: Router ) { }

  ngOnInit() {
    //this.recetas = this.recipesService.getRecipes();
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }
}
