import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UploadImageService } from '../upload/upload-image.service';
import { SwalService } from '../language/swal.service';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(new Usuario());
  token: string;

  constructor(public http: HttpClient, public router: Router, public uploadService: UploadImageService, public swal: SwalService) {
    this.cargarStorage();
  }

  setUser(usuario: Usuario) {
    this.usuario.next(usuario);
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
      this.swal.crearSwal('comun.alertas.errores.renovarToken', 'error');
      return throwError(err);
    }));
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  esAdmin() {
    if (localStorage.getItem('usuario')) {
      return this.usuario.value.rol === 'ADMIN';
    }
  }

  esUser() {
    return this.estaLogueado() && !this.esAdmin();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.setUser(JSON.parse(localStorage.getItem('usuario')));
    } else {
      this.token = '';
      this.setUser(null);
    }
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(map(
      (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return resp.id;
      }
    ),
    catchError( err => {
      this.swal.crearSwal('comun.alertas.errores.sesionGoogle', 'error');
      this.logout('login');
      return throwError(err);
    }));
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
        this.swal.crearSwal('comun.alertas.errores.sesion', 'error');
        this.logout('login');
        return throwError(err);
      })
    );
  }

  loginReset(user: Usuario) {
    const url = URL_SERVICIOS + '/login/loginReset';
    return this.http.post(url, user).pipe(map(
      (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return resp.id;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.sesion', 'error');
        this.logout('login');
        return throwError(err);
      })
    );
  }

  logout(redireccion) {
    redireccion = '/' + redireccion;
    this.token = '';
    this.setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate([redireccion]);
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

    this.setUser(usuario);
    this.token = token;
  }

  resetPassword(email: string, mensaje: any) {
    const em = { email, mensaje };
    const url = URL_SERVICIOS + '/login/emailReset';
    return this.http.post(url, em).pipe(
      map( (resp: any) => {
        return resp.usuario;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.crearUsuario', 'error');
        return throwError(err);
      })
    );
  }

  crearUsuario(usuario: Usuario, mensaje: any) {
    const url = URL_SERVICIOS + '/usuario';
    const msj = {
      usuario,
      mensaje
    };
    return this.http.post(url, msj).pipe(
      map( (resp: any) => {
        return resp.usuario;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.crearUsuario', 'error');
        return throwError(err);
      })
    );
  }

  modificarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map( (resp: any) => {
        if (usuario._id === this.usuario.value._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        }
        return resp.usuario;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarUsuario', 'error');
        return throwError(err);
      })
    );
  }

  cargarUsuarios(from: number = 0) {
    let url = URL_SERVICIOS + '/usuario?from=' + from;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  obtenerUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.usuario;
      })
    );
  }

  obtenerUsuarios(ids: string[]) {
    let url = URL_SERVICIOS + '/usuario/all'  + '?token=' + this.token;
    return this.http.post(url, ids).pipe(
      map(  (resp: any) => {
        return resp.usuarios;
      })
    );
  }

  buscarUsuarios(termino: string, from: number) {
    let url = URL_SERVICIOS + '/busqueda/usuario/' + termino + '?from=' + from;
    return this.http.post(url, []).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.buscarUsuario', 'error');
        return throwError(err);
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
        this.swal.crearSwal('comun.alertas.errores.borrarUsuario', 'error');
        return throwError(err);
      })
    );
  }

  obtenerRecetasFavoritas(usuario: string, from: number, to: number) {
    let url = URL_SERVICIOS + '/usuario/recetas/' + usuario + '?from=' + from + '&limit=' + to;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.buscarRecetasFavoritas', 'error');
        return throwError(err);
      })
    );
  }

  obtenerMisIntolerancias(usuario: string, from: number, to: number) {
    let url = URL_SERVICIOS + '/usuario/intolerancias/' + usuario + '?from=' + from + '&limit=' + to;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.buscarMisIntolerancias', 'error');
        return throwError(err);
      })
    );
  }

  cambiarImagen(file: File, id: string) {
    this.uploadService.subirArchivo(file, 'usuarios', id).then( (resp: any) => {
      this.usuario.value.imagen = JSON.parse(resp).usuario.imagen;
      this.guardarStorage(id, this.token, this.usuario.value);
      this.swal.crearSwal('comun.alertas.exito.cambiarImagen', 'success');
    }).catch( err => {
      this.swal.crearSwal('comun.alertas.errores.cambiarImagen', 'error');
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
