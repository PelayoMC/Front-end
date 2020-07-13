import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Dieta } from '../../models/dieta.model';
import { SwalService } from '../language/swal.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(public http: HttpClient, public userService: UsersService, public swal: SwalService) { }

  obtenerDietaId(id: string) {
    let url = URL_SERVICIOS + '/dieta/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.dieta[0];
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerDietas', 'error');
        return throwError(err);
      })
    );
  }

  obtenerDietaAdmin(id: string) {
    let url = URL_SERVICIOS + '/dieta/admin/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.dieta[0];
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerDietas', 'error');
        return throwError(err);
      })
    );
  }

  obtenerDietaUser(id: string) {
    let url = URL_SERVICIOS + '/dieta/usuario/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.dieta[0];
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerDietas', 'error');
        return throwError(err);
      })
    );
  }

  obtenerDietasSinAsignar(from: number, to: number) {
    let url = URL_SERVICIOS + '/dieta/asignar' + '?from=' + from + '&limit=' + to;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerDietas', 'error');
        return throwError(err);
      })
    );
  }

  obtenerDietasAsignadas(id: string, from: number, to: number) {
    let url = URL_SERVICIOS + '/dieta/asignadas/' + id  + '?from=' + from + '&limit=' + to;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerDietas', 'error');
        return throwError(err);
      })
    );
  }

  obtenerComentariosDietas(id: string, from: number, to: number) {
    let url = URL_SERVICIOS + '/dieta/comentarios/' + id  + '?from=' + from + '&limit=' + to;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerDietas', 'error');
        return throwError(err);
      })
    );
  }

  obtenerRecetasDietas(id: string) {
    let url = URL_SERVICIOS + '/dieta/recetas/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerDietas', 'error');
        return throwError(err);
      })
    );
  }

  crearDieta() {
    const us = {
      usuario: this.userService.usuario.value._id
    };
    let url = URL_SERVICIOS + '/dieta';
    url += '?token=' + localStorage.token;
    return this.http.post(url, us).pipe(
      map(  (resp: any) => {
        this.swal.crearSwal('comun.alertas.exito.dietaSolicitada', 'success');
        return resp.dieta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.crearDieta', 'error');
        return throwError(err);
      })
    );
  }

  modificarDieta(dieta: Dieta) {
    const data = {
      dieta
    };
    let url = URL_SERVICIOS + '/dieta/' + dieta._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, data).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarDieta', 'error');
        return throwError(err);
      })
    );
  }

  asignarDieta(dieta: Dieta, mensaje: any) {
    const data = {
      dieta,
      mensaje
    };
    let url = URL_SERVICIOS + '/dieta/asignar/' + dieta._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, data).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarDieta', 'error');
        return throwError(err);
      })
    );
  }

  modificarFeedbackDieta(dieta: Dieta) {
    let url = URL_SERVICIOS + '/dieta/feedback/' + dieta._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, dieta).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarDieta', 'error');
        return throwError(err);
      })
    );
  }

  borrarDieta(dieta: Dieta, mensaje: any) {
    const data = {
      usuario: dieta.usuario,
      mensaje
    };
    let url = URL_SERVICIOS + '/dieta/delete/' + dieta._id;
    url += '?token=' + localStorage.token;
    return this.http.post(url, data).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.borrarDieta', 'error');
        return throwError(err);
      })
    );
  }

}
