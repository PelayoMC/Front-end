import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { SwalService } from '../language/swal.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public usuarioService: UsersService, public router: Router, public swal: SwalService) {

  }

  canActivate() {
    if (this.usuarioService.estaLogueado()) {
      return true;
    } else {
      this.swal.crearSwal('comun.alertas.errores.noSesion', 'error');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
