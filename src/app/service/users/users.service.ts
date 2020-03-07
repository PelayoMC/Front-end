import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(map(
      (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return resp.id;
      }
    ));
  }

  login(user: Usuario, recuerdame: boolean) {

    if ( recuerdame ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, user).pipe(map(
      (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return resp.id;
      }
    ));
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }

  equalPasswords(pass1: string, pass2: string) {
    return (group: FormGroup) => {
      const p1 = group.controls[pass1].value;
      const p2 = group.controls[pass2].value;
      if ( p1 === p2 ) {
        return null;
      }
      return{
        equalPasswords: true
      };
    };
  }
}
