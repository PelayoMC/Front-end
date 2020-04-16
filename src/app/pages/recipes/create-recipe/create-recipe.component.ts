import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { IngredientsService, RecipesService } from '../../../service/service.index';
import Swal from 'sweetalert2';
import * as opt from './select-options';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html'
})
export class CreateRecipeComponent implements OnInit {
  recipe: Recipe;
  cargando = true;
  modificando = false;

  imgUpload: any;
  imgTemp: string;
  form: FormGroup;
  opt: any;

  selectedUnidadesIng: string;
  selectedTipo: string;
  selectedTipoUnidades: string;
  selectedDif: string;
  selectedUnidades: string;

  constructor(private fb: FormBuilder, public router: Router, public route: ActivatedRoute, public recipeService: RecipesService, public ingredientService: IngredientsService) { }

  ngOnInit() {
    this.opt = opt;
    this.initialyze();
  }

  initialyze() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoRe: ['Desayuno', Validators.required],
      ingredientes: this.fb.array([
        this.fb.group({
          nombre: ['', Validators.required],
          cantidad: [0, Validators.required],
          unidades: ['Sin unidades', Validators.required],
          tipo: ['Principal', Validators.required]
        }, Validators.required)
      ], Validators.required),
      pasos: this.fb.array([
        ['', Validators.required]
      ]),
      nivel: ['Facil', Validators.required],
      calorias: this.fb.group({
        cantidad: [0, Validators.required],
        unidades: ['Caloria/s', Validators.required],
      })
    });
    this.recipe = new Recipe();
    this.iniciarDrops('Sin unidades', 'Desayuno', 'Principal', 'Facil', 'Caloria/s');
    this.cargarReceta();
  }

  iniciarDrops(udsI: string, tipo: string, tipoU: string, dif: string, uds: string) {
    this.selectedUnidadesIng = udsI;
    this.selectedTipo = tipo;
    this.selectedTipoUnidades = tipoU;
    this.selectedDif = dif;
    this.selectedUnidades = uds;
  }

  cargarReceta() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params._id) {
        this.modificando = true;
        this.recipeService.getRecipe(params._id).subscribe(resp => {
          const rec: any = resp[0];
          this.vaciarCampos(rec);
          this.recipe._id = rec._id;
          this.recipe.imagen = rec.imagen;
          this.form.get('nombre').setValue(rec.nombre);
          this.form.get('descripcion').setValue(rec.descripcion);
          this.imgTemp = URL_SERVICIOS + '/imagen/recetas/' + rec.imagen;
          for (const ing of rec.ingredientes) {
            this.addIngrediente(ing.nombre, ing.cantidad, ing.unidades, ing.tipo);
          }
          for (const paso of rec.pasos) {
            this.addPaso(paso);
          }
        });
        this.cargando = false;
      } else {
        this.cargando = false;
      }
    });
  }

  vaciarCampos(rec: any) {
    this.eliminarIngrediente(0);
    this.eliminarPaso(0);
    this.iniciarDrops('', rec.tipoRe, '', rec.nivel, rec.calorias.unidades);
  }

  ingredientes(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(nombre: string, cantidad: number, unidades: string, tipo: string): FormGroup {
    console.log(unidades, tipo);
    return this.fb.group({
      nombre: [nombre, Validators.required],
      cantidad: [cantidad, Validators.required],
      unidades: [unidades, Validators.required],
      tipo: [tipo, Validators.required]
    });
  }

  addIngrediente(nombre: string = '', cantidad: number = 0, unidades: string = 'Sin unidades', tipo: string = 'Principal') {
    this.ingredientes().push(this.nuevoIngrediente(nombre, cantidad, unidades, tipo));
  }

  eliminarIngrediente(i: number) {
    this.ingredientes().removeAt(i);
  }

  pasos(): FormArray {
    return this.form.get('pasos') as FormArray;
  }

  nuevoPaso(paso: string): FormControl {
    return this.fb.control(paso, Validators.required);
  }

  addPaso(paso: string = '') {
    this.pasos().push(this.nuevoPaso(paso));
  }

  eliminarPaso(i: number) {
    this.pasos().removeAt(i);
  }

  nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  descripcionNoValida() {
    return this.form.get('descripcion').invalid && this.form.get('descripcion').touched;
  }

  ingredienteNoValido(ingrediente: any) {
    return ingrediente.get('nombre').invalid && ingrediente.get('nombre').touched;
  }

  pasoNoValido(paso: any) {
    return paso.invalid && paso.touched;
  }

  onChange(input: any, select: any) {
    if (input.controls.unidades.value === 'Al gusto' || input.controls.unidades.value === 'Sin unidades') {
      select.disabled = true;
    } else {
      select.disabled = false;
    }
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
    if (this.form.invalid) {
      Swal.fire('Complete el formulario', 'Rellene los campos obligatorios', 'warning');
      return;
    }
    if (this.imgUpload == null && !this.modificando) {
      Swal.fire('Complete el formulario', 'Elija una imagen', 'warning');
      return;
    }
    if (this.modificando) {
      this.modificarReceta();
    } else {
      this.crearReceta();
    }
  }

  crearReceta() {
    Object.assign(this.recipe, this.form.value);
    this.ingredientService.obtenerIngsRecipe(this.recipe.ingredientes).subscribe(resp => {
      this.recipe.ingredientes = resp;
      this.recipeService.crearReceta(this.recipe).subscribe(resp => {
        this.recipe._id = resp._id;
        this.form.value.imagen = this.imgUpload;
        this.recipeService.cambiarImagen(this.recipe, this.form.value.imagen);
        this.router.navigate(['/addIngsRecipe/', this.recipe._id]);
      });
    });
  }

  modificarReceta() {
    Object.assign(this.recipe, this.form.value);
    console.log(this.recipe);
    this.ingredientService.obtenerIngsRecipe(this.recipe.ingredientes).subscribe(resp => {
      this.recipe.ingredientes = resp;
      this.recipeService.modificarReceta(this.recipe).subscribe(resp => {
        if (this.imgUpload) {
          this.form.value.imagen = this.imgUpload;
          this.recipeService.cambiarImagen(this.recipe, this.form.value.imagen);
        }
        this.router.navigate(['/addIngsRecipe/', this.recipe._id]);
      });
    });
  }
}
