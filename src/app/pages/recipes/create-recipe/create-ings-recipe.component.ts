import { Component, OnInit, } from '@angular/core';
import { RecipesService, IngredientsService, SustValidatorService, TagsService, SwalService } from '../../../service/service.index';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Ingredient } from '../../../models/ingredient.model';
import { IngredientRecipe } from '../../../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-create-ings-recipe',
  templateUrl: './create-ings-recipe.component.html'
})
export class CreateIngsRecipeComponent implements OnInit {

  idReceta: string;
  form: FormGroup;
  ingredients: IngredientRecipe[] = [];
  tags: [Etiqueta[]] = [[]];
  copy: Etiqueta[] = [];
  filteredTags: string[];

  cargando = true;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              public recipesService: RecipesService, public ingsService: IngredientsService,
              public router: Router, public validador: SustValidatorService,
              public tagsService: TagsService, public swal: SwalService) { }

  ngOnInit() {
    this.form = this.fb.group({
      noApto: this.fb.array([]),
      ingredientes: this.fb.array([])
    });
    this.activatedRoute.params.subscribe(params => {
      this.idReceta = params.id;
      this.recipesService.getIngredients(this.idReceta).subscribe((resp: IngredientRecipe[]) => {
        this.ingredients = resp;
        this.cargarIngredientes();
        this.cargarEtiquetas();
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

  cargarEtiquetas() {
    this.tagsService.obtenerEtiquetas().subscribe((resp: any) => {
      const ar: Etiqueta[] = [];
      for (let i = 0; i < resp.etiquetas.length; i++) {
        ar[i] = new Etiqueta(resp.etiquetas[i].nombre, resp.etiquetas[i]._id);
      }
      this.copy = ar;
      this.filteredTags = this.copy.map(el => el.nombre).slice();
      for (const ing of this.ingredients) {
        (this.form.get('noApto') as FormArray).push(
          this.fb.array([])
        );
      }
      this.ingsService.obtenerEtiquetas(this.ingredients.map(el => el._id)).subscribe(resp => {
        for (let i = 0; i < resp.length; i++) {
          const ar: Etiqueta[] = [];
          for (let j = 0; j < resp[i].length; j++) {
            ar[j] = new Etiqueta(resp[i][j]);
          }
          this.tags[i] = ar;
        }
        this.cargando = false;
      });
    });
  }

  noAptos(i: number): FormArray {
    return (this.form.get('noApto') as FormArray).controls[i] as FormArray;
  }

  nuevoNoApto(str: string): FormControl {
    return this.fb.control(str);
  }

  addNoApto(str: string, i: number) {
    this.noAptos(i).push(this.nuevoNoApto(str));
  }

  eliminarNoApto(i: number, j: number) {
    this.noAptos(i).removeAt(j);
  }

  aptoNoValido(i: number) {
    if (this.noAptos(i)) {
      return this.noAptos(i).invalid;
    }
  }

  aptoRepetido(i: number) {
    if (this.noAptos(i) && this.noAptos(i).value.length > 0) {
      return this.findDuplicates(this.noAptos(i).value).length > 0;
    }
  }

  findDuplicates(arr) {
    const sortedArr = arr.slice().sort();
    const results = [];
    for (let i = 0; i < sortedArr.length - 1; i++) {
      if (sortedArr[i + 1] === sortedArr[i] && sortedArr[i] !== '') {
        results.push(sortedArr[i]);
      }
    }
    return results;
  }

  filtrar(input: any) {
    this.filteredTags = this.copy.map(el => el.nombre).filter(el => el.toLowerCase().includes(input.value.toLowerCase()));
  }

  remove(tag: string, j: number): void {
    const ar = this.tags[j].map(el => el.nombre);
    const index = ar.indexOf(tag);

    if (index >= 0) {
      this.tags[j].splice(index, 1);
      this.eliminarNoApto(j, index);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, i: number, input: any): void {
    this.tags[i].push(new Etiqueta(event.option.viewValue));
    this.addNoApto(event.option.viewValue, i);
    this.filteredTags = this.copy.map(el => el.nombre);
    input.blur();
    input.value = '';
  }

  onSubmit() {
    this.addIngs();
  }

  addIngs() {
    if ( this.form.invalid ) {
      this.swal.crearSwal('comun.alertas.errores.completarCampos', 'error');
      return;
    }
    if (this.findDuplicates(this.form.value.ingredientes).length > 0) {
      this.swal.crearSwal('comun.alertas.errores.noIngredientesDuplicados', 'error');
      return;
    }
    this.cargando = true;
    console.log(this.ingredients);
    console.log(this.tags);
    this.ingsService.añadirEtiquetas(this.ingredients, this.tags).subscribe(resp => {
      this.crearReceta();
    });
  }

  crearReceta() {
    this.ingsService.crearIngredientes(this.form.value.ingredientes).subscribe((resp: Ingredient[]) => {
      let a = 0;
      for (let i = 0; i < this.ingredients.length; i++) {
        if (this.form.value.ingredientes[i] !== '') {
          this.ingredients[i].ingredienteSustituible = resp[a++]._id;
        } else if (!this.ingredients[i].ingredienteSustituible) {
          this.ingredients[i].ingredienteSustituible = null;
        }
      }
      this.modReceta();
    });
  }

  modReceta() {
    this.recipesService.guardarIngredientes(this.idReceta, this.ingredients).subscribe((resp: Ingredient[]) => {
      this.cargando = false;
      this.swal.crearSwal('comun.alertas.exito.ingsYTagsAñadidos', 'success');
      this.router.navigate(['/recipes']);
    });
  }

  ingredienteInvalido(i: number) {
    return (this.form.get('ingredientes') as FormArray).controls[i].invalid;
  }
}
