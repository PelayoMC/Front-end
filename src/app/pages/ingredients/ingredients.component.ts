import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IngredienteDecorator } from 'src/app/models/decorators/ingredient-decorator.model';
import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.model';
import { Router } from '@angular/router';
import { Filtros } from 'src/app/models/filtros.model';
import { UsersService, IngredientsService, RecipesService, SwalService } from 'src/app/service/service.index';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  ingredientes: IngredienteDecorator[] = [];
  extra = [];
  etiquetas: string[] = [];
  intolerancias: string[] = [];
  filtros: Filtros = new Filtros();

  cargando = true;
  from = 0;
  limit = 7;
  total = 0;

  constructor(public ingredientesService: IngredientsService, public recetasService: RecipesService,
              public userService: UsersService, public router: Router, public swal: SwalService) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.extra = [];
    this.cargando = true;
    if (this.busqueda.nativeElement.value.length === 0) {
      this.ingredientesService.obtenerIngs(this.from, this.limit).subscribe((resp: any) => {
        this.total = resp.total;
        this.ingredientesService.obtenerRecetas(resp).subscribe(resp => {
          const arr = resp.map(el => el.ingrediente);
          const arr2: IngredienteDecorator[] = [];
          for (let i = 0; i < resp.length; i++) {
            arr2[i] = new IngredienteDecorator(arr[i], false);
            this.extra.push({
              recetas: resp[i].recetas,
              sustituibles: resp[i].sustituibles
            });
          }
          this.ingredientes = arr2;
          this.cargando = false;
        });
      });
    } else {
      this.buscarIngredientes(this.busqueda.nativeElement.value);
    }
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargar();
  }

  cargarFiltroEtiquetas(event: any) {
    this.etiquetas = [];
    Object.assign(this.etiquetas, event);
    this.buscarIngredientes(this.busqueda.nativeElement.value);
  }

  cargarFiltroIntolerancias(event: any) {
    this.intolerancias = [];
    Object.assign(this.intolerancias, event);
    this.buscarIngredientes(this.busqueda.nativeElement.value);
  }

  cambiarFiltros(event: any) {
    Object.assign(this.filtros, event);
    if (this.filtros.intolerancias === false) {
      this.intolerancias = [];
    }
    if (this.filtros.etiquetas === false) {
      this.etiquetas = [];
    }
  }

  buscarIngredientes(termino: string) {
    this.cargando = true;
    this.extra = [];
    this.ingredientesService.buscarIngredientes(termino, this.etiquetas, this.intolerancias, this.from, this.limit).subscribe(
      (resp: any) => {
        const re = {
          ingredientes: resp.coleccion
        };
        this.total = resp.total;
        this.ingredientesService.obtenerRecetas(re).subscribe(resp => {
          const arr = resp.map(el => el.ingrediente);
          const arr2: IngredienteDecorator[] = [];
          for (let i = 0; i < resp.length; i++) {
            arr2[i] = new IngredienteDecorator(arr[i], false);
            this.extra.push({
              recetas: resp[i].recetas,
              sustituibles: resp[i].sustituibles
            });
          }
          this.ingredientes = arr2;
          this.cargando = false;
        });
      }
    );
  }

  borrarIngrediente(ingrediente: Ingredient, recetas: any[]) {
    this.swal.crearSwalBorrar('comun.alertas.borrado.ingrediente',
    () => {
      if (recetas.length > 0) {
        this.swal.crearSwal('comun.alertas.errores.borrarIngredienteReceta', 'error');
      } else {
        this.ingredientesService.borrarIngrediente(ingrediente).subscribe((resp: any) => {
          this.cargar();
        });
      }
    }, ingrediente.nombre);
  }

  borrarIngredientesSinReceta() {
    this.swal.crearSwalBorrar('comun.alertas.borrado.ingrediente3',
    () => {
      this.cargando = true;
      this.ingredientesService.borrarIngredientesSinReceta().subscribe(resp => {
        this.cargando = false;
        this.cargar();
      });
    });
  }

  actualizarIngrediente(ingredient: Ingredient) {
    this.ingredientesService.modificarIngredienteReceta(ingredient._id, ingredient.nombre).subscribe(resp => {
      this.ingredientesService.modificarIngrediente(ingredient).subscribe(resp => {
        this.cargar();
      });
    });
  }

  mostrarReceta(receta: Recipe) {
    this.router.navigate(['/recipe', receta._id]);
  }

}
