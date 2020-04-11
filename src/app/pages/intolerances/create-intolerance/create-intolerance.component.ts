import { Component, OnInit } from '@angular/core';
import { Intolerance } from 'src/app/models/intolerance.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-intolerance',
  templateUrl: './create-intolerance.component.html'
})
export class CreateIntoleranceComponent implements OnInit {

  intolerancia: Intolerance;

  imgUpload: any;
  imgTemp: string;
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
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
    if (this.form.invalid || (this.imgUpload == null)) {
      return;
    }
    console.log(this.form.value);
  }
}
