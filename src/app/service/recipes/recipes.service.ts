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
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al guardar los ingrediente', 'error');
        return throwError(err);
      })
    );
  }

  buscarRecetas(termino: string, tags: string[], intolerancias: string[], from: number, limit: number) {
    const extra = {
      etiquetas: tags,
      intolerancias
    };
    let url = URL_SERVICIOS + '/busqueda/receta/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.post(url, extra).pipe(
      map(  (resp: any) => {
        console.log(resp);
        return resp;
      })
    );
  }

  crearReceta(receta: Recipe) {
    let url = URL_SERVICIOS + '/receta/';
    url += '?token=' + localStorage.token;
    return this.http.post(url, receta).pipe(
      map( (resp: any) => {
        Swal.fire('Receta creada',
        'Se procederá a añadir etiquetas e ingredientes sustituibles a los ingredientes',
        'success');
        return resp.receta;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al crear la receta', 'error');
        return throwError(err);
      })
    );
  }

  modificarReceta(receta: Recipe) {
    let url = URL_SERVICIOS + '/receta/' + receta._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, receta).pipe(
      map( (resp: any) => {
        Swal.fire('Receta modificada',
        'Se procederá a añadir etiquetas e ingredientes sustituibles a los ingredientes',
        'success');
        return resp.receta;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al modificar la receta', 'error');
        return throwError(err);
      })
    );
  }

  cambiarImagen(receta: Recipe, file: File) {
    this.uploadService.subirArchivo(file, 'recetas', receta._id).then( (resp: any) => {
      receta.imagen = JSON.parse(resp).receta.imagen;
    }).catch(err => {
      Swal.fire('Error', 'Error al cambiar la imagen a la receta', 'error');
    });
  }

  borrarReceta(id: string) {
    let url = URL_SERVICIOS + '/receta/' + id;
    url += '?token=' + localStorage.token;
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.receta;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al borrar la receta', 'error');
        return throwError(err);
      })
    );
  }

  borrarRecetas(recetas: any) {
    let url = URL_SERVICIOS + '/receta?ids=';
    for (let i = 0; i < (recetas.length - 1); i++) {
      url += recetas[i]._id + '&ids=';
    }
    url += recetas[recetas.length - 1]._id + '&token=' + localStorage.token;
    console.log('Enviamos');
    console.log(url);
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.recetas;
      }),
      catchError( err => {
        Swal.fire('Error', 'Error al borrar las recetas', 'error');
        return throwError(err);
      })
    );
  }
}
