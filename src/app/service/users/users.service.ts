import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  login (user: Usuario, recuerdame: boolean) {
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, user);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }

  equalPasswords(pass1: string, pass2: string) {
    return (group: FormGroup) => {
      let p1 = group.controls[pass1].value;
      let p2 = group.controls[pass2].value;
      if ( p1 === p2 ) {
        return null;
      }
      return{
        equalPasswords: true
      };
    };
  }
}
