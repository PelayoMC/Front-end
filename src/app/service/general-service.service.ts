import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  constructor(public http: HttpClient, public router: Router) { }

  checkConnection() {
    let url = URL_SERVICIOS;
    return this.http.get(url).pipe(
      catchError(err => {
        Swal.fire('Error de conexión', 'No se puede establecer la conexión con el servidor', 'error');
        localStorage.clear();
        this.router.navigate(['/home']);
        return throwError(err);
      })
    );
  }

}
