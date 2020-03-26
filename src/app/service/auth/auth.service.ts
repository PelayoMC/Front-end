import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkToken(err: any) {
    if (err.status === '401') {
      Swal.fire('Error', '<p>Token de sesión inválido</p><p>Cerrando sesión ...</p>', 'error');
      return false;
    }
    return true;
  }

  checkTokenGoogle(err: any) {
    if (err.status === '403') {
      Swal.fire('Error', '<p>Token de sesión inválido</p><p>Cerrando sesión ...</p>', 'error');
      return false;
    }
    return true;
  }
}
