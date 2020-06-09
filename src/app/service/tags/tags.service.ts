import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SwalService } from '../language/swal.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(public http: HttpClient, public swal: SwalService) { }

  obtenerEtiquetas() {
    const url = URL_SERVICIOS + '/etiqueta/all';
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
    return this.http.post(url, []).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  crearEtiqueta(etiqueta: any) {
    let url = URL_SERVICIOS + '/etiqueta';
    url += '?token=' + localStorage.token;
    return this.http.post(url, etiqueta).pipe(
      map( (resp: any) => {
        this.swal.crearSwal('comun.alertas.exito.crearEtiqueta', 'success');
        return resp.etiqueta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.crearEtiqueta', 'error');
        return throwError(err);
      })
    );
  }

  añadirTags(tags: string[]) {
    let url = URL_SERVICIOS + '/etiqueta/varios';
    url += '?token=' + localStorage.token;
    return this.http.post(url, tags).pipe(
      map( (resp: any) => {
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
        this.swal.crearSwal('comun.alertas.errores.modificarEtiqueta', 'error');
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
        this.swal.crearSwal('comun.alertas.exito.modificarEtiqueta', 'success');
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarEtiqueta', 'error');
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
        this.swal.crearSwal('comun.alertas.errores.borrarEtiqueta', 'error');
        return throwError(err);
      })
    );
  }
}
