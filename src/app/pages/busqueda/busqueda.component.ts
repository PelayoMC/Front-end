import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Filtros } from 'src/app/models/filtros.model';
import { RecipesService } from '../../service/recipes/recipes.service';
import { Router } from '@angular/router';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from '../../service/ingredients/ingredients.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  recetas: Recipe[] = [];
  ingredientes: Ingredient[] = [];
  filtradoIng: string[] = [];
  tipos: string[] = [];
  intolerancias: string[] = [];
  filtros: Filtros = new Filtros();

  cargando = true;
  buscando = false;
  from = 1;
  limit = 7;
  total: number;

  constructor(private recipeService: RecipesService, private ingsService: IngredientsService, private router: Router) { }

  ngOnInit() {
    // this.cargarRecetas(--this.from);
    this.ingsService.obtenerTodosIngs().subscribe(resp => {
      console.log(resp);
      this.filtradoIng = resp.ingredientes.map(el => el.nombre);
      this.cargando = false;
      console.log(this.filtradoIng);
    });
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
    this.recipeService.getRecipes(from, this.limit).subscribe((resp: any) => {
      this.total = resp.total;
      resp = resp.recetas;
      this.recetas = resp.map(el =>
        new Recipe(el.nombre, el.descripcion, el.tipoRe, el.imagen, el.ingredientes, el.pasos, el.nivel, el.calorias, el._id)
      );
      this.cargando = false;
      this.buscando = false;
    });
  }

  buscarRecetas(termino: string, valor: number) {
    this.cargando = true;
    this.recipeService.descubrirRecetas(termino, this.tipos, this.intolerancias, valor, this.limit).subscribe(
      (resp: any) => {
        this.ingredientes = resp.coleccion.ingredientes;
        this.recetas = resp.coleccion.recetas;
        this.total = resp.total;
        this.cargando = false;
        this.busqueda.nativeElement.select();
        this.buscando = true;
      }
    );
  }

  cambiarPag(event: any) {
    if (this.busqueda.nativeElement.value != null) {
      this.buscarRecetas(this.busqueda.nativeElement.value, --event * this.limit);
    } else {
      this.cargarRecetas(--event * this.limit);
    }
  }
}
