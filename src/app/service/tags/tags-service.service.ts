import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService {

  constructor(public http: HttpClient) { }

  obtenerEtiquetas() {
    const url = URL_SERVICIOS + '/etiqueta';
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }

  obtenerTagsFT(from: number, limit: number) {
    const url = URL_SERVICIOS + '/etiqueta' + '?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }

  buscarEtiquetas(termino: string, from: number, limit: number) {
    let url = URL_SERVICIOS + '/busqueda/etiqueta/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  modificarEtiqueta(et: any) {
    let url = URL_SERVICIOS + '/etiqueta/' + et._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, et).pipe(
      map( (resp: any) => {
        return resp.etiqueta;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al modificar la etiqueta', 'error');
        return throwError(err);
      })
    );
  }

  modificarEtiquetaIngsInto(id: string, nuevo: string) {
    const n = {
      nuevo
    };
    let url = URL_SERVICIOS + '/etiqueta/mod/'  + id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, n).pipe(
      map( (resp: any) => {
        Swal.fire('Etiqueta modificada', 'La etiqueta ha sido modificada correctamente', 'success');
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al modificar la etiqueta en los ingredientes y las intolerancias', 'error');
        return throwError(err);
      })
    );
  }

  borrarEtiqueta(et: any) {
    let url = URL_SERVICIOS + '/etiqueta/' + et._id;
    url += '?token=' + localStorage.token;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.etiqueta;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al borrar la intolerancia', 'error');
        return throwError(err);
      })
    );
  }

  añadirTag(tags: string[]) {
    const etiquetas = {
      etiquetas: tags
    };
    let url = URL_SERVICIOS + '/etiqueta';
    url += '?token=' + localStorage.token;
    return this.http.post(url, tags).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }
}
