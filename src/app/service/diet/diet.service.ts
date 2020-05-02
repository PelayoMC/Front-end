import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Dieta } from '../../models/dieta.model';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(public http: HttpClient, public userService: UsersService) { }

  obtenerDietaAdmin(id: string) {
    let url = URL_SERVICIOS + '/dieta/admin/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      })
    );
  }

  obtenerDietaUser(id: string) {
    let url = URL_SERVICIOS + '/dieta/usuario/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      })
    );
  }

  obtenerDietasSinAsignar(from: number, to: number) {
    let url = URL_SERVICIOS + '/dieta/asignar' + '?from=' + from + '&limit=' + to;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  obtenerComentariosDietas(id: string, from: number, to: number) {
    let url = URL_SERVICIOS + '/dieta/comentarios/' + id  + '?from=' + from + '&limit=' + to;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  obtenerRecetasDietas(id: string) {
    let url = URL_SERVICIOS + '/dieta/recetas/' + id;
    return this.http.get(url).pipe(
      map(  (resp: any) => {
        return resp;
      })
    );
  }

  crearDieta() {
    const us = {
      usuario: this.userService.usuario.value._id
    };
    let url = URL_SERVICIOS + '/dieta/';
    url += '?token=' + localStorage.token;
    return this.http.post(url, us).pipe(
      map(  (resp: any) => {
        Swal.fire('Dieta solicitada', 'Su dieta será creada por un experto', 'success');
        return resp.dieta;
      })
    );
  }

  modificarFeedbackDieta(dieta: Dieta) {
    let url = URL_SERVICIOS + '/dieta/feedback/' + dieta._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, dieta).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      })
    );
  }

  modificarDieta(dieta: Dieta) {
    let url = URL_SERVICIOS + '/dieta/' + dieta._id;
    url += '?token=' + localStorage.token;
    return this.http.put(url, dieta).pipe(
      map(  (resp: any) => {
        return resp.dieta;
      })
    );
  }
}
