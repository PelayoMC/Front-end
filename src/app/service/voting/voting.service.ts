import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Votacion } from 'src/app/models/votacion.model';
import { SwalService } from '../language/swal.service';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(public http: HttpClient, public swal: SwalService) { }

  getVotingRecipe(id: string) {
    const url = URL_SERVICIOS + '/votacion/receta/' + id;
    return this.http.get(url).pipe(map(
      (resp: any) => {
        return resp.votacion;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerVotacion', 'error');
        return throwError(err);
      })
    );
  }

  getVotingUser(id: string) {
    const url = URL_SERVICIOS + '/votacion/usuario/' + id;
    return this.http.get(url).pipe(map(
      (resp: any) => {
        return resp.votacion;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.obtenerVotacion', 'error');
        return throwError(err);
      })
    );
  }

  crearVotacion(id: string) {
    const ident = {
      id
    };
    let url = URL_SERVICIOS + '/votacion';
    url += '?token=' + localStorage.token;
    return this.http.post(url, ident).pipe(
      map( (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.crearVotacion', 'error');
        return throwError(err);
      })
    );
  }

  modificarVotacion(votacion: Votacion) {
    let url = URL_SERVICIOS + '/votacion/' + votacion._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, votacion).pipe(
      map( (resp: any) => {
        this.swal.crearSwal('comun.alertas.exito.modificarVotacion', 'success');
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarVotacion', 'error');
        return throwError(err);
      })
    );
  }

  borrarVotacion(id: string) {
    let url = URL_SERVICIOS + '/votacion/' + id;
    url += '?token=' + localStorage.token;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        // this.swal.crearSwal('comun.alertas.exito.borrarVotacion', 'success');
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.borrarVotacion', 'error');
        return throwError(err);
      })
    );
  }
}
