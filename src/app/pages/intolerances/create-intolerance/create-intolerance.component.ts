import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER } from '@angular/cdk/keycodes';
import { Intolerance } from 'src/app/models/intolerance.model';
import { Etiqueta } from '../../../models/etiqueta.model';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { TagsServiceService } from '../../../service/service.index';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
import { IntolerancesService } from '../../../service/intolerances/intolerances.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-intolerance',
  templateUrl: './create-intolerance.component.html'
})
export class CreateIntoleranceComponent implements OnInit {

  intolerancia: Intolerance;
  tags: Etiqueta[];
  copy: Etiqueta[] = [];

  imgUpload: any;
  imgTemp: string;
  form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('input', {static: false}) input: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private fb: FormBuilder, public tagsService: TagsServiceService, public intoleranceService: IntolerancesService, public router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      noApto: this.fb.array([], Validators.required)
    });
    this.intolerancia = new Intolerance();
    this.cargarEtiquetas();
  }

  cargarEtiquetas() {
    this.tagsService.obtenerTags().subscribe((resp: any) => {
      const ar: Etiqueta[] = [];
      for (let i = 0; i < resp.etiquetas.length; i++) {
        ar[i] = new Etiqueta(resp.etiquetas[i].nombre, resp.etiquetas[i]._id);
      }
      this.tags = ar;
      for (const tag of this.tags) {
        this.addNoApto(tag.nombre);
      }
    });
  }

  noAptos(): FormArray {
    return this.form.get('noApto') as FormArray;
  }

  nuevoNoApto(str: string): FormControl {
    return this.fb.control(str, Validators.required);
  }

  addNoApto(str: string) {
    this.noAptos().push(this.nuevoNoApto(str));
  }

  eliminarNoApto(i: number) {
    this.noAptos().removeAt(i);
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
    this.intolerancia.imagen = this.imgTemp;
  }

  onSubmit() {
    if (this.imgUpload == null) {
      Swal.fire('Error', 'Añada una imagen a la intolerancia', 'error');
      return;
    }
    if (this.form.invalid) {
      Swal.fire('Error', 'Complete todos los campos', 'error');
      return;
    }
    const ar = this.añadirIntolerancia(this.form.value);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(new Etiqueta(value.trim()));
      this.copy.splice(this.copy.findIndex(el => el.nombre === value.trim()), 1);
      this.addNoApto(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const ar = this.tags.map(el => el.nombre);
    const index = ar.indexOf(tag);

    if (index >= 0) {
      this.copy.push(this.tags[index]);
      this.tags.splice(index, 1);
      this.eliminarNoApto(index);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(new Etiqueta(event.option.viewValue));
    this.copy.splice(this.copy.findIndex(el => el.nombre === event.option.viewValue), 1);
    this.addNoApto(event.option.viewValue);
    this.input.nativeElement.value = '';
  }

  nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  descripcionNoValida() {
    return this.form.get('descripcion').invalid && this.form.get('descripcion').touched;
  }

  aptoNoValido() {
    return this.form.get('noApto').invalid;
  }

  añadirCamposIntolerancia() {
    this.intolerancia.nombre = this.form.value.nombre;
    this.intolerancia.descripcion = this.form.value.descripcion;
    this.intolerancia.noApto = this.form.value.noApto;
  }

  añadirIntolerancia(str: any) {
    this.tagsService.obtenerTags().subscribe((resp: any) => {
      const ar1 = str.noApto;
      const ar2 = resp.etiquetas.map(el => el.nombre);
      const ar = ar1.filter(el => !ar2.includes(el));
      if (ar.length > 0) {
        console.log('Añadimos tags');
        this.tagsService.añadirTag(ar).subscribe(resp => {
          this.addInto();
        });
      } else {
        console.log('No añadimos tags');
        this.addInto();
      }
    });
  }

  addInto(){
    this.añadirCamposIntolerancia();
    this.intoleranceService.añadirIntolerancia(this.intolerancia).subscribe((resp: any) => {
      this.intolerancia._id = resp._id;
      this.intoleranceService.cambiarImagen(this.intolerancia, this.imgUpload);
      this.router.navigate(['/intolerances']);
    });
  }
}
