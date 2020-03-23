import { Injectable } from '@angular/core';
import { Recipe, IngredientRecipe } from 'src/app/models/recipe.model';
import { UploadImageService } from '../upload/upload-image.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(public http: HttpClient, public router: Router, public uploadService: UploadImageService) { }

  getRecipe(idx: string){
    let url = URL_SERVICIOS + '/receta/' + idx;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.receta;
      }),
      catchError( err => {
        console.log();
        return throwError(err.message);
      })
    );
  }

  getRecipes() {
    let url = URL_SERVICIOS + '/receta/';
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.recetas;
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
      this.router.navigate(['/recipes']);
    }).catch( err => {
      console.log(err);
    });
  }
}
