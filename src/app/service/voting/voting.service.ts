import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Votacion } from 'src/app/models/votacion.model';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(public http: HttpClient) { }

  getVotingRecipe(id: string) {
    const url = URL_SERVICIOS + '/votacion/receta/' + id;
    return this.http.get(url).pipe(map(
      (resp: any) => {
        return resp.votacion;
      }),
      catchError( err => {
        Swal.fire('Error al obtener la votación', err.error.mensaje, 'error');
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
        Swal.fire('Error al obtener la votación', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  crearVotacion(id: string) {
    const ident = {
      id
    };
    const url = URL_SERVICIOS + '/votacion';
    return this.http.post(url, ident).pipe(
      map( (resp: any) => {
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error al crear la votación', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  modificarVotacion(votacion: Votacion) {
    const url = URL_SERVICIOS + '/votacion';
    return this.http.put(url, votacion).pipe(
      map( (resp: any) => {
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error al modificar la votación', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  borrarVotacion(id: string) {
    const url = URL_SERVICIOS + '/votacion/' + id;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error al borrar la votación', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
