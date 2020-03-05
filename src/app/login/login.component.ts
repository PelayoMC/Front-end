import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../service/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// Libreria google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  auth2: any;

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '72467451062-1uu3j42qch0fl30i53881sf6r6ejljsk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token)
        .subscribe(resp => {
          window.location.href = '#/user/' + resp;
        });
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario (null, forma.value.email, forma.value.contraseña);
    this.userService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/user/' + resp]));
  }

}
