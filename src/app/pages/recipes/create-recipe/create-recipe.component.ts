import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from '../../../service/recipes/recipes.service';
import { IngredientsService } from '../../../service/service.index';
import Swal from 'sweetalert2';
import * as opt from './select-options';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html'
})
export class CreateRecipeComponent implements OnInit {
  recipe: Recipe;

  imgUpload: any;
  imgTemp: string;
  form: FormGroup;
  opt: any;

  selectedUnidadesIng: string;
  selectedTipo: string;
  selectedDif: string;
  selectedUnidades: string;

  constructor(private fb: FormBuilder, public router: Router, public recipeService: RecipesService, public ingredientService: IngredientsService) { }

  ngOnInit() {
    this.opt = opt;
    this.initialyze();
  }

  initialyze() {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      ingredientes: this.fb.array([
        this.fb.group({
          nombre: [null, Validators.required],
          cantidad: [0, Validators.required],
          unidades: ['Sin unidades', Validators.required],
          tipo: ['Principal', Validators.required]
        }, Validators.required)
      ], Validators.required),
      pasos: this.fb.array([
        [null, Validators.required]
      ]),
      nivel: ['Facil', Validators.required],
      calorias: this.fb.group({
        cantidad: [0, Validators.required],
        unidades: ['Caloria/s', Validators.required],
      })
    });
    this.iniciarDrops();
  }

  iniciarDrops() {
    this.selectedUnidadesIng = 'Sin unidades';
    this.selectedTipo = 'Principal';
    this.selectedDif = 'Facil';
    this.selectedUnidades = 'Caloria/s';
  }

  ingredientes(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      unidades: ['Sin unidades', Validators.required],
      tipo: ['Principal', Validators.required]
    });
  }

  addIngrediente() {
    this.ingredientes().push(this.nuevoIngrediente());
  }

  eliminarIngrediente(i: number) {
    this.ingredientes().removeAt(i);
  }

  pasos(): FormArray {
    return this.form.get('pasos') as FormArray;
  }

  nuevoPaso(): FormControl {
    return this.fb.control('', Validators.required);
  }

  addPaso() {
    this.pasos().push(this.nuevoPaso());
  }

  eliminarPaso(i: number) {
    this.pasos().removeAt(i);
  }

  chooseImage(archivo) {
    if (!archivo) {
      this.imgUpload = null;
      this.imgTemp = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error');
      this.imgUpload = null;
      this.imgTemp = null;
      return;
    }
    this.imgUpload = archivo;

    const reader = new FileReader();
    const url = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imgTemp = reader.result.toString();
  }

  onSubmit() {
    console.log(this.form);
    console.log(this.form.valid);
    if (this.form.invalid || (this.imgUpload.name == null)) {
      Swal.fire('Complete el formulario', 'Rellene todos los campos del formulario para crear la receta', 'warning');
      return;
    }
    this.crearReceta();
  }

  crearReceta() {
    this.recipe = new Recipe();
    Object.assign(this.recipe, this.form.value);
    this.ingredientService.obtenerIngs(this.recipe.ingredientes).subscribe(resp => {
      this.recipe.ingredientes = resp;
      console.log(this.recipe.ingredientes);
      console.log(this.recipe);
      this.recipeService.crearReceta(this.recipe).subscribe(resp => {
        this.recipe._id = resp._id;
        this.form.value.imagen = this.imgUpload;
        this.recipeService.cambiarImagen(this.recipe, this.form.value.imagen);
        this.router.navigate(['/addIngsRecipe/', this.recipe._id]);
      });
    });
  }
}
