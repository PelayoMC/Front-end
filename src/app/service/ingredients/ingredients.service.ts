import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { IngredientRecipe } from 'src/app/models/recipe.model';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../models/ingredient.model';
import { throwError } from 'rxjs';
import { SwalService } from '../language/swal.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(public http: HttpClient, public swal: SwalService) { }

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

  obtenerTodosIngs() {
    let url = URL_SERVICIOS + '/ingrediente/all/';
    console.log(url);
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
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

  buscarIngredientes(termino: string, tags: string[], intolerancias: string[], from: number, limit: number) {
    const extra = {
      etiquetas: tags,
      intolerancias
    };
    let url = URL_SERVICIOS + '/busqueda/ingrediente/' + termino + '?from=' + from + '&limit=' + limit;
    return this.http.post(url, extra).pipe(
      map(  (resp: any) => {
        return resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.buscarIngredientes', 'error');
        return throwError(err);
      })
    );
  }

  modificarIngrediente(ingredient: Ingredient) {
    let url = URL_SERVICIOS + '/ingrediente/' + ingredient._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, ingredient).pipe(
      map( (resp: any) => {
        return resp.ingrediente;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarIngrediente', 'error');
        return throwError(err);
      })
    );
  }

  modificarIngredienteReceta(id: string, nuevo: string) {
    const n = {
      nuevo
    };
    let url = URL_SERVICIOS + '/ingrediente/mod/' + id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, n).pipe(
      map( (resp: any) => {
        this.swal.crearSwal('comun.alertas.exito.modificarIngrediente', 'success');
        return resp.recetas;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.modificarIngredienteRecetas', 'error');
        return throwError(err);
      })
    );
  }

  borrarIngrediente(ingrediente: any) {
    const id = ingrediente._id;
    let url = URL_SERVICIOS + '/ingrediente/' + id + '?token=' + localStorage.token;
    return this.http.delete(url).pipe(
      map(  (resp: any) => {
        if (resp.ingrediente.nombre === ingrediente.nombre) {
          this.swal.crearSwal('comun.alertas.exito.borrarIngrediente', 'success');
        } else {
          this.swal.crearSwal('comun.alertas.errores.borrarIngrediente', 'error');
        }
        return resp.ingrediente;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.borrarIngrediente', 'error');
        return throwError(err);
      })
    );
  }

  borrarIngredientesSinReceta() {
    let url = URL_SERVICIOS + '/ingrediente/sinReceta' + '?token=' + localStorage.token;
    return this.http.delete(url).pipe(
      map(  (resp: any) => {
        if (resp.ingredientes.deletedCount === 0) {
          this.swal.crearSwal('comun.alertas.errores.noIngredientes', 'error');
        } else {
          this.swal.crearSwal('comun.alertas.exito.borrarIngredientes', 'success');
        }
        return resp.ingredientes;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.borrarIngredientes', 'error');
        return throwError(err);
      })
    );
  }

  obtenerRecetas(ings: any) {
    let url = URL_SERVICIOS + '/ingrediente/recetas';
    return this.http.post(url, ings).pipe(
      map(  (resp: any) => {
        return resp.resp;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.cargarRecetas', 'error');
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

  obtenerEtiquetas(ings: string[]) {
    const ids = {
      ings
    };
    let url = URL_SERVICIOS + '/ingrediente/obtenerTags';
    return this.http.post(url, ids).pipe(
      map(  (resp: any) => {
        return resp.etiquetas;
      }),
      catchError( err => {
        this.swal.crearSwal('comun.alertas.errores.cargarEtiquetas', 'error');
        return throwError(err);
      })
    );
  }

  añadirEtiquetas(nombres: any, tags: any) {
    const ingredientes = {
      nombres,
      tags
    };
    let url = URL_SERVICIOS + '/ingrediente/addTags';
    url += '?token=' + localStorage.token;
    return this.http.put(url, ingredientes).pipe(
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
