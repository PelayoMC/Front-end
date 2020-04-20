import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { Intolerance } from 'src/app/models/intolerance.model';
import { Etiqueta } from '../../../models/etiqueta.model';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { TagsServiceService, IntolerancesService } from '../../../service/service.index';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../../config/config';

@Component({
  selector: 'app-create-intolerance',
  templateUrl: './create-intolerance.component.html'
})
export class CreateIntoleranceComponent implements OnInit {

  intolerancia: Intolerance;
  modificando = false;
  cargando = true;

  tags: Etiqueta[];
  copy: Etiqueta[] = [];

  imgUpload: any;
  imgTemp: string;
  form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('input', {static: false}) input: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private fb: FormBuilder, public route: ActivatedRoute,  public tagsService: TagsServiceService, public intoleranceService: IntolerancesService, public router: Router) { }

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
    this.tagsService.obtenerEtiquetas().subscribe((resp: any) => {
      const ar: Etiqueta[] = [];
      for (let i = 0; i < resp.etiquetas.length; i++) {
        ar[i] = new Etiqueta(resp.etiquetas[i].nombre, resp.etiquetas[i]._id);
      }
      this.tags = ar;
      for (const tag of this.tags) {
        this.addNoApto(tag.nombre);
      }
      this.cargarIntolerancia();
      this.cargando = false;
    });
  }

  cargarIntolerancia() {
    this.route.queryParams.subscribe(params => {
      if (params.nombre) {
        this.intolerancia._id = params._id;
        this.form.get('nombre').setValue(params.nombre);
        this.form.get('descripcion').setValue(params.descripcion);
        this.imgTemp = URL_SERVICIOS + '/imagen/intolerancias/' + params.imagen;
        this.eliminarEtiquetas(params.noApto);
        this.modificando = true;
      }
    });
  }

  eliminarEtiquetas(array: string[]) {
    const ar = this.tags.map(el => el.nombre).filter(el2 => !array.includes(el2));
    for (const st of ar) {
      this.remove(st);
    }
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
    if (this.imgUpload == null  && !this.modificando) {
      Swal.fire('Error', 'Añada una imagen a la intolerancia', 'error');
      return;
    }
    if (this.form.invalid) {
      Swal.fire('Error', 'Complete todos los campos', 'error');
      return;
    }
    if (!this.modificando) {
      this.añadirIntolerancia(this.form.value);
    } else {
      this.modificarIntolerancia(this.form.value);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(new Etiqueta(value.trim()));
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
    this.input.nativeElement.blur();
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
    this.tagsService.obtenerEtiquetas().subscribe((resp: any) => {
      const ar1 = str.noApto;
      const ar2 = resp.etiquetas.map(el => el.nombre);
      const ar = ar1.filter(el => !ar2.includes(el));
      if (ar.length > 0) {
        this.tagsService.añadirTags(ar).subscribe(resp => {
          this.addInto();
        });
      } else {
        this.addInto();
      }
    });
  }

  modificarIntolerancia(str: any) {
    this.tagsService.obtenerEtiquetas().subscribe((resp: any) => {
      const ar1 = str.noApto;
      const ar2 = resp.etiquetas.map(el => el.nombre);
      const ar = ar1.filter(el => !ar2.includes(el));
      if (ar.length > 0) {
        this.tagsService.añadirTags(ar).subscribe(resp => {
          this.modInto();
        });
      } else {
        this.modInto();
      }
    });
  }

  addInto() {
    this.añadirCamposIntolerancia();
    this.intoleranceService.añadirIntolerancia(this.intolerancia).subscribe((resp: any) => {
      this.intolerancia._id = resp._id;
      this.intoleranceService.cambiarImagen(this.intolerancia, this.imgUpload);
      Swal.fire('Intolerancia añadida', 'La intolerancia se ha añadido correctamente', 'success');
      this.router.navigate(['/intolerances']);
    });
  }

  modInto() {
    this.añadirCamposIntolerancia();
    this.intoleranceService.modificarIntolerancia(this.intolerancia).subscribe((resp: any) => {
      if (this.imgUpload) {
        this.intolerancia._id = resp._id;
        this.intoleranceService.cambiarImagen(this.intolerancia, this.imgUpload);
      }
      Swal.fire('Intolerancia modificada', 'La intolerancia se ha modificado correctamente', 'success');
      this.router.navigate(['/intolerances']);
    });
  }
}
 