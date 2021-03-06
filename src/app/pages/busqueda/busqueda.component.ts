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
  ings: string[] = [];
  ingsFiltrados: string[] = [];
  tipos: string[] = [];
  intolerancias: string[] = [];
  tags: string[] = [];
  orden = 'nombre';
  filtros: Filtros = new Filtros();

  cargando = true;
  buscando = false;
  from = 1;
  limit = 9;
  total: number;

  constructor(private recipeService: RecipesService, private ingsService: IngredientsService, private router: Router) { }

  ngOnInit() {
    // this.cargarRecetas(--this.from);
    this.ingsService.obtenerTodosIngs().subscribe(resp => {
      this.ings = resp.ingredientes.map(el => el.nombre);
      this.ingsFiltrados = this.ings.slice();
      this.cargando = false;
    });
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  cargarFiltroTipos(event: any) {
    this.tipos = [];
    Object.assign(this.tipos, event);
    this.buscarRecetas(this.busqueda.nativeElement.value, 0);
  }

  cargarFiltroIntolerancias(event: any) {
    this.intolerancias = [];
    Object.assign(this.intolerancias, event);
    this.buscarRecetas(this.busqueda.nativeElement.value, 0);
  }

  cargarFiltroEtiquetas(event: any) {
    this.tags = [];
    Object.assign(this.tags, event);
    this.buscarRecetas(this.busqueda.nativeElement.value, 0);
  }

  cargarFiltroOrden(event: any) {
    this.orden = event;
    this.buscarRecetas(this.busqueda.nativeElement.value, 0);
  }

  filtrar(input: any) {
    this.ingsFiltrados = this.ings.filter(el => el.toLowerCase().includes(input.value.toLowerCase()));
  }

  cambiarFiltros(event: any) {
    Object.assign(this.filtros, event);
    if (this.filtros.intolerancias === false) {
      this.intolerancias = [];
    }
    if (this.filtros.etiquetas === false) {
      this.tags = [];
    }
    if (this.filtros.tipos === false) {
      this.tipos = [];
    }
    if (this.filtros.orden === false) {
      this.orden = '';
    }
  }

  cargarRecetas(from) {
    this.cargando = true;
    this.recipeService.getRecipes(from, this.limit).subscribe((resp: any) => {
      this.total = resp.total;
      resp = resp.recetas;
      this.recetas = resp.map(el =>
        new Recipe(el.nombre, el.descripcion, el.tipoRe, el.imagen, el.ingredientes, el.pasos, el.nivel, el.puntuacion, el.calorias, el._id)
      );
      this.cargando = false;
      this.buscando = false;
    });
  }

  buscarRecetas(termino: string, valor: number) {
    this.cargando = true;
    console.log("VAMOS");
    this.recipeService.descubrirRecetas(termino, this.tipos, this.intolerancias, this.tags, this.orden, valor, this.limit + valor).subscribe(
      (resp: any) => {
        this.ingredientes = resp.coleccion.ingredientes;
        this.recetas = resp.coleccion.recetas;
        this.total = resp.total;
        this.cargando = false;
        this.buscando = true;
      }
    );
  }

  cambiarPag(event: any) {
    this.buscarRecetas(this.busqueda.nativeElement.value, --event * this.limit);
  }
}
