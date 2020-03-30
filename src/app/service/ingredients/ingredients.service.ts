import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { IngredientRecipe } from 'src/app/models/recipe.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(public http: HttpClient) { }

  obtenerIngs(ingredientes: IngredientRecipe[]) {
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
}
