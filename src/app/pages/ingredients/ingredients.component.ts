import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IngredientsService } from '../../service/ingredients/ingredients.service';
import { IngredienteDecorator } from 'src/app/models/decorators/ingredient-decorator.model';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  ingredientes: IngredienteDecorator[] = [];
  cargando: boolean = true;
  from: number = 0;
  limit: number = 7;
  total: number = 0;

  constructor(public ingredientesService: IngredientsService) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    if (this.busqueda.nativeElement.value.length === 0) {
      this.ingredientesService.obtenerIngs(this.from, this.limit).subscribe((resp: any) => {
        for (let i = 0; i < resp.ingredientes.length; i++) {
          this.ingredientes[i] = new IngredienteDecorator(resp.ingredientes[i], false);
        }
        const arr = resp.ingredientes;
        const arr2: IngredienteDecorator[] = [];
        for (let i = 0; i < arr.length; i++) {
          arr2[i] = new IngredienteDecorator(arr[i], false);
        }
        this.ingredientes = arr2;
        this.total = resp.total;
        this.cargando = false;
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
    if (termino.length < 0) {
      this.cargar();
      return;
    }
    this.cargando = true;
    this.ingredientesService.buscarIngredientes(termino, this.from).subscribe(
      (resp: any) => {
        const arr: Ingredient[] = resp.coleccion;
        const arr2: IngredienteDecorator[] = [];
        for (let i = 0; i < arr.length; i++) {
          arr2[i] = new IngredienteDecorator(arr[i], false);
        }
        this.ingredientes = arr2;
        this.total = resp.total;
        this.cargando = false;
      }
    );
  }

}
