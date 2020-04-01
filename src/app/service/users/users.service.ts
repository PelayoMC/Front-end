import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { AuthService } from '../auth/auth.service';
import { UploadImageService } from '../upload/upload-image.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public uploadService: UploadImageService, public auth: AuthService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url).pipe(map(
      (resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
      }
    ), catchError(err => {
      this.router.navigate(['/login']);
      Swal.fire('No se pudo renovar token', 'No se ha podido renovar el token de sesión de usuario', 'error');
      return throwError(err);
    }));
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
      }, catchError(err => {
        if (!this.auth.checkTokenGoogle(err)) {
          this.logout();
        }
        return throwError(err);
      })
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
      }),
      catchError( err => {
        if (this.auth.checkToken(err)) {
          Swal.fire('Error al iniciar sesión', err.error.mensaje, 'error');
        } else {
          this.logout();
        }
        return throwError(err);
      })
    );
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  recordar(recuerdame: boolean) {
    if (recuerdame) {
      localStorage.setItem('remember', 'true');
    } else {
      localStorage.setItem('remember', 'false');
    }
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
        return resp.usuario;
      }),
      catchError( err => {
        if (this.auth.checkToken(err)) {
          Swal.fire(err.error.mensaje, 'Utilice un email distinto', 'error');
        } else {
          this.logout();
        }
        return throwError(err);
      })
    );
  }

  modificarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map( (resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        }
        Swal.fire('Usuario modificado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError( err => {
        if (!this.auth.checkToken(err)) {
          this.logout();
        }
        return throwError(err);
      })
    );
  }

  cargarUsuarios(from: number = 0) {
    let url = URL_SERVICIOS + '/usuario?from=' + from;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/usuario/' + termino;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.coleccion;
      })
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(
      map(  (resp: any) => {
        return resp.usuario;
      }),
      catchError( err => {
        if (!this.auth.checkToken(err)) {
          this.logout();
        }
        return throwError(err);
      })
    );
  }

  cambiarImagen(file: File, id: string) {
    this.uploadService.subirArchivo(file, 'usuarios', id).then( (resp: any) => {
      this.usuario.imagen = JSON.parse(resp).usuario.imagen;
      this.guardarStorage(id, this.token, this.usuario);
      Swal.fire('Imagen actualizada', this.usuario.email, 'success');
    }).catch( err => {
      console.log(err);
      Swal.fire('Imagen no actualizada', this.usuario.email, 'error');
    });
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
