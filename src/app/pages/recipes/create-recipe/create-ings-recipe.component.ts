import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ingredient } from '../../../models/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../../service/recipes/recipes.service';
import { IngredientsService } from '../../../service/ingredients/ingredients.service';
import { IngredientRecipe } from '../../../models/recipe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ings-recipe',
  templateUrl: './create-ings-recipe.component.html'
})
export class CreateIngsRecipeComponent implements OnInit {

  idReceta: string;
  form: FormGroup;
  ingredients: IngredientRecipe[] = [];

  constructor(private fb: FormBuilder, private activated_route: ActivatedRoute, public recipesService: RecipesService, public ingsService: IngredientsService, public router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      ingredientes: this.fb.array([])
    });
    this.activated_route.params.subscribe(params => {
      this.idReceta = params['id'];
      this.recipesService.getIngredients(this.idReceta).subscribe((resp: IngredientRecipe[]) => {
        this.ingredients = resp;
        this.cargarIngredientes();
      });
    });
  }

  cargarIngredientes() {
    for (const ing of this.ingredients) {
      (this.form.get('ingredientes') as FormArray).push(
        this.fb.control('', [Validators.required, Validators.minLength(3)])
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
    this.ingsService.crearIngredientes(this.form.value.ingredientes).subscribe((resp: Ingredient[]) => {
      for (let i = 0; i < resp.length; i++) {
        this.ingredients[i].ingredienteSustituible = resp[i]._id;
      }
      this.modReceta();
    });
  }

  modReceta() {
    this.recipesService.guardarIngredientes(this.idReceta, this.ingredients).subscribe((resp: Ingredient[]) => {
      Swal.fire('Ingredientes añadidos', 'Los ingredientes sustituibles se han añadido a los existentes de la receta correctamente', 'success');
      this.router.navigate(['/recipes']);
    });
  }
}
