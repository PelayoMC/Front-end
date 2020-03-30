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
  from: number = 0;
  total: number = 0;
  cargando: boolean = true;

  constructor(private recipesService: RecipesService, private router: Router ) { }

  ngOnInit() {
    this.cargarRecetas();
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  cargarRecetas() {
    this.cargando = true;
    this.recipesService.getRecipes(this.from).subscribe((resp: any) => {
      console.log(resp);
      this.recetas = resp.map(el =>
        new Recipe(el.nombre, el.descripcion, el.nivel, el.imagen, el.ingredientes, el.calorias, el.pasos, el._id)
      );
      this.total = resp.total;
      this.cargando = false;
    });
  }

  buscarRecetas(termino: string) {
    if (termino.length < 0) {
      this.cargarRecetas();
      return;
    }
    this.cargando = true;
    this.recipesService.buscarRecetas(termino).subscribe(
      (recetas: Recipe[]) => {
        this.recetas = recetas;
        this.cargando = false;
      }
    );
  }
}
