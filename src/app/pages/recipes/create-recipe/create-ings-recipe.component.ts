import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'app-create-ings-recipe',
  templateUrl: './create-ings-recipe.component.html'
})
export class CreateIngsRecipeComponent implements OnInit {

  form: FormGroup;
  ingredients: Ingredient[] = [
    new Ingredient('Patatas'),
    new Ingredient('Queso'),
    new Ingredient('Cebolla')
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      ingredientes: this.fb.array([], Validators.required)
    });
    this.cargarIngredientes();
  }

  cargarIngredientes() {
    for (const ing of this.ingredients) {
      (this.form.get('ingredientes') as FormArray).push(
        this.fb.control('', Validators.required)
      );
    }
  }

  onSubmit() {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.form.value.ingredientes[i]) {
        this.ingredients[i].ingredienteSustituible = new Ingredient(this.form.value.ingredientes[i]);
        console.log(this.ingredients[i].ingredienteSustituible);
      }
    }
    console.log(this.ingredients);
  }
}
