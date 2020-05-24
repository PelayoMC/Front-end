import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { SwalService } from '../language/swal.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UsersService, private router: Router, public swal: SwalService) {
  }

  canActivate() {
    if (this.userService.usuario.value.rol === 'ADMIN') {
      return true;
    } else {
      this.swal.crearSwal('comun.alertas.errores.noAdmin', 'error');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
