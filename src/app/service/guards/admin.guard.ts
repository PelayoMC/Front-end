import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UsersService, private router: Router) {
  }

  canActivate() {
    if (this.userService.usuario.value.rol === 'ADMIN') {
      return true;
    } else {
      Swal.fire('Permiso denegado', 'No puede acceder a esta página porque no es administrador', 'error');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
