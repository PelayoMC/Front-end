import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { TagsService } from 'src/app/service/service.index';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html'
})
export class SearchTagComponent implements OnInit {

  constructor(private fb: FormBuilder, public tagsService: TagsService) { }

  form: FormGroup;
  @Input() tagsInput: string[];
  tags: Etiqueta[] = [];
  copy: Etiqueta[] = [];
  filteredTags: string[];

  @Output() etiquetas = new EventEmitter<string[]>();

  ngOnInit() {
    this.form = this.fb.group({
      noApto: this.fb.array([])
    });
    this.cargarEtiquetas();
    const ar: Etiqueta[] = [];
    for (let i = 0; i < this.tagsInput.length; i++) {
      ar[i] = new Etiqueta(this.tagsInput[i], null);
    }
    this.tags = ar;
  }

  cargarEtiquetas() {
    this.tagsService.obtenerEtiquetas().subscribe((resp: any) => {
      const ar: Etiqueta[] = [];
      for (let i = 0; i < resp.etiquetas.length; i++) {
        ar[i] = new Etiqueta(resp.etiquetas[i].nombre, resp.etiquetas[i]._id);
      }
      this.copy = ar;
      this.filteredTags = this.copy.map(el => el.nombre).slice();
    });
  }

  getTags() {
    return this.tags.map(el => el.nombre).sort();
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
    this.filteredTags = this.copy.map(el => el.nombre).filter(el => el.includes(input.value));
  }

  remove(tag: string, i: number): void {
    const ar = this.tags.map(el => el.nombre);
    const index = ar.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.eliminarNoApto(i);
    }
    this.etiquetas.emit(this.getTags());
  }

  selected(event: MatAutocompleteSelectedEvent, input: any): void {
    this.tags.push(new Etiqueta(event.option.viewValue));
    this.addNoApto(event.option.viewValue);
    this.filteredTags = this.copy.map(el => el.nombre);
    input.blur();
    input.value = '';
    this.etiquetas.emit(this.getTags());
  }

}
