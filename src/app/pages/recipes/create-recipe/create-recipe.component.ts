import { Component, OnInit } from '@angular/core';
import { IngredientsService, RecipesService, VotingService, SwalService } from '../../../service/service.index';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import * as opt from './select-options';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html'
})
export class CreateRecipeComponent implements OnInit {
  recipe: Recipe;
  ings: string[] = [];
  ingsFiltrados: string[] = [];
  cargando = true;
  modificando = false;

  imgUpload: any;
  imgTemp: string;
  form: FormGroup;
  opt: any;

  constructor(private fb: FormBuilder, public router: Router, public route: ActivatedRoute,
              public recipeService: RecipesService, public ingredientService: IngredientsService,
              public voteService: VotingService, public swal: SwalService) { }

  ngOnInit() {
    this.opt = opt;
    this.initialyze();
  }

  initialyze() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoRe: ['Desayuno', Validators.required],
      ingredientes: this.fb.array([], Validators.required),
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
    this.addIngrediente();
    this.cargarReceta();
    this.cargarIngredientes();
  }

  cargarReceta() {
    this.route.queryParams.subscribe(params => {
      if (params._id) {
        this.modificando = true;
        this.recipeService.getRecipe(params._id).subscribe(resp => {
          const rec: any = resp[0];
          this.vaciarCampos(rec);
          this.modificarCampos(rec);
        });
      }
    });
  }

  cargarIngredientes() {
    this.ingredientService.obtenerTodosIngs().subscribe(resp => {
      this.ings = resp.ingredientes.map(el => el.nombre);
      this.ingsFiltrados = this.ings.slice();
      this.cargando = false;
    });
  }

  filtrar(input: any) {
    this.ingsFiltrados = this.ings.filter(el => el.toLowerCase().includes(input.controls.nombre.value));
  }

  resetFilter() {
    this.ingsFiltrados = this.ings.slice();
  }

  vaciarCampos(rec: any) {
    this.eliminarIngrediente(0);
    this.eliminarPaso(0);
  }

  modificarCampos(rec: any) {
    this.recipe._id = rec._id;
    this.recipe.imagen = rec.imagen;
    this.form.get('nombre').setValue(rec.nombre);
    this.form.get('descripcion').setValue(rec.descripcion);
    this.form.get('tipoRe').setValue(rec.tipoRe);
    this.form.get('nivel').setValue(rec.nivel);
    this.form.get('calorias.cantidad').setValue(rec.calorias.cantidad);
    this.form.get('calorias.unidades').setValue(rec.calorias.unidades);
    this.imgTemp = URL_SERVICIOS + '/imagen/recetas/' + rec.imagen;
    for (const ing of rec.ingredientes) {
      this.addIngrediente(ing.nombre, ing.cantidad, ing.unidades, ing.tipo, ing.ingredienteSustituible);
    }
    for (const paso of rec.pasos) {
      this.addPaso(paso);
    }
  }

  ingredientes(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(nombre: string, cantidad: number, unidades: string, tipo: string, is: string): FormGroup {
    let fg: FormGroup = this.fb.group({
      nombre: [nombre, Validators.required],
      cantidad: [cantidad, Validators.required],
      unidades: [unidades, Validators.required],
      tipo: [tipo, Validators.required],
      ingredienteSustituible: [is]
    });
    if ((unidades === 'Al gusto')) {
      fg.get('cantidad').disable();
    }
    return fg;
  }

  addIngrediente(nombre: string = '', cantidad: number = 0, unidades: string = 'Sin unidades', tipo: string = 'Principal', is: string = null) {
    this.ingredientes().push(this.nuevoIngrediente(nombre, cantidad, unidades, tipo, is));
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

  onChange(input: any, select: any, i: number) {
    if (input.controls.unidades.value === 'Al gusto' || input.controls.unidades.value === 'Sin unidades') {
      select.disabled = true;
    } else {
      select.disabled = false;
      ((this.ingredientes().controls[i]) as FormGroup).get('cantidad').enable();
    }
  }

  chooseImage(archivo) {
    if (!archivo) {
      this.imgUpload = null;
      this.imgTemp = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.swal.crearSwal('comun.alertas.errores.noImagen', 'error');
      this.imgUpload = null;
      this.imgTemp = null;
      return;
    }
    this.imgUpload = archivo;

    const reader = new FileReader();
    const url = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imgTemp = reader.result.toString();
  }

  comprobarPrincipal() {
    for (const ing of this.form.value.ingredientes) {
      if (ing.tipo === 'Principal') {
        return false;
      }
    }
    return true;
  }

  comprobarRepetidos() {
    const sortedArr = this.form.value.ingredientes.slice().sort();
    const results = [];
    for (let i = 0; i < sortedArr.length - 1; i++) {
      if (sortedArr[i + 1].nombre === sortedArr[i].nombre && sortedArr[i].nombre !== '') {
        results.push(sortedArr[i]);
      }
    }
    return results.length > 0;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.swal.crearSwal('comun.alertas.errores.completarCampos', 'error');
      return;
    }
    // if (this.comprobarPrincipal()) {
    //   this.swal.crearSwal('comun.alertas.errores.noIngredientePrincipal', 'error');
    //   return;
    // }
    if (this.comprobarRepetidos()) {
      this.swal.crearSwal('comun.alertas.errores.noIngredientesDuplicados', 'error');
      return;
    }
    if (this.imgUpload == null && !this.modificando) {
      this.swal.crearSwal('comun.alertas.errores.noImagenAñadida', 'error');
      return;
    }
    if (this.modificando) {
      this.modificarReceta();
    } else {
      this.crearReceta();
    }
  }

  crearReceta() {
    this.cargando = true;
    Object.assign(this.recipe, this.form.value);
    this.ingredientService.obtenerIngsRecipe(this.recipe.ingredientes).subscribe(resp => {
      console.log(resp);
      this.recipe.ingredientes = resp;
      console.log(this.recipe.ingredientes);
      this.recipeService.crearReceta(this.recipe).subscribe(resp => {
        this.recipe._id = resp._id;
        this.form.value.imagen = this.imgUpload;
        this.recipeService.cambiarImagen(this.recipe, this.form.value.imagen);
        this.voteService.crearVotacion(this.recipe._id).subscribe(resp => {
          this.cargando = false;
          this.router.navigate(['/addIngsRecipe/', this.recipe._id]);
        });
      });
    });
  }

  modificarReceta() {
    this.cargando = true;
    Object.assign(this.recipe, this.form.value);
    this.ingredientService.obtenerIngsRecipe(this.recipe.ingredientes).subscribe(resp => {
      this.recipe.ingredientes = resp;
      this.recipeService.modificarReceta(this.recipe).subscribe(resp => {
        if (this.imgUpload) {
          this.form.value.imagen = this.imgUpload;
          this.recipeService.cambiarImagen(this.recipe, this.form.value.imagen);
        }
        this.cargando = false;
        this.router.navigate(['/addIngsRecipe/', this.recipe._id]);
      });
    });
  }
}
