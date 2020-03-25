import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { IngredientRecipe } from 'src/app/models/recipe.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
}
