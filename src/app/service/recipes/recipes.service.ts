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
        Swal.fire('Error', 'Error al cargar la receta', 'error');
        return throwError(err.message);
      })
    );
  }

  getRecipes(from: number, limit: number) {
    let url = URL_SERVICIOS + '/receta?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
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
        return resp.receta;
      })
    );
  }

  buscarRecetas(termino: string, from: number, limit: number) {
    let url = URL_SERVICIOS + '/busqueda/receta/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
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
