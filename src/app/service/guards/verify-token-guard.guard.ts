import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuardGuard implements CanActivate {

  constructor(public usuarioService: UsersService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this.usuarioService.token;
    if (token !== '') {
      console.log(token);
      const payload = JSON.parse( atob( token.split('.')[1] ) );
      const expirado = this.expirado(payload.exp);
      console.log(expirado);
      if (expirado) {
        this.router.navigate(['/login']);
        return false;
      }
      return this.renueva(payload.exp);
    } else {
      return true;
    }
  }

  expirado(fechaExp: number){
    const ahora = new Date().getTime() / 1000;
    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }
  }

  renueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();
      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000)); // Incrementamos 4 horas el token
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken().subscribe(valor => {
          resolve(true);
        }, () => {
          reject(false);
        });
      }
    });
  }
}
