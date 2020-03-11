import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html'
})
export class CreateRecipeComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      ingredientes: this.fb.array([]),
      pasos: this.fb.array([
        []
      ]),
    });
  }

  pasos(): FormArray {
    return this.form.get('pasos') as FormArray;
  }

  crearReceta() {

  }

  nuevoPaso(): FormControl {
    return this.fb.control('');
  }

  addPaso() {
    this.pasos().push(this.nuevoPaso());
  }

  eliminarPaso(i: number){
    this.pasos().removeAt(i);
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
