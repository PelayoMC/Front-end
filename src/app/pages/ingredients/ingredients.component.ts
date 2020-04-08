import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from '../../service/users/users.service';
import { IngredientsService } from '../../service/ingredients/ingredients.service';
import { IngredienteDecorator } from 'src/app/models/decorators/ingredient-decorator.model';
import { Ingredient } from '../../models/ingredient.model';
import Swal from 'sweetalert2';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  ingredientes: IngredienteDecorator[] = [];
  extra = [];
  cargando = true;
  from = 0;
  limit = 7;
  total = 0;

  constructor(public ingredientesService: IngredientsService, public userService: UsersService) { }

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

  buscarIngredientes(termino: string) {
    if (termino.length <= 0) {
      this.cargar();
      return;
    }
    this.cargando = true;
    this.extra = [];
    this.ingredientesService.buscarIngredientes(termino, this.from).subscribe(
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

  borrarIngrediente(ingrediente: Ingredient) {
   Swal.fire({
      title: '¿Borrar ingrediente?',
      text: 'Está a punto de borrar el usuario ' + ingrediente.nombre,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.ingredientesService.borrarIngrediente(ingrediente._id).subscribe((resp: any) => {
          if (resp.nombre === ingrediente.nombre) {
            Swal.fire(
              'Ingrediente borrado',
              'El ingrediente ha sido borrado correctamente',
              'success'
            );
            this.cargar();
          } else {
            Swal.fire(
              'Ingrediente no borrado',
              'El ingrediente no se ha podido borrar correctamente',
              'error'
            );
          }
        });
      }
    });
  }

  actualizarIngrediente(ingredient: Ingredient) {
    this.ingredientesService.modificarIngrediente(ingredient).subscribe(resp => {
      this.cargar();
    });
  }

}
