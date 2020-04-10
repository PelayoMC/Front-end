import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../service/service.index';
import { Usuario } from '../../../models/usuario.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  form: FormGroup;
  usuario: Usuario;
  modificando: string;
  imgUpload: any;
  imgTemp: string;

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.userService.usuario.value;
    this.modificando = 'false';
    this.form = new FormGroup({
      nombre: new FormControl({value: this.usuario.nombre, disabled: true}, Validators.required),
      email: new FormControl({value: this.usuario.email, disabled: true}, [Validators.required, Validators.email])
    });
  }

  chooseImage(archivo) {
    if (!archivo) {
      this.imgUpload = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error');
      this.imgUpload = null;
      return;
    }
    this.imgUpload = archivo;

    let reader = new FileReader();
    let url = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imgTemp = reader.result.toString();
  }

  changeImage() {
    this.userService.cambiarImagen(this.imgUpload, this.usuario._id);
    this.imgTemp = '';
  }

  swapForm() {
    if (!this.form.enabled) {
      this.form.get('nombre').enable();
      if (!this.usuario.google) {
        this.form.get('email').enable();
      }
    } else {
      this.form.get('nombre').disable();
      this.form.get('email').disable();
    }
  }

  modificar() {
    if (this.form.invalid) {
      return;
    }

    this.usuario.nombre = this.form.get('nombre').value;
    if (!this.usuario.google) {
      this.usuario.email = this.form.get('email').value;
    }

    this.userService.modificarUsuario(this.usuario).subscribe(resp => {
      this.swapForm();
      this.modificando = 'false';
      this.usuario = resp;
      this.router.navigate(['/user', this.usuario._id]);
    });
  }
}
