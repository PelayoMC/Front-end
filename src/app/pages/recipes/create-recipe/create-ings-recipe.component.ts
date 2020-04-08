import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ingredient } from '../../../models/ingredient.model';
import { IngredientRecipe } from '../../../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, IngredientsService, SustValidatorService } from '../../../service/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ings-recipe',
  templateUrl: './create-ings-recipe.component.html'
})
export class CreateIngsRecipeComponent implements OnInit {

  idReceta: string;
  form: FormGroup;
  ingredients: IngredientRecipe[] = [];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              public recipesService: RecipesService, public ingsService: IngredientsService,
              public router: Router, public validador: SustValidatorService) {}

  ngOnInit() {
    this.form = this.fb.group({
      ingredientes: this.fb.array([])
    });
    this.activatedRoute.params.subscribe(params => {
      this.idReceta = params.id;
      this.recipesService.getIngredients(this.idReceta).subscribe((resp: IngredientRecipe[]) => {
        this.ingredients = resp;
        this.cargarIngredientes();
      });
    });
  }

  cargarIngredientes() {
    for (const ing of this.ingredients) {
      (this.form.get('ingredientes') as FormArray).push(
        this.fb.control('', [this.validador.sustValid])
      );
    }
  }

  onSubmit() {
    this.addIngs();
  }

  addIngs() {
    if ( this.form.invalid ) {
      Swal.fire('Error', 'Rellene los campos correspondientes', 'error');
      return;
    }
    if (this.findDuplicates(this.form.value.ingredientes).length > 0) {
      Swal.fire('Error', 'No se permite añadir ingredientes duplicados', 'error');
      return;
    }
    this.ingsService.crearIngredientes(this.form.value.ingredientes).subscribe((resp: Ingredient[]) => {
      let a = 0;
      for (let i = 0; i < this.ingredients.length; i++) {
        if (this.form.value.ingredientes[i] !== '') {
          this.ingredients[i].ingredienteSustituible = resp[a++]._id;
        }
      }
      this.modReceta();
    });
  }

  modReceta() {
    this.recipesService.guardarIngredientes(this.idReceta, this.ingredients).subscribe((resp: Ingredient[]) => {
      Swal.fire({icon: 'success',
      title: 'Ingredientes añadidos'});
      this.router.navigate(['/recipes']);
    });
  }

  ingredienteInvalido(i: number) {
    return (this.form.get('ingredientes') as FormArray).controls[i].invalid;
  }

  findDuplicates(arr) {
    let sorted_arr = arr.slice().sort();
    const results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i] && sorted_arr[i] !== '') {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }
}
