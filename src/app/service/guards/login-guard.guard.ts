import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public usuarioService: UsersService, public router: Router ) {

  }

  canActivate() {
    if (this.usuarioService.estaLogueado()) {
      return true;
    } else {
      Swal.fire('No ha iniciado sesión', 'Para realizar esta acción debe acceder desde un perfil válido', 'error');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
