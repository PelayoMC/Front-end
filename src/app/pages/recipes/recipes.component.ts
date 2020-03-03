import { Component, OnInit } from '@angular/core';
import { Recipe, RecipesService } from 'src/app/service/recipes/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: []
})
export class RecipesComponent implements OnInit {

  recetas: Recipe[] = [];

  constructor(private recipes_service: RecipesService, private router: Router ) { }

  ngOnInit() {
    this.recetas = this.recipes_service.getRecipes();
  }

  verReceta(idx: number){
    this.router.navigate(['/recipe', idx]);
  }
}
