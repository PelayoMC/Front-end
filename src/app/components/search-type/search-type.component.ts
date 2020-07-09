import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { RecipesService } from '../../service/recipes/recipes.service';
import * as opt from '../../pages/recipes/create-recipe/select-options';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-search-type',
  templateUrl: './search-type.component.html'
})
export class SearchTypeComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  form: FormGroup;
  tipos: string[] = [];
  copy: string[] = [];
  filteredTipos: string[];

  @Output() types = new EventEmitter<string[]>();

  ngOnInit() {
    this.form = this.fb.group({
      tipos: this.fb.array([])
    });
    this.cargarTipos();
  }

  cargarTipos() {
    this.copy = opt.tipo.map(el => el.nombre);
    this.filteredTipos = this.copy.slice();
    console.log(this.copy);
  }

  tipo(): FormArray {
    return this.form.get('tipos') as FormArray;
  }

  nuevoTipo(str: string): FormControl {
    return this.fb.control(str);
  }

  addTipo(str: string) {
    this.tipo().push(this.nuevoTipo(str));
  }

  eliminarTipo(i: number) {
    this.tipo().removeAt(i);
  }

  tipoNoValido() {
    if (this.tipo()) {
      return this.tipo().invalid;
    }
  }

  tipoRepetido() {
    if (this.tipo() && this.tipo().value.length > 0) {
      return this.findDuplicates(this.tipo().value).length > 0;
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
    this.filteredTipos = this.copy.filter(el => el.toLowerCase().includes(input.value.toLowerCase()));
  }

  remove(tipo: string, i: number): void {
    const ar = this.tipos;
    const index = ar.indexOf(tipo);

    if (index >= 0) {
      this.tipos.splice(index, 1);
      this.eliminarTipo(i);
      this.types.emit(this.tipos);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, input: any): void {
    this.tipos.push(event.option.viewValue);
    this.addTipo(event.option.viewValue);
    this.filteredTipos = this.copy;
    input.blur();
    input.value = '';
    this.types.emit(this.tipos);
  }

}
