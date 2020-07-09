import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IntolerancesService } from 'src/app/service/service.index';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Intolerance } from '../../models/intolerance.model';

@Component({
  selector: 'app-search-intolerance',
  templateUrl: './search-intolerance.component.html'
})
export class SearchIntoleranceComponent implements OnInit {

  constructor(private fb: FormBuilder, public intoleranceService: IntolerancesService) { }

  form: FormGroup;
  @Input() tagsInput: string[];
  tags: Intolerance[] = [];
  copy: Intolerance[] = [];
  filteredTags: string[];

  @Output() intolerancias = new EventEmitter<string[]>();

  ngOnInit() {
    this.form = this.fb.group({
      noApto: this.fb.array([])
    });
    this.cargarIntolerancias();
  }

  cargarIntolerancias() {
    this.intoleranceService.obtenerAllInto().subscribe((resp: any) => {
      const ar: Intolerance[] = [];
      for (let i = 0; i < resp.intolerancias.length; i++) {
        ar[i] = new Intolerance(resp.intolerancias[i].nombre);
      }
      this.copy = ar;
      this.filteredTags = this.copy.map(el => el.nombre).slice();
    });
  }

  noAptos(): FormArray {
    return this.form.get('noApto') as FormArray;
  }

  nuevoNoApto(str: string): FormControl {
    return this.fb.control(str);
  }

  addNoApto(str: string) {
    this.noAptos().push(this.nuevoNoApto(str));
  }

  eliminarNoApto(i: number) {
    this.noAptos().removeAt(i);
  }

  aptoNoValido() {
    if (this.noAptos()) {
      return this.noAptos().invalid;
    }
  }

  aptoRepetido() {
    if (this.noAptos() && this.noAptos().value.length > 0) {
      return this.findDuplicates(this.noAptos().value).length > 0;
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

  remove(tag: string, i: number): void {
    const ar = this.tags.map(el => el.nombre);
    const index = ar.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.eliminarNoApto(i);
    }
    this.emitir();
  }

  selected(event: MatAutocompleteSelectedEvent, input: any): void {
    this.tags.push(new Etiqueta(event.option.viewValue));
    this.addNoApto(event.option.viewValue);
    this.filteredTags = this.copy.map(el => el.nombre);
    input.blur();
    input.value = '';
    this.emitir();
  }

  emitir() {
    this.intoleranceService.getIntoNombres(this.tags.map(el => el.nombre)).subscribe(resp => {
      this.intolerancias.emit(this.obtainWithoutRepeat(resp.map(el => el.noApto)));
    });
  }

  obtainWithoutRepeat(array) {
    const ar = [];
    for (let arr of array) {
      for (let a of arr) {
        if (!ar.includes(a)){
          ar.push(a);
        }
      }
    }
    return ar.sort();
  }

}
