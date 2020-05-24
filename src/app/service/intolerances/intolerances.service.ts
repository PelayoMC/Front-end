import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Intolerance } from '../../models/intolerance.model';
import { UploadImageService } from '../upload/upload-image.service';
import { throwError } from 'rxjs';
import { SwalService } from '../language/swal.service';

@Injectable({
  providedIn: 'root'
})
export class IntolerancesService {

  constructor(public http: HttpClient, public uploadService: UploadImageService, public swal: SwalService) { }

  obtenerAllInto() {
    let url = URL_SERVICIOS + '/intolerancia';
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }

  obtenerInto(from: any, limit: any) {
    let url = URL_SERVICIOS + '/intolerancia?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }

  getInto(id: string) {
    let url = URL_SERVICIOS + '/intolerancia/' + id;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.intolerancia;
      })
    );
  }

  getIntoNombres(nombres: string[]) {
    let names = {
      nombres
    };
    let url = URL_SERVICIOS + '/intolerancia/nombre';
    return this.http.post(url, names).pipe(
      map( (resp: any) => {
        return resp.intolerancias;
      })
    );
  }

  buscarIntolerancias(termino: string, tags: string[], from: number, limit: number) {
    const extra = {
      etiquetas: tags
    };
    let url = URL_SERVICIOS + '/busqueda/intolerancia/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.post(url, extra).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  añadirIntolerancia(int: any) {
    let url = URL_SERVICIOS + '/intolerancia';
    url += '?token=' + localStorage.token;
    return this.http.post(url, int).pipe(
      map( (resp: any) => {
        return resp.intolerancia;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.crearIntolerancia', 'error');
        return throwError(err);
      })
    );
  }

  modificarIntolerancia(int: any) {
    let url = URL_SERVICIOS + '/intolerancia/' + int._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, int).pipe(
      map( (resp: any) => {
        return resp.intolerancia;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarIntolerancia', 'error');
        return throwError(err);
      })
    );
  }

  borrarIntolerancia(int: any) {
    let url = URL_SERVICIOS + '/intolerancia/' + int._id;
    url += '?token=' + localStorage.token;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.intolerancia;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.borrarIntolerancia', 'error');
        return throwError(err);
      })
    );
  }

  cambiarImagen(intolerancia: Intolerance, file: File) {
    this.uploadService.subirArchivo(file, 'intolerancias', intolerancia._id).then( (resp: any) => {
      intolerancia.imagen = JSON.parse(resp).intolerancia.imagen;
    }).catch(err => {
      this.swal.crearSwal('comun.alertas.errores.cambiarImagenIntolerancia', 'error');
    });
  }
}
