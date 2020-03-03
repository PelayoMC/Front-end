import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../service/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit() {
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {

    }
    let usuario = new Usuario (null, forma.value.email, forma.value.contraseña);
    this.userService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
