import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntolerancesService {

  constructor(public http: HttpClient) { }

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

  buscarIntolerancias(termino: string, from: number, limit: number) {
    let url = URL_SERVICIOS + '/busqueda/intolerancia/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }
}
