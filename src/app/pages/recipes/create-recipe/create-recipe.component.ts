import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from '../../../service/recipes/recipes.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import * as opt from './select-options';
import { iniciarDrops } from './select-options';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html'
})
export class CreateRecipeComponent implements OnInit {
  recipe: Recipe;

  imgUpload: any;
  imgTemp: string;
  form: FormGroup;
  uds: any;
  tipos: any;
  dificultades: any;

  constructor(private fb: FormBuilder, public recipeService: RecipesService) { }

  ngOnInit() {
    this.uds = opt.uds;
    this.tipos = opt.tipos;
    this.dificultades = opt.dificultades;
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      ingredientes: this.fb.array([
        this.fb.group({
          nombre: [null, Validators.required],
          cantidad: [0, Validators.required],
          unidades: [null, Validators.required],
          tipo: [null, Validators.required]
        })
      ]),
      pasos: this.fb.array([
        [null, Validators.required]
      ]),
      dificultad: [null, Validators.required],
      calorias: this.fb.group({
        cantidad: [0, Validators.required],
        unidades: [null, Validators.required],
      })
    });
    iniciarDrops(this.form);
  }

  ingredientes(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(): FormGroup {
    return this.fb.group({
      nombre: [null, Validators.required],
      cantidad: [0, Validators.required],
      unidades: [null, Validators.required],
      tipo: [null, Validators.required]
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

  eliminarPaso(i: number){
    this.pasos().removeAt(i);
  }

  chooseImage(archivo) {
    if (!archivo) {
      this.imgUpload = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error');
      this.imgUpload = null;
      return;
    }
    this.imgUpload = archivo;

    let reader = new FileReader();
    let url = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imgTemp = reader.result.toString();
  }

  crearReceta() {
    
  }

  onSubmit() {
    this.form.value.imagen = this.imgUpload;    
    if (this.form.invalid || this.imgUpload == null) {
      Swal.fire('Error', 'Complete el formulario para crear la receta', 'error');
    } else {
      console.log(typeof this.form.value)
      
    }
 }
}
