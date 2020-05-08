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
      email: new FormControl({value: this.usuario.email, disabled: true}, [Validators.required, Validators.email]),
      edad: new FormControl({value: this.usuario.edad, disabled: true}, Validators.required),
      altura: new FormControl({value: this.usuario.altura, disabled: true}, Validators.required),
      peso: new FormControl({value: this.usuario.peso, disabled: true}, Validators.required)
    });
    this.mostrarNotificaciones();
  }

  mostrarNotificaciones() {
    for (const notificacion of this.usuario.notificaciones) {
      Swal.fire(notificacion.titulo, notificacion.mensaje, 'info');
    }
    this.usuario.notificaciones = [];
    this.userService.modificarUsuario(this.usuario).subscribe();
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
      this.form.get('edad').enable();
      this.form.get('altura').enable();
      this.form.get('peso').enable();
      if (!this.usuario.google) {
        this.form.get('email').enable();
      }
    } else {
      this.form.get('nombre').disable();
      this.form.get('email').disable();
      this.form.get('edad').disable();
      this.form.get('altura').disable();
      this.form.get('peso').disable();
    }
  }

  nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  edadNoValido() {
    return this.form.get('edad').invalid && this.form.get('edad').touched;
  }

  alturaNoValido() {
    return this.form.get('altura').invalid && this.form.get('altura').touched;
  }

  pesoNoValido() {
    return this.form.get('peso').invalid && this.form.get('peso').touched;
  }

  modificar() {
    if (this.form.invalid) {
      Swal.fire('Formulario incorrecto', 'Rellene todos los campos', 'error');
      return;
    }

    this.usuario.nombre = this.form.get('nombre').value;
    this.usuario.edad = this.form.get('edad').value;
    this.usuario.altura = this.form.get('altura').value;
    this.usuario.peso = this.form.get('peso').value;
    if (!this.usuario.google) {
      this.usuario.email = this.form.get('email').value;
    }

    this.userService.modificarUsuario(this.usuario).subscribe(resp => {
      Swal.fire('Usuario modificado', resp.email, 'success');
      this.swapForm();
      this.modificando = 'false';
      this.usuario = resp;
      this.router.navigate(['/user', this.usuario._id]);
    });
  }
}
