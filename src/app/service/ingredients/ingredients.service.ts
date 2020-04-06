import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { IngredientRecipe } from 'src/app/models/recipe.model';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../models/ingredient.model';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(public http: HttpClient) { }

  obtenerIngsRecipe(ingredientes: IngredientRecipe[]) {
    const send = {
      ingredientes
    };
    let url = URL_SERVICIOS + '/ingrediente/obtenerIds/';
    url += '?token=' + localStorage.token;
    return this.http.post(url, send).pipe(
      map( (resp: any) => {
        return resp.ings;
      })
    );
  }

  obtenerIngs(from: number, limit: number) {
    let url = URL_SERVICIOS + '/ingrediente?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }

  buscarIngredientes(termino: string, from: number) {
    let url = URL_SERVICIOS + '/busqueda/ingrediente/' + termino + '?from=' + from;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al buscar los ingredientes', 'error');
        return throwError(err);
      })
    );
  }

  crearIngredientes(nombres: string[]) {
    const names = {
      nombres
    };
    let url = URL_SERVICIOS + '/ingrediente/';
    url += '?token=' + localStorage.token;
    return this.http.post(url, names).pipe(
      map( (resp: any) => {
        return resp.ingredientes;
      })
    );
  }

  getSustituibles(nombres: string[]) {
    let url = URL_SERVICIOS + '/ingrediente/sust';
    return this.http.post(url, nombres).pipe(
      map( (resp: any) => {
        return resp.ingredientes;
      })
    );
  }
}
