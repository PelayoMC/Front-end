import { Injectable } from '@angular/core';
import { Recipe, IngredientRecipe } from 'src/app/models/recipe.model';
import { UploadImageService } from '../upload/upload-image.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(public http: HttpClient, public router: Router, public uploadService: UploadImageService, public auth: AuthService, public userService: UsersService) { }

  getRecipe(idx: string){
    let url = URL_SERVICIOS + '/receta/' + idx;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.receta;
      }),
      catchError( err => {
        return throwError(err.message);
      })
    );
  }

  getRecipes(from: number) {
    let url = URL_SERVICIOS + '/receta?from=' + from;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.recetas;
      })
    );
  }

  getIngredients(idReceta: string) {
    return this.getRecipe(idReceta).pipe(
      map( (resp: any) => {
        return resp[0].ingredientes;
      })
    );
  }

  guardarIngredientes(idReceta: string, ingredients: IngredientRecipe[]) {
    const ings = {
      ingredients
    };
    let url = URL_SERVICIOS + '/receta/addIngs/' + idReceta;
    url += '?token=' + localStorage.token;
    return this.http.put(url, ings).pipe(
      map( (resp: any) => {
        console.log('Retornando receta');
        return resp.receta;
      })
    );
  }

  buscarRecetas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/receta/' + termino;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.coleccion;
      })
    );
  }

  crearReceta(receta: Recipe) {
    let url = URL_SERVICIOS + '/receta/';
    url += '?token=' + localStorage.token;
    return this.http.post(url, receta).pipe(
      map( (resp: any) => {
        Swal.fire('Receta creada', '<p>Nombre: ' + receta.nombre + '</p>', 'success');
        return resp.receta;
      })
    );
  }

 cambiarImagen(receta: Recipe, file: File) {
    this.uploadService.subirArchivo(file, 'recetas', receta._id).then( (resp: any) => {
      receta.imagen = JSON.parse(resp).receta.imagen;
    });
  }
}
