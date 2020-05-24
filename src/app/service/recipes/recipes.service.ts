import { Injectable } from '@angular/core';
import { Recipe, IngredientRecipe } from 'src/app/models/recipe.model';
import { UploadImageService } from '../upload/upload-image.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsersService } from '../users/users.service';
import { SwalService } from '../language/swal.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(public http: HttpClient, public router: Router, public uploadService: UploadImageService,
              public userService: UsersService, public swal: SwalService) { }

  getRecipe(idx: string){
    let url = URL_SERVICIOS + '/receta/' + idx;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.receta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.cargarReceta', 'error');
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

  buscarIds(ids: string[]) {
    const idsRe = {
      ids
    };
    let url = URL_SERVICIOS + '/receta/ids';
    return this.http.post(url, idsRe).pipe(
      map( (resp: any) => {
        return resp.recetas;
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
        this.swal.crearSwal('comun.alertas.errores.guardarIngredientes', 'error');
        return throwError(err);
      })
    );
  }

  descubrirRecetas(termino: string, tipos: string[], intolerancias: string[], from: number, limit: number) {
    const extra = {
      tipos,
      intolerancias
    };
    let url = URL_SERVICIOS + '/busqueda/descubrir/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.post(url, extra).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  buscarRecetas(termino: string, tipos: string[], intolerancias: string[], from: number, limit: number) {
    const extra = {
      tipos,
      intolerancias
    };
    let url = URL_SERVICIOS + '/busqueda/receta/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.post(url, extra).pipe(
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
        this.swal.crearSwal('comun.alertas.exito.crearReceta', 'success');
        return resp.receta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.crearReceta', 'error');
        return throwError(err);
      })
    );
  }

  modificarReceta(receta: Recipe) {
    let url = URL_SERVICIOS + '/receta/' + receta._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, receta).pipe(
      map( (resp: any) => {
        this.swal.crearSwal('comun.alertas.exito.modificarReceta', 'success');
        return resp.receta;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarReceta', 'error');
        return throwError(err);
      })
    );
  }

  cambiarImagen(receta: Recipe, file: File) {
    this.uploadService.subirArchivo(file, 'recetas', receta._id).then( (resp: any) => {
      receta.imagen = JSON.parse(resp).receta.imagen;
    }).catch(err => {
      this.swal.crearSwal('comun.alertas.errores.cambiarImagenReceta', 'error');
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
        this.swal.crearSwal('comun.alertas.errores.borrarReceta', 'error');
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
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        return resp.recetas;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.borrarRecetas', 'error');
        return throwError(err);
      })
    );
  }
}
