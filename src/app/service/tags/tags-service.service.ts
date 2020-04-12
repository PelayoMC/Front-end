import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService {

  constructor(public http: HttpClient) { }

  obtenerTags() {
    const url = URL_SERVICIOS + '/etiqueta';
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
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
