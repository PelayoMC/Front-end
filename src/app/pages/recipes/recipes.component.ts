import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecipesService } from 'src/app/service/recipes/recipes.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: []
})
export class RecipesComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  recetas: Recipe[] = [];
  from: number = 1;
  tam: number = 1;
  total: number;
  cargando: boolean = true;

  constructor(private recipesService: RecipesService, private router: Router ) { }

  ngOnInit() {
    this.cargarRecetas(--this.from);
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  cargarRecetas(from) {
    this.cargando = true;
    this.recipesService.getRecipes(from, this.tam).subscribe((resp: any) => {
      this.total = resp.total;
      resp = resp.recetas;
      this.recetas = resp.map(el =>
        new Recipe(el.nombre, el.descripcion, el.nivel, el.imagen, el.ingredientes, el.calorias, el.pasos, el._id)
      );
      this.cargando = false;
    });
  }

  buscarRecetas(termino: string, valor: number) {
    if (termino.length < 0) {
      this.cargarRecetas(--this.from);
      return;
    }
    this.cargando = true;
    this.recipesService.buscarRecetas(termino, valor, this.tam).subscribe(
      (resp: any) => {
        const recetas: Recipe[] = resp.coleccion;
        this.recetas = recetas;
        this.total = resp.total;
        this.cargando = false;
      }
    );
  }

  cambiarPag(event: any) {
    if (this.busqueda.nativeElement.value != null) {
      this.buscarRecetas(this.busqueda.nativeElement.value, --event * this.tam);
    } else {
      this.cargarRecetas(--event * this.tam);
    }
  }
}
