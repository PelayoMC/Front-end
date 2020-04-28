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
    let url = URL_SERVICIOS + '/votacion';
    url += '?token=' + localStorage.token;
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
    let url = URL_SERVICIOS + '/votacion/' + votacion._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, votacion).pipe(
      map( (resp: any) => {
        Swal.fire('Votación añadida', 'Su votación se ha añadido correctamente', 'success');
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error al modificar la votación', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  borrarVotacion(id: string) {
    let url = URL_SERVICIOS + '/votacion/' + id;
    url += '?token=' + localStorage.token;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        Swal.fire('Votación borrada', 'La votación se ha borrado correctamente', 'success');
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error al borrar la votación', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
