import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecipesService } from 'src/app/service/recipes/recipes.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { Filtros } from 'src/app/models/filtros.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: []
})
export class RecipesComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  recetas: Recipe[] = [];
  tipos: string[] = [];
  intolerancias: string[] = [];
  filtros: Filtros = new Filtros();

  from = 1;
  tam = 9;
  total: number;
  cargando = true;

  constructor(private recipesService: RecipesService, private router: Router ) { }

  ngOnInit() {
    this.cargarRecetas(--this.from);
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  cargarFiltroTipos(event: any) {
    this.tipos = [];
    Object.assign(this.tipos, event);
  }

  cargarFiltroIntolerancias(event: any) {
    this.intolerancias = [];
    Object.assign(this.intolerancias, event);
  }

  cambiarFiltros(event: any) {
    Object.assign(this.filtros, event);
    if (this.filtros.intolerancias === false) {
      this.intolerancias = [];
    }
    if (this.filtros.tipos === false) {
      this.tipos = [];
    }
  }

  cargarRecetas(from) {
    this.cargando = true;
    this.recipesService.getRecipes(from, this.tam).subscribe((resp: any) => {
      this.total = resp.total;
      resp = resp.recetas;
      this.recetas = resp.map(el =>
        new Recipe(el.nombre, el.descripcion, el.tipoRe, el.imagen, el.ingredientes, el.pasos, el.nivel, el.calorias, el._id)
      );
      this.cargando = false;
    });
  }

  buscarRecetas(termino: string, valor: number) {
    this.cargando = true;
    this.recipesService.buscarRecetas(termino, this.tipos, this.intolerancias, valor, this.tam).subscribe(
      (resp: any) => {
        const recetas: Recipe[] = resp.coleccion;
        this.recetas = recetas;
        this.total = resp.total;
        this.cargando = false;
        this.busqueda.nativeElement.select();
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
