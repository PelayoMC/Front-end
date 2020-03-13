import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html'
})
export class CreateRecipeComponent implements OnInit {

  imgTemp: any;
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.imgTemp = null;
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      ingredientes: this.fb.array([
        this.fb.group({
          nombre: [null, Validators.required],
          cantidad: [0, Validators.required],
          unidades: [null, Validators.required]
        })
      ]),
      pasos: this.fb.array([
        [null, Validators.required]
      ]),
    });
  }

  ingredientes(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  nuevoIngrediente(): FormGroup {
    return this.fb.group({
      nombre: [null, Validators.required],
      cantidad: [0, Validators.required],
      unidades: [null, Validators.required]
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

  onSubmit() {
    if (this.form.invalid) {
      console.log('FORMULARIO INVÁLIDO TUU');
    } else {
      console.log('FORMULARIO VALIDO');
      console.log(this.form.value);
    }
  }
}
